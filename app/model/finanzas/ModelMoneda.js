/* 
* @Autor: Pablo Garcia G.
 * @Email: garciaguamanpablo@gmail.com
 */
Ext.define('Erp.model.finanzas.ModelMoneda', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idtype'},
        {name: 'type'},
        {name: 'alias'},
        {name: 'father'},
        {name: 'value'}
    ]
});

