/*
 * @Autor: Max marcelo jimenez T,Crithian Valencia, Pablo Garcia Guaman
 * @Email: maxmjt@gmail.com, fox_tian@hotmail.com ,garcia_guaman_pablo@hotmail.com
 */

Ext.define('Erp.view.rrhh.personal.PanelDireccionPersonal', {
    extend: 'Ext.panel.Panel',
    alias       : 'widget.paneldireccionpersonal',
    height: 250,
    title: 'Direccion',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    frame: true,
                    margin: 5,
                    layout: {
                        align: 'stretch',
                        type: 'hbox'
                    },
                    bodyPadding: 10,
                    title: '',
                    items: [
                        {
                            xtype: 'fieldset',
                            margin: 3,
                            width: 374,
                            title: 'Datos',
                            items: [
                                {
                                    xtype: 'textareafield',
                                    anchor: '100%',
                                    height: 79,
                                    fieldLabel: 'Direccion'
                                },
                                {
                                    xtype: 'textfield',
                                    anchor: '100%',
                                    fieldLabel: 'Latitud'
                                },
                                {
                                    xtype: 'textfield',
                                    anchor: '100%',
                                    fieldLabel: 'Longitud'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            flex: 1,
                            margin: 3,
                            title: 'Mapa',
                            items: {
                                xtype: 'gmappanel',
                                height: 150,
                                center: {
                                    geoCodeAddr: '4 Yawkey Way, Boston, MA, 02215-3409, USA',
                                    marker: {title: 'Fenway Park'},
                                    center:{lat:-17.393757,lng:-66.157041}
                                },
                                markers: [{
                                    lat: -17.393757,
                                    lng: -66.157041,
                                    title: 'Centro',
                                    listeners: {
                                        click: function(e){
                                            Ext.Msg.alert('It\'s fine', 'and it\'s art.');
                                        }
                                    }
                                }]
                            }
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});

