

/*
 * @Autor: Pablo Garcia guaman
 * @Email: garcia_guaman_pablo@hotmail.com
 */

Ext.define('Erp.model.almacenes.transacciones.compras.ModelTxnDocument', {
    extend: 'Ext.data.Model',
    fields: [
                { name: 'iddocument', type: 'int'},
                { name: 'idtxnstore',type:'int'},
                { name: 'document', type: 'string'},
                { name: 'date',type:'date'},
                { name: 'typedocument'},
                { name: 'methodpayment'},
                { name: 'conditionpayment'},
                { name: 'idprovider'},
                { name: 'idprovidercontact'},
                { name: 'conditiontype'},
                { name: 'conditionquantity'},
                { name: 'conditioninterest'},
                { name: 'interestlate'},
                { name: 'lapsebeforeinterest'},
                { name: 'datefirstpayment',type:'date'},
                { name: 'providername',type:'string'},
                { name: 'contactname',type:'string'},
                { name: 'typedocname',type:'string'},
                { name: 'methodpayname',type:'string'},
                { name: 'conditionpayname',type:'string'},
                { name: 'image',type:'string'},
           ]
});

