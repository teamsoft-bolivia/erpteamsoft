/*
 * @Autor: Pablo Garcia Guaman
 * 
 */
Ext.define('Erp.view.rrhh.personal.WindowListaPersonal', {
    extend: 'Ext.window.Window',
    alias: 'widget.windowlistapersonal',
    //height: 360,
    //width: 650,
    title: 'Lista de Empleados',
    x:25,
    y:25,
    constrain:true,
    headerPosition  : 'left',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'gridpanel',
                    store:Ext.create('Erp.store.rrhh.personal.StoreListaPersonal',{autoLoad:true}),
                    width:600,
                    height: 320,
                    border:0,
                    title: '',
                    columns: [
                        {header:'idemployee',dataIndex:'idemployee',hidden:true},
                        {header:'idperson',dataIndex:'idperson',hidden:true},
                        {header:'Codigo',dataIndex:'code',width:100},
                        {header:'Nombre Empleado',dataIndex:'employeename',width:350},
                        {header:'Estado',dataIndex:'statename',width:90},
                        
                        {
                            xtype: 'actioncolumn',
                            width:30,
                            items: [
                                {
                                    xtype:'button',
                                    iconCls:'icon-edit',
                                    icon: 'resources/images/user_edit.png',
                                    tooltip: 'Editar',
                                    option: 'editPersonal'
                                }
                            ]
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
                                    text: 'Nuevo Empleado',
                                    iconCls: 'addAccount',
                                    option: 'newpersonal'
                                },'->',
                                {
                                    xtype: 'triggerfield',
                                    fieldLabel: ''
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

