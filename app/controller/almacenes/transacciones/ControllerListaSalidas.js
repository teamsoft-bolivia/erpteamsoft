/*
 * @Autor: Pablo Garcia Guaman, Cristhian Valencia
 * @Email:garciaguamanpablo@gmail.com, fox_tian@hotmail.com
 */


Ext.define('Erp.controller.almacenes.transacciones.ControllerListaSalidas', {
    extend: 'Ext.app.Controller',
    stores: ['almacenes.transacciones.StoreTxnStore'],
    views: ['almacenes.transacciones.salidas.WindowTxnSalidas'/*,
            'almacenes.transacciones.compras.GridTxnCompras',
            'almacenes.transacciones.compras.FormTxnCompras'
            */],
    init: function(e) {
        var thiss=this;
        
        thiss.control({
              'windowlistasalidas':{
                    beforerender:this.initList
                    
              },
              'windowlistasalidas gridpanel[alias=gridlistasalidas] actioncolumn':{
                  click:this.actionColumn
              },
              'windowlistasalidas button[option=addSalida]':{
                  click:this.nuevaCompra
              }
              
              

        });
    },
    grillalisttransfer:'',
    initList:function(window,eOpts){
        var me=this;
        var grid=window.down('gridpanel[alias=gridlistasalidas]');
        grid.getStore().getProxy().extraParams={xaction:'read',yaction:'readlistsalidas',txntype:''}
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
        var m = e.getTarget().className.match(/\bicon-(\w+)\b/)
        if(m){
            switch(m[1]){
                case 'edit':
                    //console.log('saa');
                    var editar=Ext.getCmp(record.data.idtxnstore+'sal_i');
                    if(editar==undefined){
                        this.openWindowCompras(record,"E");
                        
                    }else{
                       Ext.getCmp(record.data.idtxnstore).show(); 
                    }
                    //this.openWindowCompras(record,"E");
                break;
            }
        }

    },
    nuevaCompra:function(button){
        var nuevasalidaitem=Ext.getCmp('nuevasalidaitem');
        if(nuevasalidaitem==undefined){
        var record=Ext.create('Erp.model.almacenes.transacciones.ModelTxnStore',{
            
        });
        record.data.concept='';
        this.openWindowCompras(record,"N");
        }else{
            nuevasalidaitem.show();
        }
    },
    openWindowCompras:function(record,mode){
        //console.log('hola');
        var idasignar;
        if(mode=="N"){
            idasignar='nuevasalidaitem';
        }else{
            idasignar=record.data.idtxnstore+'sal_i';
        }
        var me=this;
        var panel=Ext.getCmp('center-panel');
        var window=Ext.create('Erp.view.almacenes.transacciones.salidas.WindowTxnSalidas',{listatransfer:me.grillalisttransfer,closeAction:'destroy',id:idasignar});
        /*
        var griddocs=Ext.create('Erp.view.almacenes.transacciones.compras.GridDocCompras',{});*/
        var panelform=window.down('panel[alias=contentform]');
        var paneldetail=window.down('tabpanel[alias=contentdetail]');
        var formcompras=Ext.create('Erp.view.almacenes.transacciones.salidas.FormTxnSalidas',{});
        var gridcompras=Ext.create('Erp.view.almacenes.transacciones.salidas.GridTxnSalidas',{});
        //if (mode=="E") {
            if(record.data.originstore==0){
                record.data.originstore='';
            }
            formcompras.getForm().loadRecord(record);
            if (mode=="E") {
               gridcompras.idorigen=record.data.originstore 
            }
        //console.log(record.data.originstore);
        window.stateMode=mode;
        panelform.add(formcompras);
        //panelform.add(griddocs);
        paneldetail.add(gridcompras);
        paneldetail.setActiveTab(gridcompras);
        
        panel.add(window);
        window.show();
    }
    
   
});






