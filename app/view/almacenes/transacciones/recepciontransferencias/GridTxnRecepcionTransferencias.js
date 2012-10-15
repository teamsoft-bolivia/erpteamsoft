/*
 * @Autor: Max M. Jimenez tarana, Cristhian Valencia
 * @Email: maxmjt@hotmail.com, fox_tian@hotmail.com
 */

Ext.define('Erp.view.almacenes.transacciones.recepciontransferencias.GridTxnRecepcionTransferencias', {
    extend  : 'Ext.grid.Panel',
    alias   : 'widget.gridtxnrecepciontransferencias',
    title   : 'Detalle de la Transferencia',
    cls     : 'resaltarfila',
    currencyid  :-1,
    currencysimbol : '',
    height:220,
    idorigen:'',
    renderGrid:function(value,metaData,record,rowIndex,colIndex,store,view){
        var val;
        if (colIndex==3) {
            val=record.data.code;
        }else if (colIndex==4) {
            val=record.data.unitname;
        }else if (colIndex==6) {
           
            val=Ext.util.Format.currency(record.data.cost,record.data.simbolo,'3');
        }else if (colIndex==8) {
            val=Ext.util.Format.currency((record.data.transferquantity*record.data.cost)-record.data.discount,record.data.simbolo,'3');
        }else if(colIndex==9){
            val=record.data.destinationname;
        }else if(colIndex==11){
            val= (record.data.transferquantity-record.data.quantity);
        }
        
        return val;
    },
    initComponent: function() {
        var me = this;
        Erp.helper.Tools.getPrimaryCurrency(me);
        Ext.applyIf(me, {
            store:Ext.create('Erp.store.almacenes.transacciones.StoreDTxnStore',{storeid:'gridtransferencias'}),
            columns: [
                {header : '#',xtype  : 'rownumberer'},
                {header:'iddtxnstore',dataIndex: 'iddtxnstore',hidden:true},
                {header:'idtxnstore',dataIndex: 'idtxnstore',hidden:true},
                {header:'Codigo Item',dataIndex: 'iditem',width:150,renderer:this.renderGrid},
                {header:'Unidad',dataIndex: 'idunit',width:70,renderer:this.renderGrid},
                {header:'Cantidad',dataIndex: 'transferquantity',width:60},
                {header:'Costo',dataIndex: 'cost',width:70,renderer:this.renderGrid},
                {header:'Descuento',dataIndex: 'discount',width:60,hidden:true,hideable:false},
                {header:'Total',dataIndex: '',width:90,renderer:this.renderGrid},
                {header:'Almacen Destino',dataIndex: 'destinationstore',width:100,renderer:this.renderGrid,hidden:true,hideable:false},
                {header:'Recepcionado',dataIndex: 'quantity',width:80,editor:{xtype:'numberfield',hideTrigger:true}},
                {header:'Faltante',dataIndex: 'norecep',width:80,renderer:this.renderGrid},
                {header:'state',dataIndex: 'state',width:50,hidden:true}//,//,
                
            ],
            plugins:[Ext.create('Ext.grid.plugin.RowEditing',{
                        clicksToEdit:2,
                        errorSummary:false,
                        saveBtnText:'Aceptar',
                        cancelBtnText:'Cancelar'
                    })
            ],
            viewConfig: {
                
            },
            
             bbar : [
                   '->',
                    {
                        xtype   : 'label',
                        text    : 'Total Items Recepcionados: ',
                        margin  : '5',
                        cls     : 'totales'
                    },
                    {
                        xtype   : 'label',
                        text    : '',
                        margin  : '5',
                        option  : 'labelitems',
                        cls     : 'totales'
                    },'-',
                    {
                        xtype   : 'label',
                        text    : 'Total General Recepcionado: ',
                        margin  : '5',
                        cls     : 'totales'
                    },
                    {
                        xtype   : 'label',
                        text    : '',
                        margin  : '5',
                        option  : 'labeltotal',
                        cls     : 'totales'
                    },'-'
            ]
        });

        me.callParent(arguments);
    }

});