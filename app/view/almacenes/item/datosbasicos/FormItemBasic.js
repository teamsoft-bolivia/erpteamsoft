
/*
 * @Autor: Pablo Garcia guaman
 * @Email: garcia_guaman_pablo@hotmail.com
 */

Ext.define('Erp.view.almacenes.item.datosbasicos.FormItemBasic', {
    requires:['Erp.store.StoreType'],
    extend: 'Ext.form.Panel',
    alias:'widget.formitembasic',
    layout:'column',
    margin:'5 5 5 5',
    frame:true,
    //height:250,
    initComponent: function() {
        var me = this;
        
        Ext.applyIf(me, {
           items: [
                {
                    xtype: 'fieldset',
                    height: 180,
                    margin: '0 5 0 0',
                    padding: '5 5 5 5',
                    title: '<b>Datos Basicos</b>',
                    columnWidth: 0.4,
                    defaults:{
                        anchor: '100%'
                    },
                    items: [
                        {   xtype:'numberfield',
                            fieldLabel:'iditem',
                            name:'iditem',
                            readOnly:'true',
                            hidden:true
                        },
                        {   xtype:'numberfield',
                            fieldLabel:'identerprise',
                            name:'identerprise',
                            readOnly:'true',
                            hidden:true
                        },
                        {   xtype:'textfield',
                            fieldLabel:'image',
                            name:'image',
                            readOnly:'true',
                            hidden:true
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Codigo Item',
                            name:'code',
                            allowBlank:false
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Descripci&oacute;n',
                            name:'description',
                            allowBlank:false
                        },
                        {
                            xtype: 'combobox',
                            store:Ext.create('Erp.store.StoreType',{}),
                            valueField:'idtype',
                            displayField:'type',
                            fieldLabel: 'Clase Item',
                            name:'classitem',
                            queryMode:'local',
                            editable:false,
                            allowBlank:false
                        },
                        {
                            xtype: 'combobox',
                            store:Ext.create('Erp.store.StoreType',{}),
                            valueField:'idtype',
                            displayField:'type',
                            fieldLabel: 'Tipo Valoraci&oacute;n',
                            editable:false,
                            name:'valuation',
                            queryMode:'local',
                            allowBlank:false
                        },
                        {
                            xtype: 'checkboxfield',
                            fieldLabel: 'Activo',
                            name:'active'
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    height: 180,
                    margin: '0 5 0 0',
                    padding: '5 5 5 5',
                    title: '<b>Mas Datos</b>',
                    columnWidth: 0.4,
                    defaults:{
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Codigo Fabrica',
                            name:'factorycode'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Codigo Barras',
                            name:'barcode'
                        },
                        {
                            xtype: 'numberfield',
                            fieldLabel: 'Costo Estimado',
                            name:'cost'
                        },
                        {
                            xtype: 'numberfield',
                            fieldLabel: 'Factor Utilidad %',
                            name:'utilityfactor'
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    height: 180,
                    title: '<b>Imagen</b>',
                    padding:'5 5 5 5',
                    columnWidth: 0.2,
                    defaults:{
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            height: 120,
                            margin: '0 0 7 0',
                            width: 100,
                            title: '',
                            option:'image',
                            titleCollapse: false
                        },
                        {
                            xtype: 'filefield',
                            anchor: '100%',
                            name:'image'
                        }
                    ]
                }
           ]
        });

        me.callParent(arguments);
    }

});

