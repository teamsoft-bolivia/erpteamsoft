/*
 * @Autor: Pablo Garcia guaman, Cristhian Valencia
 * @Email: garcia_guaman_pablo@hotmail.com, fox_tian@hotmail.com
 */

Ext.define('Erp.view.almacenes.transacciones.entradas.GridDetalleTxnEntradas', {
    extend      : 'Ext.grid.Panel',
    alias       : 'widget.griddetalletxnentradas',
    title       : 'Detalle de Entrada de Mercaderia',
    height      : 250,
    currentrowselected : -1,
    currencyid  :-1,
    currencysimbol : '',
    autoScroll  : true,
    modegrid    : 'update',
    columnLines : true,
    cls         : 'resaltarfila',
    renderGrid:function(value,metaData,record,rowIndex,colIndex,store,view){
        var val;
      
        if (colIndex==3) {
            val=record.data.code;
        }else if (colIndex==5) {
            val=record.data.unitname;
        }
        
        return val;
    },
    initComponent: function() {
      var me = this;
      Erp.helper.Tools.getPrimaryCurrency(me);
      var store= Ext.create('Erp.store.almacenes.transacciones.StoreDTxnStore',{});
       var cboitem=Ext.create('Ext.form.field.ComboBox',{
            store   :Ext.create('Erp.store.almacenes.item.StoreListaItem',{remoteFilter:true}),
            name    :'itemedit',
            queryMode   :'remote',
            displayField:'code',
            valueField  :'iditem',
            forceSelection : true,
            matchFieldWidth :false,
            allowBlank      :false,
            enableKeyEvents :true,
            minChars        :1,
            typeAhead       : false,
            hideLabel: true,
            hideTrigger:true,
            listeners:{
                focus:function(cbo){
                    cbo.getStore().getProxy().extraParams.iditem=cbo.getValue();
                    cbo.getStore().load();
                    cbo.selectText();
                },
                select:function(cbo,records,eOps){
                    var gridrecactual=me.getStore().getAt(0)
                    gridrecactual.data.code=records[0].data.code;
                    gridrecactual.data.description=records[0].data.description;
                    cbounit.setValue('');
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
            store   :Ext.create('Erp.store.almacenes.StoreItemUnidades',{}),
            name    :'idunit',
            valueField  :'idunit',
            displayField:'unitname',
            queryMode   :'local',
            allowBlank  :false,
            editable : false,
            listeners   :{
                select:function(cbo,records,eOpts){
                    
                    var gridrecactual=me.getStore().getAt(me.currentrowselected);
                    
                    gridrecactual.data.unitname=records[0].data.unitname;
                    
                }
            }
        });
        var cbocurrency = Ext.create('Ext.form.field.ComboBox',{
            store       : Ext.create ('Erp.store.StoreType',{}),
            name        : 'currency',
            valueField  : 'idtype',
            displayField: 'alias',
            queryMode   : 'local',
            allowBlank  : false,
            editable    : false,
            listeners   :{
                select:function(cbo,records,eOpts){
                    
                    var gridrecactual=me.getStore().getAt(me.currentrowselected);
                    gridrecactual.data.simbolo=records[0].data.alias;
                   
                }
            }
        });
        //cbocurrency.getStore().getProxy().extraParams.xaction='readcurrency',
        //cbocurrency.getStore().load();
        
        var txtcost=Ext.create('Ext.form.field.Number',{
            hideTrigger:true,
            allowBlank:false
        });
        
        var txtquantity=Ext.create('Ext.form.field.Number',{
            hideTrigger:true,
            allowBlank:false
        });
        Ext.applyIf(me, {
            store:store,
            columns: [
                {header : '#',xtype  : 'rownumberer'},
                {header:'iddtxnstore',dataIndex: 'iddtxnstore',hidden:true},
                {header:'idtxnstore',dataIndex: 'idtxnstore',hidden:true},
                {header:'Codigo Item',dataIndex: 'iditem',width:150,renderer: this.renderGrid, editor: cboitem},
                {header:'Descripci&oacute;n Item',dataIndex: 'description',width:205, editor:{xtype: 'textfield',disabled:true}},
                {header:'Unidad',dataIndex: 'idunit',width:60,
                    renderer : function(value,metaData,record,rowIndex,colIndex,store,view){ 
                                var val;
                                val=record.data.unitname;                             
                                return val;
                    },editor: cbounit
                },
                {header:'Cantidad',dataIndex: 'quantity',width:60,editor : txtquantity},
                {header:'Precio',dataIndex: 'cost',width:60,editor : txtcost,renderer :function(value, metaData, record, rowIdx, colIdx, store, view) { return Ext.util.Format.currency(record.data.cost,record.data.simbolo,3);}},
                //{header:'Moneda',dataIndex: 'currency',width:50,editor : cbocurrency,renderer :function(value, metaData, record, rowIdx, colIdx, store, view) { return record.data.simbolo;}},
                {header:'Total Parcial',width:75,
                    renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                                    return Ext.util.Format.currency((record.get('quantity') * record.get('cost')),record.data.simbolo,3);
                              }
                 },
                 {
                        xtype   : 'actioncolumn',
                        width   : 30,
                        align   : 'center',
                        actioncolumn:'eliminardetalle',
                                       
                        items: [{
                            icon: 'lib/ext/examples/shared/icons/fam/delete.gif',
                            tooltip: 'Eliminar Detalle',
                             handler: function(grid, rowIndex, colIndex) {
                                var window=grid.up('window');
                                if(window.stateMode=='R'){
                                      Ext.create('widget.uxNotification', {
                                            title: 'Atencion',
                                            position: 'tr',
                                            manager: 'instructions',
                                            cls: 'ux-notification-light',
                                            iconCls: 'ux-notification-icon-error',
                                            html: 'No esta habilitada la opcion de eliminar en modo lectura',
                                            autoHideDelay: 4000,
                                            slideBackDuration: 500,
                                            slideInAnimation: 'bounceOut',
                                            slideBackAnimation: 'easeIn'
                                       }).show();
                                }else if(window.stateMode=='N'){
                                       
                                        var store = grid.getStore();
                                        store.removeAt(rowIndex);
                                    
                                }else if(window.stateMode=='E'){
                                    var rec = grid.getStore().getAt(rowIndex);
                                    var iddtxnstore=rec.data.iddtxnstore;
                                    var store = grid.getStore();

                                    Ext.Msg.show({
                                        title : 'Confirmacion',
                                        msg : 'Esta seguro de eliminar el registro selecionado?',
                                        buttons : Ext.Msg.YESNO,
                                        icon : Ext.MessageBox.WARNING,
                                        scope : this,
                                        width : 450,
                                        fn : function(btn, ev){
                                            if (btn == 'yes') {

                                                Ext.Ajax.request({
                                                    url  : 'data/classes/sis_erpdd_txn_store.php',
                                                    params : {
                                                    xaction      : 'delete',
                                                    yaction      : 'detalleentrada',
                                                    iddtxnstore  : iddtxnstore

                                                    },
                                                    method : 'POST',


                                                    success: function(r) {
                                                    var result=Ext.decode(r.responseText);

                                                        Ext.create('widget.uxNotification', {
                                                            title: result.title,
                                                            position: 'tr',
                                                            manager: 'instructions',
                                                            cls: 'ux-notification-light',
                                                            iconCls: 'ux-notification-icon-information',
                                                            html: result.msg,
                                                            autoHideDelay: 4000,
                                                            slideBackDuration: 500,
                                                            slideInAnimation: 'bounceOut',
                                                            slideBackAnimation: 'easeIn'
                                                        }).show();
                                                        store.load();

                                                    },
                                                    failure: function(r) {
                                                        var result=Ext.decode(r.responseText);

                                                        Ext.create('widget.uxNotification', {
                                                        title: result.title,
                                                        position: 'tr',
                                                        manager: 'instructions',
                                                        cls: 'ux-notification-light',
                                                        iconCls: 'ux-notification-icon-error',
                                                        html: result.msg,
                                                        autoHideDelay: 4000,
                                                        slideBackDuration: 500,
                                                        slideInAnimation: 'bounceOut',
                                                        slideBackAnimation: 'easeIn'
                                                        }).show();
                                                    }

                                                });

                                            }
                                        }
                                    });
                             
                              }
                           }
                        }]
                },
                {header:'estado',dataIndex: 'state',hidden:true},
                //
                
            ],
            plugins:[Ext.create('Ext.grid.plugin.RowEditing',{
                        clicksToEdit:2,
                        errorSummary:false,
                        saveBtnText:'Aceptar',
                        cancelBtnText:'Cancelar'
                    })
            ],
            viewConfig: {
                stripeRows: true
            },
            tbar:[{
                pressed  :   true,
                text     :   'Agregar Item',
                tooltip  :   'Agregar Item a la Entrada',
                iconCls  :   'btnNew',
                option   :   'addItem'
            }],
            bbar : [
                   '->',
                    {
                        xtype   : 'label',
                        text    : 'Total Items: ',
                        margin  : '5',
                        option  : 'labelcantidad',
                        cls     : 'totales'
                    },'-',
                    {
                        xtype   : 'label',
                        text    : 'Total General: ',
                        margin  : '5',
                        option  : 'labeltotal',
                        cls     : 'totales'
                    },'-'
            ]
        });

        me.callParent(arguments);
    }

});