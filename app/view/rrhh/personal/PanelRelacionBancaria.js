/*
 * @Autor: Max marcelo jimenez T,Crithian Valencia, Pablo Garcia Guaman
 * @Email: maxmjt@gmail.com, fox_tian@hotmail.com ,garcia_guaman_pablo@hotmail.com
 */
Ext.define('Erp.view.rrhh.personal.PanelRelacionBancaria', {
    extend: 'Ext.panel.Panel',
    alias       : 'widget.panelrelacionbancaria',
    //height: 250,
    title: 'Relacion bancaria',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'gridpanel',
                    alias:'gridbancos',
                    stateEdit:'R',
                    //store:Ext.create('Erp.store.rrhh.personal.StoreBancos',{}),
                    frame: true,
                    margin: 3,
                    height:210,
                    title: '',
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'string',
                            text: 'Banco',
                            width:200
                        },
                        {
                            xtype: 'numbercolumn',
                            dataIndex: 'number',
                            text: 'Nro cuenta',
                            width:200
                        },
                        {
                            xtype: 'datecolumn',
                            dataIndex: 'date',
                            text: 'Moneda',
                            width:100
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'estado',
                            text: 'Estado'
                        }
                    ],
                    viewConfig: {

                    },
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            items: [
                                {
                                    xtype: 'button',
                                    text: 'Nuevo',
                                    iconCls:'btnnew'
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

