/*
 * @Autor: Max M. jimenez tarana
 * @Email: maxmjt@hotmail.com
 */

Ext.define('Erp.view.almacenes.transacciones.recepciontransferencias.FormTxnRecepcionTransferencias', {
    extend: 'Ext.form.Panel',
    alias:'widget.formtxnrecepciontransferencias',
    border: true,
    frame:true,
    margin:'2',
    layout: {
        type: 'column'
    },
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
                            },
                            {
                                xtype: 'datefield',
                                fieldLabel: 'Fecha',
                                name:'date'
                            },
                            {
                                xtype: 'combobox',
                                store:Ext.create('Erp.store.crm.StoreCrmEmployee',{storeFilter:true}),
                                fieldLabel: 'Responsable Transferencia',
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
                                forceSelection : true,
                                listConfig:{
                                    width:200
                                  
                                }
                            },
                            
                            {
                                xtype: 'combobox',
                                store:Ext.create('Erp.store.almacenes.transacciones.StoreAlmacenUsuario',{}),
                                fieldLabel: 'Almacen Origen',
                                name:'destinationstore',
                                editable:false,
                                valueField:'idstore',
                                displayField:'storename',
                                option:'comboorigen',
                                queryMode:'local',
                                allowBlank:false
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