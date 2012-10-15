/* 
 * @Autor: Max marcelo jimenez T
 * @Email: maxmjt@gmail.com
 */

Ext.define("Erp.view.configuraciones.PanelCuentasRaiz",{

		extend: "Ext.grid.Panel",
                alias: ['widget.panelcuentasraiz'],
		modegrid:'createraiz',
                title: '(2)->Cuentas Raiz',
                //store: store,
                columns: [
                    {header: 'Codigo',  dataIndex: 'accountcode'},
                    {header: 'Cuenta', dataIndex: 'accountname', flex:1, 
                        editor: {
                            xtype:'textfield',
                            allowBlank:false
                        }
                    },
                    //{header: 'level', dataIndex: 'level'},
                    {
                        xtype:'actioncolumn',
                        width:50,
                        items: [{
                            icon: 'lib/ext/examples/shared/icons/fam/delete.gif',
                            tooltip: 'Delete',
                            option: 'EliminarCuentaRaiz',
                            handler: function(grid, rowIndex, colIndex) {
                                var rec = grid.getStore().getAt(rowIndex);
                                var ideliminar=rec.data.idaccountplan;
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
                                            url  : 'data/classes/sis_erp_account_plan.php',
                                             params : {
                                               xaction   : 'deleteraiz',
                                               idaccountplan : ideliminar

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
                
                height: 224,
                width: 300,
                tbar: [{
            text: 'Nueva Cuenta',
            option: 'AddCuentaRaiz',
            iconCls: 'addAccount'
            
        }],
    initComponent: function() {
        var thiss = this;
        this.plugins= [
        Ext.create('Ext.grid.plugin.RowEditing',{
            saveBtnText: 'Editar',
            cancelBtnText: 'Cancelar',
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
                       //var roweditor.grid.modegrid
                       var store=roweditor.grid.getStore();
                       //console.log(roweditor.grid.getStore());
                            Ext.Ajax.request({
                                url  : 'data/classes/sis_erp_account_plan.php',
                                 params : {
                                   xaction   : roweditor.grid.modegrid,
                                   valoresraiz : Ext.JSON.encode(changes.record.data) 

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

                        //storegrilla.load();                                    
                        //console.log(storegrilla);
                    }
                }}})
    ];
        thiss.callParent(arguments);
    }


});



