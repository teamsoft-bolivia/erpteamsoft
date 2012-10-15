/*
 * @Autor: Pablo Garcia Guaman
 * 
 */

Ext.define('Erp.view.rrhh.personal.PanelDatosContrato', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.PanelDatosContrato',
    requires:['Erp.store.rrhh.StoreOrganizationalChart'],
    title: 'Datos Contratación',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    alias:'formcontrato',
                    frame: true,
                    height: 210,
                    margin: 3,
                    bodyPadding: 3,
                    items: [
                        {
                            xtype: 'fieldset',
                            height: 185,
                            layout: {
                                type: 'column'
                            },
                            title: 'Datos Contrato',
                            items: [
                                {
                                    xtype: 'fieldset',
                                    columnWidth: 0.33333,
                                    border: 0,
                                    height: 161,
                                    margin: '0 5 0 0',
                                    padding: 0,
                                    defaults:{
                                        anchor:'100%'
                                    },
                                    items: [
                                        {
                                            xtype: 'datefield',
                                            fieldLabel: 'Fecha Contrato',
                                            name:'datecontract'
                                        },
                                        {
                                            xtype: 'combobox',
                                            fieldLabel: 'Tipo Contrato',
                                            name:'typecontract',
                                            store:Ext.create('Erp.store.StoreType',{}),
                                            valueField:'idtype',
                                            displayField:'type',
                                            editable:false,
                                            queryMode:'local'
                                        },
                                        {
                                            xtype: 'fieldcontainer',
                                            height: 21,
                                            layout: {
                                                type: 'column'
                                            },
                                            items: [
                                                {
                                                    xtype: 'datefield',
                                                    margin: '0 5 0 0',
                                                    width: 138,
                                                    fieldLabel: 'Desde',
                                                    labelWidth: 35,
                                                    name:'from'
                                                },
                                                {
                                                    xtype: 'datefield',
                                                    width: 138,
                                                    fieldLabel: 'Hasta',
                                                    labelWidth: 35,
                                                    name:'to'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'combobox',
                                            fieldLabel: 'Puesto/Cargo',
                                            name:'contractposition',
                                            store:Ext.create('Erp.store.rrhh.StoreOrganizationalChart',{storeFilter:true,remoteFilter:true}),
                                            valueField:'idorganizationalchart',
                                            displayField:'jobtitle',
                                            queryMode:'remote',
                                            //enableKeyEvents:true,
                                            minChars:2,
                                            typeAhead: false,
                                            matchFieldWidth:false,
                                            hideTrigger:true,
                                            //forceSelection:true,
                                            listConfig:{
                                                width:200
                                            }
                                        
                                        },
                                        {
                                            xtype: 'combobox',
                                            fieldLabel: 'Horario',
                                            hidden:true
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    columnWidth: 0.333333,
                                    border: 0,
                                    height: 143,
                                    margin: '0 5 0 0',
                                    padding: 0,
                                    defaults:{
                                        anchor:'100%'
                                    },
                                    items: [
                                        {
                                            xtype: 'checkboxfield',
                                            fieldLabel: 'Seguro Social',
                                            submitValue:false,
                                            name:'isSocial'
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Nro. Seg. Social',
                                            hidden:true,
                                            name:'socialnumber'
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            fieldLabel: 'Afp',
                                            submitValue:false,
                                            name:'isAfp'
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Nro. Afiliación',
                                            hidden:true,
                                            name:'afpnumber'
                                        },
                                        {
                                            xtype: 'combobox',
                                            fieldLabel: 'Via de Pago',
                                            name:'paymentway',
                                            store:Ext.create('Erp.store.StoreType',{}),
                                            valueField:'idtype',
                                            displayField:'type',
                                            editable:false,
                                            queryMode:'local'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    columnWidth: 0.333,
                                    border: 0,
                                    height: 153,
                                    padding: 0,
                                    items: [
                                        {
                                            xtype: 'gridpanel',
                                            alias:'gridremuneracion',
                                            height: 145,
                                            title: 'Datos Remuneraci&oacute;n',
                                            columns: [
                                                {header:'Concepto',dataIndex:'type'},
                                                {header:'Monto',dataIndex:''},
                                                {header:'Activo',dataIndex:''}
                                            ],
                                            viewConfig: {

                                            }
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