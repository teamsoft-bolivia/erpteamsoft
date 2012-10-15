/*
 * @Autor: Max marcelo jimenez T,Crithian Valencia, Pablo Garcia Guaman
 * @Email: maxmjt@gmail.com, fox_tian@hotmail.com ,garcia_guaman_pablo@hotmail.com
 */
Ext.define('Erp.model.almacenes.proveedores.ModelCategoriaProveedor', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idcategoryprovider'},
        {name: 'idcategory'},
        {name: 'categoryname'},
        {name: 'idcategoricalgrouping'},
        {name: 'agrupacion_categorica'},
        {name: 'alias'},
        {name: 'active', type:'bol'}
       
        
        	
    ]
});