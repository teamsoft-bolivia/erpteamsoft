
Ext.define('Erp.store.almacenes.proveedores.StoreCategoriaProveedor', {
    extend      : 'Ext.data.Store',
    model       : 'Erp.model.almacenes.proveedores.ModelCategoriaProveedor',
    autoLoad    : false,
    pageSize    : 5,
    groupField  : 'agrupacion_categorica',
    sorters     :[{"property":"categoryname","direction":"ASC"}],
    proxy       :{
            type    :'ajax',
         
            actionMethods: 'POST',
              
            extraParams:{
                    xaction:'read'
                },
            url     :'data/classes/sis_erp_category_provider.php',
            reader  :{
                type:'json',
                root:'results',
                totalProperty:'total'
            }
    }
   
});

