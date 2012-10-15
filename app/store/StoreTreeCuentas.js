/* 
 * @Autor: Max marcelo jimenez T
 * @Email: maxmjt@gmail.com
 */
Ext.define('Erp.store.StoreTreeCuentas', {
    extend: 'Ext.data.TreeStore',
    model: 'Erp.model.ModelTreeCuentas',
    proxy:{
        
        type: 'ajax',
        actionMethods: {
           read: 'POST'
       },
        extraParams:{
            xaction:'readbytype',
            id:1
        },

        url: 'data/classes/sis_erp_account_plan.php'

    },
    folderSort:true,
    autoLoad: false
});


