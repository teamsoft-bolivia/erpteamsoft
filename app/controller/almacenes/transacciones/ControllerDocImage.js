/*
 * @Autor: Pablo Garcia Guaman
 * @Email:garciaguamanpablo@gmail.com
 */


Ext.define('Erp.controller.almacenes.transacciones.ControllerDocImage', {
    extend: 'Ext.app.Controller',
    stores: [],
    views: ['almacenes.transacciones.compras.WindowDocImage'],

    init: function(e) {
        this.control({
            'windowdocimage':{
                afterrender:this.initAll
            },
            'windowdocimage form filefield':{
                change:this.saveForm
            }

        });
    },
    initAll:function(window,eOpts){
        var rdm=Math.random()*100;
        var field=window.down('filefield');
        rdm=Math.round(rdm);
        window.update('<a><img src="data/dataimages/transacciones/almacenes/compras/'+window.image+'?image'+rdm+'" height="100%" width="100%"></a>');
        if (window.stateMode=="E") {
            field.setDisabled(0);
        }else{
            
            field.setDisabled(1);
        }
    },

    saveForm:function(field){
        var me=this;
        var window=field.up('windowdocimage');
        var form=window.down('form');
        if (form.getForm().isValid()) {
            form.getForm().submit({
                    clientValidation: true,
                    url: 'data/classes/sis_erpd_txn_document.php',
                    params: {xaction:'save',yaction:'updateimage',iddocument:window.iddocument},
                    success:function(f,action){
                        var rdm=Math.random()*100;
                        rdm=Math.round(rdm);
                        window.update('<a><img src="data/dataimages/transacciones/almacenes/compras/'+action.result.image+'?image'+rdm+'" height="100%" width="100%"></a>');
                        Erp.helper.Tools.showMsg(action.result,true,4000);
                    },
                    failure:function(form,action){
                        Erp.helper.Tools.showMsg(action.result,true,4000);
                    }
                });
        }
    }
    
});