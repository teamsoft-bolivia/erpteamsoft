/* 
* @Autor: Pablo Garcia Guaman
 * @Email: garciaguamanpablo@gmail.com
 */
Ext.define('Erp.model.rrhh.personal.ModelIdiomas', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idlanguage'},
        {name: 'idemployee'},
        {name: 'language'},
        {name: 'read',type:'int'},
        {name: 'write',type:'int'},
        {name: 'speaking',type:'int'},
        {name: 'maternal'},
        {name: 'readname'},
        {name: 'writename'},
        {name: 'speakingname'},
        ]
});