/*
 * @Autor: Pablo Garcia guaman
 * @Email: garcia_guaman_pablo@hotmail.com
 */

Ext.define('Erp.view.almacenes.transacciones.compras.FormTxnCompras', {
    extend: 'Ext.form.Panel',
    requires:['Erp.store.almacenes.transacciones.StoreAlmacenUsuario'],
    alias:'widget.formtxncompras',
    border: true,
    frame:true,
    margin:'5 5 5 5',
    layout: {
        type: 'column'
    },
    trackResetOnLoad:true,
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items: [
                    {
                        xtype: 'fieldset',
                        defaults: {
                            labelWidth: 120,
                            anchor:'100%'
                        },
                        height:162,
                        columnWidth: 0.5,
                        margin: '3 3 3 3',
                        padding: '4 4 4 4',
                        title: 'Datos Basicos',
                        items: [
                            {
                                xtype: 'numberfield',
                                name:'idtxnstore',
                                hidden:true,
                                editable:false,
                                fieldLabel: 'idtxnstore'
                            },
                            {
                                xtype: 'numberfield',
                                name:'txntype',
                                hidden:true,
                                editable:false,
                                fieldLabel: 'txntype'
                            },
                            {
                                xtype: 'numberfield',
                                name:'concept',
                                hidden:true,
                                editable:false,
                                fieldLabel: 'concept'
                            },
                            {
                                xtype: 'datefield',
                                fieldLabel: 'Fecha',
                                allowBlank:false,
                                name:'date'
                            },
                            {
                                xtype: 'combobox',
                                store:Ext.create('Erp.store.crm.StoreCrmEmployee',{storeFilter:true}),
                                fieldLabel: 'Encargado Compra',
                                name:'responsible',
                                valueField:'id_person',
                                displayField:'employeename',
                                queryMode:'remote',
                                enableKeyEvents:true,
                                minChars:2,
                                typeAhead: false,
                                allowBlank:false,
                                matchFieldWidth:false,
                                hideTrigger:true,
                                listeners:{
                                    focus:function(cbo){
                                        
                                    }
                                },
                                listConfig:{
                                    width:200
                                    /*itemTpl : Ext.create('Ext.XTemplate',
                                        '<div style="float:left;width:40%;">{code}</div> <div style="overflow:hidden;white-space: pre;">{description}</div>'
                                    )*/
                                }
                            },
                            {
                                xtype: 'combobox',
                                store:Ext.create('Erp.store.almacenes.transacciones.StoreAlmacenUsuario',{}),
                                fieldLabel: 'Almacen Destino',
                                name:'destinationstore',
                                valueField:'idstore',
                                displayField:'storename',
                                queryMode:'local',
                                editable:false,
                                allowBlank:false
                            },
                            {
                                xtype: 'fieldcontainer',
                                height: 23,
                                fieldLabel: 'Docs. Compra',
                                items: [
                                    {
                                        xtype: 'button',
                                        option:'documents',
                                        iconCls:'right',
                                        text: ''
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        defaults: {
                            labelWidth: 100,
                            anchor:'100%'
                        },
                        columnWidth: 0.5,
                        margin: '3 3 3 0',
                        padding: '4 4 4 4',
                        title: 'Datos Generales',
                        items: [
                            {
                                xtype: 'textfield',
                                anchor: '100%',
                                fieldLabel: 'Correlativo',
                                name:'correlative'
                            },
                            {
                                xtype: 'combobox',
                                store:Ext.create('Erp.store.StoreType',{}),
                                fieldLabel: 'Estado',
                                name:'state',
                                valueField:'idtype',
                                displayField:'type',
                                queryMode:'local',
                                allowBlank:false
                            },
                            {
                                xtype: 'textareafield',
                                anchor: '100%',
                                fieldLabel: 'Observación',
                                name:'observation',
                                height:77
                            }
                        ]
                    }
             ]
        });
        me.callParent(arguments);
    }

});