/* 
 * @Autor: Max marcelo jimenez T
 * @Email: maxmjt@gmail.com
 */
Ext.define('Erp.store.almacenes.StoreItemAsignados', {
    extend: 'Ext.data.Store',
    model: 'Erp.model.almacenes.item.ModelListaItem',
    autoLoad:false,
    proxy:{
        type:'ajax',

        url:'data/classes/sis_erp_item_list_price.php',
        actionMethods: {
        read: 'POST'
    },
        extraParams:{
            xaction:'readitemAsignados',
            idselectcategoria:''
        },
        reader:{
            type:'json',
            root:'results',
            totalProperty:'total'
        }
    }
});









