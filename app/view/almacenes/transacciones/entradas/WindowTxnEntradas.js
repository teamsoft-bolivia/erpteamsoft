Ext.define('Erp.view.almacenes.transacciones.entradas.WindowTxnEntradas', {
    extend              : 'Ext.window.Window',
    alias               : 'widget.windowtxnentradas',
    width               : 750,
    height              : 500,
    headerPosition      : 'left',
    title               : 'Entrada de Items',
    constrain           : true,
    layout              :'form',
    resizable           : false,
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
            tbar:[{
                            xtype: 'buttongroup',
                            group:'edicion',
                            title: 'Edici&oacute;n',
                            columns: 4,
                            items: [
                                {
                                    xtype: 'button',
                                    text: 'Nuevo',
                                    iconCls:'btnnew',
                                    option:'btnNuevo'
                                },
                                {
                                    xtype: 'button',
                                    text: 'Guardar',
                                    iconCls:'btnsave',
                                    option:'btnGuardar'
                                },
                                {
                                    xtype: 'button',
                                    text: 'Editar',
                                    iconCls:'btnedit',
                                    option:'btnEditar'
                                },
                                {
                                    xtype: 'button',
                                    text: 'Cancelar',
                                    iconCls:'btncancel',
                                    option:'btnCancelar'
                                }
                            ]
                        },{
                            xtype: 'buttongroup',
                            title: 'Opciones',
                            group:'opciones',
                            columns: 4,
                            items: [
                                {
                                    xtype: 'button',
                                    text: 'Aprobar',
                                    iconCls:'btnaprobar',
                                    option:'btnAprobar'
                                },
                                {
                                    xtype: 'button',
                                    text: 'Anular',
                                    iconCls:'btnanular',
                                    option:'btnAnular'
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