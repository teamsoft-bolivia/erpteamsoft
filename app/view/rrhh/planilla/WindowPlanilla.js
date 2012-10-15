Ext.define('Erp.view.rrhh.planilla.WindowPlanilla', {
    extend              : 'Ext.window.Window',
    alias               : 'widget.windowplanilla',
    width               : 790,
    height              : 520,
    headerPosition      : 'left',
    title               : 'Planilla',
    constrain           : true,
    layout              :'form',
    resizable           : false,
    initComponent       : function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype       : 'panel',
                    alias       : 'contentplanillaform',
                    border      : false,
                    titleAlign  : 'center',
                    layout      : 'fit',
                    items       : []
                },
                {
                    xtype       : 'tabpanel',
                    alias       : 'contentplanilladetail',
                    activeTab   : 0,
                    items       : []
                }
            ]
        });

        me.callParent(arguments);
    }

});