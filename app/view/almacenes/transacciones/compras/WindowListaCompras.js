/*
 * @autor:Pablo Garcia Guaman
 */
Ext.define('Erp.view.almacenes.transacciones.compras.WindowListaCompras', {
    extend          : 'Ext.window.Window',
    alias           : 'widget.windowlistacompras',
    headerPosition  : 'left',
    height          : 412,
    width           : 660,
    title           : 'Lista de Compras de Items',
    constrain       : true,
    plain           : true,
    stateMode       : true,
    closeAction     : 'destroy',
    x               : 0,
    y               : 0,
    renderColumns:function(value,metaData,record,rowIndex,colIndex,store,view){
                        var val;
                        if (colIndex==4) {
                            val=Ext.util.Format.date(value,'d-m-Y');
                        }else if (colIndex==5) {
                            val=record.data.nombreresponsible;
                        }else if (colIndex==6) {
                            val=record.data.destinationstorename;
                        }else if (colIndex==7) {
                            val=record.data.nombrestate;
                        }
                        return val;
                    
                    },
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'gridpanel',
                    alias:'gridlistacompras',
                    store:Ext.create('Erp.store.almacenes.transacciones.StoreTxnStore',{
                        storeId:'storelistacompras'
                    }),
                    height: 400,
                    border:false,
                    cls:'resaltarfila',
                    columns: [
                        {header: 'idtxnstore',dataIndex: 'idtxnstore',hidden:true},
                        {header: 'identerprise',dataIndex: 'identerprise',hidden:true},
                        {header: 'iduser',dataIndex: 'iduser',hidden:true},
                        {header: 'Nro.',dataIndex: 'correlative',width:60},
                        {header: 'Fecha',dataIndex: 'date',width:70,renderer:this.renderColumns},
                        {header: 'Responsable',dataIndex: 'responsible',tooltip:'Resposable de la Compra',width:200,renderer:this.renderColumns},
                        {header: 'Almacen Destino',dataIndex: 'destinationstorename',tooltip:'Resposable de la Compra',width:150,renderer:this.renderColumns},
                        {header: 'Estado',dataIndex: 'state',width:75,renderer:this.renderColumns},
                        
                        {
                            xtype: 'actioncolumn',
                            alias:'actionedit',
                            width: 35,
                            items: [
                                {
                                    iconCls:'icon-edit',
                                    icon:'resources/images/user_edit.png',
                                    tooltip:'Editar Compra'
                                }
                            ]
                        }
                    ],
                    viewConfig: {

                    },
                    tbar:[{
                        pressed  :   true,
                        xtype    :   'button',
                        text     :   'Nueva Compra',
                        tooltip  :   'Generar nueva compra',
                        iconCls  :   'btnNew',
                        option   :   'addCompra'
                    }]
                }
            ]
        });

        me.callParent(arguments);
    }
});