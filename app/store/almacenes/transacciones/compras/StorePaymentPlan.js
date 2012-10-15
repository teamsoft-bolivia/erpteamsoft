/*
 * @Autor: Pablo Garcia guaman
 * @Email: garcia_guaman_pablo@hotmail.com
 */


Ext.define('Erp.store.almacenes.transacciones.compras.StorePaymentPlan', {
    extend: 'Ext.data.Store',
    model:'Erp.model.almacenes.transacciones.compras.ModelPaymentPlan',
    autoLoad:false,
    proxy:{
        type:'ajax',
        url:'data/classes/sis_erpdd_payment_plan.php',
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
