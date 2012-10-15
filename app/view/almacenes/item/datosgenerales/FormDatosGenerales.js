/*
 * @Autor: Max marcelo jimenez T,Crithian Valencia, Pablo Garcia Guaman
 * @Email: maxmjt@gmail.com, fox_tian@hotmail.com ,garcia_guaman_pablo@hotmail.com
 */

Ext.define('Erp.view.almacenes.item.datosgenerales.FormDatosGenerales',{
    requires: [
//                'Erp.store.almacenes.categoria.StoreItemMarca',
//                'Erp.store.almacenes.categoria.StoreItemModelo',
//                'Erp.store.almacenes.categoria.StoreItemRubro',
//                'Erp.store.almacenes.categoria.StoreItemFamilia',
                  'Erp.store.almacenes.categoria.StoreItemCategoria'
//                'Erp.store.almacenes.categoria.StoreItemSubCategoria'
    ],
    extend: 'Ext.form.Panel',
    alias : 'widget.formitemdatosgenerales',
    margin: '5 5 5 5',
   
    height:235,
    frame:true,
    columnWidth: 0.4,
    
    
    initComponent: function() {
        var thiss = this;
         Ext.applyIf(this, {
            items: [
            {
                xtype: 'fieldset',
                //height: 180,
                margin: '0 5 0 0',
                padding: '5 5 5 5',
                title: '<b>Categoria</b>',
                defaults:{
                    anchor: '100%'
                },
                
                items: [
                    
                    
                {   xtype:'numberfield',
                    fieldLabel:'iditem',
                    name:'iditem',
                    readOnly:'true',
                    hidden:true
                },
                {
                    xtype: 'combobox',
                    store:Ext.create('Erp.store.almacenes.categoria.StoreItemCategoria',{}),
                    //store:Ext.create('Erp.store.almacenes.categoria.StoreItemMarca',{}),
                    valueField:'idcategory',
                    displayField:'categoryname',
                                    editable:false,
                    fieldLabel: 'Marca',
                    name:'marca',
                    queryMode:'local',
                    allowBlank:false
                 },
                {
                    xtype: 'combobox',
                    store:Ext.create('Erp.store.almacenes.categoria.StoreItemCategoria',{}),
                    //store:Ext.create('Erp.store.almacenes.categoria.StoreItemModelo',{}),
                    valueField:'idcategory',
                    displayField:'categoryname',
                                    editable:false,
                    fieldLabel: 'Modelo',
                    name:'modelo',
                    queryMode:'local',
                    allowBlank:false
                },
                {
                    xtype: 'combobox',
                    store:Ext.create('Erp.store.almacenes.categoria.StoreItemCategoria',{}),
                    //store:Ext.create('Erp.store.almacenes.categoria.StoreItemRubro',{}),   
                    valueField:'idcategory',
                    displayField:'categoryname',
                                    editable:false,
                    fieldLabel: 'Rubro',
                    name:'rubro',
                    queryMode:'local',
                    allowBlank:false
                },
                {
                    xtype: 'combobox',
                     //store:Ext.create('Erp.store.almacenes.categoria.StoreItemFamilia',{}),
                     store:Ext.create('Erp.store.almacenes.categoria.StoreItemCategoria',{}),
                    fieldLabel: 'Familia',
                    name:'familia',
                    valueField:'idcategory',
                    displayField:'categoryname',
                                    editable:false,
                    queryMode:'local',
                    allowBlank:true
                     
                },
                {
                    xtype: 'combobox',
                    store:Ext.create('Erp.store.almacenes.categoria.StoreItemCategoria',{}),
                    fieldLabel: 'Categoria',
                    name : 'categoria',
                    valueField:'idcategory',
                    displayField:'categoryname',
                                    editable:false,
                    queryMode:'local',
                    allowBlank:true
                    
                },
                {
                    xtype: 'combobox',
                    //store:Ext.create('Erp.store.almacenes.categoria.StoreItemSubCategoria',{}),
                    store:Ext.create('Erp.store.almacenes.categoria.StoreItemCategoria',{}),
                    fieldLabel: 'Sub Categoria',
                    name:'subcategoria',
                    valueField:'idcategory',
                                    editable:false,
                    displayField:'categoryname',
                    queryMode:'local',
                    allowBlank:true
                }
            ]
            }]
         });
        
        
        thiss.callParent(arguments);
    }

    
    
});

