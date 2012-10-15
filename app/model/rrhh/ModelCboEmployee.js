/*

 */
Ext.define('Erp.model.rrhh.ModelCboEmployee', {
    extend: 'Ext.data.Model',
    fields: [
       {name:'idemployee'},
       {name:'idperson'},
       {name:'code'},
       {name:'pretensewage'},
       {name:'positionpostulation'},
       {name:'datepostulation'},
       {name:'state'},
       {name: 'photo'},
       {name:'employeename'}
    ]
});