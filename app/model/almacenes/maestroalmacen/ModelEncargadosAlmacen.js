
Ext.define('Erp.model.almacenes.maestroalmacen.ModelEncargadosAlmacen', {
    extend: 'Ext.data.Model',
    fields: [
        
        {name: 'idstoredependent'},
        {name: 'id_person'},
        {name: 'idstore'},
        {name: 'idbranch'},
        {name: 'person_first_name'},
        {name: 'employeename'},
        {name: 'active'},
        {name: 'state', type: 'string' ,defaultValue: 'new'}
        
        
        
        	
    ]
});