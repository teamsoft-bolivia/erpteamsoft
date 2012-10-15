/*
 * @Autor: Max jimenez
 * 
 */
Ext.define('Erp.store.almacenes.item.unit.StoreUnit', {
    extend      : 'Ext.data.Store',
    model       : 'Erp.model.almacenes.item.unit.ModelUnit',
    autoLoad    : false,
    alias       : ['widget.StoreUnit'],
    pageSize    : 5,
   
    proxy       :{
            type    :'ajax',
            actionMethods:'POST',
            extraParams:{
                    xaction:'readunit'
                },
            url     :'data/classes/sis_erp_unit.php',
            reader  :{
                type:'json',
                root:'results',
                totalProperty:'total'
            }
           
    }
   
});


