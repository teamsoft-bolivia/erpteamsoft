/*
 * @Autor: Max jimenez
 * 
 */
Ext.define("Erp.view.almacenes.proveedores.PanelGridProveedores", {
                extend: "Ext.grid.Panel",
                alias: ['widget.panelgridproveedores'],
                height: 512,
                width: 300,
                disableSelection:false, 
                columns: [
                    {header: 'nombre',  dataIndex: 'providername', field: 'textfield',flex:2},
                    {header: 'Direccion',  dataIndex: 'address', field: 'textfield',hidden:true},
                    {header: 'activo',  dataIndex: 'active',width:40,renderer:function(value){
                                                                if (value === '1') {
                                                                    return '<img src="resources/images/true.png">';
                                                                }else{
                                                                return '<img src="resources/images/false.png">';
                                                                }
                                                            
                                                            },editor: {
                            xtype:'checkboxfield',
                            allowBlank:false
                        }},
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
                                var ideliminar=rec.data.idprovider;
                                var store = grid.getStore();
                                var win=grid.up('window');
                                var form=win.down('formaddproveedores');
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
                                            url  : 'data/classes/sis_erp_provider.php',
                                             params : {
                                               xaction   : 'deleteprovider',
                                               id : ideliminar

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
                                                form.getForm().reset();    
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
                
        viewConfig: {
        
        //Return CSS class to apply to rows depending upon data values
        getRowClass: function(record, index) {
            //console.log(record.get('active'));
            var c = record.get('active');
            if (c == 1) {
                return 'price-rise';
            } else if (c == 0) {
                return 'price-fall';
            }
        }
    }

});



