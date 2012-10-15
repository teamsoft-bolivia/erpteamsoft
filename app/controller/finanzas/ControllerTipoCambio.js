/*
 * @Autor: Pablo Garcia Guaman
 * @Email:garciaguamanpablo@gmail.com
 */
Ext.define('Erp.controller.finanzas.ControllerTipoCambio', {
    extend: 'Ext.app.Controller',
    stores: [
        'finanzas.StoreMoneda',
        'finanzas.StoreTipoCambio'
    ],
    views: ['finanzas.WindowTipoCambio'],
    
    init: function(e) {
        this.control({
            'windowtipocambio':{
                afterrender:this.initAll
            },
            
            'windowtipocambio gridpanel[grid=moneda]':{
                itemclick:function(view,record,htmlItem,index,e,eOpts){
                    var window=view.up('windowtipocambio');
                    var gridtc=window.down('gridpanel[grid=tipocambio]');
                    
                    if (record.data.value!='11') {
                        gridtc.first=false;
                    }else{
                        gridtc.first=true;
                        //Erp.helper.Tools.showMsg({title:'Alerta:',msg:'La Moneda Principal no nesecita tipo de cambio'},false,4000);
                        
                    }
                    gridtc.moneda=record.data.idtype;
                    gridtc.getStore().getProxy().extraParams.currency=record.data.idtype;
                    gridtc.getStore().load();
                }
            },
            'windowtipocambio gridpanel[grid=tipocambio]':{
                itemdblclick:function(view,record,htmlItem,index,e,eOpts){
                    var gridtc=view.up('gridpanel[grid=tipocambio]');
                    gridtc.stateEdit="E";
                },
                beforeedit:function(editor,e,eOpts){
                    var action;
                    if (e.grid.first) {
                        action=false;
                    }else{
                        action=true;
                    }
                    return action;
                },
                validateedit:function(editor,e,eOpts){
                        var me=this;
                        var changes=e.newValues;
                        changes.xaction='save';
                        if (e.grid.stateEdit=='E') {
                            changes.yaction='update';
                        }else if (e.grid.stateEdit=='N')
                        {   
                            changes.yaction='insert';
                        }

                        Ext.Ajax.request({
                            url  : 'data/classes/sis_erp_exchange_rate.php',
                            params : changes,
                            method : 'POST',
                            success: function(response) {
                                var result=Ext.decode(response.responseText);
                                
                                if (result.success) {
                                    Erp.helper.Tools.showMsg(result,true,4000);
                                    e.grid.getStore().load();
                                }else{
                                    Erp.helper.Tools.showMsg(result,false,4000);
                                    e.grid.getStore().load();
                                }
                            },
                            failure: function(response) {
                               
                            }

                        });
                    
                },
                canceledit:function(editor,e,eOpts){
                    if (e.grid.stateEdit=="N") {
                            e.grid.getStore().removeAt(e.rowIdx);
                        }
                }
            },
            'windowtipocambio gridpanel[grid=tipocambio] button[option=addtc]':{
                click:function(button){
                    var gridtc=button.up('gridpanel[grid=tipocambio]');
                    gridtc.stateEdit="N";
                    var record=Ext.create('Erp.model.finanzas.ModelTipoCambio',{
                        
                    });

                        if (gridtc.moneda!=0 && !gridtc.first) {
                            record.data.currency=gridtc.moneda;
                            record.data.amount='';

                            gridtc.getStore().insert(0,record);
                            gridtc.getPlugin().startEdit(0,0);
                        }else{
                            Erp.helper.Tools.showMsg({title:'Alerta:',msg:'No se puede agregar Tipo de Cambio a una moneda Principal!!!'},false,4000);
                        }
                }
            }
        });
    },
    initAll:function(window,eOpts){
        var gridmoneda=window.down('gridpanel[grid=moneda]');
        gridmoneda.getStore().load();
    },
    actionButton:function(button){
        var me=this;
        var window=button.up('windowcondicionpago');
        var form=window.down('form');
        switch(button.option){
            case 'btnGuardar':
                this.saveForm(window);
            break;
            case 'btnEditar':
                window.stateMode="E";
                me.enableButtons(window);
                me.enableControls(window);
            break;
            case 'btnCancelar':
                window.stateMode="R";
                form.getForm().loadRecord(form.getForm().getRecord());
                me.enableButtons(window);
                me.enableControls(window);
            break;
        }
    },
    saveForm:function(window){
        var me=this;
        var form=window.down('form');
        var grid=window.down('gridpanel');
        var iddoc=form.down('numberfield[name=iddocument]');
        if (form.getForm().isValid()) {
            form.getForm().submit({
                    clientValidation: true,
                    url: 'data/classes/sis_erpd_txn_document.php',
                    params: {xaction:'save',yaction:'updatecondition',iddocument:iddoc.getValue()},
                    success:function(f,action){
                        
                        Erp.helper.Tools.showMsg(action.result,true,4000);
                        grid.getStore().load();
                        window.stateMode="R";
                        me.enableButtons(window);
                        me.enableControls(window);
                        form.getForm().updateRecord();
                    },
                    failure:function(form,action){
                        Erp.helper.Tools.showMsg(action.result,true,4000);
                    }
                });
        }
    },
     enableButtons:function(window){
        var me=this;
        var buttons=window.down('buttongroup[group=edicion]').items.items;
        if (window.stateMode=='R') {
            Ext.each(buttons,function(item){
                if (item.option=='btnNuevo' || item.option=='btnEditar') {
                    item.setDisabled(0);
                }else if (item.option=='btnGuardar' || item.option=='btnCancelar') {
                    item.setDisabled(1);
                }
            });

        }else if (window.stateMode=='E') {
            Ext.each(buttons,function(item){
                if (item.option=='btnGuardar' || item.option=='btnCancelar') {
                    item.setDisabled(0);
                }else if (item.option=='btnNuevo' || item.option=='btnEditar') {
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

        }
    },
    
    enableControls:function(window){
        var formHead=window.down('form');
        this.enableForm(window,formHead,window.stateMode);
    },
    
    enableForm:function(window,form,stateMode){
        var items=form.getForm().getFields().items;

        if (stateMode=='R') {
           Ext.each(items,function(item,index,allitems){
                    item.setReadOnly(1);
           });
        }else if (stateMode=='E') {
                Ext.each(items,function(item,index,allitems){
                    if (item.name!='amount') {
                        item.setReadOnly(0);
                    } 
                });
        }else if (stateMode=='N') {
               form.getForm().reset();
               Ext.each(items,function(item,index,allitems){
                        item.setReadOnly(0); 
                });
        }
    }
    
});