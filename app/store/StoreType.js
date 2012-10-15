
/*
 * @Autor: Pablo Garcia guaman
 * @Email: garcia_guaman_pablo@hotmail.com
 */


Ext.define('Erp.store.StoreType', {
    extend: 'Ext.data.Store',
    model:'Erp.model.ModelType',
    autoLoad:false,
    proxy:{
        type:'ajax',
        url:'data/classes/sis_erp_type.php',
        actionMethods: {
           read: 'POST'
        },
        extraParams:{
            xaction:'readbytype',
            type:''
        },
        reader:{
            type:'json',
            root:'results',
            totalProperty:'total'
        }
    }
});

