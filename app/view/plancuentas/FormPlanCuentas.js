
/*
 * @Autor: Pablo Garcia guaman
 * @Email: garcia_guaman_pablo@hotmail.com
 */

Ext.define('Erp.view.plancuentas.FormPlanCuentas' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.formplancuentas',
    requires:['Erp.store.StoreType'],
    margin: '5 5 5 5',
    height:380,
    frame:true,
    
initComponent: function() {
        var me = this;
        
        Ext.applyIf(me, {
        items: [{xtype:'fieldset',
            title:'Datos de la Cuenta',
            height:370,
             defaults: {
                width: 300,
                labelWidth: 100,
                layout:'anchor'
            },
            defaultType: 'textfield',
            items:[{
                        fieldLabel  : 'idaccountplan',
                        name        : 'idaccountplan',
                        hidden:true
                    },
                    {
                        fieldLabel  : 'accountfather',
                        name        : 'accountfather',
                        hidden:true
                    },
                    {
                        fieldLabel  : 'Cuenta Mayor',
                        name        : 'fathername'
                    },{
                        fieldLabel  : 'Codigo Cuenta',
                        name        : 'accountcode',
                        allowBlank  : true
                    },{
                        fieldLabel  : 'Nombre Cuenta',
                        name        : 'accountname',
                        allowBlank  : false
                    },{
                        xtype       :'combobox',
                        store       :Ext.create('Erp.store.StoreType',{}),
                        fieldLabel  : 'Moneda',
                        name        : 'currency',
                        valueField  :'idtype',
                        displayField:'type',
                        queryMode   :'local',
                        allowBlank  : false
                    },{
                        xtype       : 'numberfield',
                        fieldLabel  : 'Nivel',
                        name        : 'level',
                        width       :150
                    },{
                        xtype       :'checkbox',
                        fieldLabel  :'Transaccional',
                        name        :'transactional'
                    },{
                        xtype       : 'checkbox',
                        fieldLabel  : 'Cuenta Asociada',
                        name        : 'associated'
                    },{
                        xtype       :'checkbox',
                        fieldLabel  : 'Activo',
                        name        : 'active'
                    }]
        }]   
        });

        me.callParent(arguments);
    }

});
