/*
 * @Autor: Max marcelo jimenez T,Crithian Valencia, Pablo Garcia Guaman
 * @Email: maxmjt@gmail.com, fox_tian@hotmail.com ,garcia_guaman_pablo@hotmail.com
 */

Ext.define('Erp.view.almacenes.item.datosadicionales.PanelDatosAdicionales', {
   extend: 'Ext.panel.Panel',
    alias	: 'widget.paneldatosadicionales',    
    title	: 'Datos Adicionales',
    frame	: true,
    height	: 230,
    margin	: '5 5 5 5',
    autoScroll	: false,
    layout		: {
        align: 'stretch',
        type: 'hbox'
    },
    frameHeader	: false,
   // flex		: 1,

    initComponent: function() {
        var me = this;

        me.callParent(arguments);
    }

});

