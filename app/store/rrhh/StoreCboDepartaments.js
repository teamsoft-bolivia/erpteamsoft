/* 
 * @Autor: Pablo G. Garcia Guaman
 * @Email: garcia_guaman_pablo@hotmail.com
 */
Ext.define('Erp.store.rrhh.StoreCboDepartaments', {
    extend: 'Ext.data.Store',
    model: 'Erp.model.rrhh.ModelCboDepartaments',
    autoLoad:false,
    pageSize    : 15,
    proxy:{
        type:'ajax',

        url:'data/classes/sis_erp_organizational_chart.php',
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






