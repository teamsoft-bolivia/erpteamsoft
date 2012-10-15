/*
 * @Autor: Pablo Garcia Guaman
 * @Email: garcia_guaman_pablo@hotmail.com
 */
Ext.define('Erp.model.almacenes.item.composition.ModelItemComposition', {
    extend: 'Ext.data.Model',
    fields: [
        
        {name: 'iditemcomposition'},
        {name: 'iditem'},
        {name: 'iditemchild'},
        {name: 'idunitcomposition'},
        {name: 'quantitycomposition'},
        {name: 'active'},
        {name: 'code'},
        {name: 'description'},
        {name: 'unitname'}
        
       
        	
    ]
});
