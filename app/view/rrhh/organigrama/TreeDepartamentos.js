


Ext.define('Erp.view.rrhh.organigrama.TreeDepartamentos', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.treedepartamentos',
    height:420,
    columnWidth: 0.3,//0.25,
    title: 'Departamentos',
    rootVisible:false,
    root: {
			expanded: true
    },
    
    initComponent: function() {
        var me = this;
      
        Ext.applyIf(me, {
            store:Ext.create('Erp.store.rrhh.StoreOrganigrama',{}),
            
	columns: [
                {
                    flex : 1.2,
                    dataIndex: 'idorganizationalchart',
                    sortable: true,
                    text: 'Codigo',
                    hidden : true
                },
                {
                    xtype: 'treecolumn',
                    dataIndex: 'jobtitle',
                    flex: 2,
                    sortable: true,
                    text: 'Departamento'
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
                                    xtype: 'buttongroup',
                                    title: 'Opciones',
                                    option: 'BtnsDepartamentos',
                                    columns: 2,
                                    items: [
                                        {
                                            xtype: 'button',
                                            text: 'Nuevo',
                                            option: 'btnNuevoDpto',
                                            iconCls:'btnnew'
                                        },
                                        {
                                            xtype: 'button',
                                            text: 'Editar',
                                            option: 'btnEditarDpto',
                                            iconCls:'btnedit'
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