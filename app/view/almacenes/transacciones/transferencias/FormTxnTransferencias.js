/*
 * @Autor: Pablo Garcia guaman
 * @Email: garcia_guaman_pablo@hotmail.com
 */

Ext.define('Erp.view.almacenes.transacciones.transferencias.FormTxnTransferencias', {
    extend: 'Ext.form.Panel',
    alias:'widget.formtxntransferencias',
    border: true,
    frame:true,
    margin:'2',
    layout: {
        type: 'column'
    },
    initComponent: function() {
        var me = this;
        var combo=Ext.create('Ext.form.field.ComboBox',{
                    store:Ext.create('Erp.store.almacenes.maestroalmacen.StoreListaAlmacenes',{}),
                                labelWidth : 120,
                                fieldLabel: 'Almacen Destino',
                                name:'destinationstore',
                                valueField:'idstore',
                                displayField:'storename',
                                option:'combodestino',
                                queryMode:'local',
                                editable:false,
                                allowBlank:false
        });
        combo.getStore().load();
        Ext.applyIf(me, {
            items: [
                    {
                        xtype: 'fieldset',
                        defaults: {
                            labelWidth: 120,
                            anchor:'100%'
                        },
                        columnWidth: 0.5,
                        margin: '3 3 3 3',
                        padding: '4 4 4 4',
                        title: 'Datos Basicos',
                        items: [
                            {
                                xtype: 'numberfield',
                                name:'idtxnstore',
                                fieldLabel: 'idtxnstore',
                                option:'cabeceraid',
                                hidden:true
                            },/*
                            {
                                xtype: 'numberfield',
                                name:'txntype',
                                fieldLabel: 'txntype',
                                hidden:true
                            },
                            {
                                xtype: 'numberfield',
                                name:'concept',
                                fieldLabel: 'concept',
                                hidden:true
                            },*/
                            {
                                xtype: 'datefield',
                                fieldLabel: 'Fecha',
                                name:'date'
                            },
                            {
                                xtype: 'combobox',
                                store:Ext.create('Erp.store.crm.StoreCrmEmployee',{storeFilter:true}),
                                fieldLabel: 'Encargado Transferencia',
                                name:'responsible',
                                valueField:'id_person',
                                displayField:'employeename',
                                queryMode:'remote',
                                enableKeyEvents:true,
                                minChars:2,
                                //editable:false,
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
                                fieldLabel: 'Almacen Origen',
                                name:'originstore',
                                editable:false,
                                valueField:'idstore',
                                displayField:'storename',
                                option:'comboorigen',
                                queryMode:'local',
                                allowBlank:false
                            },
                            combo
                            
                            /*,
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
                            }*/
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
                                option:'cabeceracorrelativo',
                                name:'correlative'
                            },
                            {
                                xtype: 'combobox',
                                store:Ext.create('Erp.store.StoreType',{}),
                                fieldLabel: 'Estado',
                                name:'state',
                                editable:false,
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