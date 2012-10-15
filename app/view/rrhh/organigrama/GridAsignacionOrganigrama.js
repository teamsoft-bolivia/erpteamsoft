/*
 * @Autor: Pablo Garcia guaman, Cristhian Valencia
 * @Email: garcia_guaman_pablo@hotmail.com, fox_tian@hotmail.com
 */

Ext.define('Erp.view.rrhh.organigrama.GridAsignacionOrganigrama', {
    extend      : 'Ext.grid.Panel',
    alias       : 'widget.gridasignacionorganigrama',
    //title       : 'Detalle de Entrada de Mercaderia',
    height      : 420,
    columnWidth : 0.4,
    currentrowselected : -1,
    currencyid  :-1,
    autoScroll  : true,
    modegrid    : 'update',
    columnLines : true,
    cls         : 'resaltarfila',
   
    initComponent: function() {
      var thiss = this;
     
      var store= Ext.create('Erp.store.almacenes.transacciones.StoreDTxnStore',{});
     
      var cboemployee=Ext.create('Ext.form.ComboBox',{
            store:Ext.create('Erp.store.crm.StoreCrmEmployee',{storeFilter:true}),
            name:'cboemployee',
            valueField:'id_person',
            displayField:'employeename',
            queryMode:'remote',
            enableKeyEvents:true,
            minChars:2,
            typeAhead: false,
            allowBlank:false,
            matchFieldWidth:false,
            disabled    :true,
            listeners:{
                focus:function(cbo){

                },
                select:function(cbo,records,eOps){
                    var gridrecactual=thiss.getStore().getAt(thiss.currentrowselected);
                    gridrecactual.data.employeename=records[0].data.employeename;
                   
                }
            },
            listConfig:{
                width:200
                
        }});
       var checkboxactive=Ext.create('Ext.form.field.Checkbox',{});
       
        Ext.applyIf(thiss, {
            store:store,
            columns: [
                {header : '#',xtype  : 'rownumberer'},
                {header:'idasignedpersonal',dataIndex: 'idasignedpersonal',hidden:true},
                {header:'idorganizationalchart',dataIndex: 'idorganizationalchart',hidden:true},
                {header:'Personal Asignado',dataIndex: 'id_person',flex:2,renderer : function (value,metadata,record){return record.get('employeename');}, editor: cboemployee},
                {header: 'Activo',  dataIndex: 'active',width:40, align : 'center',
                    renderer:function(value,metaData,record,rowIndex,colIndex,store){
                    var render='<img src="resources/images/false.png">';
                            if (value) {

                                render='<img src="resources/images/true.png">';
                            }
                            console.log(record.data.employeename+' |:| '+render);
                            return render;

                },
                 editor: checkboxactive
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

        thiss.callParent(arguments);
    }

});