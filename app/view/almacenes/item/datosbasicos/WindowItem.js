
/*
 * @Autor: Pablo Garcia guaman
 * @Email: garcia_guaman_pablo@hotmail.com
 */

Ext.define('Erp.view.almacenes.item.datosbasicos.WindowItem', {
    extend: 'Ext.window.Window',
    alias:'widget.windowitem',
    height: 548,
    width: 800,
    title: 'Datos Maestros del Item',
    headerPosition: 'left',
    layout:'form',
    stateMode:'R',
    stateEdit:'R',
    constrain: true,
    initComponent: function() {
        var me = this;
        
        Ext.applyIf(me, {
            tbar:[{
                            xtype: 'buttongroup',
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
                        }]
        });

        me.callParent(arguments);
    }

});

