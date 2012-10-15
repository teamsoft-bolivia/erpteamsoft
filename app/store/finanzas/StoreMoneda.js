/* 
* @Autor: Max marcelo jimenez T
 * @Email: maxmjt@gmail.com
 */
Ext.define('Erp.store.finanzas.StoreMoneda', {
    extend  : 'Ext.data.Store',
    model   :'Erp.model.finanzas.ModelMoneda',
    autoLoad:false,
    alias   : ['widget.storemoneda'],
    proxy   :{
            type:'ajax',
            actionMethods: {
                read: 'POST'
            },
            extraParams:{
                    xaction:'readtypebyenterprise',yaction:'',type:'tipo_moneda'
                },
            url: 'data/classes/sis_erp_type.php',
            reader:{
                type:'json',
                root:'results',
                totalProperty:'total'
            }
    }
   
});

