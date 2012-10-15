
/*
 * @Autor: Pablo Garcia guaman
 * @Email: garcia_guaman_pablo@hotmail.com
 */


Ext.define('Erp.store.configuraciones.StoreListaTiposAsientos', {
    extend: 'Ext.data.Store',
    autoLoad:false,
    model:'Erp.model.configuraciones.ModelListaTiposAsientos',
                    proxy:{
                        type:'ajax',
                        url:'data/classes/sis_erp_type.php',
                        actionMethods: {
                           read: 'POST'
                       },
                        extraParams:{
                            xaction:'readTiposAsientos',
                            fiscal:'fiscal'
                        },
                        reader:{
                            type:'json',
                            root:'results',
                            totalProperty:'total'
                        }
                    }
});

