
Ext.define("Erp.view.almacenes.proveedores.PanelGridCategoriaProveedor",{
                requires:['Erp.store.StoreType','Erp.store.almacenes.proveedores.StoreCategoriaProveedor','Erp.store.almacenes.categoria.StoreItemCategoria'],
		extend  : "Ext.grid.Panel",
                alias   : ['widget.panelgridcategoriaproveedor'],
		selType : 'rowmodel',
                modegrid:'update',
                width   : 300,
                height  : 300,
                features: [{
                    id      : 'group',
                    ftype   : 'grouping',
                    groupHeaderTpl  : '{name}',
                    hideGroupedHeader: true,
                    enableGroupingMenu: false
                }],
     viewConfig: {
              
        getRowClass: function(record, index) {
            //console.log(record.get('active'));
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
            plugins: [
                Ext.create('Ext.grid.plugin.RowEditing', {
                    clicksToEdit: 2,
                    autoCancel  : false,
                    saveBtnText : 'Guardar',
                    cancelBtnText: 'Cancelar'
                })
            ],
            dockedItems     : [
                {
                    xtype : 'toolbar',
                    dock  : 'top',
                    items : [

                            {
                                xtype   : 'button',
                                text    : 'Categoria',
                                iconCls : 'addAccount',
                                option  : 'btnAddCategoria',
                                disabled:true
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
            columns: [
                {xtype  : 'rownumberer',header : '#'},
                {header: 'idcategoryprovider',  dataIndex: 'idcategoryprovider', field: 'textfield',hidden:true},

                {header: 'Categoria', dataIndex: 'idcategoricalgrouping',hidden:true,flex : 1,
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
                {header: 'Nombre',  dataIndex: 'idcategory', hidden:false,flex : 1,
                    renderer : function (value,metadata,record){
                        return record.get('categoryname'); 
                    },
                    editor : {
                            xtype: 'combobox',
                            name        : 'categoriaproveedor',
                            valueField  :'idcategory',
                            displayField:'categoryname',
                            queryMode   :'local',
                            allowBlank  : false,
                            option      : 'cboCategoriaProveedor'

                    } 
                },{
                    xtype:'actioncolumn',
                    width:25,
                    align: 'center',
                    items: [{
                        icon: 'lib/ext/examples/shared/icons/fam/delete.gif',
                        tooltip: 'Eliminar',
                        option: 'eliminarCategoriaProvedor',
                        handler: function(grid, rowIndex, colIndex) {

                            var rec = grid.getStore().getAt(rowIndex);
                            var idcategoryprovider=rec.data.idcategoryprovider;
                            var store = grid.getStore();
                            var win=grid.up('window');
                            if(win.stateMode=='E'){
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
                                            url  : 'data/classes/sis_erp_category_provider.php',
                                            params : {
                                            xaction      : 'deletecategoryprovider',
                                            idcategoryprovider   : idcategoryprovider

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
                                }else{

                                }


                        }
                        }]
                    }

                    ]
                            
        });
        thiss.callParent();
                        
		
    }


});

