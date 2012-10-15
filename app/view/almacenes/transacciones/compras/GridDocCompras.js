/*
 * @Autor: Pablo Garcia guaman
 * @Email: garcia_guaman_pablo@hotmail.com
 */

Ext.define('Erp.view.almacenes.transacciones.compras.GridDocCompras', {
    extend: 'Ext.grid.Panel',
    requires:['Erp.store.almacenes.transacciones.compras.StoreTxnDocument'],
    alias: 'widget.griddoccompras',
    //title: 'Documentos de la Compra',
    height:178,
    margin: '4 4 4 4',
    frame:true,
    border:true,
    stateEdit:'',
    renderGrid:function(value,metaData,record,rowIndex,colIndex,store,view){
        var val;
        var newdate;
        if (colIndex==2) {
            val=record.data.providername;
        }else if (colIndex==3) {
            val=record.data.contactname;
        }else if (colIndex==4) {
            val=record.data.typedocname;
        }else if (colIndex==6) {
              
              val=Ext.util.Format.date(value, 'd-m-Y');  
        }else if (colIndex==7) {
            val=record.data.methodpayname;
        }else if (colIndex==8) {
            val=record.data.conditionpayname;
        }
        return val;
    },
    initComponent: function() {
        var me = this;
        var cbotipodoc=Ext.create('Ext.form.field.ComboBox',{
            store:Ext.create('Erp.store.StoreType',{}),
            name:'responsible',
            valueField:'idtype',
            displayField:'type',
            queryMode:'local',
            allowBlank:false,
            listeners:{
                select:function(cbo,records,eOpts){
                    var gridrecactual=me.getStore().getAt(0)
                    gridrecactual.data.typedocname=records[0].data.type;
                }
            }
        });
        cbotipodoc.getStore().getProxy().extraParams.type='documento_compra';
        cbotipodoc.getStore().load();
        
        var cboformapago=Ext.create('Ext.form.field.ComboBox',{
            store:Ext.create('Erp.store.StoreType',{}),
            name:'responsible',
            valueField:'idtype',
            displayField:'type',
            queryMode:'local',
            allowBlank:false,
            listeners:{
                select:function(cbo,records,eOpts){
                    var gridrecactual=me.getStore().getAt(0)
                    gridrecactual.data.methodpayname=records[0].data.type;
                }
            }
        });
        cboformapago.getStore().getProxy().extraParams.type='forma_pago_compra';
        cboformapago.getStore().load();
        
        var cboformacompra=Ext.create('Ext.form.field.ComboBox',{
            store:Ext.create('Erp.store.StoreType',{}),
            name:'responsible',
            valueField:'idtype',
            displayField:'type',
            queryMode:'local',
            allowBlank:false,
            listeners:{
                select:function(cbo,records,eOpts){
                    var gridrecactual=me.getStore().getAt(0)
                    gridrecactual.data.conditionpayname=records[0].data.type;
                }
            }
        });
        cboformacompra.getStore().getProxy().extraParams.type='forma_compra';
        cboformacompra.getStore().load();
        
        var cboprovider=Ext.create('Ext.form.field.ComboBox',{
            store:Ext.create('Erp.store.almacenes.proveedores.StoreListaProveedores',{
                remoteFilter:true
            }),
            name:'provideredit',
            queryMode:'remote',
            displayField:'providername',
            valueField:'idprovider',
            //triggerAction:'all',
            matchFieldWidth:false,
            allowBlank:false,
            enableKeyEvents:true,
            minChars:2,
            typeAhead: false,
            listeners:{
                focus:function(cbo){
                    cbo.selectText();
                },
                select:function(cbo,records,eOps){
                    var gridrecactual=me.getStore().getAt(0)
                    gridrecactual.data.providername=records[0].data.providername;
                    cbocontact.getStore().getProxy().extraParams={xaction:'readcbocontactos',idprovider:records[0].data.idprovider};
                    cbocontact.setValue();
                    cbocontact.getStore().load();
                }
            },
            listConfig:{
                width:200
                /*itemTpl : Ext.create('Ext.XTemplate',
                    '<div style="float:left;width:40%;">{code}</div> <div style="overflow:hidden;white-space: pre;">{description}</div>'
                )*/
            }
        });
        cboprovider.getStore().getProxy().extraParams={xaction:'readcboproveedores'}
        
        var cbocontact=Ext.create('Ext.form.field.ComboBox',{
            store:Ext.create('Erp.store.almacenes.proveedores.StoreContactos',{}),
            name:'responsible',
            valueField:'idprovidercontact',
            displayField:'contactname',
            queryMode:'local',
            allowBlank:true,
            listeners:{
                focus:function(cbo){
                    cbo.selectText();
                },
                select:function(cbo,records,eOpts){
                    var gridrecactual=me.getStore().getAt(0)
                    gridrecactual.data.contactname=records[0].data.contactname;
                }
            }
        });
        
        Ext.applyIf(me, {
            store:Ext.create('Erp.store.almacenes.transacciones.compras.StoreTxnDocument',{storeId:'storedocuments'}),
            columns: [
                {header : '#',xtype  : 'rownumberer',dataindex:'nro'},
                {header:'iddocument',dataIndex: 'iddocument',hidden:true},
                {header:'Proveedor',dataIndex: 'idprovider',width:130,renderer:this.renderGrid,editor:cboprovider},
                {header:'Contacto',dataIndex: 'idprovidercontact',width:120,renderer:this.renderGrid,editor:cbocontact},
                {header:'Tipo Documento',dataIndex: 'typedocument',width:100,renderer:this.renderGrid,editor:cbotipodoc},
                {header:'Doc.',dataIndex: 'document',width:50,editor:{xtype:'numberfield',minValue:0,hideTrigger:true,allowBlank:false}},
                {header:'Fecha',dataIndex: 'date',width:80,tooltip:'Fecha de la compra',renderer:this.renderGrid,editor:{xtype:'datefield',allowBlank:false}},
                {header:'Forma Pago',dataIndex: 'methodpayment',width:80,renderer:this.renderGrid,editor:cboformapago},
                {header:'Forma Compra',dataIndex: 'conditionpayment',width:80,renderer:this.renderGrid,editor:cboformacompra},
                {header:'providername',dataIndex: 'providername',hidden:true},
                {
                            xtype: 'actioncolumn',
                            alias:'actiondelete',
                            width: 60,
                            items: [
                                {
                                    iconCls:'icon-delete',
                                    icon:'resources/images/delete.gif',
                                    tooltip:'Eliminar detalle'
                                },
                                {
                                    iconCls:'icon-conditions',
                                    icon:'resources/images/conditions.png',
                                    tooltip:'Condiciones de pago',
                                    hidden:true,
                                    padding:'0 0 0 5'
                                },
                                {
                                    iconCls:'icon-imagedoc',
                                    icon:'resources/images/upload_16.png',
                                    tooltip:'Subir imagen del documento',
                                    hidden:true,
                                    padding:'0 0 0 5'
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
            /*viewConfig: {
                
            },*/
            dockedItems: [
               /* {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    width: 360,
                    displayInfo: true
                }*/
            ],
            tbar:[{
                pressed  :   true,
                text     :   '',
                tooltip  :   'Atras',
                iconCls  :   'left',
                option   :   'back'
            },{
                pressed  :   true,
                text     :   'Nuevo',
                tooltip  :   'Agregar documento a la compra',
                iconCls  :   'btnNew',
                option   :   'adddoc'
            }]
        });

        me.callParent(arguments);
    }

});