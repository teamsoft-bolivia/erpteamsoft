/*
 * @Autor: Pablo Garcia Guaman
 * 
 */
Ext.define("Erp.view.rrhh.personal.TabPanelDatosPersonal",{
    extend: 'Ext.tab.Panel',
    alias: 'widget.tabpaneldatospersonal',
    border: 0,
    height: 274,
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