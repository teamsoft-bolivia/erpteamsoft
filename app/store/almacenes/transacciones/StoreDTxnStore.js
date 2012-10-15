
/*
 * @Autor: Pablo Garcia guaman
 * @Email: garcia_guaman_pablo@hotmail.com
 */


Ext.define('Erp.store.almacenes.transacciones.StoreDTxnStore', {
    extend: 'Ext.data.Store',
    model:'Erp.model.almacenes.transacciones.ModelDTxnStore',
    autoLoad:false,
    proxy:{
        type:'ajax',
        url:'data/classes/sis_erpdd_txn_store.php',
        actionMethods: {
           read: 'POST'
       },
        extraParams:{
            xaction:'read',yaction:'readdetail'
        },
        reader:{
            type:'json',
            root:'results',
            totalProperty:'total'
        }
    }
});
