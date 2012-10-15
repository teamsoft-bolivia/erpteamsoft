
Ext.define('Erp.store.almacenes.StoreItemCategory', {
    extend      : 'Ext.data.Store',
    model       : 'Erp.model.almacenes.ModelItemCategory',
    autoLoad    : false,
    
    pageSize    : 5,
    proxy       :{
            type    :'ajax',
           
            actionMethods: 'POST',
            extraParams:{
                    xaction:'read',
                    iditem :''
                },
            url     :'data/classes/sis_erp_category.php',
            reader  :{
                type:'json',
                root:'results',
                totalProperty:'total'
            }
    }
   
});

