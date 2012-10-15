/*
 * @Autor: Pablo Garcia guaman, Cristhian Valencia, Max Jimenez 
 * @Email: garcia_guaman_pablo@hotmail.com, fox_tian@hotmail.com
 */

Ext.define('Erp.model.almacenes.kardex.ModelDetalleKardex', {
    extend: 'Ext.data.Model',
    fields: [
                { name: 'iddtxnstore', type: 'int'},
                { name: 'correlative', type: 'int'},
                { name: 'date'},
                { name: 'concept'},
                { name: 'conceptname'},
                { name: 'responsable'},
                { name: 'responsablename'},
                { name: 'txntype', type: 'int'},
                { name: 'quantity', type: 'int'},
                { name: 'ingreso', type:'int'},
                { name: 'salida', type:'int'},
                { name: 'cost'},
                { name: 'ingresos', type:'int'},
                { name: 'egresos', type:'float'},
                { name: 'saldo', type:'float'},
                { name: 'saldovalorado', type:'float'}
               
    ]

});

