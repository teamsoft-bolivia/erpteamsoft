/* 
 * @Autor: Max marcelo jimenez T
 * @Email: maxmjt@gmail.com
 */
Ext.define('Erp.store.almacenes.proveedores.StoreContactos', {
    extend: 'Ext.data.Store',
    model: 'Erp.model.almacenes.proveedores.ModelContactos',
    autoLoad:false,
    proxy:{
        type:'ajax',

        url:'data/classes/sis_erp_provider_contact.php',
        actionMethods: {
        read: 'POST'
    },
        extraParams:{
            xaction:'readContactos'
        },
        reader:{
            type:'json',
            root:'results',
            totalProperty:'total'
        }
    }
});






