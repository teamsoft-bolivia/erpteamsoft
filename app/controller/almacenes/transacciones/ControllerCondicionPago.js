/*
 * @Autor: Pablo Garcia Guaman
 * @Email:garciaguamanpablo@gmail.com
 */


Ext.define('Erp.controller.almacenes.transacciones.ControllerCondicionPago', {
    extend: 'Ext.app.Controller',
    stores: [],
    views: ['almacenes.transacciones.compras.WindowCondicionPago'],

    init: function(e) {
        this.control({
            'windowcondicionpago':{
                afterrender:this.initAll
            },
            'windowcondicionpago buttongroup button':{
                click:this.actionButton
            },
            'windowcondicionpago radiogroup radiofield':{
                change:function(radio,newVal,oldVal,eOpts){
                    var win=radio.up('windowcondicionpago');
                    var form=radio.up('form');
                    var cantidad=form.down('numberfield[name=conditionquantity]');
                    var interes=form.down('numberfield[name=conditioninterest]');
                    var interesmora=form.down('numberfield[name=interestlate]');
                    var lapso=form.down('numberfield[name=lapsebeforeinterest]');
                    if (radio.checked && win.stateMode=="E") {
                        /*switch(radio.inputValue){
                            case 'dia':
                             
                            break;
                            default:
                              
                            break;
                        
                        }*/
                        cantidad.setValue('');
                        interes.setValue('');
                        interesmora.setValue('');
                        lapso.setValue('');
                    }
                    
                }
            }
        });
    },
    initAll:function(window,eOpts){
        var grid=window.down('gridpanel');
        var monto=window.down('numberfield[name=amount]');
        monto.setValue(window.totaldoc);
        this.enableButtons(window);
        this.enableControls(window);
        grid.getStore().load();
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