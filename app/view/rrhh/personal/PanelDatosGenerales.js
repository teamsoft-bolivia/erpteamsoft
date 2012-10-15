/*
 * @Autor: Pablo Garcia Guaman
 * 
 */

Ext.define('Erp.view.rrhh.personal.PanelDatosGenerales', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.paneldatosgenerales',
    title: 'Datos Generales',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
               {
                xtype: 'form',
                alias:'formdatosgen',
                frame: true,
                height: 210,
                margin: 3,
                padding: 5,
                items: [
                    {
                        xtype: 'fieldset',
                        //height: 170,
                        layout: {
                            type: 'column'
                        },
                        title: 'Datos Adicionales',
                        items: [
                            {
                                xtype: 'fieldset',
                                columnWidth: 0.3333,
                                border: 0,
                                margin: '0 5 0 0',
                                defaults:{
                                    xtype:'textfield',
                                    anchor:'100%'
                                },
                                items: [
                                    {
                                        xtype: 'combobox',
                                        fieldLabel: 'Pais',
                                        name:'country',
                                        store:Ext.create('Erp.store.StoreType',{}),
                                        valueField:'idtype',
                                        displayField:'type',
                                        editable:false,
                                        queryMode:'local',
                                        allowBlank:false
                                    },
                                    {
                                        xtype: 'combobox',
                                        fieldLabel: 'Ciudad',
                                        name:'city',
                                        store:Ext.create('Erp.store.StoreType',{}),
                                        valueField:'idtype',
                                        displayField:'type',
                                        editable:false,
                                        queryMode:'local',
                                        allowBlank:false
                                    },
                                    {
                                        fieldLabel: 'Provincia',
                                        name:'province'
                                    },
                                    {
                                        fieldLabel: 'Localidad',
                                        name:'locality'
                                    }
                                ]
                            },
                            {
                                xtype: 'fieldset',
                                columnWidth: 0.33333,
                                border: 0,
                                margin: '0 5 0 0',
                                items: [
                                    {
                                        xtype: 'fieldcontainer',
                                        height: 21,
                                        layout: {
                                            type: 'column'
                                        },
                                        fieldLabel: 'Teléfonos',
                                        items: [
                                            {
                                                xtype: 'textfield',
                                                margin: '0 2 0 0',
                                                name:'phone',
                                                width: 72
                                            },
                                            {
                                                xtype: 'textfield',
                                                name:'phone2',
                                                width: 72
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'textfield',
                                        anchor: '100%',
                                        fieldLabel: 'Movil',
                                        name:'mobilephone'
                                    },
                                    {
                                        xtype: 'textfield',
                                        anchor: '100%',
                                        fieldLabel: 'Corporativo',
                                        name:'corporativemobilephone'
                                    },
                                    {
                                        xtype: 'textfield',
                                        anchor: '100%',
                                        fieldLabel: 'E-Mail',
                                        name:'email'
                                    },
                                    {
                                        xtype: 'textfield',
                                        anchor: '100%',
                                        fieldLabel: 'E-Mail Corporativo',
                                        name:'corporativeemail'
                                    }
                                ]
                            },
                            {
                                xtype: 'fieldset',
                                columnWidth: 0.3333,
                                border: 0,
                                items: [
                                    {
                                        xtype: 'textfield',
                                        anchor: '100%',
                                        fieldLabel: 'Skype/Msn/Otro',
                                        name:'instantmessaging'
                                    }
                                ]
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