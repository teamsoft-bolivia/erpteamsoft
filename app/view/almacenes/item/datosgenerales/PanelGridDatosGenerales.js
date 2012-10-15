/*
 * @Autor: Max marcelo jimenez T,Crithian Valencia, Pablo Garcia Guaman
 * @Email: maxmjt@gmail.com, fox_tian@hotmail.com ,garcia_guaman_pablo@hotmail.com
 */

Ext.define('Erp.view.almacenes.item.datosgenerales.PanelGridDatosGenerales', {
   extend: 'Ext.panel.Panel',
        
    frame: true,
    height: 235,
    margin: '5 5 5 0',
    autoScroll: false,
    layout: {
        align: 'stretch',
        type: 'vbox'
    },
    frameHeader: false,
    columnWidth: 0.6,

    initComponent: function() {
        var me = this;

        me.callParent(arguments);
    }

});

