/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define("Erp.view.almacenes.item.categorias.GridCategorias",{
        requires:['Erp.store.StoreType','Erp.store.almacenes.categoria.StoreItemCategoria'],
        extend  : "Ext.grid.Panel",
        alias   : ['widget.gridcategorias'],
        selType : 'rowmodel',
        modegrid:'update',
        flex    : 1,
        width   : 550,
        margin  : '2',
        features: [{
            id: 'group',
            ftype: 'grouping',
            groupHeaderTpl: '{name}',
            hideGroupedHeader: true,
            enableGroupingMenu: false
        }],
        dockedItems     : [
            {
                xtype : 'toolbar',
                dock  : 'top',
                items : [

                        {
                            xtype   : 'button',
                            text    : 'Nueva Categoria',
                            iconCls : 'addAccount',
                            option  : 'btnAddCategoria'
                        },
                        '->',{
                            xtype           : 'triggerfield',
                            fieldLabel      : 'Buscar',
                            labelWidth      : 50,
                            enableKeyEvents : true,
                            option          : 'searchcategory',
                            triggerCls      : 'search-trigger'
                        }


                ]
            }

        ],
             
        viewConfig: {

            getRowClass: function(record, index) {
                var c = record.get('active');
                if (c == 1) {
                    return 'price-rise';
                } else if (c == 0) {
                    return 'price-fall';
                }
            }
        },
               
        initComponent	: function (){
            var thiss = this;
            Ext.applyIf(thiss, {
                columns : [
                    {xtype  : 'rownumberer',header : '#'},
                    {header: 'idcategory',  dataIndex: 'idcategory', field: 'textfield',hidden:true,width:15},
                    {header: 'Nombre',  dataIndex: 'categoryname', flex:1 ,field: 'textfield',
                        editor : {
                            allowBlank : false
                            
                        }
                    },
                    {header: 'Descripcion', dataIndex: 'description', flex:1,
                        editor: {
                            xtype:'textfield',
                            allowBlank:false
                        }
                    },
                    {header: 'Agrupacion Categorica',  dataIndex: 'idcategoricalgrouping',width:125,hidden:true,
                        renderer : function (value,metadata,record){
                           return record.get('agrupacion_categorica'); 
                        
                        },
                        editor : {
                                xtype: 'combobox',
                                name        : 'agrupacion',
                                valueField  :'idtype',
                                displayField:'type',
                                queryMode   :'local',
                                allowBlank  : false,
                                option      : 'cboCategoria'
					  
                        } 
                    },
                    {header: 'alias',  dataIndex: 'alias', field: 'textfield',hidden:true},
                    {header: 'Categoria Padre',  dataIndex: 'idfather',width:125,
                        renderer : function (value,metadata,record){
                                                  
                           return record.get('fathercategory'); 
                        
                        },
                        editor : {
                                xtype: 'combobox',
                               // store:Ext.create('Erp.store.almacenes.categoria.StoreItemCategoria',{}),
                              
                                name        : 'fahercategory',
                                valueField  :'idcategory',
                                displayField:'categoryname',
                                queryMode   :'local',
                                allowBlank  : false,
                                option      : 'cboFatherCategoria'
					  
                        } 
                    },{
                        header: 'Estado',dataIndex: 'active',width:40,align:'center',
                        renderer : function(value,metaData,rowIndex,colIndex,store,view){
                                        if (value) {
                                            return '<img src="resources/images/true.png">';    
                                        }else{
                                            return '<img src="resources/images/false.png">';   
                                        }
                        },
                        editor : {
                            xtype : 'checkbox',
                            cls   : 'x-grid-checkheader-editor'
                            
                        }
                    },{
                        xtype:'actioncolumn',
                        width:25,
                        align: 'center',
                        items: [{
                            icon: 'lib/ext/examples/shared/icons/fam/delete.gif',
                            tooltip: 'Eliminar',
                            option: 'eliminarCategoria',
                            handler: function(grid, rowIndex, colIndex) {
                                
                                var rec = grid.getStore().getAt(rowIndex);
                                var idcategory=rec.data.idcategory;
                                var store = grid.getStore();
                                
                                Ext.Msg.show({
                                    title : 'Confirmacion',
                                    msg : 'Esta seguro de eliminar el registro selecionado?',
                                    buttons : Ext.Msg.YESNO,
                                    icon : Ext.MessageBox.WARNING,
                                    scope : this,
                                    width : 450,
                                    fn : function(btn, ev){
                                        if (btn == 'yes') {
                                            
                                            
                                            
                                            Ext.Ajax.request({
                                            url  : 'data/classes/sis_erp_category.php',
                                            params : {
                                               xaction      : 'deletecategory',
                                               idcategory   : idcategory

                                             },
                                             method : 'POST',


                                             success: function(r) {
                                               var result=Ext.decode(r.responseText);

                                                Ext.create('widget.uxNotification', {
                                                title: result.title,
                                                position: 'tr',
                                                manager: 'instructions',
                                                cls: 'ux-notification-light',
                                                iconCls: 'ux-notification-icon-information',
                                                html: result.msg,
                                                autoHideDelay: 4000,
                                                slideBackDuration: 500,
                                                slideInAnimation: 'bounceOut',
                                                slideBackAnimation: 'easeIn'
                                              }).show();
                                                store.load();

                                             },
                                             failure: function(r) {
                                              var result=Ext.decode(r.responseText);
                                              
                                              Ext.create('widget.uxNotification', {
                                               title: result.title,
                                               position: 'tr',
                                               manager: 'instructions',
                                               cls: 'ux-notification-light',
                                               iconCls: 'ux-notification-icon-information',
                                               html: result.msg,
                                               autoHideDelay: 4000,
                                               slideBackDuration: 500,
                                               slideInAnimation: 'bounceOut',
                                               slideBackAnimation: 'easeIn'
                                             }).show();
                                             }

                                            });
                                        
                                        }
                                     }
                                });
                             
                            }
                        }]
                    }
                ],
                plugins: [
                    Ext.create('Ext.grid.plugin.RowEditing', {
                        clicksToEdit: 2,
                        autoCancel  : false,
                        saveBtnText : 'Guardar',
                        cancelBtnText: 'Cancelar'
                    })
                ]
                });
                thiss.callParent();
                        
		
    }


});

