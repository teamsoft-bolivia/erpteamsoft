/*
 * @Autor: Max Marcelo Jimenez Tarana, Cristhian Valencia 
 * @Email:maxmjt@gmail.com, fox_tian@hotmail.com
 */


Ext.define('Erp.controller.almacenes.transacciones.ControllerListaRecepcionTransferencias', {
    extend: 'Ext.app.Controller',
    stores: [],
    views: ['almacenes.transacciones.recepciontransferencias.WindowListaRecepcionTransferencias'],
    init: function(e) {
        var thiss=this;
        
        thiss.control({
              'windowlistarecepciontransferencias':{
                    beforerender:this.initList
                    
              },
              'windowlistarecepciontransferencias gridpanel[alias=gridlistatransferencias] actioncolumn':{
                  click:this.actionColumn
              }
                           

        });
    },
    initList:function(window,eOpts){
        //console.log('hola');
        var grid=window.down('gridpanel[alias=gridlistatransferencias]');
        grid.getStore().getProxy().extraParams={xaction:'read',yaction:'readlistrecepciontransferencias',txntype:''}
        grid.addDocked({
                        xtype       : 'pagingtoolbar',
                        store       : grid.getStore(),
                        dock        : 'bottom',
                        displayInfo : true
                     });
        grid.getStore().load();
    },
    actionColumn:function(gridview,el,rowindex,colindex,e,record){
       
        var m = e.getTarget().className.match(/\bicon-(\w+)\b/)
        if(m){
            switch(m[1]){
                case 'edit':
                    var editar=Ext.getCmp(record.data.idtxnstore+'recep_i');
                    if(editar==undefined){
                    this.openWindowRecepcion(record,"E");
                    }else{
                        editar.show();
                    }
                break;
            }
        }

    },
    
    openWindowRecepcion:function(record,mode){
        var idasignar;
        if(mode=="N"){
            idasignar='nuevarecepcionitem';
        }else{
            idasignar=record.data.idtxnstore+'recep_i';
        }
        var panel=Ext.getCmp('center-panel');
        var window=Ext.create('Erp.view.almacenes.transacciones.recepciontransferencias.WindowTxnRecepcionTransferencias',{id:idasignar});
        var panelform=window.down('panel[alias=contentform]');
        var paneldetail=window.down('tabpanel[alias=contentdetail]');
        var formrecepcion=Ext.create('Erp.view.almacenes.transacciones.recepciontransferencias.FormTxnRecepcionTransferencias',{});
        
        var gridrecepcion=Ext.create('Erp.view.almacenes.transacciones.recepciontransferencias.GridTxnRecepcionTransferencias',{});
        gridrecepcion.idorigen=record.data.destinationstore;
       
        formrecepcion.getForm().loadRecord(record);
       
        window.stateMode=mode;
        panelform.add(formrecepcion);
       
        paneldetail.add(gridrecepcion);
        paneldetail.setActiveTab(gridrecepcion);
        panel.add(window);
        window.show();
    }
   
   
});






