/* 
 * @Autor: Max marcelo jimenez T
 * @Email: maxmjt@gmail.com
 */
Ext.define('Erp.model.rrhh.ModelEstructuraOrganizacional', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idorganizationalchart'},
        {name: 'jobtitle'},
        {name: 'father'},
        {name: 'type'},
        {name: 'vacancies'},
        {name: 'level'},
        {name: 'active'},
        {name: 'salary'}
       
    ]
});