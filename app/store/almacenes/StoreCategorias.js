
Ext.define('Erp.store.almacenes.StoreCategorias', {
    extend      : 'Ext.data.Store',
    model       : 'Erp.model.almacenes.ModelCategorias',
    autoLoad    : false,
    
    groupField  : 'agrupacion_categorica',
    sorters     :[{"property":"categoryname","direction":"ASC"}],
    
    pageSize    : 10,
    proxy       :{
            type    :'ajax',
         
            actionMethods: 'POST',
              
            extraParams:{
                    xaction:'read'
                },
            url     :'data/classes/sis_erp_category.php',
            reader  :{
                type:'json',
                root:'results',
                totalProperty:'total'
            }
    }
   
});

