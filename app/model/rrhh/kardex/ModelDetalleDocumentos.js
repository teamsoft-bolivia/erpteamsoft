/*
 * @Autor: Pablo Garcia guaman, Cristhian Valencia, Max Jimenez 
 * @Email: garcia_guaman_pablo@hotmail.com, fox_tian@hotmail.com
 */

Ext.define('Erp.model.rrhh.kardex.ModelDetalleDocumentos', {
    extend: 'Ext.data.Model',
    fields: [
                { name: 'iddocumentissued', type: 'int'},
                { name: 'idemployee', type: 'int'},
                { name: 'issuedate'},
                { name: 'idbusinessdocument'},
                { name: 'code'},
                { name: 'documentname'},
                { name: 'description'},
                { name: 'type', type: 'int'},
                { name: 'file'},
                { name: 'active', type:'bool'}
                    
               
    ]

});

