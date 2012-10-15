Ext.define('Erp.view.almacenes.kardex.WindowKardexItem', {
    extend              : 'Ext.window.Window',
    alias               : 'widget.windowkardexitem',
    width               : 790,
    height              : 550,
    headerPosition      : 'left',
    title               : 'Kardex items',
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
            ]
        });

        me.callParent(arguments);
    }

});