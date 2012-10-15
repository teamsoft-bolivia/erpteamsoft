Ext.define('Erp.view.rrhh.organigrama.FormOrganigramaCargos', {
    extend: 'Ext.window.Window',
    alias               : 'widget.formorganigramacargos',
    height: 292,
    width: 542,
    layout: {
        type: 'card'
    },
    title: 'Cargo / Unidad Organizativa',
    constrain:true,
    initComponent: function() {
        var me = this;
        var storerolFun=Ext.create('Erp.store.rrhh.cargo.StoreRolFuncionesCargos');
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    option: 'panelcargos1',
                    title: '',
                    items: [
                        {
                            xtype: 'form',
                            option:'formulariocargos',
                            frame: true,
                            height: 218,
                            alias: 'widget.formdatoscargos',
                            margin: 3,
                            bodyPadding: 10,
                            title: '',
                            items: [
                                {
                                    xtype: 'fieldset',
                                    title: 'Datos',
                                    items: [
                                        {
                                            xtype: 'numberfield',
                                            name:'idorganizationalchart',
                                            anchor: '100%',
                                            option: 'idorganizationalchart',
                                            hidden:true,
                                            editable:false,
                                            readOnly:'true',
                                            //allowBlank:false,
                                            fieldLabel: 'id'
                                        },
                                        {
                                            xtype: 'numberfield',
                                            name:'father',
                                            anchor: '100%',
                                            option: 'father',
                                            hidden:true,
                                            editable:false,
                                            readOnly:'true',
                                            allowBlank:false,
                                            fieldLabel: 'id'
                                        },
                                        {
                                            xtype: 'textfield',
                                            anchor: '100%',
                                            option: 'namedpto',
                                            //hidden:true,
                                            name:'namedpto',
                                            editable:false,
                                            readOnly:'true',
                                            allowBlank:false,
                                            fieldLabel: 'Departamento'
                                        },
                                        {
                                            xtype: 'textfield',
                                            anchor: '100%',
                                            option: 'namejefe',
                                            name:'cargosuperior',
                                            //hidden:true,
                                            editable:false,
                                            //allowBlank:false,
                                            readOnly:'true',
                                            fieldLabel: 'Cargo superior'
                                        },
                                        {
                                            xtype: 'textfield',
                                            anchor: '100%',                                           
                                            allowBlank:false,
                                            name:'jobtitle',
                                            fieldLabel: 'Nombre cargo'
                                        },
                                        {
                                            xtype: 'numberfield',
                                            anchor: '100%',
                                            allowBlank:false,
                                            name:'salary',
                                            fieldLabel: 'Sueldo'
                                        },
                                        {
                                            xtype: 'numberfield',
                                            anchor: '100%',
                                            allowBlank:false,
                                            name:'vacancies',
                                            fieldLabel: 'Nro. Vacantes'
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            anchor: '100%',
                                            name:'active',
                                            fieldLabel: 'Activo',
                                            boxLabel: ''
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            option: 'tool1',
                            dock: 'bottom',
                            items: [
                                {
                                    xtype: 'button',
                                    margin: 3,
                                    option:'btnTerminarCargo',
                                    text: 'Terminar'
                                },
                                {
                                    xtype: 'button',
                                    margin: 3,
                                    option:'btnCancelarCargo',
                                    text: 'Cancelar'
                                },'->',
                                {
                                    xtype: 'button',
                                    option: 'next',
                                    iconCls:'right',
                                    margin: 3,
                                    text: 'Siguiente'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    option: 'panelcargos2',
                    title: '',
                    items: [
                        {
                            xtype: 'gridpanel',
                            frame: true,
                            height: 219,
                            margin: 3,
                            option:'RolFuncionesResponsabilidades',
                            title: 'Rol, Funciones y Responsabilidades',
                            store: storerolFun,
                            columns: [
                                {
                                    //xtype: 'gridcolumn',
                                    dataIndex: 'name',
                                    header: 'Rol',
                                    editor: {
                                        xtype:'textfield',
                                        allowBlank:false
                                    }
                                },
                                {
                                    //xtype: 'numbercolumn',
                                    dataIndex: 'description',
                                    header: 'Descripcion',
                                    flex:1,
                                    editor: {
                                        xtype:'textarea',
                                        allowBlank:false
                                    }
                                }
                                //{header:'Descripci&oacute;n Item',dataIndex: 'description',width:90},
                            ],
                            viewConfig: {

                            },
                            plugins:[Ext.create('Ext.grid.plugin.RowEditing',{
                                        clicksToEdit:2,
                                        errorSummary:false,
                                        saveBtnText:'Aceptar',
                                        cancelBtnText:'Cancelar'
                                    })
                            ],
                            dockedItems: [
                                {
                                    xtype: 'toolbar',
                                    dock: 'top',
                                    items: [
                                        {
                                            xtype: 'button',
                                            iconCls:'btnNew',
                                            option: 'nuevoRol',
                                            text: 'Nuevo'
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            items: [
                                {
                                    xtype: 'button',
                                    option: 'back1',
                                    iconCls  :   'left',
                                    text: 'Anterior'
                                },
                                {
                                    xtype: 'button',
                                    margin: 3,
                                    text: 'Terminar'
                                },
                                {
                                    xtype: 'button',
                                    margin: 3,
                                    option:'btnCancelarCargo1',
                                    text: 'Cancelar'
                                },'->',
                                {
                                    xtype: 'button',
                                    margin: 3,
                                    option: 'next1',
                                    iconCls:'right',
                                    text: 'Siguiente'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    option: 'panelcargos3',
                    height: 250,
                    width: 400,
                    title: '',
                    items: [
                        {
                            xtype: 'gridpanel',
                            frame: true,
                            height: 218,
                            margin: 3,
                            title: 'Atribuciones',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'string',
                                    text: 'Concepto'
                                },
                                {
                                    xtype: 'numbercolumn',
                                    dataIndex: 'number',
                                    text: 'Descripcion'
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
                                            iconCls:'btnNew',
                                            text: 'Nuevo'
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            items: [
                                {
                                    xtype: 'button',
                                    option: 'back2',
                                    iconCls  :   'left',
                                    margin: 3,
                                    text: 'Anterior'
                                },
                                {
                                    xtype: 'button',
                                    margin: 3,
                                    text: 'Terminar'
                                },
                                {
                                    xtype: 'button',
                                    margin: 3,
                                    option:'btnCancelarCargo2',
                                    text: 'Cancelar'
                                },'->',
                                {
                                    xtype: 'button',
                                    option: 'next2',
                                    iconCls:'right',
                                    margin: 3,
                                    text: 'Siguiente'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    option: 'panelcargos4',
                    title: '',
                    items: [
                        {
                            xtype: 'gridpanel',
                            frame: true,
                            height: 218,
                            margin: 3,
                            title: 'Perfil',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'string',
                                    text: 'Concepto'
                                },
                                {
                                    xtype: 'numbercolumn',
                                    dataIndex: 'number',
                                    text: 'Descripcion'
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
                                            iconCls:'btnNew',
                                            text: 'Nuevo'
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            items: [
                                {
                                    xtype: 'button',
                                    option: 'back3',
                                    iconCls  :   'left',
                                    margin: 3,
                                    text: 'Anterior'
                                },
                                {
                                    xtype: 'button',
                                    margin: 3,
                                    text: 'Terminar'
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