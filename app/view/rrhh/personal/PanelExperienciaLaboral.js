/*
 * @Autor: Max marcelo jimenez T,Crithian Valencia, Pablo Garcia Guaman
 * @Email: maxmjt@gmail.com, fox_tian@hotmail.com ,garcia_guaman_pablo@hotmail.com
 */
Ext.define('Erp.view.rrhh.personal.PanelExperienciaLaboral', {
    extend: 'Ext.panel.Panel',
    alias       : 'widget.panelexperiencialaboral',
    requires:['Erp.store.rrhh.personal.StoreExperience'],
    //height: 250,
    title: 'Experiencia laboral',
    renderGrid:function(value,metaData,record,rowIndex,colIndex,store,view){
        if (colIndex==6 || colIndex==7) {
            return Ext.util.Format.date(value,'d/m/Y');
        }
    },
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'gridpanel',
                    alias:'gridexperiencia',
                    stateEdit:'R',
                    store:Ext.create('Erp.store.rrhh.personal.StoreExperience',{}),
                    frame: true,
                    margin: 3,
                    height:210,
                    title: '',
                    columns: [
                        {header:'idexperience',dataIndex:'idexperience',hidden:true},
                        {header:'idemployee',dataIndex:'idemployee',hidden:true},
                        {header:'Rubro/Area',dataIndex:'entry',editor:{xtype:'textfield'}},
                        {header:'Empresa',dataIndex:'enterprise',editor:{xtype:'textfield'}},
                        {header:'Cargo',dataIndex:'jobtitle',width:120,editor:{xtype:'textfield'}},
                        {header:'Descripci&oacute;n',dataIndex:'description',width:120,editor:{xtype:'textfield'}},
                        {header:'Fecha Ingreso',dataIndex:'datestart',width:85,editor:{xtype:'datefield'},renderer:this.renderGrid},
                        {header:'Fecha Salida',dataIndex:'dateend',width:85,editor:{xtype:'datefield'},renderer:this.renderGrid},
                        {header:'Persona de Contacto',dataIndex:'contactperson',width:200,editor:{xtype:'textfield'}},
                        {header:'Telefonos Referencia',dataIndex:'referencephone',width:130,editor:{xtype:'textfield'}},
                        {header:'Email de Referencia',dataIndex:'referenceemail',width:150,editor:{xtype:'textfield',vtype:'email'}},
                        {header:'Motivo de Salida',dataIndex:'exitreason',width:200,editor:{xtype:'textfield',locked:true}},
                        {
                            xtype: 'actioncolumn',
                            alias:'actiondelete',
                            width: 30,
                            items: [
                                {
                                    iconCls:'icon-delete',
                                    icon:'resources/images/delete.gif',
                                    tooltip:'Eliminar registro'
                                }
                            ]
                        }
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
                                    text: 'Agregar',
                                    iconCls:'btnnew',
                                    option:'btnnewexperiencia'
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

