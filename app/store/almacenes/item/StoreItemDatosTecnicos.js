/*
 * @Autor: Pablo Garcia Guaman
 * @Email: garcia_guaman_pablo@hotmail.com
 */
Ext.define('Erp.store.almacenes.item.StoreItemDatosTecnicos', {
    extend      : 'Ext.data.Store',
    model       : 'Erp.model.almacenes.item.ModelItemDatosTecnicos',
    autoLoad    : false,
    alias       : ['widget.storeitemdatostecnicos'],
    pageSize    : 5,
    //autoSync    :true,
    proxy       :{
            type    :'ajax',
            actionMethods:'POST',/*{
                read: 'POST',
                update : 'POST'
            },*/
            extraParams:{
                    xaction:'read',yaction:'readdatasheet'
                },
            url     :'data/classes/sis_erp_item_datasheet.php',
            reader  :{
                type:'json',
                root:'results',
                totalProperty:'total'
            }
            /*writer: {
                type: 'json',
                writeAllFields: true,
                
                zaction : 'update'
            }*/
    }
   
});

