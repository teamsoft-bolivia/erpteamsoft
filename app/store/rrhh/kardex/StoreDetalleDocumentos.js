/* 
 * @Autor: Max marcelo jimenez T
 * @Email: maxmjt@gmail.com
 */
Ext.define('Erp.store.rrhh.kardex.StoreDetalleDocumentos', {
    extend: 'Ext.data.Store',
    model: 'Erp.model.rrhh.kardex.ModelDetalleDocumentos',
    proxy:{
        
        type: 'ajax',
        url: 'data/classes/sis_erp_business_document.php',
        actionMethods: {
           read: 'POST'
       },
        extraParams:{
            xaction:'read',
            yaction:'readbusinessdocuments'
           
        },
        reader:{
            type:'json',
            root:'results',
            totalProperty:'total'
        },
        autoLoad : false

       

    }
});


