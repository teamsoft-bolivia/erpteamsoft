Ext.define('Erp.model.finanzas.ModelTipoCambio', {
    extend: 'Ext.data.Model',
    fields: [
        {name:'idexchangerate',type:'int'},
        {name:'currency',type:'int'},
        {name:'dateexchange',type:'date'},
        {name:'amount',type:'float'}
    ]
});

