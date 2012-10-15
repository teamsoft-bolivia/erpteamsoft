Ext.define('Erp.model.ModelPlanCuentas', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idaccountplan',	type: 'int'},
        {name: 'accountcode'},
        {name: 'accountname'},
        {name: 'level',        		type: 'int'},
        {name: 'associated',    	type:'boolean'},
        {name: 'accountfather', 	type: 'int'},
        {name: 'active',        	type : 'boolean'},
        {name: 'datecreated',   	type: 'date', dateFormat: 'n/j h:ia'},
        {name: 'dateupdated',   	type: 'date', dateFormat: 'n/j h:ia'},
        {name: 'debit',         	type: 'float'},
        {name: 'credit',        	type: 'float'},
        {name: 'iduser',        	type: 'int'},
		{name: 'transactional',		type : 'boolean'}
		
    ]
});