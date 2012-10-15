/*
 * @Autor: Max marcelo jimenez T,Crithian Valencia, Pablo Garcia Guaman
 * @Email: maxmjt@gmail.com, fox_tian@hotmail.com ,garcia_guaman_pablo@hotmail.com
 */
Ext.define('Erp.model.plancuentas.ModelCuentasAsociadas', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idaccountassociated'},
        {name: 'id'},
        {name: 'code'},
        {name: 'name'},
        {name: 'asociada', type:'bool'}
        	
    ]
});