/*
 * @autor:Pablo Garcia Guaman, Cristhian Valencia
 */
Ext.define('Erp.view.almacenes.transacciones.recepciontransferencias.WindowListaRecepcionTransferencias', {
    extend          : 'Ext.window.Window',
    alias           : 'widget.windowlistarecepciontransferencias',
    headerPosition  : 'left',
    height          : 412,
    width           : 650,
    title           : 'Lista de recepcion de transferencias',
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
                            val=record.data.originstorename;
                        }else if (colIndex==8) {
                            val=record.data.destinationstorename;
                        }else if (colIndex==9){
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
                    alias:'gridlistatransferencias',
                    store:Ext.create('Erp.store.almacenes.transacciones.StoreTxnStore',{}),
                    height: 400,
                    border:false,
                    cls         : 'resaltarfila',
                    columns: [
                        {header: 'idtxnstore',dataIndex: 'idtxnstore',hidden:true,hideable:false},
                        {header: 'identerprise',dataIndex: 'identerprise',hidden:true,hideable:false},
                        {header: 'iduser',dataIndex: 'iduser',hidden:true,hideable:false},
                        {header: 'Nro.',dataIndex: 'correlative',width:45,hideable:false},
                        {header: 'Fecha',dataIndex: 'date',width:80,renderer:this.renderColumns,hideable:false},
                        {header: 'Concepto',dataIndex:'nombreconcept',width:160},
                        {header: 'Responsable',dataIndex: 'responsible',tooltip:'Resposable de la Compra',width:130,renderer:this.renderColumns},
                        {header: 'Origen',dataIndex: 'originstorename',tooltip:'Almacen de Origen',width:50,renderer:this.renderColumns,hidden:true},
                        {header: 'Destino',dataIndex: 'destinationstorename',tooltip:'Almacen de Destino',width:95,renderer:this.renderColumns},
                        {header: 'Estado',dataIndex: 'state',width:80,renderer:this.renderColumns,tooltip:'Estado de la Transaccion'},
                        
                        {
                            xtype: 'actioncolumn',
                            alias:'actionedit',
                            align: 'center',
                            width: 25,
                            hideable:false,
                            tooltip:'Editar la Transaccion',
                            items: [
                                {
                                    iconCls:'icon-edit',
                                    icon:'resources/images/user_edit.png',
                                    tooltip:'Editar Salida'
                                }
                            ]
                        }
                    ],
                    viewConfig: {
                        //Return CSS class to apply to rows depending upon data values
                        getRowClass: function(record, index) {
                            //console.log(record.get('debit_credit'));
                            var c = record.get('state');
                            if (c == 43) {
                                return 'revision';
                            } else if (c == 86) {
                                return 'transito';
                            } else if(c == 45){
                                return 'anulado';
                            }
                        }
                    }
                }
            ]
        });

        me.callParent(arguments);
    }
});