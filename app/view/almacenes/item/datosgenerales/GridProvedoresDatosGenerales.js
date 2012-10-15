/*
 * @Autor: Max marcelo jimenez T,Crithian Valencia, Pablo Garcia Guaman
 * @Email: maxmjt@gmail.com, fox_tian@hotmail.com ,garcia_guaman_pablo@hotmail.com
 */

Ext.define ('Erp.view.almacenes.item.datosgenerales.GridProvedoresDatosGenerales',{
    requires    :['Erp.store.StoreType'],
    extend      : 'Ext.grid.Panel',
    alias       : 'widget.gridprovedoresdatosgenerales',
    flex        : 1,
    selModel: {
        selType: 'rowmodel'
    },
    enterpriseName : '',
    
    columns     : [
            {xtype  : 'rownumberer',header : '#'},
            { header : 'idprovider',dataIndex:'idprovider',sortable : false, hideable : false, hidden:true},
            { header : 'Nombre',dataIndex:'providername',sortable : false, hideable : false,flex : 2, draggable:false},
            { header : 'Pais',dataIndex:'country', sortable  : false, hideable : false, draggable:false},
            {
                xtype:'actioncolumn',
                width:25,
                align: 'center',
                items: [{
                     iconCls:'icon-edit',
                     icon   :'resources/images/notebook.png',
                     option : 'mostrarproveedores',
                     tooltip: 'Mostrar Proveedores',
                     handler: function(grid, rowIndex, colIndex,item,e,record) {

                        var window=grid.up('windowitem');
                        if(window.stateMode=='N'){
                            return false;
                        }else{
                            var fp=Ext.getCmp('center-panel');
                            var winProveedores=Ext.create('Erp.view.almacenes.proveedores.WindowProveedores',{});
                            var storegrid=Ext.create('Erp.store.almacenes.proveedores.StoreListaProveedores',{});
                            var tappanel=Ext.create('Erp.view.configuraciones.TapPanelConfiguraciones',{width: 306,
                            height: 310,disabled:true});
                            var tapPlanCuentas=Ext.create('Erp.view.configuraciones.TapConfiPlanCuentas',{title:'otros'});
                            var grillaproveedores=Ext.create('Erp.view.almacenes.proveedores.PanelGridProveedores',{store:storegrid});
                            var storegridcatprov=Ext.create('Erp.store.almacenes.proveedores.StoreCategoriaProveedor',{});
                            var grillacategoriaproveedor=Ext.create('Erp.view.almacenes.proveedores.PanelGridCategoriaProveedor',{title:'Categorias',store:storegridcatprov});
                            var formproveedores=Ext.create('Erp.view.almacenes.proveedores.FormAddProveedores',{});
                            var storecontact=Ext.create('Erp.store.almacenes.proveedores.StoreContactos',{});
                            var grillacontactos=Ext.create('Erp.view.almacenes.proveedores.PanelGridContactos',{store:storecontact});
                            tappanel.add(grillacategoriaproveedor);
                            tappanel.add(grillacontactos);
                            formproveedores.add(tappanel);
                            tappanel.setActiveTab(grillacategoriaproveedor);
                            winProveedores.add(grillaproveedores);
                            winProveedores.add(formproveedores);
                            fp.add(winProveedores);
                            winProveedores.show();

                        }
                    }
                }]
            }
           
          
    ],
    initComponent : function (){
        this.dockedItems     = [
                {
                    xtype : 'toolbar',
                    dock  : 'top',
                    items : [
                            {
                                xtype : 'label',
                                text  : 'Proveedores',
                                margin  : '0 0 0 10',
                                option  : 'gridTitleLabel'
                                
                            },'->',{
                                xtype       :'combobox',
                                store       :Ext.create('Erp.store.StoreType',{}),
                                fieldLabel  : 'Proveedores por:',
                                name        : 'provedores',
                                valueField  :'idtype',
                                displayField:'type',
                                queryMode   :'local',
                                allowBlank  : false,
                                option      : 'comboCategoria'
                            }
                     ]
                }

    ];
        this.callParent (arguments);
        
        
    }
    
    
});

