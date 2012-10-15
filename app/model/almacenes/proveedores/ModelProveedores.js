/*
 * @Autor: Max marcelo jimenez T
 * @Email: maxmjt@gmail.com
 */
Ext.define('Erp.model.almacenes.proveedores.ModelProveedores', {
    extend: 'Ext.data.Model',
    fields: [
        
        {name: 'idprovider'},
        {name: 'providername'},
        {name: 'address'},
       {name: 'datecreated'},
       {name: 'dateupdated'},
       {name: 'iduser'},
       {name: 'active'},
       {name: 'identerprice'},
       {name: 'idcountry'}
        	
    ]
});