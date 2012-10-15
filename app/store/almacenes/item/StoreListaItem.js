/* 
 * @Autor: Max marcelo jimenez T
 * @Email: maxmjt@gmail.com
 */
Ext.define('Erp.store.almacenes.item.StoreListaItem', {
    extend: 'Ext.data.Store',
    model: 'Erp.model.almacenes.item.ModelListaItem',
    pageSize: 15,
    proxy:{
        
        type: 'ajax',
        actionMethods: {
           read: 'POST'
       },
        extraParams:{
            xaction:'readitem',
            yaction:''
        },
        reader:{
                type:'json',
                root:'results',
                rootProperty: 'data',
                totalProperty:'total'
            },
        url: 'data/classes/sis_erp_item.php'

    },
    folderSort:true,
    autoLoad: false
});






