/*
 * @Autor: Pablo Garcia Guaman, Cristhian Valencia
 * @Email:garciaguamanpablo@gmail.com, fox_tian@hotmail.com
 */


Ext.define('Erp.controller.almacenes.transacciones.ControllerListaEntradas', {
    extend: 'Ext.app.Controller',
    stores: ['almacenes.transacciones.StoreTxnStore'],
    views: ['almacenes.transacciones.entradas.WindowTxnEntradas',
            'almacenes.transacciones.entradas.FormTxnEntradas',
            'almacenes.transacciones.entradas.GridDetalleTxnEntradas'
            
            ],
    init: function(e) {
        var thiss=this;
        
        thiss.control({
              'windowlistaentradas':{
                    beforerender:this.initList
                    
              },
              'windowlistaentradas gridpanel[alias=gridlistaentradas] actioncolumn':{
                  click:this.actionColumn
              },
              'windowlistaentradas button[option=addEntrada]':{
                  click:this.nuevaEntrada
              }
              
              

        });
    },
    initList:function(window,eOpts){
        var grid=window.down('gridpanel[alias=gridlistaentradas]');
        grid.getStore().getProxy().extraParams={xaction:'read',yaction:'readlistentradas',txntype:''}
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
                    var editar=Ext.getCmp(record.data.idtxnstore+'enter_i');
                    if(editar==undefined){
                    this.openWindowEntradas(record,"E");
                    }else{
                        editar.show();
                    }
                break;
            }
        }

    },
    nuevaEntrada:function(button){
        var nuevaentradaitem=Ext.getCmp('nuevaentradaitem');
        if(nuevaentradaitem==undefined){
        var record=Ext.create('Erp.model.almacenes.transacciones.ModelTxnStore',{
            
        });
        this.openWindowEntradas(record,"N");
        }else{
            nuevaentradaitem.show();
        }
    },
    openWindowEntradas:function(record,mode){
        var idasignar;
        if(mode=="N"){
            idasignar='nuevaentradaitem';
        }else{
            idasignar=record.data.idtxnstore+'enter_i';
        }
        var panel=Ext.getCmp('center-panel');
        var window=Ext.create('Erp.view.almacenes.transacciones.entradas.WindowTxnEntradas',{id:idasignar});
        var panelform=window.down('panel[alias=contentform]');
        var paneldetail=window.down('tabpanel[alias=contentdetail]');
        var formentradas=Ext.create('Erp.view.almacenes.transacciones.entradas.FormTxnEntradas',{});
        var fecha=formentradas.down('datefield[name=date]');
      
        fecha.setValue(Erp.helper.Constants.getServerDate());
        
        var griddetalleentradas=Ext.create('Erp.view.almacenes.transacciones.entradas.GridDetalleTxnEntradas',{});
        if (mode=="E") {
            formentradas.getForm().loadRecord(record);
          
        }
        
        window.stateMode=mode;
        panelform.add(formentradas);
        paneldetail.add(griddetalleentradas);
        paneldetail.setActiveTab(griddetalleentradas);
        panel.add(window);
        window.show();
    }
    
   
});






