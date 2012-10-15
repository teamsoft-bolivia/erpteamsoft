/* 
* @Autor: Max marcelo jimenez T
 * @Email: maxmjt@gmail.com
 */

Ext.define("Erp.view.configuraciones.almacenes.PanelGridListaAsientos",{

		extend: "Ext.grid.Panel",
                alias: ['widget.panelgridlistaasientos'],
		frame: true,
                height: 373,
                width: 212,
                title: 'Tipos',
                cls: 'custom-grid',
                flex: 1,
                columns: [
                    {
                        xtype: 'numbercolumn',
                        dataIndex: 'idtype',
                        text: 'nombre',
                        hidden:true
                        
                    },
                    {
                        xtype: 'numbercolumn',
                        dataIndex: 'idtypeenterprise',
                        text: 'nombre',
                        hidden:true
                        
                    }
                    ,{
                        xtype: 'gridcolumn',
                        dataIndex: 'type',
                        text: 'nombre',
                        flex:1
                        
                    },
                    {
                        //xtype: 'numbercolumn',
                        dataIndex: 'value',
                        text: 'Activo',width:40,renderer:function(value){
                                                                if (value === 'true') {
                                                                    return '<img src="resources/images/true.png">';
                                                                }else{
                                                                return '<img src="resources/images/false.png">';
                                                                }
                                                            },editor: {
                            xtype:'checkboxfield',
                            allowBlank:false
                        }
                    }
                ],
                viewConfig: {

                },
                initComponent: function() {
                var thiss = this;
                var storegrilla=Ext.create('Erp.store.configuraciones.StoreListaTiposAsientos',{});
                this.store=storegrilla;
                this.plugins=[Ext.create('Ext.grid.plugin.RowEditing',{
                    //dbclicksToEdit: 2,
                    //alias:'rowedit',
                    clicksToEdit: 2,
                    autoCancel: false,
                    saveBtnText: 'Editar',
                    cancelBtnText: 'Cancelar',
                    errorSumary: false
                    })];
                thiss.callParent(arguments);
            }
                


});




