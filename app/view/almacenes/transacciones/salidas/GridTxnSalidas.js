/*
 * @Autor: Max Marcelo Jimenez Tarana
 * @Email: maxmjt@hotmail.com
 */

Ext.define('Erp.view.almacenes.transacciones.salidas.GridTxnSalidas', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gridtxnsalidas',
    title: 'Detalle salidas',
    height:220,
    idorigen:'',
    renderGrid:function(value,metaData,record,rowIndex,colIndex,store,view){
        var val;
        if (colIndex==4) {
            val=record.data.code;
        }else if (colIndex==6) {
            val=record.data.unitname;
        } if(colIndex==11){
            val=record.data.destinationname;
        }else if (colIndex==10) {
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
                    cbo.getStore().getProxy().extraParams.iditem=cbo.getValue();
                    cbo.getStore().load();
                    cbo.selectText();
                },
                select:function(cbo,records,eOps){
                    
                    
                    //console.log(me.idorigen);
                    var gridrecactual=me.getStore().getAt(0);
                    gridrecactual.data.code=records[0].data.code;
                    gridrecactual.data.description=records[0].data.description;
                    cbounit.getStore().getProxy().extraParams={xaction:'readunitquantity',iditem:records[0].data.iditem,idstore:me.idorigen};
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
        var max=0;
        var cbounit=Ext.create('Ext.form.field.ComboBox',{
            store:Ext.create('Erp.store.almacenes.StoreItemUnidades',{}),
            name:'idunit',
            valueField:'idunit',
            displayField:'unitname',
            queryMode:'local',
            editable:false,
            allowBlank:false,
            listeners:{
                select:function(cbo,records,eOpts){
                    var gridrecactual=me.getStore().getAt(0);
                    var cadena=records[0].data.unitname;
                    gridrecactual.data.unitname=records[0].data.unitname;
                    var div=cadena.split(" ");
                    max=div[1];
                    //console.log(div[1]);
                    quantity.setMaxValue(max);
                }
            }
        });
        
        var quantity=Ext.create('Ext.form.field.Number',{
            anchor: '100%',
            name: 'quantity',
            //fieldLabel: 'quantity',
            //value: 99,
            //maxValue: 99,
            minValue: 1,
            hideTrigger:true,
            allowBlank:false,
            listeners:{
                keyup:function(thiss, e , eOpts){
                    
                    console.log(max);
                    
                }
            }
        });
        
        /*
        var combo=Ext.create('Ext.form.field.ComboBox',{
                    store:Ext.create('Erp.store.almacenes.maestroalmacen.StoreListaAlmacenes',{}),
                                //fieldLabel: 'Almacen Origen',
                                name:'destinationstore',
                                valueField:'idstore',
                                displayField:'storename',
                                option:'comboorigen',
                                queryMode:'local',
                                allowBlank:false
        });
        
         combo.getStore().load();*/
       
        
        var txtcost=Ext.create('Ext.form.field.Number',{
            hideTrigger:true
        });


        Ext.applyIf(me, {
            store:Ext.create('Erp.store.almacenes.transacciones.StoreDTxnStore',{storeid:'gridtransferencias'}),
            columns: [
                {header : '#',xtype  : 'rownumberer'},
                {header:'iddtxnstore',dataIndex: 'iddtxnstore',hidden:true},
                {header:'idtxnstore',dataIndex: 'idtxnstore',hidden:true},
                {header:'iddocument',dataIndex: 'iddocument',hidden:true},
                {header:'Codigo Item',dataIndex: 'iditem',width:150,editor:cboitem,renderer:this.renderGrid},
                {header:'Descripci&oacute;n Item',dataIndex: 'description',width:90},
                {header:'Unidad',dataIndex: 'idunit',width:60,editor:cbounit,renderer:this.renderGrid},
                {header:'Cantidad',dataIndex: 'quantity',width:60,editor:quantity},//{xtype:'numberfield',hideTrigger:true}
                {header:'Costo',dataIndex: 'cost',width:60/*,editor:txtcost*/},
                {header:'Descuento',dataIndex: 'discount',width:60,editor:{xtype:'numberfield',hideTrigger:true}},
                {header:'Total',dataIndex: '',width:80,renderer:this.renderGrid},
                //{header:'Almacen Destino',dataIndex: 'destinationstore',width:100,editor:combo,renderer:this.renderGrid},//,field: 'textfield'
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
            /*dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    width: 360,
                    displayInfo: true
                }
            ],*/
            tbar:[{
                pressed  :   true,
                text     :   'Agregar Item',
                tooltip  :   'Agregar Item a la Compra',
                iconCls  :   'btnNew',
                option   :   'addItem',
                //disabled : true
            },'-',{
                xtype:'label',
                fieldLabel:''
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