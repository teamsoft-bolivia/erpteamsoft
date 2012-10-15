/*
 * @Autor: Pablo Garcia Guaman
 * 
 */
Ext.define("Erp.view.rrhh.kardex.WindowKardex",{
    extend: 'Ext.window.Window',
    alias: 'widget.windowkardex',
    frame: false,
    height: 460,
    width: 800,
    resizable:false,
    headerPosition: 'left',
    title: 'Kardex',
    constrain:true,
    stateMode:'R',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                
            ]
        });

        me.callParent(arguments);
    }

});