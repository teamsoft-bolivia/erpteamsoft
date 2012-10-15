/*
 * @Autor: Max marcelo jimenez T, Cristhian Valencia
 * @Email: maxmjt@gmail.com , fox_tian@hotmail.com
 */


Ext.define('Erp.controller.almacenes.maestroalmacen.ControllerMaestroAlmacen', {
    extend: 'Ext.app.Controller',
    stores: [
             'almacenes.maestroalmacen.StoreListaAlmacenes',
             'StoreType',
             'almacenes.maestroalmacen.StoreEncargadosAlmacen',
             'crm.StoreCrmEmployee'
            ],
    models: [
            'almacenes.maestroalmacen.ModelListaAlmacenes',
             'ModelType',
             'almacenes.maestroalmacen.ModelEncargadosAlmacen',
             'crm.ModelCrmEmployee'
            ],
    views: [
            'almacenes.maestroalmacen.WindowAlmacenes',
            'almacenes.maestroalmacen.PanelGridAlmacenes',
            'almacenes.maestroalmacen.FormAlmacen',
            'Erp.view.almacenes.maestroalmacen.WindowTipoAlmacen',
            'Erp.view.almacenes.maestroalmacen.PanelGridTipoAlmacen',
            'Erp.view.almacenes.maestroalmacen.PanelGridEncargadosAlmacen'
        ],
     
     refs: [
        {
            ref     :   'windowAlmacenes',
            selector:   'windowalmacenes'
        },
        {
            ref     :   'formAlmacen',
            selector:   'windowalmacenes formalmacen'
            
        },
        {
            ref     :   'panelGridEncargadosAlmacen',
            selector:   'windowalmacenes panelgridencargadosalmacen'
            
        }
        
    ],
    init: function() {
        
        var thiss=this;
        thiss.control({
              'windowalmacenes'      :{
                    beforerender: thiss.initMaestroAlmacen
                    
                },
                'formalmacen combo[name=idbranch]'       : {
                    beforeselect: function (combo,record,index,eOpts){
                        var estado=true;
                        var window=combo.up('windowalmacenes');
                        var gridencargados=window.down('panelgridencargadosalmacen');
                        if(window.stateMode=='E'){
                            if(gridencargados.getStore().getTotalCount()>0){
                                Erp.helper.Tools.showMsg({title:'Atencion',msg:'No se puede cambiar la sucursal cuando existe personal asignado a este almacen en una sucursal'},false,4000);
                                estado=false;
                            
                            }
                        }     
                      return estado;
                    }
                    
                    
                },
                'panelgridalmacenes': {
                    itemclick: thiss.gridSelectionChange
                    

                },
                'windowalmacenes button':{
                  click   : thiss.actionButton

                },
                'panelgridtipoalmacen'  : {
                    edit        : thiss.editGrid,
                    beforeedit  : thiss.beforeEdit,
                    canceledit  : thiss.cancelEdit
                    
                },
                'windowtipoalmacen button[option=btnAddTipoAlmacen]'  : {
                    click        : thiss.nuevoTipoAlmacen
                },
                'windowtipoalmacen'  : {
                    close        : function (){
                       
                        var storetypealmacen = Ext.data.StoreManager.lookup('storetipoalmacen');
                        storetypealmacen.load();
                        
                    }
                },
                'panelgridencargadosalmacen'  : {
                    edit        : thiss.editGridEncargadosAlmacen,
                    beforeedit  : thiss.beforeEditGridEncargadosAlmacen,
                    canceledit  : thiss.cancelEditGridEncargadosAlmacen,
                    validateedit: thiss.validateEditGridEncargadosAlmacen,
                    itemdblclick: function(view,record,item,index,eeOpts){
                        var gridencargados=view.up('panelgridencargadosalmacen');
                        gridencargados.currentrowselected=index;
                        
                       
                        
                    }
                    
                },
                'panelgridencargadosalmacen actioncolumn'  : {
                    click   : thiss.actionColumn
                        
                }
                    
                
              

        });
    },
    initMaestroAlmacen             : function (window){
          var thiss=this;
        
           var gridalmacenes=window.down('panelgridalmacenes');
           var gridencargados=window.down('panelgridencargadosalmacen');
           var form = window.down('formalmacen');
           gridalmacenes.getStore().on('load',function(){
                  gridencargados.getStore().getProxy().extraParams.idstore=-1;
                    gridencargados.getStore().getProxy().extraParams.idbranch=-1;
                    gridencargados.getStore().removeAll();
                    form.getForm().reset();
           });
           gridalmacenes.getStore().load();
           
          
          
           var storetypealmacen = form.down('combo[name=storetype]').getStore();
           storetypealmacen.getProxy().extraParams.xaction='readcbostoretype';
           storetypealmacen.load();
           thiss.enableButtons(form);
        
          
        
             
    },
    gridSelectionChange: function(view, records) {
        var thiss=this;
        var win = view.up('window');
        win.idstore=records.data.idstore;
        var form = win.down('formalmacen');
        var gridencargados=form.down('panelgridencargadosalmacen');
      
        gridencargados.getStore().getProxy().extraParams.idstore=records.data.idstore;
        gridencargados.getStore().getProxy().extraParams.idbranch=records.data.idbranch;
        gridencargados.getStore().load();
        
        form.getForm().loadRecord(records)
       
        thiss.enableButtons(form);
        
       
      
    },
      enableButtons:function(form){
        var win=form.up('window');
        var gridencargadosalmacen = win.down('panelgridencargadosalmacen');
       
        var buttons=win.down('buttongroup[group=edicion]').items.items;
             
        if (win.stateMode=='R') {
            Ext.each(buttons,function(item){
                if (item.option=='btnNuevo' || item.option=='btnEditar') {
                    item.setDisabled(0);
                }else if (item.option=='btnGuardar' || item.option=='btnCancelar') {
                    item.setDisabled(1);
                }
            });
           gridencargadosalmacen.down('button').setDisabled(true);
        
            
        }else if (win.stateMode=='E') {
            Ext.each(buttons,function(item){
                if (item.option=='btnGuardar' || item.option=='btnCancelar') {
                    item.setDisabled(0);
                }else if (item.option=='btnNuevo' || item.option=='btnEditar') {
                    item.setDisabled(1);
                }
            });
           gridencargadosalmacen.down('button').setDisabled(false);
         
         
        }else if (win.stateMode=='N') {
            Ext.each(buttons,function(item){
                if (item.option=='btnGuardar' || item.option=='btnCancelar') {
                    item.setDisabled(0);
                }else if (item.option=='btnNuevo' || item.option=='btnEditar') {
                    item.setDisabled(1);
                }
            });
            gridencargadosalmacen.down('button').setDisabled(false);
           
            gridencargadosalmacen.getStore().getProxy().extraParams.idstore=-1;
            gridencargadosalmacen.getStore().load();
           
        }
    },
    actionButton : function (button){
        var thiss=this;
        var btn=button;
        var btnOption=button.option;
        var win=button.up('window');
        var form=win.down('formalmacen');
        var grilla=win.down('panelgridalmacenes');
        var gridencargadosalmacen=form.down('panelgridencargadosalmacen');
       
    
    switch (btnOption) {
        case 'btnNuevo':
            win.stateMode='N';
            this.enableComponents(form);
            grilla.setDisabled(true);
            btn.setDisabled(true);
        break;

        case 'btnEditar':
            win.stateMode='E';
            
            this.enableComponents(form);
            
        break;
                
        case 'btnGuardar':
            grilla.setDisabled(false);
            this.save(form);
            btn.setDisabled(true);
            //gridencargadosalmacen.getStore().getProxy().extraParams.idstore=-1;
            gridencargadosalmacen.getStore().load();
        break;

        case 'btnCancelar':
            grilla.setDisabled(false);
            btn.setDisabled(true);
            win.stateMode='R';
            form.getForm().reset();
            grilla.getStore().load();
            this.enableButtons(form);
            this.enableComponents(form);
            gridencargadosalmacen.getStore().getProxy().extraParams.idstore=-1;
            gridencargadosalmacen.getStore().load();
        break; 
        
        case 'btnTipoAlmacen':
            var cp=Ext.getCmp('center-panel');
            var wintipoalmacen= Ext.create('Erp.view.almacenes.maestroalmacen.WindowTipoAlmacen',{});
            var gridstoretype=Ext.create('Erp.view.almacenes.maestroalmacen.PanelGridTipoAlmacen',{});
            wintipoalmacen.items.items[0].add(gridstoretype);
            gridstoretype.getStore().getProxy().extraParams.xaction='readcbostoretype';
            gridstoretype.getStore().pageSize=10;
            gridstoretype.getStore().load();
            cp.add(wintipoalmacen);
            wintipoalmacen.show();
            
           
        break; 
        case 'btnAddPersonal':
          
            var grid=button.up('panelgridencargadosalmacen');
              var form=grid.up('formalmacen');
              var record=form.getRecord();
              
             
            grid.modegrid='insert';
            var store=grid.getStore();
            var plugingrilla=grid.getPlugin();

            var r=Ext.create('Erp.model.almacenes.maestroalmacen.ModelEncargadosAlmacen', { });
            
            grid.currentrowselected=0;
            store.insert(0, r);
            Ext.each(grid.columns,function(item){
                if(item.dataIndex=='id_person'){
                    item.getEditor().setDisabled(false);
                }
            });
            plugingrilla.startEdit(0, 0);  
            
        break;
      }
    },
    enableComponents:function(form){
        var me=this;
        var win=form.up('window');
        var grilla=win.down('panelgridalmacenes');
        var stateMode=win.stateMode;
       
        var items=form.getForm().getFields().items;
        
        var fieldidstore=form.down('numberfield[name=idstore]');
        var idstore=fieldidstore.getValue();
    
        
        if (stateMode=='R') {
           Ext.each(items,function(item,index,allitems){
               item.setReadOnly(1);
           });
        }else if (stateMode=='E') {
           
            if (idstore!=null) {
                this.enableButtons(form);
                Ext.each(items,function(item,index,allitems){
                          item.setReadOnly(0);
                });
                grilla.setDisabled(true);
            
            }else{
                win.stateMode='R';
                Erp.helper.Tools.showMsg({title:'Atencion',msg:'Para editar elija primero un Almacen!!!'},false,4000);
                grilla.setDisabled(false);
            }
        }else if (stateMode=='N') {
               form.getForm().reset();
               Ext.each(items,function(item,index,allitems){
                                 item.setReadOnly(0);
                    
                });
               
                me.enableButtons(form);
        }   
    },
  
    save:function(form){
        var me=this;
        var win=form.up('window');
        var grilla=win.down('panelgridalmacenes');
        var gridencargados=win.down('panelgridencargadosalmacen');
        var insertencargados=new Array();
        var updateencargados=new Array();
        
         gridencargados.getStore().each(function(record){
            if(record.data.state=='insert' ){
                insertencargados.push(record.data);

            }else{
                if(record.data.iddtxnstore!=0 && record.data.state=='update'){
                    updateencargados.push(record.data);  

                }
            }
           
                
        });
        if (form.getForm().isValid()) {
            var xaction;
            if (win.stateMode=='N') {
                xaction='insert';
            }else if (win.stateMode=='E') {
                xaction='update';
            }
            form.getForm().submit({
                clientValidation: true,
                url: 'data/classes/sis_erp_store.php',
                params: {yaction:'maestroalmacen',xaction:xaction,insertencargados:Ext.JSON.encode(insertencargados),updateencargados:Ext.JSON.encode(updateencargados)},
                success: function(frm, action) {
                    
                   Erp.helper.Tools.showMsg(action.result,true,4000); 
                
                    win.stateMode='R';
                    me.enableButtons(form);
                    me.enableComponents(form);
                    grilla.getStore().load();
                },
                failure: function(frm, action) {
                    Erp.helper.Tools.showMsg(action.result,false,4000);
                }
            });
        }
        
        
            
    },

    editGrid        : function (editor, e,eopts){
        var thiss=this;
        var store=e.grid.getStore();
        var idtype=e.record.data.idtype;
         
        Ext.Ajax.request({
                url  : 'data/classes/sis_erp_type.php',
                    params : {
                    xaction   : e.grid.modegrid,
                    idtype: idtype,
                    valoresType : Ext.JSON.encode(editor.context.newValues),
                    yaction     : 'tipoalmacen'

                    },
                method : 'POST',
                success: function(r) {

                    var result=Ext.decode(r.responseText);

                        Ext.create('widget.uxNotification', {
                            title: result.title,
                            position: 'tr',
                            manager: 'instructions',
                            cls: 'ux-notification-light',
                            iconCls: 'ux-notification-icon-information',
                            html: result.msg,
                            autoHideDelay: 4000,
                            slideBackDuration: 500,
                            slideInAnimation: 'bounceOut',
                            slideBackAnimation: 'easeIn'
                            }).show();
                        store.load();
                        e.grid.modegrid='update';
                        

                },
                failure: function(r) {
                        var result=Ext.decode(r.responseText);
                            
                        Ext.create('widget.uxNotification', {
                        title: result.title,
                        position: 'tr',
                        manager: 'instructions',
                        cls: 'ux-notification-light',
                        iconCls: 'ux-notification-icon-information',
                        html: result.msg,
                        autoHideDelay: 4000,
                        slideBackDuration: 500,
                        slideInAnimation: 'bounceOut',
                        slideBackAnimation: 'easeIn'
                        }).show();
                        store.load();
                        e.grid.modegrid='update';
                      

                }

         });
    },
    cancelEdit  : function (editor, e, eOpts){
     
      e.grid.modegrid='update';
      e.grid.getStore().reload();   
      
    },
    beforeEdit  : function (editor, e, eOpts){

    },
    nuevoTipoAlmacen        : function(button){
       
        var win=button.up('window');
        var grid=win.down('grid');
        grid.modegrid='insert';
        var store=grid.getStore();
        var plugingrilla=grid.getPlugin();
        
        var r=Ext.create('Erp.model.ModelType', {
            idtype : '',
            type:''
                 
        });
        store.insert(0, r);
        plugingrilla.startEdit(0, 0);
      
        
    },
    editGridEncargadosAlmacen        : function (editor, e){
            var thiss=this;
            var store=e.grid.getStore();
            
             Ext.each(e.grid.columns,function(item){
                if(item.dataIndex=='id_person'){
                    item.getEditor().setDisabled(true);
                }
                });
                e.record.commit();
            
    },
   
    beforeEditGridEncargadosAlmacen  : function (editor, e, eOpts){
        var thiss=this;
        
        var window=e.grid.up('windowalmacenes');
        var estado=true;
        if(window.stateMode=='R'){
            estado=false;
        }else{
              if(e.record.data.id_person!=''){
                     
                  
                  Ext.each(e.grid.columns,function(item){
                    if(item.dataIndex=='id_person'){
                        item.getEditor().getStore().load({params:{id_person:e.record.data.id_person}});
                    }
                 });
                 
             }
            
        }
        return estado;


    },
    validateEditGridEncargadosAlmacen : function (editor,e){
       
                if(e.record.data.idstoredependent==0){
                    e.record.data['state']='insert';
                    e.record.commit();
                }else{
                    e.record.data['state']='update';
                    e.record.commit();
                }
                
         
     
    },
    cancelEditGridEncargadosAlmacen   : function (editor,e){
     
        if(e.record.data.state=='new'){
                e.store.removeAt(e.rowIdx);       

            }
             Ext.each(e.grid.columns,function(item){
                if(item.dataIndex=='id_person'){
                    item.getEditor().setDisabled(true);
                }
            });
      
        
        
        
    },
    actionColumn    : function(gridview,el,rowindex,colindex,e,record){
        var thiss=this;
        var window=gridview.up('windowalmacenes');
        var gridencargados = window.down('panelgridencargadosalmacen');
        var m = e.getTarget().className.match(/\bicon-(\w+)\b/);
        var rec = gridencargados.getStore().getAt(rowindex);
        var idstoredependent=rec.data.idstoredependent;
        var store = gridencargados.getStore();
        if(m){
            switch(m[1]){
                case 'delete':
                    if (window.stateMode=="E") {
                        if(idstoredependent==''){
                            Ext.MessageBox.confirm('Alerta:', 'Esta seguro de eliminar el Registro?', 
                            function(option){
                                        if (option=='yes') {
                                            gridencargados.getStore().removeAt(rowindex);
                                        } 
                                });
                        }else{
                        
                            Ext.MessageBox.confirm('Alerta:', 'Esta seguro de eliminar el Registro?', 
                            function(option){
                                        if (option=='yes') {
                                            Ext.Ajax.request({
                                                url  : 'data/classes/sis_erp_store.php',
                                                params : {
                                                    xaction      : 'delete',
                                                    yaction      : 'encargadoalmacen',
                                                    idstoredependent: idstoredependent
                                                },
                                                method : 'POST',
                                                
                                                success: function(response) {
                                                    var result=Ext.decode(response.responseText);
                                                    Erp.helper.Tools.showMsg(result,true,4000);
                                                    
                                                     gridencargados.getStore().load();
                                                },
                                                failure: function(response) {
                                                    var result=Ext.decode(response.responseText);
                                                    Erp.helper.Tools.showMsg(result,false,4000);
                                                }

                                            });
                                        } 
                                });
                        }
                    }else if (window.stateMode=="N") {
                        Ext.MessageBox.confirm('Alerta:', 'Esta seguro de eliminar el Registro?', 
                            function(option){
                                        if (option=='yes') {
                                            gridencargados.getStore().removeAt(rowindex);
                                        } 
                                });
                    }
                break;
                
            }
        }
    }
    
   
});






