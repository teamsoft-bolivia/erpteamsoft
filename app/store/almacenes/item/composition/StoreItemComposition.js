/*
 * @Autor: Pablo Garcia Guaman
 * @Email: garcia_guaman_pablo@hotmail.com
 */
Ext.define('Erp.store.almacenes.item.composition.StoreItemComposition', {
    extend      : 'Ext.data.Store',
    model       : 'Erp.model.almacenes.item.composition.ModelItemComposition',
    autoLoad    : false,
    alias       : ['widget.storeitemcomposition'],
    pageSize    : 5,
    proxy       :{
            type    :'ajax',
            actionMethods:'POST',
            extraParams:{
                    xaction:'readcomposition',yaction:''
                },
            url     :'data/classes/sis_erp_item_composition.php',
            reader  :{
                type:'json',
                root:'results',
                totalProperty:'total'
            }
    }
   
});

