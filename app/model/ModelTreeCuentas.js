/* 
* @Autor: Max marcelo jimenez T
 * @Email: maxmjt@gmail.com
 */
Ext.define('Erp.model.ModelTreeCuentas', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idaccountplan'},
        {name: 'accountcode'},
        {name: 'accountfather'},
        {name: 'fathername'},
        {name: 'accountname'},
        {name: 'level'},
        {name: 'associated'},
        {name: 'active'},
        {name: 'debit'},
        {name: 'credit'},
        {name: 'iduser'},
        {name: 'transactional'},
        {name: 'fathername'},
        {name: 'currency'},
        {name: 'xaction'},
       
    ]
});