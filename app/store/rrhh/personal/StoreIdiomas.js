/* 
 * @Autor: Pablo Garcia Guaman
 * @Email: garcia_guaman_pablo@hotmail.com
 */
Ext.define('Erp.store.rrhh.personal.StoreIdiomas', {
    extend: 'Ext.data.Store',
    model: 'Erp.model.rrhh.personal.ModelIdiomas',
    pageSize: 15,
    proxy:{
        
        type: 'ajax',
        actionMethods: {
           read: 'POST'
       },
        extraParams:{
            xaction:'read',
            yaction:''
        },
        reader:{
                type:'json',
                root:'results',
                totalProperty:'total'
            },
        url: 'data/classes/sis_erp_employee_language.php'

    },
    autoLoad: false
});
