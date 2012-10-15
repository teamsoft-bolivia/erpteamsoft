/*
 * @Autor: Pablo Garcia Guaman
 * @Email:garciaguamanpablo@gmail.com
 */


Ext.define('Erp.controller.almacenes.transacciones.ControllerListaCompras', {
    extend: 'Ext.app.Controller',
    stores: ['almacenes.transacciones.StoreTxnStore'],
    views: ['almacenes.transacciones.compras.WindowTxnCompras',
            'almacenes.transacciones.compras.GridTxnCompras',
            'almacenes.transacciones.compras.FormTxnCompras'],
    init: function(e) {
        var thiss=this;
        
        thiss.control({
              'windowlistacompras':{
                    beforerender:this.initList
              },
              'windowlistacompras gridpanel[alias=gridlistacompras] actioncolumn':{
                  click:this.actionColumn
              },
              'windowlistacompras button[option=addCompra]':{
                  click:this.nuevaCompra
              }
              
              

        });
    },
    initList:function(window,eOpts){
        var grid=window.down('gridpanel[alias=gridlistacompras]');
        grid.getStore().getProxy().extraParams={xaction:'read',yaction:'readlist',txntype:''}
        grid.addDocked({
                        xtype       : 'pagingtoolbar',
                        store       : grid.getStore(),
                        dock        : 'bottom',
                        displayInfo : true
                     });
        grid.getStore().load();
    },
    actionColumn:function(gridview,el,rowindex,colindex,e,record){
        var m = e.getTarget().className.match(/\bicon-(\w+)\b/);
        if(m){
            switch(m[1]){
                case 'edit':
                    var editar=Ext.getCmp(record.data.idtxnstore+'cmp_i');
                    if(editar==undefined){
                    this.openWindowCompras(record,"E");
                    }else{
                        editar.show();
                    }
                break;
            }
        }

    },
    nuevaCompra:function(button){
        var nuevacompraitem=Ext.getCmp('nuevacompraitem');
        if(nuevacompraitem==undefined){
        var record=Ext.create('Erp.model.almacenes.transacciones.ModelTxnStore',{
                
        });
        record.data.responsible='';
        record.data.destinationstore='';
        this.openWindowCompras(record,"N");
        }else{
            nuevacompraitem.show();
        }
    },
    openWindowCompras:function(record,mode){
        var idasignar;
        if(mode=="N"){
            idasignar='nuevacompraitem';
        }else{
            idasignar=record.data.idtxnstore+'cmp_i';
        }
        var panel=Ext.getCmp('center-panel');
        var window=Ext.create('Erp.view.almacenes.transacciones.compras.WindowTxnCompras',{id:idasignar});
        var griddocs=Ext.create('Erp.view.almacenes.transacciones.compras.GridDocCompras',{});
        var panelform=window.down('panel[alias=contentform]');
        var paneldetail=window.down('tabpanel[alias=contentdetail]');
        var formcompras=Ext.create('Erp.view.almacenes.transacciones.compras.FormTxnCompras',{});
        var gridcompras=Ext.create('Erp.view.almacenes.transacciones.compras.GridTxnCompras',{});
        
        
        window.stateMode=mode;
        panelform.add(formcompras);
        panelform.add(griddocs);
        paneldetail.add(gridcompras);
        paneldetail.setActiveTab(gridcompras);
        panel.add(window);
        formcompras.getForm().loadRecord(record);
        window.show();
        
    }
   
});






