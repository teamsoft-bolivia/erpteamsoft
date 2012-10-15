/* 
* @Autor: Max marcelo jimenez T
 * @Email: maxmjt@gmail.com
 */
Ext.define('Erp.model.configuraciones.ModelMonedas', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idtype'},
        {name: 'type'},
        {name: 'option'},
        {name: 'alias'},
        {name: 'father'},
        {name: 'value'},
        {name: 'primaria'},
       {name: 'secundaria'}
    ]
});


