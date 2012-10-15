
/*
 * @Autor: Pablo Garcia guaman
 * @Email: garcia_guaman_pablo@hotmail.com
 */


Ext.define('Erp.store.almacenes.transacciones.StoreTxnStore', {
    extend: 'Ext.data.Store',
    model:'Erp.model.almacenes.transacciones.ModelTxnStore',
    autoLoad:false,
    proxy:{
        type:'ajax',
        url:'data/classes/sis_erpd_txn_store.php',
        actionMethods: {
           read: 'POST'
       },
        extraParams:{
            xaction:'readlist',yaction:''
        },
        reader:{
            type:'json',
            root:'results',
            totalProperty:'total'
        }
    }
});
