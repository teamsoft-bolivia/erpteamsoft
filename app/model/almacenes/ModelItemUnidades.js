/*
 * @Autor: Max marcelo jimenez T,Crithian Valencia, Pablo Garcia Guaman
 * @Email: maxmjt@gmail.com, fox_tian@hotmail.com ,garcia_guaman_pablo@hotmail.com
 */
Ext.define('Erp.model.almacenes.ModelItemUnidades', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'iditemunit'},
        {name: 'iditem'},
        {name: 'idunit',type:'int'},
        {name: 'unitname'},
        {name: 'idunitcontent'},
        {name: 'unitnamecontent'},
        {name: 'quantity'}
        
        	
    ]
});