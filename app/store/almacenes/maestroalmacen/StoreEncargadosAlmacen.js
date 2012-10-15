/* 
 * @Autor: Max marcelo jimenez T
 * @Email: maxmjt@gmail.com
 */
Ext.define('Erp.store.almacenes.maestroalmacen.StoreEncargadosAlmacen', {
    extend: 'Ext.data.Store',
    model: 'Erp.model.almacenes.maestroalmacen.ModelEncargadosAlmacen',
    autoLoad:false,
    pageSize    : 4,
    proxy:{
        type:'ajax',

        url:'data/classes/sis_erp_store.php',
        actionMethods: {
            read: 'POST'
        },
        extraParams:{
            xaction:'readlistaencargados'
        },
        reader:{
            type:'json',
            root:'results',
            totalProperty:'total'
        }
    }
});






