/*
 * @Autor: Pablo Garcia Guaman
 * 
 */
Ext.define("Erp.view.rrhh.personal.WindowPersonal",{
    extend: 'Ext.window.Window',
    alias: 'widget.windowpersonal',
    frame: false,
    height: 530,
    width: 943,
    resizable:false,
    headerPosition: 'left',
    title: 'Datos Maestros Personal',
    constrain:true,
    stateMode:'R',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'buttongroup',
                            title: 'Buttons',
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
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});