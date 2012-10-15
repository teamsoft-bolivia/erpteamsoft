/* 
 * @Autor: Max marcelo jimenez T
 * @Email: maxmjt@gmail.com
 */
Ext.define('Erp.store.StoreCboBranch', {
    extend  : 'Ext.data.Store',
    model   : 'Erp.model.ModelCboBranch',
    autoLoad:true,
    proxy   :{
        type:'ajax',

        url:'data/classes/sis_crm_branch.php',
        actionMethods: {
        read: 'POST'
        },
        extraParams:{
            xaction:'readcbobranch'
        },
        reader:{
            type:'json',
            root:'results',
            totalProperty:'total'
        }
    }
});






