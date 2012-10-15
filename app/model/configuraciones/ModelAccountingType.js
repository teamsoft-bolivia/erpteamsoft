/* 
* @Autor: Max marcelo jimenez T
 * @Email: maxmjt@gmail.com
 */
Ext.define('Erp.model.configuraciones.ModelAccountingType', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idaccountingtype'},
        {name: 'idaccountplan',type: 'int'},
        {name: 'percentage'},
        {name: 'operation'},
        {name: 'debit_credit'},
        {name: 'order'},
        {name: 'identerprise'},
        {name: 'idtypeenterprise'},
        {name: 'accountcode'},
        {name: 'accountname'}
    ]
});


