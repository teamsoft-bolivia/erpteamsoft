

/*
 * @Autor: Pablo Garcia guaman
 * @Email: garcia_guaman_pablo@hotmail.com
 */

Ext.define('Erp.model.almacenes.transacciones.ModelTxnStore', {
    extend: 'Ext.data.Model',
    fields: [
                { name: 'idtxnstore'},
                { name: 'identerprise'},
                { name: 'iduser'},
                { name: 'correlative'},
                { name: 'date', type: 'date'},
                { name: 'txntype', type: 'int'},
                { name: 'concept', type: 'int'},
                { name: 'responsible',type:'int'},
                { name: 'observation', type: 'string'},
                { name: 'state', type: 'int'},
                { name: 'nombretxntype', type: 'string'},
                { name: 'nombreconcept', type: 'string'},
                { name: 'nombrestate', type: 'string'},
                { name: 'nombreresponsible', type: 'string'},
                { name: 'originstore',type:'int'},
                { name: 'originstorename', type: 'string'},
                { name: 'destinationstore',type:'int'},
                { name: 'destinationstorename', type: 'string'}

           ]
});

