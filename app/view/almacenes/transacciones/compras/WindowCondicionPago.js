Ext.define('Erp.view.almacenes.transacciones.compras.WindowCondicionPago', {
    extend: 'Ext.window.Window',
    alias: 'widget.windowcondicionpago',
    requires:['Erp.store.almacenes.transacciones.compras.StorePaymentPlan'],
    border: false,
    frame: false,
    height: 400,
    width: 592,
    resizable: false,
    header: true,
    headerPosition: 'left',
    title: 'Condiciones de Pago',
    modal: true,
    stateMode:'R',
    renderGrid:function(value,metaData,record,rowIndex,colIndex,store,view){
                                var val;
                                if (colIndex==3) {
                                    val=Ext.util.Format.date(value,'d-m-Y');
                                }
                                return val;

                            },
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'buttongroup',
                            group:'edicion',
                            title: 'Edici&oacute;n',
                            columns: 3,
                            items: [
                                {
                                    xtype: 'button',
                                    iconCls: 'btnedit',
                                    text: 'Editar',
                                    option:'btnEditar'
                                },
                                {
                                    xtype: 'button',
                                    iconCls: 'btnsave',
                                    text: 'Guardar',
                                    option:'btnGuardar'
                                },
                                {
                                    xtype: 'button',
                                    iconCls: 'btncancel',
                                    text: 'Cancelar',
                                    option:'btnCancelar'
                                }
                            ]
                        }
                    ]
                }
            ],
            items: [
                {
                    xtype: 'panel',
                    border: false,
                    layout: {
                        align: 'stretch',
                        type: 'hbox'
                    },
                    items: [
                        {
                            xtype: 'form',
                            border: 0,
                            height: 395,
                            bodyPadding: 10,
                            items: [
                                {
                                    xtype: 'fieldset',
                                    height: 185,
                                    width: 266,
                                    title: 'Condiciones',
                                    defaults:{
                                        anchor:'100%',
                                        labelWidth:120
                                    },
                                    items: [
                                        {
                                            xtype: 'radiogroup',
                                            items: [
                                                {
                                                    xtype: 'radiofield',
                                                    name: 'conditiontype',
                                                    boxLabel: 'Días',
                                                    checked: true,
                                                    inputValue:'dia'
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    name: 'conditiontype',
                                                    boxLabel: 'Meses',
                                                    inputValue:'mes'
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    name: 'conditiontype',
                                                    boxLabel: 'Años',
                                                    inputValue:'año'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'numberfield',
                                            fieldLabel: 'iddocument',
                                            name: 'iddocument',
                                            hideTrigger:true,
                                            hidden:true
                                        },
                                        {
                                            xtype: 'numberfield',
                                            fieldLabel: 'Plazo',
                                            name:'conditionquantity',
                                            allowBlank:false,
                                            hideTrigger:true,
                                            minValue:0
                                        },
                                        {
                                            xtype: 'numberfield',
                                            fieldLabel: 'Monto',
                                            name:'amount',
                                            hideTrigger:true,
                                            minValue:0
                                        },
                                        {
                                            xtype:'datefield',
                                            fieldLabel:'Fecha 1er Pago',
                                            name:'datefirstpayment',
                                            allowBlank:false
                                        },
                                        {
                                            xtype:'checkbox',
                                            fieldLabel:'Interes sobre el saldo',
                                            name:'interestbalance',
                                            checked:true,
                                            allowBlank:false
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    height: 118,
                                    width: 266,
                                    title: 'Intereses',
                                    defaults:{
                                        anchor:'100%',
                                        labelWidth:120
                                    },
                                    items: [
                                        {
                                            xtype: 'numberfield',
                                            fieldLabel: '% Interes',
                                            allowBlank:false,
                                            hideTrigger:true,
                                            name:'conditioninterest',
                                            minValue:0
                                        },
                                        {
                                            xtype: 'numberfield',
                                            fieldLabel: '% Interes x Mora',
                                            allowBlank:false,
                                            hideTrigger:true,
                                            name:'interestlate',
                                            minValue:0
                                        },
                                        {
                                            xtype: 'numberfield',
                                            fieldLabel: 'D&iacute;as Plazo',
                                            allowBlank:false,
                                            name:'lapsebeforeinterest',
                                            hideTrigger:true,
                                            minValue:0
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'gridpanel',
                            margin: '5 5 5 0',
                            width: 270,
                            height:318,
                            title: 'Plan de Pagos',
                            store:Ext.create('Erp.store.almacenes.transacciones.compras.StorePaymentPlan',{}),
                            
                            columns: [
                                {header:'idpaymentplan',dataIndex: 'idpaymentplan',hidden:true},
                                {header:'iddocument',dataIndex: 'iddocument',hidden:true},
                                {header:'Cuota',dataIndex: 'numberfee',width:60},
                                {header:'Fecha',dataIndex: 'datefee',width:80,renderer:this.renderGrid},
                                {header:'Monto',dataIndex: 'amountfee',width:80},
                                {
                                    xtype: 'actioncolumn',
                                    width: 30,
                                    items: [
                                        {

                                        },
                                        {

                                        }
                                    ]
                                }
                            ],
                            viewConfig: {
                                    
                            }
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});