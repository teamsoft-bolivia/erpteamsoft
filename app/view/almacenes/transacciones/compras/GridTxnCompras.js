/*
 * @Autor: Pablo Garcia guaman
 * @Email: garcia_guaman_pablo@hotmail.com
 */

Ext.define('Erp.view.almacenes.transacciones.compras.GridTxnCompras', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gridtxncompras',
    title: 'Detalle Compra',
    height:220,
    stateEdit:'',
    iddocument:-1,  
    renderGrid:function(value,metaData,record,rowIndex,colIndex,store,view){
        var val;
        if (colIndex==4) {
            val=record.data.code;
        }else if (colIndex==6) {
            val=record.data.unitname;
        }else if (colIndex==8) {
            val =Ext.util.Format.currency(record.data.cost,'$');
        }else if(colIndex==9){
            val=Ext.util.Format.currency(record.data.discount,'$');
        }else if (colIndex==11) {
            val=Ext.util.Format.currency((record.data.quantity*record.data.cost)-record.data.discount,'$');
        }
        
        return val;
    },
    initComponent: function() {
        var me = this;
        
        var cboitem=Ext.create('Ext.form.field.ComboBox',{
            store:Ext.create('Erp.store.almacenes.item.StoreListaItem',{
                remoteFilter:true
            }),
            name:'provideredit',
            queryMode:'remote',
            displayField:'code',
            valueField:'iditem',
            triggerAction:'remote',
            matchFieldWidth:false,
            allowBlank:false,
            enableKeyEvents:true,
            minChars:3,
            typeAhead: false,
            listeners:{
                focus:function(cbo){
                    cbo.selectText();
                },
                select:function(cbo,records,eOps){
                    var gridrecactual=me.getStore().getAt(0)
                    gridrecactual.data.code=records[0].data.code;
                    gridrecactual.data.description=records[0].data.description;
                    cbounit.getStore().getProxy().extraParams={xaction:'readcbo',iditem:records[0].data.iditem};
                    cbounit.getStore().load();
                }
            },
            listConfig:{
                width:350,
                itemTpl : Ext.create('Ext.XTemplate',
                    '<div style="float:left;width:40%;">{code}</div> <div style="overflow:hidden;white-space: pre;">{description}</div>'
                )
            }
        });
        cboitem.getStore().getProxy().extraParams={xaction:'readcboitem',yaction:'',iditem:''}
        cboitem.getStore().load();
        
        var cbounit=Ext.create('Ext.form.field.ComboBox',{
            store:Ext.create('Erp.store.almacenes.StoreItemUnidades',{}),
            name:'idunit',
            valueField:'idunit',
            displayField:'unitname',
            queryMode:'local',
            allowBlank:false,
            editable:false,
            listeners:{
                focus:function(cbo){
                    cbo.selectText();
                },
                select:function(cbo,records,eOpts){
                    var gridrecactual=me.getStore().getAt(0);
                    gridrecactual.data.unitname=records[0].data.unitname;
                }
            }
        });
        
        var txtcost=Ext.create('Ext.form.field.Number',{
            hideTrigger:true,
            allowBlank:false,
            minValue:0
        });


        Ext.applyIf(me, {
            store:Ext.create('Erp.store.almacenes.transacciones.StoreDTxnStore',{storeId:'storedtxnstore'}),
            columns: [
                {header : '#',xtype  : 'rownumberer'},
                {header:'iddtxnstore',dataIndex: 'iddtxnstore',hidden:true},
                {header:'idtxnstore',dataIndex: 'idtxnstore',hidden:true},
                {header:'iddocument',dataIndex: 'iddocument',hidden:true},
                {header:'Codigo Item',dataIndex: 'iditem',width:120,editor:cboitem,renderer:this.renderGrid},
                {header:'Descripci&oacute;n Item',dataIndex: 'description',width:230},
                {header:'Unidad',dataIndex: 'idunit',width:80,editor:cbounit,renderer:this.renderGrid},
                {header:'Cantidad',dataIndex: 'quantity',width:60,editor:{xtype:'numberfield',hideTrigger:true,allowBlank:false,minValue:0}},
                {header:'Costo',dataIndex: 'cost',width:60,editor:txtcost,renderer:this.renderGrid},
                {header:'Descuento',dataIndex: 'discount',width:60,renderer:this.renderGrid,editor:{xtype:'numberfield',hideTrigger:true,minValue:0}},
                {header:'destinationstore',dataIndex: 'destinationstore',width:60,hidden:true},
                {header:'Total',dataIndex: '',width:80,renderer:this.renderGrid},
                {
                            xtype: 'actioncolumn',
                            alias:'actiondelete',
                            width: 30,
                            items: [
                                {
                                    iconCls:'icon-delete',
                                    icon:'resources/images/delete.gif',
                                    tooltip:'Eliminar detalle'
                                }
                            ]
                        }
                
            ],
            plugins:[Ext.create('Ext.grid.plugin.RowEditing',{
                        clicksToEdit:2,
                        errorSummary:false,
                        saveBtnText:'Aceptar',
                        cancelBtnText:'Cancelar'
                    })
            ],
            viewConfig: {
                
            },
            dockedItems: [
                /*{
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    width: 360,
                    displayInfo: true
                }*/
            ],
            tbar:[{
                pressed  :   true,
                text     :   'Agregar Item',
                tooltip  :   'Agregar Item a la Compra',
                iconCls  :   'btnNew',
                option   :   'addItem'
            },'-',{
                xtype:'label',
                fieldLabel:'',
                style:'font-weight:bolder;'
            }],
        bbar : [
                   '->',
                    {
                        xtype   : 'label',
                        text    : 'Total Items: ',
                        margin  : '5',
                        cls     : 'totales'
                    },
                    {
                        xtype   : 'label',
                        text    : '',
                        margin  : '5',
                        option  : 'labelitems',
                        cls     : 'totales'
                    },'-',
                    {
                        xtype   : 'label',
                        text    : 'Total General: ',
                        margin  : '5',
                        cls     : 'totales'
                    },
                    {
                        xtype   : 'label',
                        text    : '',
                        margin  : '5',
                        option  : 'labeltotal',
                        cls     : 'totales'
                    },'-'
            ]
        });

        me.callParent(arguments);
    }

});