/* 

 */
Ext.define('Erp.model.rrhh.ModelOrganigrama', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idorganizationalchart'},
        {name: 'jobtitle'},
        {name: 'father'},
        {name: 'type'},
        {name: 'vacancies'},
        {name: 'level'},
        {name: 'active'}
       
    ]
});