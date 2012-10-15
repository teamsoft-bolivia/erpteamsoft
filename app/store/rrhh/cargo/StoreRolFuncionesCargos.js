/* 
 * @Autor: Max marcelo jimenez T
 * @Email: maxmjt@gmail.com
 */
Ext.define('Erp.store.rrhh.cargo.StoreRolFuncionesCargos', {
    extend: 'Ext.data.Store',
    model: 'Erp.model.rrhh.cargo.ModelCaracteristicasCargos',
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
                rootProperty: 'data',
                totalProperty:'total'
            },
        url: 'data/classes/sis_erp_features_position.php'

    },
    folderSort:true,
    autoLoad: false
});