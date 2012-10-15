Ext.define('Erp.view.almacenes.transacciones.recepciontransferencias.WindowTxnRecepcionTransferencias', {
    extend              : 'Ext.window.Window',
    alias               : 'widget.windowtxnrecepciontransferencias',
    width               : 700,
    height              : 500,
    headerPosition      : 'left',
    title               : 'Recepcion de Transferencia',
    constrain           : true,
    layout              :'form',
    resizable           : true,
    stateMode           :'R',
    initComponent       : function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype       : 'panel',
                    alias       : 'contentform',
                    border      : false,
                    titleAlign  : 'center',
                    layout      : 'fit',
                    items       : []
                },
                {
                    xtype       : 'tabpanel',
                    alias       : 'contentdetail',
                    activeTab   : 0,
                    items       : []
                }
            ],
            tbar:[
                       {
                            xtype: 'buttongroup',
                            title: 'Opciones',
                            group:'opciones',
                            columns: 4,
                            items: [
                                {
                                    xtype: 'button',
                                    text: 'Recepcionar',
                                    iconCls:'btnaprobar',
                                    option:'btnRecepcionar'
                                },
                                {
                                    xtype: 'button',
                                    text: 'Rechazar',
                                    iconCls:'btnanular',
                                    option:'btnRechazar'
                                },
                                {
                                    xtype: 'button',
                                    text: 'Imprimir',
                                    iconCls:'btnimprimir',
                                    option:'btnImprimir'
                                }
                            ]
                        }]
        });

        me.callParent(arguments);
    }

});