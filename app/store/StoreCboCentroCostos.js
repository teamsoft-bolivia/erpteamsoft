/* 
 * @Autor: Max marcelo jimenez T
 * @Email: maxmjt@gmail.com
 */
Ext.define('Erp.store.StoreCboCentroCostos', {
    extend  : 'Ext.data.Store',
    model   : 'Erp.model.ModelCboCentroCostos',
    autoLoad:true,
    pageSize: 15,
    proxy   :{
        type:'ajax',

        url:'data/classes/sis_erp_account_plan.php',
        actionMethods: {
        read: 'POST'
        },
        extraParams:{
            xaction:'readcbocentrocostos'
        },
        reader:{
            type:'json',
            root:'results',
            totalProperty:'total'
        }
    }
});






