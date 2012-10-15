/* 
* @Autor: Pablo Garcia Guaman
 * @Email: garciaguamanpablo@gmail.com
 */
Ext.define('Erp.model.rrhh.personal.ModelFormacionAcademica', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idacademictraining'},
        {name: 'idemployee'},
        {name: 'career'},
        {name: 'academiclevel'},
        {name: 'institution'},
        {name: 'datestart',type:'date'},
        {name: 'dateend',type:'date'},
        {name: 'document'}
        ]
});