/*
 * @Autor: Max marcelo jimenez T,Crithian Valencia, Pablo Garcia Guaman
 * @Email: maxmjt@gmail.com, fox_tian@hotmail.com ,garcia_guaman_pablo@hotmail.com
 */

Ext.define ('Erp.view.almacenes.item.datosadicionales.GridUnidades',{
     requires   :['Erp.store.almacenes.StoreItemUnidades'],
    extend      : 'Ext.grid.Panel',
    alias       : 'widget.gridunidades',
    flex        : 1,
    modegrid    : 'update',
    idItem      : '',// padding : '0 0 5 0',
    selType: 'rowmodel',
    plugins: [
        Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToEdit: 2,
	    autoCancel: false,
            saveBtnText: 'Guardar',
            cancelBtnText: 'Cancelar'
        })
    ],
  
    initComponent : function (){
        var thiss=this;
        Ext.applyIf(thiss, {
            store:Ext.create('Erp.store.almacenes.StoreItemUnidades',{}),
            dockedItems     : [
             {
                xtype : 'toolbar',
                dock  : 'top',
                items : [
                        {
                            xtype : 'label',
                            text  : 'Unidades',
                            margin  : '0 0 0 10',
                            option  : 'gridTitleLabel'

                        },
                        '->',{
                            xtype   : 'button',
                            text    : 'Agregar',
                            iconCls : 'AddAccount',
                            option  : 'btnAgregar'
                        }
                ]
             }

            ],
            columns     : [
                            {xtype  : 'rownumberer',header : '#'},
                            { header : 'iditemunit',dataIndex:'iditemunit',sortable : false, hideable : false, hidden:true},
                            { header : 'iditem',dataIndex:'iditem',sortable : false, hideable : false, hidden:true},
                            { header : 'Unidad',dataIndex:'idunit',flex:1,sortable : false, hideable : false, hidden:false,
                                renderer: function(value,metadata,record){
                                            return record.get('unitname');
                                },
                                editor : {
                                    xtype: 'combobox',
                                    store:Ext.create('Erp.store.almacenes.StoreItemUnidades',{
                                                autoLoad	: true,
                                                proxy       :{
                                                            type    :'ajax',
                                                            actionMethods:'POST',
                                                            extraParams:{
                                                                            xaction:'readunitname'
                                                                    },
                                                            url     :'data/classes/sis_erp_item_unit.php',
                                                            reader  :{
                                                                    type:'json',
                                                                    root:'results',
                                                                    totalProperty:'total'
                                                            }

                                            }
                                    }),
                                    valueField:'idunit',
                                    displayField:'unitname',
                                    name:'unitname',
                                    editable:false,
                                    queryMode:'local',
                                    allowBlank:false,
                                    anchor : '100%'

                                }
                            },
                            { header : 'unitname',dataIndex:'unitname',sortable : false, hideable : false, draggable:false,hidden:true},
                            { header : 'Unidad Contenida',dataIndex:'idunitcontent',flex:1,sortable : false, hideable : false, draggable:false,hidden:false,
                                renderer: function(value,metadata,record){
                                                                            return record.get('unitnamecontent');
                                },
                                editor : {
                                    xtype: 'combobox',
                                    store:Ext.create('Erp.store.almacenes.StoreItemUnidades',{
                                                autoLoad	: true,
                                                proxy       :{
                                                            type    :'ajax',
                                                            actionMethods:'POST',
                                                            extraParams:{
                                                                            xaction:'readunitnamecontent'
                                                                    },
                                                            url     :'data/classes/sis_erp_item_unit.php',
                                                            reader  :{
                                                                    type:'json',
                                                                    root:'results',
                                                                    totalProperty:'total'
                                                            }

                                            }
                                    }),
                                    valueField:'idunitcontent',
                                    displayField:'unitnamecontent',
                                    editable:false,
                                    name:'unitnamecontent',
                                    queryMode:'local',
                                    allowBlank:true,
                                    anchor : '100%'

                                }
                            },
                            { header : 'unitnamecontent',dataIndex:'unitnamecontent',sortable : false, hideable : false, draggable:false,hidden:true},
                            { header : 'Cantidad Contenida',dataIndex:'quantity', sortable  : false, hideable : false,width:110, editor:{}},
                            {
                                xtype:'actioncolumn',
                                width:25,
                                align: 'center',
                                items: [{
                                    icon: 'lib/ext/examples/shared/icons/fam/delete.gif',
                                    tooltip: 'Eliminar Unidad',
                                    option: 'eliminarCategoria',
                                    handler: function(grid, rowIndex, colIndex,item,e,record) {

                                        var window=grid.up('windowitem');
                                        if(window.stateMode=='R'){
                                            return false;
                                        }else if(window.stateMode=='N'){
                                            return false;
                                        }else if (window.stateMode=='E'){
                                            var iditemunit=record.data.iditemunit;
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
                                                        url  : 'data/classes/sis_erp_item_unit.php',
                                                        params : {
                                                        xaction   : 'delete',
                                                        iditemunit : iditemunit

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
                                                            //console.log(result);
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
                                                        }

                                                    });

                                                }
                                             }
                                            });
                                        }
                                    }
                                }]
                            }

                ]
		
        });

        thiss.callParent (arguments);
        
        
    }
    
    
});

