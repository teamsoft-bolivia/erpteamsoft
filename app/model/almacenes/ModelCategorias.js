/*
 * @Autor: Max marcelo jimenez T,Crithian Valencia, Pablo Garcia Guaman
 * @Email: maxmjt@gmail.com, fox_tian@hotmail.com ,garcia_guaman_pablo@hotmail.com
 */
Ext.define('Erp.model.almacenes.ModelCategorias', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idcategory'},
        {name: 'categoryname'},
        {name: 'description'},
        {name: 'datecreated'},
        {name: 'idcategoricalgrouping'},
        {name: 'alias'},        
        {name: 'idfather'},
        {name: 'fathercategory'},
        {name: 'active', type:'bol'},
        {name: 'agrupacion_categorica'}
        
        	
    ]
});