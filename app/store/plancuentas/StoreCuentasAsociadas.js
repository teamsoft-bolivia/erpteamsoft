
Ext.define('Erp.store.plancuentas.StoreCuentasAsociadas', {
    extend      : 'Ext.data.Store',
    model       : 'Erp.model.plancuentas.ModelCuentasAsociadas',
    autoLoad    : false,
    alias       : ['widget.storecuentasociadas'],
    pageSize    : 10,
    //autoSync    :true,
    proxy       :{
            type    :'ajax',
            api     :{
                //update  : 'app.php/users/update'
            },
            
            actionMethods: {
                read: 'POST',
                update : 'POST'
            },
            extraParams:{
                    xaction:''
                },
            url     :'',
            reader  :{
                type:'json',
                root:'results',
                totalProperty:'total'
            },
            writer: {
                type: 'json',
                writeAllFields: true,
                //root: 'data',
                zaction : 'update'
            }
    }
   
});

