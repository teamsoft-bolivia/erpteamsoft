/* 
 * @Autor: Pablo G. Garcia Guaman
 * @Email: garcia_guaman_pablo@hotmail.com
 */
Ext.define('Erp.store.rrhh.StoreCboEmployee', {
    extend: 'Ext.data.Store',
    model: 'Erp.model.rrhh.ModelCboEmployee',
    autoLoad:false,
    pageSize    : 15,
    proxy:{
        type:'ajax',

        url:'data/classes/sis_erp_employee.php',
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






