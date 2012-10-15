/*
 * @Autor: Pablo Garcia guaman, Cristhian Valencia
 * @Email: garcia_guaman_pablo@hotmail.com, fox_tian@hotmail.com
 */

Ext.define('Erp.view.almacenes.kardex.GridDetalleMovimientoItem', {
    extend      : 'Ext.grid.Panel',
    alias       : 'widget.griddetallemovimientoitem',
    title       : 'Detalle de Movimientos',
    height      : 330,
    currentrowselected : -1,
    currencyid  :-1,
    currencysimbol : '',
    autoScroll  : true,
    modegrid    : 'update',
    columnLines : true,
    cls         : 'resaltarfila',
    
        
    initComponent: function() {
        var me = this;
        //Erp.helper.Tools.getPrimaryCurrency(me);
        
//        var fields=[
//                { name: 'iddtxnstore', type: 'int'},
//                { name: 'correlative', type: 'int'},
//                { name: 'date'},
//                { name: 'concept'},
//                { name: 'conceptname'},
//                { name: 'responsable'},
//                { name: 'responsablename'},
//                { name: 'txntype', type: 'int'},
//                { name: 'quantity', type: 'int'},
//                { name: 'ingreso', type:'int'},
//                { name: 'salida', type:'int'},
//                { name: 'cost'},
//                { name: 'ingresos', type:'int'},
//                { name: 'egresos', type:'int'},
//                { name: 'saldo', type:'int'},
//                { name: 'saldovalorado', type:'int'}
//               
//           ];
//        var modelokardex=Ext.create('Erp.model.almacenes.transacciones.ModelDTxnStore',{
//            fields:fields
//        });
       // modelokardex.setFields(fields);
        var store=Ext.create('Erp.store.almacenes.kardex.StoreDetalleKardex',{
               
                remoteFilter:true
        });
        
        Ext.applyIf(me, {
            store:store,
            columns: [
//                {
//                    header : '#',
//                    xtype  : 'rownumberer'
//                },
                {
                    xtype       : 'numbercolumn',
                    dataIndex   : 'iddtxnstore',
                    width       : 70,
                    text        : 'iddtxnstore',
                    hidden      : true,
                    hideable   : false
                    
                },
                 {
                    xtype       : 'gridcolumn',
                    dataIndex   : 'correlative',
                    width       : 50,
                    text        : 'Nro',
                    align       : 'center',
                    hidden      : false,
                    sortable    : false,
                    locked      : true
                },
                {
                    //xtype: 'datecolumn',
                    dataIndex: 'date',
                    width   : 80,
                    header: 'Fecha',
                    sortable    : false,
                    renderer    : function (value){
                        
                        var res='';
                        var arraySplited=value.split('-');
                        res+=arraySplited[2]+'-'+arraySplited[1]+'-'+arraySplited[0];
                        
                        return res;
                    
                }, 
                    locked      : true
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'conceptname',
                    width   : 150,
                    text: 'Concepto',
                    sortable    : false,
                    locked      : true
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'responsablename',
                    width   : 120,
                    text: 'Responsable',
                    sortable    : false,
                    locked      : true
                },
                {
                    xtype: 'numbercolumn',
                    dataIndex: 'quantity',
                    flex: 1,
                    text: 'Cantidad',
                    hidden : true
                },
                {
                    text    : 'Fisico',
                    columns :[
                        {
                            xtype: 'numbercolumn',
                            dataIndex: 'ingreso',
                            width   : 95,
                            format:'0,000.00',
                            text: 'Ingreso'
                        },
                        {
                            xtype: 'numbercolumn',
                            dataIndex: 'salida',
                            width   : 95,
                            format:'0,000.00',
                            text: 'Salida'
                        },
                        {
                            xtype       : 'numbercolumn',
                            dataIndex   : 'saldo',
                            width       : 95,
                            format      :'0,000.00',
                            text        : 'Saldo'
                        }
                    ]
                },
                {
                            xtype: 'numbercolumn',
                            dataIndex: 'cost',
                            width   : 70,
                            renderer: Ext.util.Format.usMoney,
                            text: 'Costo'
                },
                {
                    text    : 'Valorado',
                    columns :[
                                {
                                    xtype       : 'numbercolumn',
                                    dataIndex   : 'ingresos',
                                    width       : 100,
                                    renderer    : function(value,metaData,record,rowIndex,colIndex,store,view){ return Ext.util.Format.currency(record.data.ingresos,'$','3');},
                                    text        : 'Ingresos'
                                },
                                {
                                    xtype       : 'numbercolumn',
                                    dataIndex   : 'egresos',
                                    renderer    : function(value,metaData,record,rowIndex,colIndex,store,view){ return Ext.util.Format.currency(record.data.egresos,'$',3);},
                                    width       : 100,
                                    text        : 'Egresos'
                                },
                                {
                                    xtype       : 'numbercolumn',
                                    dataIndex   : 'saldovalorado',
                                    width       : 100,
                                    renderer    : function(value,metaData,record,rowIndex,colIndex,store,view){ return Ext.util.Format.currency(record.data.saldovalorado,'$',3);},
                                    text        : 'Saldo Valorado'
                                }
                    ]
                }
            ],
            viewConfig: {
                stripeRows: true
            },
            tbar:[ {
                                    xtype: 'button',
                                    text: 'Imprimir',
                                    iconCls:'btnimprimir',
                                    option:'btnImprimir',
                                    border: 1,
                                    style: {
                                        borderColor: 'blue',
                                        borderStyle: 'solid'
                                    }
                    },'->',
                    {
                        xtype   : 'label',
                        text    : 'Saldo Fisico Anterior: ',
                        margin  : '5',
                        option  : 'labelsaldoanterior',
                        cls     : 'totales'
                    },{
                        xtype   : 'label',
                        text    : '0',
                        margin  : '5',
                        option  : 'saldoanterior',
                        cls     : 'totales'
                    },'-',
                    {
                        xtype   : 'label',
                        text    : 'Saldo Valorado Anterior: ',
                        margin  : '5',
                        option  : 'labelsaldovaloradoanterior',
                        cls     : 'totales'
                    },{
                        xtype   : 'label',
                        text    : '0',
                        margin  : '5',
                        option  : 'saldovaloradoanterior',
                        cls     : 'totales'
                    },'-'
            ],
            bbar : [
                   '->',
                    {
                        xtype   : 'label',
                        text    : 'Saldo Fisico: ',
                        margin  : '5',
                        option  : 'labelsaldo',
                        cls     : 'totales'
                    },{
                        xtype   : 'label',
                        text    : '0 ',
                        margin  : '5',
                        option  : 'saldo',
                        cls     : 'totales'
                    },'-',
                    {
                        xtype   : 'label',
                        text    : 'Saldo Valorado: ',
                        margin  : '5',
                        option  : 'labelsaldo',
                        cls     : 'totales'
                    },{
                        xtype   : 'label',
                        text    : '0 ',
                        margin  : '5',
                        option  : 'saldovalorado',
                        cls     : 'totales'
                    },'-'
            ]
        });

        me.callParent(arguments);
    }

});