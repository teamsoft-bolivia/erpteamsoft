
/*
 * @Autor: Pablo Garcia guaman
 * @Email: garcia_guaman_pablo@hotmail.com
 */


Ext.define('Erp.store.almacenes.transacciones.compras.StoreTxnDocument', {
    extend: 'Ext.data.Store',
    model:'Erp.model.almacenes.transacciones.compras.ModelTxnDocument',
    autoLoad:false,
    proxy:{
        type:'ajax',
        url:'data/classes/sis_erpd_txn_document.php',
        actionMethods: {
           read: 'POST'
       },
        extraParams:{
            xaction:'read',yaction:'readlist'
        },
        reader:{
            type:'json',
            root:'results',
            totalProperty:'total'
        }
    }
});
