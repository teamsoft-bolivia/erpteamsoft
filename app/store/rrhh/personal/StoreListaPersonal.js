/* 
 * @Autor: Pablo Garcia Guaman
 * @Email: garcia_guaman_pablo@hotmail.com
 */
Ext.define('Erp.store.rrhh.personal.StoreListaPersonal', {
    extend: 'Ext.data.Store',
    model: 'Erp.model.rrhh.personal.ModelListaPersonal',
    pageSize: 15,
    proxy:{
        
        type: 'ajax',
        actionMethods: {
           read: 'POST'
       },
        extraParams:{
            xaction:'read',
            yaction:'reademployee'
        },
        reader:{
                type:'json',
                root:'results',
                //rootProperty: 'data',
                totalProperty:'total'
            },
        url: 'data/classes/sis_erp_person.php'

    },
    folderSort:true,
    autoLoad: false
});

