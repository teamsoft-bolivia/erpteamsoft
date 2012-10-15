/* 
 * @Autor: Pablo G. Garcia Guaman
 * @Email: garcia_guaman_pablo@hotmail.com
 */
Ext.define('Erp.store.StoreCboPeriod', {
    extend: 'Ext.data.Store',
    model: 'Erp.model.ModelCboPeriod',
    autoLoad:false,
    pageSize    : 15,
    proxy:{
        type:'ajax',

        url:'data/classes/sis_erp_period.php',
        actionMethods: {
        read: 'POST'
    },
        extraParams:{
            xaction:'readcbodepartaments'
        },
        reader:{
            type:'json',
            root:'results',
            totalProperty:'total'
        }
    }
});






