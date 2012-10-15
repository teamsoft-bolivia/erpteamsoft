/*
 * @Autor: Max Marcelo Jimenez Tarana
 * @Email:maxmjt@gmail.com
 */


Ext.define('Erp.controller.almacenes.transacciones.ControllerListaTransferencias', {
    extend: 'Ext.app.Controller',
    stores: [],
    views: ['almacenes.transacciones.transferencias.WindowListaTransferencias'],
    init: function(e) {
        var thiss=this;
        
        thiss.control({
              'windowlistatransferencias':{
                    beforerender:this.initList
                    
              },
              'windowlistatransferencias gridpanel[alias=gridlistatransferencias] actioncolumn':{
                  click:this.actionColumn
              },
              'windowlistatransferencias button[option=addTransferencia]':{
                  click:this.nuevaCompra
              }
                           

        });
    },
    grillalisttransfer:'',
    initList:function(window,eOpts){
        //console.log('hola');
        var me=this;
        var grid=window.down('gridpanel[alias=gridlistatransferencias]');
        grid.getStore().getProxy().extraParams={xaction:'read',yaction:'readlisttransferencias',txntype:''}
        grid.addDocked({
                        xtype       : 'pagingtoolbar',
                        store       : grid.getStore(),
                        dock        : 'bottom',
                        displayInfo : true
                     });
        grid.getStore().load();
        me.grillalisttransfer=grid;
    },
    actionColumn:function(gridview,el,rowindex,colindex,e,record){
        //console.log(gridview);
        var panelcentral=Ext.getCmp('center-panel');
        var m = e.getTarget().className.match(/\bicon-(\w+)\b/)
        if(m){
            switch(m[1]){
                case 'edit':
                    var winformgrid=panelcentral.down('windowtxntransferencias');
                    var editar=Ext.getCmp(record.data.idtxnstore+'transf_i');
                    //console.log(winformgrid);
                    //console.log(editar);
                    if(editar==undefined){
                        this.openWindowCompras(record,"E");
                        //var winformgrid=panelcentral.down('windowtxntransferencias');
                        //console.log(winformgrid);
                    }else{
                        Ext.getCmp(record.data.idtxnstore).show();
                        //this.openWindowCompras(record,"E");
                    }
                    //console.log(winformgrid);
                    //this.openWindowCompras(record,"E");
                break;
            }
        }

    },
    nuevaCompra:function(button){
        var nuevatransferenciaitem=Ext.getCmp('nuevatransferenciaitem');
        if(nuevatransferenciaitem==undefined){
        var record=Ext.create('Erp.model.almacenes.transacciones.ModelTxnStore',{
            
        });
        this.openWindowCompras(record,"N");
        }else{
            nuevatransferenciaitem.show();
        }
    },
    openWindowCompras:function(record,mode){
        var idasignar;
        if(mode=="N"){
            idasignar='nuevatransferenciaitem';
        }else{
            idasignar=record.data.idtxnstore+'transf_i';
        }
        var me=this;
        var panel=Ext.getCmp('center-panel');
        var window=Ext.create('Erp.view.almacenes.transacciones.transferencias.WindowTxnTransferencias',{listatransfer:me.grillalisttransfer,closeAction:'destroy',id:idasignar});
        //console.log(window);
        //var griddocs=Ext.create('Erp.view.almacenes.transacciones.compras.GridDocCompras',{});
        var panelform=window.down('panel[alias=contentform]');
        var paneldetail=window.down('tabpanel[alias=contentdetail]');
        var formcompras=Ext.create('Erp.view.almacenes.transacciones.transferencias.FormTxnTransferencias',{});
        
        var gridcompras=Ext.create('Erp.view.almacenes.transacciones.transferencias.GridTxnTransferencias',{});
        gridcompras.idorigen=record.data.originstore;
        //console.log(record.data.idtxnstore);
            if(record.data.originstore==0){
                record.data.originstore='';
            }
            formcompras.getForm().loadRecord(record);
            if (mode=="E") {
               gridcompras.idorigen=record.data.originstore 
            }
        
        window.stateMode=mode;
        panelform.add(formcompras);
        //panelform.add(griddocs);
        paneldetail.add(gridcompras);
        paneldetail.setActiveTab(gridcompras);
        panel.add(window);
        window.show();
    }
    /**/
   
});






