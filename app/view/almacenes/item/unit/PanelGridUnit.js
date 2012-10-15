/*
 * @Autor: Max jimenez
 * 
 */
Ext.define("Erp.view.almacenes.item.unit.PanelGridUnit", {
                extend: "Ext.grid.Panel",
                alias: ['widget.panelgridunit'],
                columns: [
                    {header: 'nombre',  dataIndex: 'unitname', field: 'textfield',width:110},
                    {header: 'Descripcion',  dataIndex: 'description', field: 'textfield',flex:2},
                    {header: 'alias',  dataIndex: 'alias',width:90, field: 'textfield'},
                    {header: 'activo',  dataIndex: 'active',width:90,renderer:function(value){
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
                                var ideliminar=rec.data.idunit;
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
                                            url  : 'data/classes/sis_erp_unit.php',
                                             params : {
                                               xaction   : 'deleteunit',
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
                
                height: 350,
                //width: 0.99,
                tbar: [{
            xtype:'button',
            text: 'Nueva unidad',
            option: 'AddUnidad',
            iconCls: 'addAccount'
            
        }
        ],
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

