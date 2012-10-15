/*
 * @Autor: Max marcelo jimenez T,Crithian Valencia, Pablo Garcia Guaman
 * @Email: maxmjt@gmail.com, fox_tian@hotmail.com ,garcia_guaman_pablo@hotmail.com
 */
Ext.define('Erp.view.rrhh.kardex.PanelDocumentos', {
    extend: 'Ext.panel.Panel',
    alias       : 'widget.paneldocumentos',
    //height: 250,
    title: 'Emision de Documentos',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            
            items   : [
                {
                    xtype: 'gridpanel',
                    store   : Ext.create('Erp.store.rrhh.kardex.StoreDetalleDocumentos',{}),
                    frame: true,
                    margin: 3,
                    height:210,
                    title: '',
                    columns: [
                        {
                            xtype   : 'rownumberer',
                            text    : '#'
                        },{
                            
                            
                            header      : 'iddocumentissued',
                            width       : 70,
                            dataIndex   : 'iddocumentissued'
                        },
                        {
                            header      : 'idemployee',
                            width       : 70,
                            dataIndex   : 'idemployee'
                        },
                        {
                            xtype       : 'gridcolumn',
                            dataIndex   : 'code',
                            text        : 'Codigo',
                            width       : 70 
                        },
                        {
                            xtype       : 'gridcolumn',
                            text        : 'Nombre del documento',
                            dataIndex   : 'documentname',
                            width       : 150
                          
                          
                        },
                        {
                            xtype       : 'gridcolumn',
                            text        : 'Descripcion del Documento',
                            dataIndex   : 'description',
                            width       : 170
                        },
                        {
                            xtype       : 'gridcolumn',
                            text        : 'Tipo del Documento',
                            dataIndex   : 'type',
                            width   : 110
                        },
                        {
                            xtype       : 'datecolumn',
                            text        : 'fecha de Emision',
                            dataIndex   : 'issuedate',
                            width       : 90
                               
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
                                    text: 'Nuevo Documento',
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

