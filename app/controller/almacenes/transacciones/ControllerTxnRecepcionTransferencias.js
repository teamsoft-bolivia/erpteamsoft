/*
 * @Autor: Max M. Jimenez Tarana
 * @Email: maxmjt@gmail.com
 */


Ext.define('Erp.controller.almacenes.transacciones.ControllerTxnRecepcionTransferencias', {
    extend: 'Ext.app.Controller',
    stores: ['almacenes.transacciones.StoreTxnStore',
             'almacenes.transacciones.StoreDTxnStore',
             'crm.StoreCrmEmployee',
             'StoreType'],
    views: ['almacenes.transacciones.recepciontransferencias.WindowTxnRecepcionTransferencias',
            'almacenes.transacciones.recepciontransferencias.GridTxnRecepcionTransferencias',
            'almacenes.transacciones.recepciontransferencias.FormTxnRecepcionTransferencias'
        ],
        
   
    init: function(e) {
        
        this.control({
              'windowtxnrecepciontransferencias':{
                    afterrender:this.initAll    
              },
              'windowtxnrecepciontransferencias buttongroup button':{
                    click:this.actionButton
              },
              
              'formtxnrecepciontransferencias':{
                  deactivate:function(form){

                  }
              },
              'gridtxnrecepciontransferencias':{
                    beforeedit:function(editor,e,eOpts){
                        var window=e.grid.up('windowtxnrecepciontransferencias');
                        var res=true;
                        if(window.stateMode=='R'){
                            res=false;
                        }
                        return res;
                    },
                    validateedit:function(editor,e,eOpts){
                         e.record.data['state']='update';
                         e.record.commit();
                    },
                    canceledit:function(editor,e,eOpts){},
                    edit: function(editor,e,eOpts){
                        e.record.data['state']='update';
                        this.calculateTotals(e.grid.up('windowtxnrecepciontransferencias'));
                    }
              }
              
              

        });
    },
    initAll:function(window,eOpts){
        
        var me=this;
        var record=window.down('formtxnrecepciontransferencias').getRecord();
        var cboalmacen=window.down('combobox[name=destinationstore]');
        var cboresponsible=window.down('combobox[name=responsible]');
        var cboestado=window.down('combobox[name=state]');
        var griddetail=window.down('gridtxnrecepciontransferencias');
        
        var fecha=window.down('datefield[name=date]');
        var txntype=window.down('numberfield[name=txntype]');
        var estado=window.down('combobox[name=state]');
       
        
        griddetail.getStore().getProxy().extraParams={xaction:'read',yaction:'readdetailrecepciontransferencias',idtxnstore:record.data.idtxnstore};
        griddetail.getStore().load();
        cboresponsible.getStore().getProxy().extraParams.responsible=record.data.responsible;
        cboresponsible.getStore().load();
        cboestado.getStore().getProxy().extraParams={xaction:'readbytype',type:'estado_txn'};
        cboestado.getStore().load();
        cboalmacen.getStore().getProxy().extraParams={xaction:'readalmacenusuario'};
        cboalmacen.getStore().load();
        this.enableButtons(window);
        this.enableControls(window);
        
        griddetail.getStore().on('load',function(){
            me.calculateTotals(window);
        });
        
    },
    actionButton:function(button){
        var me=this;
        var window=button.up('windowtxnrecepciontransferencias');
        var form=window.down('formtxnrecepciontransferencias');
        switch (button.option) {
            
            case 'btnRecepcionar':
                if (window.stateMode=="T") {
                    Ext.MessageBox.confirm('Alerta:', 'Esta seguro Aprobar este documento??.', 
                            function(option){
                                if (option=='yes') {
                                    me.saveTxn(window,'recepcionartransferencia');
                                                                  
                                }else{
                                    form.down('combobox[name=state]').setValue(86);
                                }
                            });
                    
                }
            break;
             case 'btnRechazar':
                if (window.stateMode=="T") {
                    Ext.MessageBox.confirm('Alerta:', 'Esta seguro Rechazar este documento??.', 
                            function(option){
                                if (option=='yes') {
                                     me.saveTxn(window,'rechazartransferencia');
                                   
//                                  
                                }else{
                                    form.down('combobox[name=state]').setValue(86);
                                }
                            });
                    
                }
            break;
            
            default:
                break;
        }

        
    },
    saveTxn:function(window,operacion){
        
       
        var thiss=this;
        var cont=0;
        var formtxn=window.down('formtxnrecepciontransferencias');
        var gridtxn=window.down('gridtxnrecepciontransferencias');//
        var updatedatadetail=new Array ();
        if (window.stateMode=="T") {
           
            if(operacion=='recepcionartransferencia'){
                gridtxn.getStore().each(function(record){
                    if(record.data.state=='update'){
                        updatedatadetail.push(record.data);
                    cont++;
                    }
                });
            }
            var idtxnstore=formtxn.down('numberfield[name=idtxnstore]');
          
            if (formtxn.getForm().isValid()) {
                var yaction=operacion;
                                               
                formtxn.getForm().submit({
                    clientValidation: true,
                    url: 'data/classes/sis_erpd_txn_store.php',
                    params: { xaction:'update',yaction: yaction,idtxnstore:idtxnstore,updatedatadetail:Ext.encode(updatedatadetail)},
                    success:function(form,action){
                        var result=Ext.decode(action.response.responseText);
                        var panelcentral=Ext.getCmp('center-panel');
                        var winlista=panelcentral.down('windowlistarecepciontransferencias');
                        winlista.items.items[0].getStore().load();
                        gridtxn.getStore().load();
                        Erp.helper.Tools.showMsg(result,true,4000);
                        if(operacion=='recepcionartransferencia'){
                             formtxn.down('combobox[name=state]').setValue(87);
                        }else if(operacion=='rechazartransferencia'){
                              formtxn.down('combobox[name=state]').setValue(88);
                        }
                       
                        thiss.enableButtons(window);
                       
                    },
                    failure:function(form,action){
                        switch (action.failureType) {
                            case Ext.form.action.Action.CLIENT_INVALID:
                                Ext.Msg.alert('Failure', 'Form fields may not be submitted with invalid values');
                                break;
                            case Ext.form.action.Action.CONNECT_FAILURE:
                                Ext.Msg.alert('Failure', 'Ajax communication failed');
                                break;
                            case Ext.form.action.Action.SERVER_INVALID:
                                var result=Ext.decode(action.response.responseText);
                                Erp.helper.Tools.showMsg(result,false,4000);
                            break;
                    }

                    }
                });
            }else{
                Erp.helper.Tools.showMsg({title:'Error',msg:'Complete el formulario'},false,4000);
               
            }
         }else{
               Erp.helper.Tools.showMsg({title:'Error',msg:'Las Ediciones solo puede efectuarse cuando el estado es: EN TRANSITO'},false,4000);
         }
      
    },
    showMsg:function(oOpts){
        Ext.create('widget.uxNotification', {
                        title: oOpts.title,
                        position: 'tr',
                        manager: 'instructions',
                        cls: 'ux-notification-light',
                        iconCls: 'ux-notification-icon-information',
                        html: oOpts.msg,
                        autoHideDelay: 4000,
                        slideBackDuration: 500,
                        slideInAnimation: 'bounceOut',
                        slideBackAnimation: 'easeIn'
         }).show();
    },
    enableButtons:function(window){
        
        var buttonstran=window.down('buttongroup[group=opciones]').items.items;
        var cboestado=window.down('combobox[name=state]');
         if(cboestado.getValue()!=86){
            window.stateMode='R';
            Ext.each(buttonstran,function(item){
                if (item.option=='btnRecepcionar' || item.option=='btnRechazar') {
                    item.setDisabled(1);
                }else if (item.option=='btnImprimir'  || item.option=='btnRechazar') {
                    item.setDisabled(0);
                }
            });
              
              
        }else{
              window.stateMode='T';
              Ext.each(buttonstran,function(item){
                 item.setDisabled(0);
              
            });
        }
        
    },
    
    enableControls:function(window){
        var formHead=window.down('formtxnrecepciontransferencias');
        var items=formHead.getForm().getFields().items;
            Ext.each(items,function(item,index,allitems){
                   item.setReadOnly(1);
            });
        
    },
   
   rechazarTxn:function(window,form){
          
          var idformcab=form.down('numberfield[option=cabeceraid]');
          var idtxnstore=idformcab.getValue();
          Ext.Ajax.request({
                    url  : 'data/classes/sis_erpdd_txn_store.php',
                     params : {
                       xaction   : 'update',
                       yaction   : 'updateCabeceraTransferenciaAprobado',
                       idtxnstore: idtxnstore//,
                       //valores : Ext.JSON.encode(editor.context.newValues) 
                       //valoresraiz : Ext.JSON.encode(changes.record.data)

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
                        //store.load();

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
                     }

                    });
      },
     
    calculateTotals:function(window){
       var grid=window.down('gridtxnrecepciontransferencias');
       //var grid=this.getGridTxnCompras();
       var labelItems=grid.down('label[option=labelitems]');
       var labelTotal=grid.down('label[option=labeltotal]');
       var store=grid.getStore();//Ext.data.StoreManager.lookup('storedtxnstore');
       var costo=0;
       var quantity=0;
       store.each(function(record){

           costo+=(record.data.cost*record.data.quantity)-record.data.discount;
           quantity+=record.data.quantity;

       });
       labelTotal.setText(Ext.util.Format.currency(costo,grid.currencysimbol));
       labelItems.setText(quantity);
       
    }
   
});