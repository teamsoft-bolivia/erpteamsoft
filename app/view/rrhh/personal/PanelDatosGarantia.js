/*
 * @Autor: Max marcelo jimenez T,Crithian Valencia, Pablo Garcia Guaman
 * @Email: maxmjt@gmail.com, fox_tian@hotmail.com ,garcia_guaman_pablo@hotmail.com
 */
Ext.define('Erp.view.rrhh.personal.PanelDatosGarantia', {
    extend: 'Ext.panel.Panel',
    alias       : 'widget.paneldatosgarantia',
    //height: 250,
    layout: {
        align: 'stretch',
        type: 'vbox'
    },
    title: 'Datos garantia',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    frame: true,
                    margin: 3,
                    height:210,
                    bodyPadding: 10,
                    title: '',
                    items: [
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Tipo garantia'
                        },
                        {
                            xtype: 'fieldset',
                            layout:'column',
                            border:0,
                            items: [
                                {
                                    xtype: 'fieldset',
                                    columnWidth:'0.5',
                                    margin:'0 5 0 0',
                                    title: 'Datos garante (personal)',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Nombre garante'
                                        },
                                        {
                                            xtype: 'combobox',
                                            fieldLabel: 'Documento'
                                        },
                                        {
                                            xtype: 'numberfield',
                                            fieldLabel: 'Nro. documento'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    columnWidth:'0.5',
                                    title: 'Direcci&oacute;n',
                                    items: [

                                        {
                                            xtype: 'textareafield',
                                            fieldLabel: 'Direccion',
                                            height:50
                                        }
                                    ]
                                }
                            ]
                        },
                        
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});

