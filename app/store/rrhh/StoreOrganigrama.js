/* 
 * @Autor: Max marcelo jimenez T
 * @Email: maxmjt@gmail.com
 */
Ext.define('Erp.store.rrhh.StoreOrganigrama', {
    extend: 'Ext.data.TreeStore',
    model: 'Erp.model.rrhh.ModelOrganigrama',
    proxy:{
        
        type: 'ajax',
        actionMethods: {
           read: 'POST'
       },
        extraParams:{
            xaction:'readdepartaments',
            id:1
        },

        url: 'data/classes/sis_erp_organizational_chart.php'

    },
    folderSort:true,
    autoLoad: true
});


