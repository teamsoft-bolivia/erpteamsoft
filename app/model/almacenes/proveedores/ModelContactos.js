/*
 * @Autor: Max marcelo jimenez T
 * @Email: maxmjt@gmail.com
 */
Ext.define('Erp.model.almacenes.proveedores.ModelContactos', {
    extend: 'Ext.data.Model',
    fields: [
        
        {name: 'idprovidercontact',type:'int'},
        {name: 'contactname'},
        {name: 'position'},
        {name: 'phones'},
        {name: 'movilephone'},
        {name: 'active'},
        {name: 'idprovider'}
        	
    ]
});