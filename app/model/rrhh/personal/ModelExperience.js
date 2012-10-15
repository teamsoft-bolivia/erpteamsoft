/* 
* @Autor: Pablo Garcia Guaman
 * @Email: garciaguamanpablo@gmail.com
 */
Ext.define('Erp.model.rrhh.personal.ModelExperience', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idexperience'},
        {name: 'idemployee'},
        {name: 'entry'},
        {name: 'enterprise'},
        {name: 'jobtitle'},
        {name: 'description'},
        {name: 'datestart',type:'date'},
        {name: 'dateend',type:'date'},
        {name: 'contactperson'},
        {name: 'referencephone'},
        {name: 'referenceemail'},
        {name: 'exitreason'},
        ]
});