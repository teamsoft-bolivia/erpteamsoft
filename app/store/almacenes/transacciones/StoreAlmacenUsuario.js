/* 
 * @Autor: Max marcelo jimenez T
 * @Email: maxmjt@gmail.com
 */
Ext.define('Erp.store.almacenes.transacciones.StoreAlmacenUsuario', {
    extend: 'Ext.data.Store',
    model: 'Erp.model.almacenes.transacciones.ModelAlmacenUsuario',
    autoLoad:false,
    pageSize    : 15,
    proxy:{
        type:'ajax',
        url:'data/classes/sis_erp_store.php',
        actionMethods: {
            read: 'POST'
        },
        extraParams:{
            xaction:'readalmacenusuario'
        },
        reader:{
            type:'json',
            root:'results',
            totalProperty:'total'
        }
    }
});






