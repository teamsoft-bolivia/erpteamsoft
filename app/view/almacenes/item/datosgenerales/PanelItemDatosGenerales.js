/*
 * @Autor: Max marcelo jimenez T,Crithian Valencia, Pablo Garcia Guaman
 * @Email: maxmjt@gmail.com, fox_tian@hotmail.com ,garcia_guaman_pablo@hotmail.com
 */

Ext.define('Erp.view.almacenes.item.datosgenerales.PanelItemDatosGenerales', {
   extend: 'Ext.panel.Panel',

    height: 250,
    width: 700,
    layout: {
        type: 'column'
    },
    title: 'Datos Generales',
    iditem: '',
    alias   :'widget.panelitemdatosgenerales',
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
    }

});

