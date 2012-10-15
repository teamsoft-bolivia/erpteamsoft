/*
 * @Autor: Pablo Garcia guaman
 * @Email: garcia_guaman_pablo@hotmail.com
 */

Ext.define('Erp.view.almacenes.item.datosbasicos.PanelFormBasic', {
    extend: 'Ext.panel.Panel',
    alias:'widget.panelformbasic',
    layout:'fit',
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items: [
        ]
        });

        me.callParent(arguments);
    }

});