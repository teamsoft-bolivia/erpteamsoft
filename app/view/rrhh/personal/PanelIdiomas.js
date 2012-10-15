/*
 * @Autor: Max marcelo jimenez T,Crithian Valencia, Pablo Garcia Guaman
 * @Email: maxmjt@gmail.com, fox_tian@hotmail.com ,garcia_guaman_pablo@hotmail.com
 */
Ext.define('Erp.view.rrhh.personal.PanelIdiomas', {
    extend: 'Ext.panel.Panel',
    alias       : 'widget.panelidiomas',
    requires    : 'Erp.store.rrhh.personal.StoreIdiomas',
    //height: 250,
    title: 'Idiomas',
    renderGrid:function(value,metaData,record,rowIndex,colIndex,store,view){
        if (colIndex==3) {
            return record.data.readname;
        }else if (colIndex==4) {
            return record.data.writename;
        }else if (colIndex==5) {
            return record.data.speakingname;
        }else if (colIndex==6) {
            if (value) {
                return '<img src="resources/images/true.png">';    
            }else{
                return '<img src="resources/images/false.png">';   
            }
        }
    },
    initComponent: function() {
        var me = this;
        var cboread=Ext.create('Ext.form.field.ComboBox',{
            store:Ext.create('Erp.store.StoreType',{}),
            valueField:'idtype',
            displayField:'type',
            editable:false,
            queryMode:'local',
            allowBlank:false
        });
        var cbowrite=Ext.create('Ext.form.field.ComboBox',{
            store:Ext.create('Erp.store.StoreType',{}),
            valueField:'idtype',
            displayField:'type',
            editable:false,
            queryMode:'local',
            allowBlank:false
        });
        var cbospeak=Ext.create('Ext.form.field.ComboBox',{
            store:Ext.create('Erp.store.StoreType',{}),
            valueField:'idtype',
            displayField:'type',
            editable:false,
            queryMode:'local',
            allowBlank:false
        });
        var extraparams={xaction:'readbytype',type:'empleado_idioma'};
        cboread.getStore().getProxy().extraParams=extraparams;
        cbowrite.getStore().getProxy().extraParams=extraparams;
        cbospeak.getStore().getProxy().extraParams=extraparams;
        cboread.getStore().load();
        cbowrite.getStore().load();
        cbospeak.getStore().load();

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'gridpanel',
                    alias:'grididiomas',
                    stateEdit:'R',
                    store:Ext.create('Erp.store.rrhh.personal.StoreIdiomas',{}),
                    frame: true,
                    margin: 3,
                    height:210,
                    title: '',
                    columns: [
                        {header:'idlanguage',dataIndex:'idlanguage',hidden:true},
                        {header:'idemployee',dataIndex:'idemployee',hidden:true},
                        {header:'Idioma',dataIndex:'language',editor:{xtype:'textfield',allowBlank:false}},
                        {header:'Lectura',dataIndex:'read',editor:cboread,renderer:this.renderGrid},
                        {header:'Escritura',dataIndex:'write',editor:cbowrite,renderer:this.renderGrid},
                        {header:'Conversación',dataIndex:'speaking',editor:cbospeak,renderer:this.renderGrid},
                        {header:'Materno',dataIndex:'maternal',width:75,editor:Ext.create('Ext.form.field.Checkbox',{}),renderer:this.renderGrid},
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
                                    option:'btnnewlanguage'
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

