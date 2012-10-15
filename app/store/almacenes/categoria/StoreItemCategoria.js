
Ext.define('Erp.store.almacenes.categoria.StoreItemCategoria', {
    extend      : 'Ext.data.Store',
    model       : 'Erp.model.almacenes.categoria.ModelItemCategoria',
    autoLoad    : false,
    
    pageSize    : 5,
    proxy       :{
            type    :'ajax',
         
            actionMethods: 'POST',
              
            extraParams:{
                    xaction:'readcategoria'
                },
            url     :'data/classes/sis_erp_category.php',
            reader  :{
                type:'json',
                root:'results',
                totalProperty:'total'
            }
    }
   
});

