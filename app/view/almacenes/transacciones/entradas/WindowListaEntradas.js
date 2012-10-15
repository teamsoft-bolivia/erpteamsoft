/*
 * @autor:Pablo Garcia Guaman, Cristhian Valencia
 */
Ext.define('Erp.view.almacenes.transacciones.entradas.WindowListaEntradas', {
    extend          : 'Ext.window.Window',
    alias           : 'widget.windowlistaentradas',
    headerPosition  : 'left',
    height          : 412,
    width           : 670,
    title           : 'Lista de Entrada  de Items',
    constrain       : true,
    plain           : true,
    stateMode       : true,
    renderColumns:function(value,metaData,record,rowIndex,colIndex,store,view){
                        var val;
                        
                        if (colIndex==4) {
                            val=Ext.util.Format.date(value,'d-m-Y');
                        }else if (colIndex==6) {
                            val=record.data.nombreresponsible;
                        }else if (colIndex==7) {
                            val=record.data.destinationstorename;
                        }else if (colIndex==8) {
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
                    alias:'gridlistaentradas',
                    store:Ext.create('Erp.store.almacenes.transacciones.StoreTxnStore',{storeId:'storeListEntradas', pageSize: 15}),
                    height: 400,
                    border:false,
                    columns: [
                        {header: 'idtxnstore',dataIndex: 'idtxnstore',hidden:true},
                        {header: 'identerprise',dataIndex: 'identerprise',hidden:true},
                        {header: 'iduser',dataIndex: 'iduser',hidden:true},
                        {header: 'Nro.',dataIndex: 'correlative',width:45, align : 'right'},
                        {header: 'Fecha',dataIndex: 'date',width:70,renderer:this.renderColumns},
                        {header: 'Concepto',dataIndex:'nombreconcept',tooltip:'Concepto de la entrada',width:160},
                        {header: 'Responsable',dataIndex: 'responsible',tooltip:'Resposable de la Compra',width:150,renderer:this.renderColumns},
                        {header: 'Almacen Destino',dataIndex: 'destinationstorename',tooltip:'Almacen de Destino',width:110,renderer:this.renderColumns},
                        {header: 'Estado',dataIndex: 'state',width:60,renderer:this.renderColumns},
                        
                        {
                            xtype : 'actioncolumn',
                            alias :'actionedit',
                            align : 'center',
                            width : 25,
                            items : [
                                {
                                    iconCls:'icon-edit',
                                    icon:'resources/images/user_edit.png',
                                    tooltip:'Editar Entrada'
                                }
                            ]
                        }
                    ],
                    viewConfig: {

                    },
                    tbar:[{
                        pressed  :   true,
                        xtype    :   'button',
                        text     :   'Nueva Entrada',
                        tooltip  :   'Generar nueva entrada',
                        iconCls  :   'btnNew',
                        option   :   'addEntrada'
                    }]
                }
            ]
        });

        me.callParent(arguments);
    }
});