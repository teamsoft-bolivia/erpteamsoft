/* 
 * @Autor: Max marcelo jimenez T
 * @Email: maxmjt@gmail.com
 */
Ext.define('Erp.store.almacenes.maestroalmacen.StoreListaAlmacenes', {
    extend: 'Ext.data.Store',
    model: 'Erp.model.almacenes.maestroalmacen.ModelListaAlmacenes',
    autoLoad:false,
    pageSize    : 15,
    proxy:{
        type:'ajax',

        url:'data/classes/sis_erp_store.php',
        actionMethods: {
        read: 'POST'
    },
        extraParams:{
            xaction:'readlistaalmacenes'
        },
        reader:{
            type:'json',
            root:'results',
            totalProperty:'total'
        }
    }
});






