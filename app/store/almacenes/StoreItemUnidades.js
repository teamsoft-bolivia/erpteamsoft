
Ext.define('Erp.store.almacenes.StoreItemUnidades', {
    extend      : 'Ext.data.Store',
    model       : 'Erp.model.almacenes.ModelItemUnidades',
    autoLoad    : false,
    alias       : ['widget.storeitemdatosadicionales'],
    pageSize    : 5,
   
    proxy       :{
            type    :'ajax',
            actionMethods:'POST',
            extraParams:{
                    xaction:'read'
                },
            url     :'data/classes/sis_erp_item_unit.php',
            reader  :{
                type:'json',
                root:'results',
                totalProperty:'total'
            }
           
    }
   
});

