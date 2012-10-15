/* 
* @Autor: Max marcelo jimenez T
 * @Email: maxmjt@gmail.com
 */
Ext.define('Erp.store.finanzas.StoreTipoCambio', {
    extend  : 'Ext.data.Store',
    model   :'Erp.model.finanzas.ModelTipoCambio',
    autoLoad:false,
    alias   : ['widget.storetipocambio'],
    proxy   :{
            type:'ajax',
            actionMethods: {
                read: 'POST'
            },
            extraParams:{
                    xaction:'read',yaction:'readlist',currency:''
                },
            url: 'data/classes/sis_erp_exchange_rate.php',
            reader:{
                type:'json',
                root:'results',
                totalProperty:'total'
            }
    }
   
});

