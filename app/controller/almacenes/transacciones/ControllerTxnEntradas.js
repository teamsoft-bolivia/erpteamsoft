/*
 * @Autor: Pablo Garcia Guaman, Cristhian Valencia F
 * @Email:garciaguamanpablo@gmail.com, fox_tian@hotmail.com
 */


Ext.define('Erp.controller.almacenes.transacciones.ControllerTxnEntradas', {
    extend: 'Ext.app.Controller',
    stores: ['almacenes.transacciones.StoreTxnStore',
             'almacenes.transacciones.StoreDTxnStore',
             'crm.StoreCrmEmployee',
             'StoreType'],
    
    views: ['almacenes.transacciones.entradas.WindowTxnEntradas',
            'almacenes.transacciones.entradas.FormTxnEntradas',
            'almacenes.transacciones.entradas.GridDetalleTxnEntradas'
            
            ],
  
    init: function(e) {
        
        this.control({
              'windowtxnentradas':{
                    afterrender:this.initAll,
                    beforeclose      : function (window){
                        var estado=true;
                        if(window.stateMode=='E'){
                           this.showMsg({title:'Error:',msg:'Existen operaciones pendientes en el formulario de entrada!!'},false,4000);
                           estado=false; 
                        }
                        
                        return estado;
                    }
               },
              'windowtxnentradas buttongroup button':{
                    click:this.actionButton
              },
              'formtxnentradas':{
                  deactivate:function(form){

                  },
                  dirtychange : function (form,dirty,eOpts){
                     
                      
                  }
              },
              'griddetalletxnentradas':{
                   edit         : this.editGridDetalleEntradas,
                   beforeedit   : this.beforeeditGridDetalleEntradas,
                   validateedit : this.validateeditGridDetalleEntradas,
                   canceledit   : this.canceleditGridDetalleEntradas,
                   itemdblclick : this.itemdblclick
              },
              'griddetalletxnentradas button[option=addItem]'   : {
                   click        : this.addNuevoDetalle
              }
              
              

        });
    },
    initAll:function(window,eOpts){
        
        var thiss=this; 

        var form=window.down('formtxnentradas');
        var griddetail=window.down('griddetalletxnentradas');
        var cboalmacen=form.down('combobox[name=destinationstore]');
        var cboresponsible=form.down('combobox[name=responsible]');
              
        var cboconcepto=form.down('combobox[name=concept]');
        var cboestado=form.down('combobox[name=state]');
        
       griddetail.getStore().on('load',function(){
            thiss.calculateTotals(griddetail);
        });
      
     
       
        if (window.stateMode=='E') {
            var record=form.getRecord();
            griddetail.getStore().getProxy().extraParams={xaction:'read',yaction:'readdetailentradas',idtxnstore:record.data.idtxnstore};
            griddetail.getStore().load();
            cboresponsible.getStore().getProxy().extraParams.responsible=record.data.responsible;
            cboresponsible.getStore().load();
            window.stateMode='R';
        }else{
            window.stateMode='N';
            
        }
        
        
        cboalmacen.getStore().load();
        cboconcepto.getStore().getProxy().extraParams={xaction:'readtxnentradaconcept'};
        cboconcepto.getStore().load();
        cboestado.getStore().getProxy().extraParams={xaction:'readbytype',type:'estado_txn'};
        cboestado.getStore().load();
              
        this.enableControls(window);
        this.enableButtons(window);
    },
    actionButton:function(button){
        var thiss=this;
        var window=button.up('windowtxnentradas');
        var form=window.down('formtxnentradas');
        var griddetail=window.down('griddetalletxnentradas');
      
       switch (button.option) {
            case 'btnNuevo':
                window.stateMode="N";
                this.enableButtons(window);
                this.enableControls(window);
            break;
            case 'btnEditar':
               
                if(form.down('combo[name=state]').getValue()==43){
                    window.stateMode="E";
                    this.enableButtons(window);
                    this.enableControls(window);
                }else{
                    thiss.showMsg({title:'Alerta:',msg:'Solo puede editar ingresos en REVISI&Oacute;N!!'},false,4000);
                }
                
            break;
            case 'btnGuardar':
               this.save(form,griddetail,window);
                           
            break;
            case 'btnCancelar':
                if (window.stateMode=="E") {
                    
                    if(Ext.util.Format.undef(form.getForm().getRecord())==''){
                        window.stateMode="R";
                        window.close();
                    }else{
                        window.stateMode="R";
                        form.getForm().loadRecord(form.getForm().getRecord());
                        griddetail.getStore().load();
                        this.enableButtons(window);
                        this.enableControls(window);
                    }
                }else if (window.stateMode=="N") {
                    window.stateMode="R";
                    window.close();
                }
                
                
            break;
            
            case 'btnAprobar':
                
               if(window.stateMode=='R'){
                Ext.Msg.show({
                    title : 'Confirmacion',
                    msg : 'Esta seguro de aprobar la entrada?',
                    buttons : Ext.Msg.YESNO,
                    icon : Ext.MessageBox.WARNING,
                    width : 450,
                    fn : function(btn, ev){
                        if (btn == 'yes') {
                            var idtxnstore= form.down('numberfield[name=idtxnstore]').getValue();
                            Ext.Ajax.request({
                                url  : 'data/classes/sis_erpd_txn_store.php',
                                params : {
                                xaction      : 'update',
                                yaction      : 'aprobarentrada',
                                idtxnstore  : idtxnstore

                                },
                                method : 'POST',


                                success: function(r) {
                                var result=Ext.decode(r.responseText);
                                 thiss.showMsg({title:result.title,msg:result.msg},true,4000);
                                 form.down('combobox[name=state]').setValue(44);
                               
                                 thiss.enableButtons(window);
                                 thiss.enableControls(window);
                                var storelistentradas = Ext.data.StoreManager.lookup('storeListEntradas');
                                storelistentradas.load();
                   
                                },
                                failure: function(r) {
                                    var result=Ext.decode(r.responseText);
                                    thiss.showMsg({title:result.title,msg:result.msg},false,4000);
                                }

                            });

                        }
                    }
                });
               }
                
            break;
            
            case 'btnAnular':
               
               if(window.stateMode=='R' && form.down('combobox[name=state]').getValue()==44){
                                  
                    Ext.Msg.show({
                        title : 'Confirmacion',
                        msg : 'Esta seguro de anular la entrada?',
                        buttons : Ext.Msg.YESNO,
                        icon : Ext.MessageBox.WARNING,
                        width : 450,
                        fn : function(btn, ev){
                            if (btn == 'yes') {
                                var idtxnstore= form.down('numberfield[name=idtxnstore]').getValue();
                                Ext.Ajax.request({
                                    url  : 'data/classes/sis_erpd_txn_store.php',
                                    params : {
                                    xaction      : 'update',
                                    yaction      : 'anularentrada',
                                    idtxnstore  : idtxnstore

                                    },
                                    method : 'POST',


                                    success: function(r) {
                                    var result=Ext.decode(r.responseText);
                                        thiss.showMsg({title:result.title,msg:result.msg},true,4000);
                                        var storelistentradas = Ext.data.StoreManager.lookup('storeListEntradas');
                                        storelistentradas.load();
                                        form.down('numberfield[name=idtxnstore]').setValue(45);
                                        thiss.enableButtons(window);
                                        thiss.enableControls(window);
                                       

                                    },
                                    failure: function(r) {
                                        var result=Ext.decode(r.responseText);
                                        thiss.showMsg({title:result.title,msg:result.msg},false,4000);
                                    }

                                });

                            }
                            }
                        });
               }
                
            break;
           
            default:
                break;
        }

        
    },
    enableButtons:function(window){
        var buttons=window.down('buttongroup[group=edicion]').items.items;
        var buttonstran=window.down('buttongroup[group=opciones]').items.items;
       
        var state=window.down('formtxnentradas').down('combo[name=state]').getValue();
        if (window.stateMode=='R') {
            Ext.each(buttons,function(item){
                if (item.option=='btnNuevo' || item.option=='btnEditar') {
                    item.setDisabled(0);
                }else if (item.option=='btnGuardar' || item.option=='btnCancelar') {
                    item.setDisabled(1);
                }
            });
            if(state==44){
                Ext.each(buttonstran,function(item){
                if (item.option=='btnAnular') {
                    item.setDisabled(0);
                }else{
                    item.setDisabled(1);
                }
            });
            }else if(state==45){
                Ext.each(buttonstran,function(item){
                    item.setDisabled(1);
                   
                });  
            } else {
                 Ext.each(buttonstran,function(item){
                    if (item.option=='btnAprobar') {
                        item.setDisabled(0);
                    }else if (item.option=='btnImprimir'  || item.option=='btnAnular') {
                        item.setDisabled(1);
                    }
                 });
                
            }
           
        }else if (window.stateMode=='E') {
            Ext.each(buttons,function(item){
                if (item.option=='btnGuardar' || item.option=='btnCancelar') {
                    item.setDisabled(0);
                }else if (item.option=='btnNuevo' || item.option=='btnEditar') {
                    item.setDisabled(1);
                }
            });
            
             Ext.each(buttonstran,function(item){
                if (item.option=='btnAprobar' || item.option=='btnAnular'  || item.option=='btnImprimir') {
                    item.setDisabled(1);
                   
                }
            });
        }else if (window.stateMode=='N') {
            Ext.each(buttons,function(item){
                if (item.option=='btnGuardar' || item.option=='btnCancelar') {
                    item.setDisabled(0);
                }else if (item.option=='btnNuevo' || item.option=='btnEditar') {
                    item.setDisabled(1);
                }
            });
            Ext.each(buttonstran,function(item){
                if (item.option=='btnAprobar' || item.option=='btnAnular'  || item.option=='btnImprimir') {
                    item.setDisabled(1);
                   
                }
            });
            
        }
    },
    
    enableControls:function(window){
        var formHead=window.down('formtxnentradas');
        this.enableForm(window,formHead,window.stateMode);
        this.enableGrid(window);
    },
    
    enableForm:function(window,form,stateMode){
      
        var items=form.getForm().getFields().items;
        if (stateMode=='R') {
           Ext.each(items,function(item,index,allitems){
                    item.setReadOnly(1);
           });
        }else if (stateMode=='E') {

                Ext.each(items,function(item,index,allitems){
                    if (item.name!='idtxnstore' && item.name!='correlative' && item.name!='state') {
                        item.setReadOnly(0);
                    }
                   
                });
        }else if (stateMode=='N') {

               form.getForm().reset();
               form.down('datefield[name=date]').setValue(Erp.helper.Constants.getServerDate());
               form.down('combo[name=state]').setValue(43);
               Ext.each(items,function(item,index,allitems){
                   if (item.name!='idtxnstore' && item.name!='correlative'  && item.name!='state') {
                        item.setReadOnly(0);
                   }else{
                       item.setReadOnly(1);
                   }     
                });
                
                
              
        }
    },
    enableGrid  : function(window){
       
        var grid=window.down('griddetalletxnentradas');
        if(window.stateMode=='R'){
            grid.down('button[option=addItem]').setDisabled(true);
            Ext.each(grid.columns,function (item,index,allitems){
                    if(item.dataIndex=='iditem' || item.dataIndex=='idunit' || item.dataIndex=='quantity' || item.dataIndex=='cost' ){
                        item.getEditor().setReadOnly(1);
                        item.getEditor().setDisabled(true);
                        
                    }
            });
        }else{
            if(window.stateMode=='N'){
                
                grid.getStore().removeAll();
                grid.down('label[option=labelcantidad]').setText('Total Items: 0');
                grid.down('label[option=labeltotal]').setText('Total General: 0');
            }
            grid.down('button[option=addItem]').setDisabled(false);
            Ext.each(grid.columns,function (item,index,allitems){
                    if(item.dataIndex=='iditem' || item.dataIndex=='idunit' || item.dataIndex=='quantity' || item.dataIndex=='cost' ){
                        item.getEditor().setReadOnly(0);
                        item.getEditor().setDisabled(false);
                    }
            });
            
        }
        
    },
    
    save    :    function (form,grid,window){
        var thiss=this;
        var updatedetalle=new Array();
        var insertdetalle=new Array();
        var count=0;
                
        grid.getStore().each(function(record){
            if(record.data.state=='insert' ){
                insertdetalle.push(record.data);

            }else{
                if(record.data.iddtxnstore!=0 && record.data.state=='update'){
                    updatedetalle.push(record.data);  

                }
            }
            count=count+1;
                
        });
            
        if(form.getForm().isValid() ){
            if(count==0){
                thiss.showMsg({title:'Error',msg:'No se puede crear una entrada a almacen sin detalle'},false,4000);
               
            }else{
                var idtxnstore=form.down('numberfield[name=idtxnstore]');
                var correlative=form.down('textfield[name=correlative]');
                var xaction;
                
                if (window.stateMode=='N') {
                    xaction='insert';
                }else if (window.stateMode=='E') {
                    xaction='update';
                }
            
                form.getForm().submit({
                    clientValidation    : true,
                    url     : 'data/classes/sis_erpd_txn_store.php',
                    params  : {
                            xaction:xaction,
                            yaction:'entradamercaderia',
                            updatedetalle:Ext.JSON.encode(updatedetalle),
                            insertdetalle: Ext.JSON.encode(insertdetalle)
                    },
                    success : function (form, action){
                       thiss.showMsg({title:action.result.title,msg:action.result.msg},true,4000);
                        if(window.stateMode=='N'){
                            grid.getStore().getProxy().extraParams.idtxnstore=action.result.id;
                            grid.getStore().getProxy().extraParams.yaction='readdetailentradas';
                            idtxnstore.setValue(action.result.id);
                            correlative.setValue(action.result.correlative);
                        }
                        window.stateMode='R';
                        thiss.enableButtons(window);
                        thiss.enableControls(window);
                        grid.getStore().load();
                        var storelistentradas = Ext.data.StoreManager.lookup('storeListEntradas');
                        storelistentradas.load();



                    },
                    failure : function (form,action){
                        thiss.showMsg({title:action.result.title,msg:action.result.msg},false,4000);
                     }

                });
            }
        }
        
       
    },
    addNuevoDetalle             : function (button){
     
      var grid=button.up('griddetalletxnentradas');
      var form=button.up('windowtxnentradas').down('formtxnentradas');
     
       if(!form.getForm().isValid() ){
         this.showMsg({title:'Atencion',msg:'Complete el formulario de datos basicos'},false,4000);
       }else{
            
            grid.modegrid='insert';
            var store=grid.getStore();
            var plugingrilla=grid.getPlugin();
           
            
            var r=Ext.create('Erp.model.almacenes.transacciones.ModelDTxnStore', {
                  
            });
            
            r.data.simbolo=grid.currencysimbol;
            if(Ext.util.Format.undef(plugingrilla.editing)!=''){
                 this.showMsg({title:'Atencion',msg:'Hay ediciones pendientes en el detalle de la entrada'},false,4000);
            }else{
           
                store.insert(0, r);
                grid.currentrowselected=0;
                plugingrilla.startEdit(0, 0);
                
            }
       }
      
    },
    editGridDetalleEntradas     : function (editor, e,eopts){
       
        this.calculateTotals(e.grid);
       
    },
    beforeeditGridDetalleEntradas   : function (editor,e){
         var window=e.grid.up('windowtxnentradas');
         var estado;
         if(window.stateMode=='R'){
                estado=false;
         }else{
                 if(e.record.data.iditem!=''){
                    Ext.each(e.grid.columns,function (item,index,allitems){
                                if(item.dataIndex=='iditem' || item.dataIndex=='idunit'){
                                    item.getEditor().getStore().load({params :{iditem:e.record.data.iditem}});                     
                                }
                    });
                }
                estado=true;
         }
                   
         return estado;
        
        
    },
    validateeditGridDetalleEntradas : function (editor,e){
       
                if(e.record.data.iddtxnstore==0){
                    e.record.data['state']='insert';
                    e.record.commit();
                }else{
                    e.record.data['state']='update';
                    e.record.commit();
                }
         
     
    },
    canceleditGridDetalleEntradas   : function (editor,e){
     
        if(e.record.data.state=='new'){
                e.store.removeAt(e.rowIdx);       

            }
      
        
        
        
    },
     showMsg:function(oOpts,confirm,time){
        var tipomsg;
        if(confirm)tipomsg='ux-notification-icon-information';
        else tipomsg='ux-notification-icon-error';
        Ext.create('widget.uxNotification', {
                        title: oOpts.title,
                        position: 'tr',
                        manager: 'instructions',
                        cls: 'ux-notification-light',
                        iconCls: tipomsg,
                        html: oOpts.msg,
                        autoHideDelay: time,
                        slideBackDuration: 500,
                        slideInAnimation: 'bounceOut',
                        slideBackAnimation: 'easeIn'
         }).show();
    },
    calculateTotals:function(grid){
       
       var labelItems=grid.down('label[option=labelcantidad]');
       var labelTotal=grid.down('label[option=labeltotal]');
       var store=grid.getStore();
       var costo=0;
       var quantity=0;
       store.each(function(record){
           
           
           costo+=(record.data.cost*record.data.quantity);
           quantity+=record.data.quantity;
        
       });
      
       labelItems.setText('Total Items: '+quantity);
       labelTotal.setText('Total General: '+Ext.util.Format.currency(costo,grid.currencysimbol));
   
    },
    itemdblclick : function (view,record,item,index,e,eOpts ){
        var grid = view.up('griddetalletxnentradas');
        grid.currentrowselected=index;
       
    }
   
});