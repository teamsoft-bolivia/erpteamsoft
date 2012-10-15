/* 
 * @Autor: Max marcelo jimenez T
 * @Email: maxmjt@gmail.com
 */
Ext.define('Erp.store.almacenes.proveedores.StoreListaProveedores', {
    extend: 'Ext.data.Store',
    model: 'Erp.model.almacenes.proveedores.ModelProveedores',
    autoLoad:false,
    proxy:{
        type:'ajax',

        url:'data/classes/sis_erp_provider.php',
        actionMethods: {
        read: 'POST'
    },
        extraParams:{
            xaction:'readProveedores'
        },
        reader:{
            type:'json',
            root:'results',
            totalProperty:'total'
        }
    }
});






