


Ext.define('Erp.view.rrhh.organigrama.TreeEstructuraOrganizacional', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.treeestructuraorganizacional',
    height:420,
    margin: '0 0 0 5',
    columnWidth: 0.7,//0.35,
    title: 'Cargo/Unidad Organizativa',
    rootVisible:false,
    root: {
        expanded: true
    },
	
    initComponent: function() {
        var thiss = this;
        
        //var storetree=Ext.create('Erp.store.StoreTreeCuentas',{});
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
           //store:storetree,
           //store:Ext.create('Erp.store.rrhh.StoreEstructuraOrganizacional',{}),
           columns: [
                //{header : '#',xtype  : 'rownumberer'},
                {
                    //flex : 1.2,
                    //name:'id',
                    dataIndex: 'idorganizationalchart',
                    sortable: true,
                    text: 'Codigo',//,
                    hidden : true
                },
                {
                    xtype: 'treecolumn',
                    //name:'cargo',
                    dataIndex: 'jobtitle',
                    flex: 2,
                    sortable: true,
                    text: 'Departamento'
                },
                {
                    //xtype: 'treecolumn',
                    //name:'cargo',
                    dataIndex: 'active',
                    //flex: 2,
                    sortable: true,
                    text: 'Asignado a'
                },
                {
                    //xtype: 'treecolumn',
                    //name:'cargo',
                    dataIndex: 'vacancies',
                    //flex: 2,
                    sortable: true,
                    text: '# vacantes'
                },
                 {
                    text: 'Edit',
                    width: 40,
                    menuDisabled: true,
                    xtype: 'actioncolumn',
                    tooltip: 'Edit task',
                    align: 'center',
                    icon: 'resources/images/user_edit.png',
                    handler: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
                        console.log(record.data.vacancies);
                        if(record.data.vacancies > 1){
                            Ext.Msg.alert('Editing' + (record.get('done') ? ' completed task' : '') , record.get('task'));
                        }
                        
                    }
                }
                /*{
                    text: 'Edit',
                    width: 40,
                    menuDisabled: true,
                    xtype: 'actioncolumn',
                    tooltip: 'Edit task',
                    align: 'center',
                    iconCls:'icon-edit',
                    icon: 'resources/images/user_edit.png',
                    handler: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
                        Ext.Msg.alert('Editing' + (record.get('done') ? ' completed task' : '') , record.get('task'));
                    }
                }*/
            ],
           /*columns: [
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
                
            ],*/
            viewConfig: {

            },
            dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            items: [
                                {
                                    xtype: 'buttongroup',
                                    title: 'Opciones',
                                    option: 'BtnsCargos',
                                    columns: 2,
                                    items: [
                                        {
                                            xtype: 'button',
                                            text: 'Nuevo',
                                            option: 'btnNuevoCargo',
                                            iconCls:'btnnew'
                                        },
                                        {
                                            xtype: 'button',
                                            text: 'Editar',
                                            option: 'btnEditarCargo',
                                            iconCls:'btnedit'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
            
        });

        thiss.callParent(arguments);
    }

});