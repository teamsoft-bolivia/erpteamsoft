/* 
* @Autor: Max marcelo jimenez T
 * @Email: maxmjt@gmail.com
 */
Ext.define('Erp.store.StorePlanCuentas', {
    extend  : 'Ext.data.Store',
    model   :'Erp.model.ModelPlanCuentas',
    autoLoad:false,
    alias   : ['widget.storeplancuentas'],
    proxy   :{
            type:'ajax',
            actionMethods: {
                read: 'POST'
            },
            extraParams:{
                    xaction:''
                },
            url:'',
            reader:{
                type:'json',
                root:'results',
                totalProperty:'total'
            }
    }
   
});

