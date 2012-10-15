

/*
 * @Autor: Pablo Garcia guaman
 * @Email: garcia_guaman_pablo@hotmail.com
 */

Ext.define('Erp.model.almacenes.transacciones.compras.ModelPaymentPlan', {
    extend: 'Ext.data.Model',
    fields: [
                { name: 'idpaymentplan', type: 'int'},
                { name: 'iddocument', type: 'int'},
                { name: 'numberfee', type: 'int'},
                { name: 'datefee', type: 'date'},
                { name: 'amountfee', type: 'float'}
            ]
});

