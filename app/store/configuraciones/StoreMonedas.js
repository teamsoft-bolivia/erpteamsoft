/* 
 * @Autor: Max marcelo jimenez T
 * @Email: maxmjt@gmail.com
 */

Ext.define('Erp.store.configuraciones.StoreMonedas', {
    extend: 'Ext.data.Store',
    model: 'Erp.model.configuraciones.ModelMonedas',
    autoSync: false,
    proxy:{
        
        type: 'ajax',
        api:{
            read: 'data/classes/sis_erp_type.php',
            create: 'data/classes/sis_erp_type.php',
            update: 'data/classes/sis_erp_type.php',
            destroy: 'data/classes/sis_erp_type.php'
        },
        actionMethods: {
           read: 'POST',
           create: 'POST',
           update: 'POST',
           destroy: 'POST'
       },
        extraParams:{
            xaction:'readnomenclatura'
        },
        reader:{
                type:'json',
                root:'results',
                rootProperty: 'data',
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



