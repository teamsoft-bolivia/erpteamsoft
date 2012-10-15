/* 
 * @Autor: Max marcelo jimenez T
 * @Email: maxmjt@gmail.com
 */
Ext.define('Erp.store.rrhh.planilla.StorePlanilla', {
    extend: 'Ext.data.Store',
    model: 'Erp.model.rrhh.planilla.ModelPlanilla',
    proxy:{
        
        type: 'ajax',
        url: 'data/classes/sis_erpd_salary_discount.php',
        actionMethods: {
           read: 'POST'
       },
        extraParams:{
            xaction:'read'
           
        },
        reader:{
            type:'json',
            root:'results',
            totalProperty:'total'
        },
        autoLoad : false

       

    }
});


