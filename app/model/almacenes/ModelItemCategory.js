/*
 * @Autor: Max marcelo jimenez T,Crithian Valencia, Pablo Garcia Guaman
 * @Email: maxmjt@gmail.com, fox_tian@hotmail.com ,garcia_guaman_pablo@hotmail.com
 */
Ext.define('Erp.model.almacenes.ModelItemCategory', {
    extend: 'Ext.data.Model',
    fields: [
       
        {name: 'iditem'},
        {name: 'marca'},
        {name: 'modelo'},
        {name: 'rubro'},
        {name: 'familia'},
        {name: 'categoria'},
        {name: 'subcategoria'}
       	
    ]
});