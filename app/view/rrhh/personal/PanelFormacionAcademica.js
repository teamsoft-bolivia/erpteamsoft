/*
 * @Autor: Max marcelo jimenez T,Crithian Valencia, Pablo Garcia Guaman
 * @Email: maxmjt@gmail.com, fox_tian@hotmail.com ,garcia_guaman_pablo@hotmail.com
 */
Ext.define('Erp.view.rrhh.personal.PanelFormacionAcademica', {
    extend: 'Ext.panel.Panel',
    alias       : 'widget.panelformacionacademica',
    requires:['Erp.store.rrhh.personal.StoreFormacionAcademica'],
    //height: 250,
    title: 'Formacion Academica',
    renderGrid:function(value,metaData,record,rowIndex,colIndex,store,view){
            var newvalue;
            if (colIndex==5  || colIndex==6) {
                    newvalue=Ext.util.Format.date(value,'d/m/Y');
                }
            return newvalue;
    },
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'gridpanel',
                    alias:'gridformacionacademica',
                    stateEdit:'R',
                    store:Ext.create('Erp.store.rrhh.personal.StoreFormacionAcademica',{}),
                    frame: true,
                    margin: 3,
                    height:210,
                    title: '',
                    columns: [
                        {header:'idacademictraining',dataIndex:'idacademictraining',hidden:true},
                        {header:'idemployee',dataIndex:'idemployee',hidden:true},
                        {header:'Carrera',dataIndex:'career',editor:new Ext.form.field.Text({})},
                        {header:'Nivel Academico',dataIndex:'academiclevel',editor:new Ext.form.field.Text({})},
                        {header:'Instituci&oacute;n',dataIndex:'institution',editor:new Ext.form.field.Text({})},
                        {header:'Fecha Inicio',dataIndex:'datestart',editor:Ext.create('Ext.form.field.Date',{}),renderer:this.renderGrid},
                        {header:'Fecha Fin',dataIndex:'dateend',editor:Ext.create('Ext.form.field.Date',{}),renderer:this.renderGrid},
                        {header:'document',dataIndex:'document',hidden:true},
                        
                        {
                            xtype: 'actioncolumn',
                            alias:'actiondelete',
                            width: 60,
                            items: [
                                {
                                    iconCls:'icon-document',
                                    icon:'resources/images/upload_16.png',
                                    tooltip:'Subir Documento'
                                },
                                {
                                    iconCls:'icon-delete',
                                    icon:'resources/images/delete.gif',
                                    tooltip:'Eliminar registro'
                                }
                            ]
                        }
                    ],
                    plugins:[Ext.create('Ext.grid.plugin.RowEditing',{
                                clicksToEdit:2,
                                errorSummary:false,
                                saveBtnText:'Aceptar',
                                cancelBtnText:'Cancelar'
                            })
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
                                    text: 'Agregar',
                                    option:'btnnewFormAcademica',
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

