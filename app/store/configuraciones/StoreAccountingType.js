/* 
 * @Autor: Max marcelo jimenez T
 * @Email: maxmjt@gmail.com
 */

Ext.define('Erp.store.configuraciones.StoreAccountingType', {
    extend: 'Ext.data.Store',
    model: 'Erp.model.configuraciones.ModelAccountingType',
    autoSync: false,
    proxy:{
        
        type: 'ajax',
        api:{
            read: 'data/classes/sis_erp_accounting_type.php',
            create: 'data/classes/sis_erp_accounting_type.php',
            update: 'data/classes/sis_erp_accounting_type.php',
            destroy: 'data/classes/sis_erp_accounting_type.php'
        },
        actionMethods: {
           read: 'POST',
           create: 'POST',
           update: 'POST',
           destroy: 'POST'
       },
        extraParams:{
            xaction:'readaccountingtype',
            idtipo:''
        },
        reader:{
                type:'json',
                root:'results',
                rootProperty: 'results',
                totalProperty:'total'
            },
        write:{
                type: 'POST',
                writeAllFields: true,
                root: 'data',
                encode: false
            }//,
        //url: 'data/classes/sis_erp_account_plan.php'
        
    },
    folderSort:true,
    autoLoad: false
});



