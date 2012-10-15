
/*
 * @Autor: Pablo Garcia guaman
 * @Email: garcia_guaman_pablo@hotmail.com
 */

Ext.define('Erp.view.almacenes.item.datosbasicos.TabPanelData', {
    extend: 'Ext.tab.Panel',
    alias:'widget.tabpaneldata',
    activeTab: 0,
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items: [
        ]
        });

        me.callParent(arguments);
    }

});

