/*
 * @Autor: Max marcelo jimenez T
 * @Email: maxmjt@gmail.com
 */
Ext.define('Erp.model.almacenes.maestroalmacen.ModelListaAlmacenes', {
    extend: 'Ext.data.Model',
    fields: [
        
        {name: 'idstore'},
        {name: 'storename'},
        {name: 'description'},
        {name: 'storetype'},
        {name: 'costcenter'},
        {name: 'datecreated'},
        {name: 'iduser'},
        {name: 'idbranch'},
        {name: 'identerprise'},
        {name: 'active'}
        	
    ]
});