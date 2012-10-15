/* 
 * @Autor: Max marcelo jimenez T
 * @Email: maxmjt@gmail.com
 */
Ext.define('Erp.store.rrhh.StoreEstructuraOrganizacional', {
    extend: 'Ext.data.TreeStore',
    model: 'Erp.model.rrhh.ModelEstructuraOrganizacional',

    proxy:{
        
        type: 'ajax',
        url: 'data/classes/sis_erp_organizational_chart.php',
        actionMethods: {
           read: 'POST'
       },
        extraParams:{
            xaction:'readdepartaments1',
            id:1
        },

        

    },

    folderSort:true,
    autoLoad: false
});