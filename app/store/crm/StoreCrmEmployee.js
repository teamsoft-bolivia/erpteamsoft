/* 
 * @Autor: Pablo G. Garcia Guaman
 * @Email: garcia_guaman_pablo@hotmail.com
 */
Ext.define('Erp.store.crm.StoreCrmEmployee', {
    extend: 'Ext.data.Store',
    model: 'Erp.model.crm.ModelCrmEmployee',
    autoLoad:false,
    pageSize    : 15,
    proxy:{
        type:'ajax',

        url:'data/classes/sis_crm_employee.php',
        actionMethods: {
        read: 'POST'
    },
        extraParams:{
            xaction:'readcboemployee'
        },
        reader:{
            type:'json',
            root:'results',
            totalProperty:'total'
        }
    }
});






