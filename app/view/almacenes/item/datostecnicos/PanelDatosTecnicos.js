/*
 * @Autor: Pablo Garcia guaman
 * @Email: garcia_guaman_pablo@hotmail.com
 */

Ext.define('Erp.view.almacenes.item.datostecnicos.PanelDatosTecnicos', {
    extend: 'Ext.panel.Panel',
    alias:'widget.paneldatostecnicos',
    title:'Datos Tecnicos',
    layout:'accordion',
    frame:false,
    margin:'0 0',
    initComponent: function() {
        var me = this;
        
        Ext.applyIf(me, {
            items: []
        });

        me.callParent(arguments);
    }

});

