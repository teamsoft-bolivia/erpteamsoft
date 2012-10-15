/*
 * @Autor: Pablo Garcia guaman, Cristhian Valencia, Max Jimenez 
 * @Email: garcia_guaman_pablo@hotmail.com, fox_tian@hotmail.com
 */

Ext.define('Erp.view.almacenes.transacciones.entradas.FormTxnEntradas', {
    extend  : 'Ext.form.Panel',
    alias   :'widget.formtxnentradas',
    border  : true,
    frame   :true,
    margin  :'2',
    layout: {
        type: 'column'
    },
    initComponent: function() {
        var me = this;
        var cboalmacen=Ext.create('Ext.form.field.ComboBox',{
                store:Ext.create('Erp.store.almacenes.transacciones.StoreAlmacenUsuario',{}),
                fieldLabel: 'Almacen Destino',
                name:'destinationstore',
                valueField:'idstore',
                displayField:'storename',
                queryMode:'local',
                editable : false,
                allowBlank:false,
                listeners :{
                    select : function(combo,record,eOpts){
                      
                    }
                }
                          
        })
       
        
        Ext.applyIf(me, {
            items: [
                    {
                        xtype: 'fieldset',
                        defaults: {
                            
                           
                        },
                        columnWidth: 0.5,
                        margin: '3 3 3 3',
                        padding: '4 4 4 4',
                        title: 'Datos Basicos',
                        defaults :{
                            labelWidth:100,
                             anchor:'100%'
                        }, 
                        items: [
                            {
                                xtype   : 'numberfield',
                                name    :'idtxnstore',
                                fieldLabel: 'idtxnstore',
                                hidden    : true
                            },
                            {
                                xtype       : 'datefield',
                                fieldLabel  : 'Fecha',
                                name        : 'date',
                                allowBlank  : false,
                                editable    : false
                            },
                            cboalmacen,
                                                        
                            {
                                xtype: 'combobox',
                                store:Ext.create('Erp.store.crm.StoreCrmEmployee',{storeFilter:true}),
                                fieldLabel: 'Responsable',
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
                                store:Ext.create('Erp.store.StoreType',{}),
                                fieldLabel: 'Concepto',
                                name:'concept',
                                valueField:'idtype',
                                displayField:'type',
                                queryMode:'local',
                                editable : false,
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
                                height:50
                            }
                        ]
                    }
             ]
        });
        me.callParent(arguments);
    }

});