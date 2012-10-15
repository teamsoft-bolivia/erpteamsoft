/*

 */
Ext.define('Erp.model.crm.ModelCrmEmployee', {
    extend: 'Ext.data.Model',
    fields: [
       {name:'id_person', type: 'long'},
       'employee_code',
       {name:'person_first_name'},
       'person_middle_name',
       'person_last_name',
       'person_dni',
       'person_dni_location',
       'id_enterprise',
       'employeename'
    ]
});