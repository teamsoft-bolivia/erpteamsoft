/* 
 * @Autor: Max marcelo jimenez T
 * @Email: maxmjt@gmail.com
 */
Ext.define('Erp.store.almacenes.item.composition.StoreItemCboComposition', {
    extend: 'Ext.data.Store',
    model: 'Erp.model.almacenes.item.composition.ModelItemCboComposition',
    pageSize: 15,
    remoteFilter:true,
    proxy:{
        
        type: 'ajax',
        actionMethods: {
           read: 'POST'
       },
        extraParams:{
            xaction:'readcbocomposition',
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