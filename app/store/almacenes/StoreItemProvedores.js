
Ext.define('Erp.store.almacenes.StoreItemProvedores', {
    extend      : 'Ext.data.Store',
    model       : 'Erp.model.almacenes.ModelItemProvedores',
    autoLoad    : false,
    alias       : ['widget.storeitemprovedores'],
    pageSize    : 5,
    
    proxy       :{
            type    :'ajax',
           
            actionMethods: 'POST',
             
            extraParams:{
                    xaction:'read'
                },
            url     :"data/classes/sis_erp_provider.php",
            reader  :{
                type:'json',
                root:'results',
                totalProperty:'total'
            }
    }
   
});

