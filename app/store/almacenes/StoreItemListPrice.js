/* 
 * @Autor: Max marcelo jimenez T
 * @Email: maxmjt@gmail.com
 */
Ext.define('Erp.store.almacenes.StoreItemListPrice', {
    extend: 'Ext.data.Store',
    model: 'Erp.model.almacenes.ModelItemListPrice',
    autoLoad:false,
    proxy:{
        type:'ajax',

        url:'data/classes/sis_erp_item_list_price.php',
        actionMethods: {
        read: 'POST'
    },
        extraParams:{
            xaction:'readtypeentidad'
        },
        reader:{
            type:'json',
            root:'results',
            totalProperty:'total'
        }
    }
});






