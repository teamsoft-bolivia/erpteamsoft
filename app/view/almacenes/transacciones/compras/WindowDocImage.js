Ext.define('Erp.view.almacenes.transacciones.compras.WindowDocImage', {
    extend: 'Ext.window.Window',
    alias: 'widget.windowdocimage',
    height: 300,
    maxHeight: 250,
    width: 300,
    resizable: false,
    headerPosition: 'left',
    title: 'Imagen del Documento',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'form',
                            border: 0,
                            frame: true,
                            width: 264,
                            layout: {
                                type: 'fit'
                            },
                            bodyBorder: false,
                            bodyPadding: 0,
                            items: [
                                {
                                    xtype: 'filefield',
                                    name:'image',
                                    buttonConfig: 'pressed:true',
                                    buttonOnly: false,
                                    buttonText: 'Busar'
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