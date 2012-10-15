
/*
 * @Autor: Pablo Garcia guaman
 * @Email: garcia_guaman_pablo@hotmail.com
 */


Ext.define('Erp.store.almacenes.kardex.StoreDetalleKardex', {
    extend: 'Ext.data.Store',
    model:'Erp.model.almacenes.kardex.ModelDetalleKardex',
    autoLoad:false,
    proxy:{
        type:'ajax',
        url:'data/classes/sis_erpdd_txn_store.php',
        actionMethods: {
           read: 'POST'
       },
        extraParams:{
            xaction:'read',yaction:'readdetailkardex'
        },
        reader:{
            type:'json',
            root:'results',
            totalProperty:'total'
        }
    }
});
