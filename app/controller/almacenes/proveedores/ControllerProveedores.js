/*
 * @Autor: Max marcelo jimenez T, Cristhian Valencia
 * @Email: maxmjt@gmail.com , fox_tian@hotmail.com
 */


Ext.define('Erp.controller.almacenes.proveedores.ControllerProveedores', {
    extend: 'Ext.app.Controller',
    stores: [
             'almacenes.proveedores.StoreListaProveedores',
             'almacenes.proveedores.StoreCategoriaProveedor',
             'StoreType',
             'almacenes.proveedores.StoreContactos'
            ],
    models: [
            'almacenes.proveedores.ModelProveedores',           
            'almacenes.proveedores.ModelCategoriaProveedor',
             'ModelType',
             'almacenes.proveedores.ModelContactos'
            ],
    views: [
            'almacenes.proveedores.WindowProveedores',
            'almacenes.proveedores.PanelGridProveedores',
            'almacenes.proveedores.PanelGridCategoriaProveedor',
            'almacenes.proveedores.PanelGridContactos'
        ],
    init: function() {
        
        var thiss=this;
        
        thiss.control({
                'WindowProveedores'      :{
                        beforerender: thiss.iniciarVentanaUnit
                    
                },
                'panelgridproveedores': {
                        itemclick: this.gridSelectionChange

                },
                'panelgridcategoriaproveedor'    : {
                   
                        edit        : thiss.editGrid,
                        beforeedit  : thiss.beforeEdit,
                        canceledit  : thiss.cancelEdit
                    
                },
                 'panelgridcategoriaproveedor button[option=btnAddCategoria]' :{
                        click   : thiss.nuevaCategoria
                    
                },
                 'panelgridcategoriaproveedor trigger[option=searchcategory]  '    :{
                        keypress        : thiss.buscarCategoria


                },
                'WindowProveedores button':{
                        click   : thiss.actionButton

                },
                'panelgridcontactos button[option=addcontacto]':{
                        click   : thiss.functionAgregarContacto
                },
                'panelgridcontactos':{
                        edit        : thiss.editGridcontactos,
                        //beforeedit  : thiss.beforeEditcontactos,
                        canceledit  : thiss.cancelEditcontactos
                }
                
                
              

        });
    },
    iniciarVentanaUnit             : function (window){
          window.down('grid').getStore().load();
          
          var thiss=this; 
          var gridCatProv= window.down('panelgridcategoriaproveedor')
           gridCatProv.addDocked({

                            xtype       : 'pagingtoolbar',
                            store       :  gridCatProv.getStore(),
                            dock        : 'bottom',
                            displayInfo : true
                        });
        
        gridCatProv.down('button[option=btnAddCategoria]').setDisabled(true);
        gridCatProv.down('trigger[option=searchcategory]').setDisabled(true); 
        var cboagrupacioncateg;
        var cbocategoria;
        
     
         Ext.each(gridCatProv.columns,function(item,index,allitems){
           if (item.dataIndex=='idcategoricalgrouping'){
                cboagrupacioncateg=item.getEditor();
                cboagrupacioncateg.store=Ext.create('Erp.store.StoreType',{});
           }else if(item.dataIndex=='idcategory'){
                cbocategoria=item.getEditor();
                cbocategoria.store=Ext.create('Erp.store.almacenes.categoria.StoreItemCategoria',{});
            }
        });
        cboagrupacioncateg.getStore().load({params:{xaction:'readagrupacioncategorica'}});
        cboagrupacioncateg.on('select',function(combo,records){
            
            Ext.each(records,function(item,index,allitems){
                 thiss.cambiarParamsCombo(cbocategoria,item.get('alias'));
                 cbocategoria.getStore().load();
                
                
            })
            
        })
         
             
    },
    gridSelectionChange: function(view, records) {
        
        var win1 = view.up('window');
        win1.idProveedor=records.data.idprovider;

        var form = win1.down('formaddproveedores');

        if(win1.stateMode!='E'){
            form.getForm().loadRecord(records);
        }
        //form.enableButtons(form);
        var gridcategoriaprovedor=win1.down('panelgridcategoriaproveedor');
         gridcategoriaprovedor.down('button[option=btnAddCategoria]').setDisabled(false);
         gridcategoriaprovedor.down('trigger[option=searchcategory]').setDisabled(false); 
         gridcategoriaprovedor.getStore().getProxy().extraParams.idprovider=records.get('idprovider');
         
         var gridcontactosproveedor=win1.down('panelgridcontactos');
         gridcontactosproveedor.getStore().getProxy().extraParams.idprovider=records.get('idprovider');
        // gridcategoriaprovedor.getStore().load({params :{idprovider:records.get('idprovider')}});
        gridcontactosproveedor.getStore().load();
         gridcategoriaprovedor.getStore().load();
        form.getForm().loadRecord(records);
        this.enableButtons(form);

    
    },

    editGrid        : function (editor, e,eopts){
        var thiss=this;

        var store=e.grid.getStore();
        
        var idprovider=e.grid.getStore().getProxy().extraParams.idprovider;
        
        Ext.Ajax.request({
                url  : 'data/classes/sis_erp_category_provider.php',
                    params : {
                    xaction   : e.grid.modegrid,
                    idprovider: idprovider,
                    valoresCategoria : Ext.JSON.encode(editor.context.newValues) 

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
                        thiss.mostrarColumna(e.grid.columns,false,'idcategoricalgrouping');

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
                        thiss.mostrarColumna(e.grid.columns,false,'idcategoricalgrouping');

                }

         });
    },
    actionButton : function (button){
        var thiss=this;
        var btn=button;
        var btnOption=button.option;
        var win=button.up('window');
        var form=win.down('formaddproveedores');
        var grilla=win.down('panelgridproveedores');
        var grillacategorias=win.down('panelgridcategoriaproveedor');
        var btn=win.down('button[option=btnAddCategoria]');
        var tap=win.down('tappanelconfiguraciones');
        var grillacontact=win.down('panelgridcontactos');
    switch (btnOption) {
        case 'btnNuevo':
            grillacategorias.getStore().removeAll();
            grillacontact.getStore().removeAll();
            //grillacategorias.getStore().getProxy().extraParams.idprovider=0;
            //grillacategorias.getStore().load();
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
        break;

        case 'btnCancelar':
            grillacategorias.getStore().removeAll();
            grillacontact.getStore().removeAll();
            //grillacategorias.getStore().getProxy().extraParams.idprovider=0;
            //grillacategorias.getStore().load();
            grilla.setDisabled(false);
            btn.setDisabled(true);
            tap.setDisabled(true);
            win.stateMode='R';
            form.getForm().reset();
            grilla.getStore().load();
            this.enableButtons(form);
            this.enableComponents(form);
        break;
      }
    },
    enableComponents:function(form){
        var me=this;
        var win=form.up('window');
        var grilla=win.down('panelgridproveedores');
      
        var stateMode=win.stateMode;
        var items=form.getForm().getFields().items;
        
        var fidprovider=form.down('numberfield[name=idprovider]');
        var idprovider=fidprovider.getValue();
        var tap=win.down('tappanelconfiguraciones');
      //console.log(form);
      var btn=win.down('button[option=btnAddCategoria]');
        
        if (stateMode=='R') {
           Ext.each(items,function(item,index,allitems){
               item.setReadOnly(1);
           });
        }else if (stateMode=='E') {
            //alert('jeje');
            if (idprovider!=null) {
                this.enableButtons(form);
                tap.setDisabled(false);
                Ext.each(items,function(item,index,allitems){
                    //if (item.name!='iditem' && item.name!='identerprise' && item.name!='image') {
                        item.setReadOnly(0);
                   // }
                   
                });
                grilla.setDisabled(true);
                
                btn.setDisabled(false);
                //console.log(btn);
            }else{
                win.stateMode='R';
                Ext.create('widget.uxNotification', {
                        position: 'tr',
                        useXAxis: true,
                        cls: 'ux-notification-light',
                        iconCls: 'ux-notification-icon-error',
                        closable: false,
                        title: 'Alerta:',
                        html: 'Para editar elija primero un Proveedor!!!',
                        slideInDuration: 800,
                        slideBackDuration: 1500,
                        autoHideDelay: 4000,
                        slideInAnimation: 'elasticIn',
                        slideBackAnimation: 'elasticIn'
                }).show();
                grilla.setDisabled(false);
            }
        }else if (stateMode=='N') {
               form.getForm().reset();
               Ext.each(items,function(item,index,allitems){
                   
                    //if (item.name!='iditem' && item.name!='identerprise' && item.name!='image') {
                        item.setReadOnly(0);
                    //}
                    
                });
                this.enableButtons(form);
        }   
    },
    save:function(form){
        var me=this;
        var win=form.up('window');
        //var idaccountplan=form.down('textfield[name=idaccountplan]');
        //var accountcode=form.down('textfield[name=accountcode]');
        var grilla=win.down('panelgridproveedores');
        if (form.getForm().isValid()) {
            var yaction;
            if (win.stateMode=='N') {
                yaction='insert';
            }else if (win.stateMode=='E') {
                yaction='update';
            }
            form.getForm().submit({
                clientValidation: true,
                url: 'data/classes/sis_erp_provider.php',
                params: {xaction:'updateCreateProvider',yaction: yaction},
                success: function(frm, action) {
                   Ext.create('widget.uxNotification', {
                        title: action.result.title,
                        position: 'tr',
                        manager: 'instructions',
                        cls: 'ux-notification-light',
                        iconCls: 'ux-notification-icon-information',
                        html: action.result.msg,
                        autoHideDelay: 4000,
                        slideBackDuration: 500,
                        slideInAnimation: 'bounceOut',
                        slideBackAnimation: 'easeIn'
                    }).show();
                    /*if (form.stateMode=='N') {
                        idaccountplan.setValue(action.result.idaccountplan);
                        accountcode.setValue(action.result.accountcode);
                    }*/
                    win.stateMode='R';
                    me.enableButtons(form);
                    me.enableComponents(form);
                    grilla.getStore().load();
                    form.getForm().reset();
                },
                failure: function(frm, action) {
                    Ext.create('widget.uxNotification', {
                        title: action.result.title,
                        position: 'tr',
                        manager: 'instructions',
                        cls: 'ux-notification-light',
                        iconCls: 'ux-notification-icon-information',
                        html: action.result.msg,
                        autoHideDelay: 4000,
                        slideBackDuration: 500,
                        slideInAnimation: 'bounceOut',
                        slideBackAnimation: 'easeIn'
                }).show();
                }
            });
        }
        
        
            
    },
    enableButtons:function(form){
        var win=form.up('window');
        //console.log(form.getDockedComponent(0));
        var buttons=form.getDockedComponent(0).items.items;
        
        if (win.stateMode=='R') {
            Ext.each(buttons,function(item){
                if (item.option=='btnNuevo' || item.option=='btnEditar') {
                    item.setDisabled(0);
                }else if (item.option=='btnGuardar' || item.option=='btnCancelar') {
                    item.setDisabled(1);
                }
            });
        }else if (win.stateMode=='E') {
            Ext.each(buttons,function(item){
                if (item.option=='btnGuardar' || item.option=='btnCancelar') {
                    item.setDisabled(0);
                }else if (item.option=='btnNuevo' || item.option=='btnEditar') {
                    item.setDisabled(1);
                }
            });
        }else if (win.stateMode=='N') {
            Ext.each(buttons,function(item){
                if (item.option=='btnGuardar' || item.option=='btnCancelar') {
                    item.setDisabled(0);
                }else if (item.option=='btnNuevo' || item.option=='btnEditar') {
                    item.setDisabled(1);
                }
            });
        }
    },
    cancelEdit  : function (editor, e, eOpts){
      this.mostrarColumna(e.grid.columns,false,'idcategoricalgrouping');
      e.grid.modegrid='update';
      e.grid.getStore().reload();   
      
},
beforeEdit  : function (editor, e, eOpts){
    var win=e.grid.up('window');
    if(win.stateMode=='E'){
      var thiss=this;
    var cbocategoria;
    var cboagrupcategoria;
    this.mostrarColumna(e.grid.columns,true,'idcategoricalgrouping'); 
    var alias= e.record.data.alias;
    Ext.each(e.grid.columns,function(item,index,allitems){
       
        if (item.dataIndex=='idcategory') {
            cbocategoria=item.getEditor();
            thiss.cambiarParamsCombo(cbocategoria,alias);
            cbocategoria.getStore().load();

        }
        if(item.dataIndex=='idcategoricalgrouping'){
            cboagrupcategoria=item.getEditor();
            cboagrupcategoria.getStore().reload();
            
        }
    });  
    }else{
        //console.log(e.grid.editingPlugin);
        e.grid.getStore().load();
    }
   
    
},
nuevaCategoria        : function(button){
       
        var grid=button.up('grid');
        grid.modegrid='insert';
        Ext.each(grid.columns,function(item,index,allitems){
            if(item.dataIndex=='idcategoricalgrouping' || item.dataIndex=='idcategory'){
                item.getEditor().setValue('');
            }
                    
         });
        var store=grid.getStore();
        var plugingrilla=grid.getPlugin();
        
         var r=Ext.create('Erp.model.almacenes.ModelCategorias', {
            idcategoryprovider : '',
            idcategory:'',
            categoryname:'',
            idcategoricalgrouping:'',
            agrupacion_categorica:'',
            active:'false'
        
        });
          
        store.insert(0, r);
         plugingrilla.startEdit(0, 0);
        
        
},
buscarCategoria :function (field,e){
            var store=field.up('grid').getStore();
            
            if(e.getKey()==13){
                    store.getProxy().extraParams.filter=field.getValue();
                    store.loadPage(1);
                
                   
            }
             
 },
mostrarColumna  : function (columns,estado,dataIndex){
    Ext.each(columns,function(item,index,allitems){
        if(item.dataIndex==dataIndex){
            item.setVisible(estado);
            
        }
    });
    
},
cambiarParamsCombo  : function (cbocategoria,alias) {
     
             switch(alias){
                    case 'marca':
                     cbocategoria.getStore().getProxy().extraParams.xaction='readmarca';
                    break;
                    case 'modelo':
                     cbocategoria.getStore().getProxy().extraParams.xaction='readmodelo';
                    break;
                    case 'rubro':
                     cbocategoria.getStore().getProxy().extraParams.xaction='readrubro';
                    break;
                    case 'familia':
                     cbocategoria.getStore().getProxy().extraParams.xaction='readfamilia';
                    break;
                    case 'categoria':
                     cbocategoria.getStore().getProxy().extraParams.xaction='readcategoriaeditor';
                    break;
                    case 'subcategoria':
                     cbocategoria.getStore().getProxy().extraParams.xaction='readsubcategoriaeditor';
                    break;
                    
                    default :
                      cbocategoria.getStore().getProxy().extraParams.xaction='readnuevacategoria'
                    break;
                    
                }
    
},
functionAgregarContacto : function (btn,e,eOpts){
        
        var grillaM=btn.up('panel');
        //console.log(grillaM);
        var storegrillaM=grillaM.getStore();
        //grillaM.modegrid='createmoneda';
        
        var plugingrillaM=grillaM.getPlugin();
        //var confEdit=grilla.getElConfig();
         var r=Ext.create('Erp.model.almacenes.proveedores.ModelContactos', {
         idprovidercontact:0,
         contactname:'',
         position:0,
         phones:0,
         movilphone:0,
         active:'true',
         idprovider:0
         
        });
        storegrillaM.insert(0, r);
        //console.log(grilla);
        plugingrillaM.startEdit(0, 0);
    },
editGridcontactos        : function (editor, e,eopts){
        var thiss=this;

        var store=e.grid.getStore();
        
        var idprovider=e.grid.getStore().getProxy().extraParams.idprovider;
        
        Ext.Ajax.request({
                url  : 'data/classes/sis_erp_provider_contact.php',
                    params : {
                    xaction   : 'updateCreateContactos',
                    idprovidercontact: e.record.data.idprovidercontact,
                    idprovider: idprovider,
                    valores : Ext.JSON.encode(editor.context.newValues) 

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
                        //e.grid.modegrid='update';
                        //thiss.mostrarColumna(e.grid.columns,false,'idcategoricalgrouping');

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
                        //e.grid.modegrid='update';
                        //thiss.mostrarColumna(e.grid.columns,false,'idcategoricalgrouping');

                }

         });
    },
    cancelEditcontactos  : function (editor, e, eOpts){
 
      if(e.record.data.idprovidercontact==0){
            e.grid.getStore().removeAt( e.rowIdx );
        }
      
}
    
    
    
    
   
});






