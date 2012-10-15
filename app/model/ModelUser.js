

/*
 * @Autor: Pablo Garcia guaman
 * @Email: garcia_guaman_pablo@hotmail.com
 */

Ext.define('Erp.model.ModelUser', {
    extend: 'Ext.data.Model',
    fields: [
                { name: 'iduser', type: 'int'},
                { name: 'login', type: 'string'},
                { name: 'password', type: 'string'},
                { name: 'active', type: 'boolean'}
           ]
});
