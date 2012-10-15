Ext.define('Erp.view.rrhh.organigrama.WindowOrganigrama', {
    extend              : 'Ext.window.Window',
    alias               : 'widget.windoworganigrama',
    width               : 790,
    height              : 450,
    headerPosition      : 'left',
    title               : 'Estructura Organizacional',
    constrain           : true,
    layout              :'form',
    resizable           : false,
    initComponent       : function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype       : 'panel',
                    name        : 'panelcontentorganigrama',
                    border      : false,
                    titleAlign  : 'center',
                    layout      : {type:'column'},
                    padding     : 5,
                    items       : []
                }
            ]
        });

        me.callParent(arguments);
    }

});