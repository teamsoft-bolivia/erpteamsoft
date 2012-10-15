/* 
* @Autor: Max marcelo jimenez T
 * @Email: maxmjt@gmail.com
 */

Ext.define("Erp.view.configuraciones.PanelMonedas",{

		extend: "Ext.grid.Panel",
                alias: ['widget.panelmonedas'],
		modegrid:'createmoneda',
                title: 'Monedas',
                //bodyStyle: 'text-align: center;background:green;',
                //store: store,
                columns: [
                    //new Ext.grid.RowNumberer(),
                    {header: 'Moneda',  dataIndex: 'idtype', field: 'textfield',hidden:true,css : 'color: #000000 !important;'},
                    {header: 'Moneda',  dataIndex: 'type', flex:1, field: 'textfield'},
                    {header: 'Simbolo', dataIndex: 'alias', width:60,
                        editor: {
                            xtype:'textfield',
                            allowBlank:false
                        }
                    },
                    {header: 'Primaria',dataIndex: 'primaria',width:60,renderer:function(value){
                                                                if (value === 'true') {
                                                                    return '1ra';
                                                                }else{
                                                                return 'X';
                                                                }
                                                            },editor: {
                            xtype:'checkboxfield',
                            allowBlank:false
                        }},
                    {header: 'Secundaria',  dataIndex: 'secundaria',width:60,renderer:function(value){
                                                                if (value === 'true') {
                                                                    return '2da';
                                                                }else{
                                                                    return 'X';
                                                                }
                                                            },editor: {
                            xtype:'checkboxfield',
                            allowBlank:false
                        }},
                    //{header: 'level', dataIndex: 'level'},
                    {
                        xtype:'actioncolumn',
                        width:40,
                        items: [{
                            icon: 'lib/ext/examples/shared/icons/fam/delete.gif',
                            tooltip: 'Delete',
                            option: 'EliminarCuentaRaiz',
                            handler: function(grid, rowIndex, colIndex) {
                                var rec = grid.getStore().getAt(rowIndex);
                                //console.log(rec.data);
                                var ideliminar=rec.data.idtype;
                                var store = grid.getStore();
                                //rec.data.xaction='deleteraiz';
                                
                                
                                
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
                                            url  : 'data/classes/sis_erp_type.php',
                                             params : {
                                               xaction   : 'deletemoneda',
                                               idtype : ideliminar

                                             },
                                             method : 'POST',


                                             success: function(r) {
                                               result=Ext.decode(r.responseText);

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
                                              result=Ext.decode(r.responseText);
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
                                            
                                            
                                            
                                            
                                           // store.remove(rec);
                                           // store.load();
                                        }
                                    }
                                });
                               //store.load(); 
                            }
                        }]
                    }
                ],
                selType: 'rowmodel',
                //plugins: [
                    /*Ext.create('Ext.grid.plugin.RowEditing', {
                        //dbclicksToEdit: 2,
                        alias:'rowedit',
                        clicksToEdit: 2,
		        autoCancel: false,
		        saveBtnText: 'Editar',
		        cancelBtnText: 'Cancelar',
		        errorSumary: false,
		        action: 'updateraiz',
                        listeners:{
                            
                            
                            
                        }
                    })*/
                    
               // ],
                height: 224,
                width: 355,
                tbar: [{
            text: 'Nueva Moneda',
            option: 'AddMoneda',
            iconCls: 'addAccount'
            
        }],
    initComponent: function() {
        var thiss = this;
        this.plugins=[Ext.create('Ext.grid.plugin.RowEditing',{
                    //dbclicksToEdit: 2,
                    //alias:'rowedit',
                    clicksToEdit: 2,
                    autoCancel: false,
                    saveBtnText: 'Editar',
                    cancelBtnText: 'Cancelar',
                    errorSumary: false,
                    //action: 'updateraiz',
                    listeners:{
                        beforeedit:{
                            fn: function(editor,  e,  eOpts){
                                //e.grid.modegrid=''
                                //console.log('ssssss');
                                //changes.record.data.xaction='updateraiz';
                                //storegrilla.sync();
                            }
                        },
                        canceledit:{
                            fn: function(roweditor, changes, record, rowIndex){
                                //changes.xaction='readraiz';
                                roweditor.grid.getStore().load();                                    
                                //console.log(storegrilla);
                            }
                        },
                        afteredit:{
                            fn: function(roweditor, changes, record, rowIndex){
                               //console.log('after');

                            }
                        },
                        edit:{
                            fn:function(editor, e,eopts) {
                                var store=editor.grid.getStore();
                                //editor.context.newValues;
                                //console.log('fffffffffff');
                                //console.log(editor.context.newValues);
                                //editor.context.newValues.null = '';
                                //console.log(editor.context.newValues);
                                if(editor.context.newValues.primaria==true){
                                    editor.context.newValues.primaria='true';
                                }else{
                                    editor.context.newValues.primaria='false';
                                }
                                if(editor.context.newValues.secundaria==true){
                                    editor.context.newValues.secundaria='true';
                                }else{
                                    editor.context.newValues.secundaria='false';
                                }
                                Ext.Ajax.request({
                                        url  : 'data/classes/sis_erp_type.php',
                                         params : {
                                           xaction   : editor.grid.modegrid,
                                           valoresraiz : Ext.JSON.encode(editor.context.newValues) 

                                         },
                                         method : 'POST',


                                         success: function(r) {
                                           result=Ext.decode(r.responseText);

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
                                          result=Ext.decode(r.responseText);
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






                        }}

                }})];
        thiss.callParent(arguments);
    }


});

