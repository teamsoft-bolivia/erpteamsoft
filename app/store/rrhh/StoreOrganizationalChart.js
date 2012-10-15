/* 
 * @Autor: Pablo Garcia guaman  
 * @Email: garciaguamanpablo@gmail.com
 */
Ext.define('Erp.store.rrhh.StoreOrganizationalChart', {
    extend: 'Ext.data.Store',
    model: 'Erp.model.rrhh.ModelEstructuraOrganizacional',
    autoLoad:false,
    proxy:{
        
        type: 'ajax',
        url: 'data/classes/sis_erp_organizational_chart.php',
        actionMethods: {
           read: 'POST'
       },
        extraParams:{
            xaction:'readpositions'
        },
        reader:{
            type:'json',
            root:'results',
            totalProperty:'total'
        }
    }
});