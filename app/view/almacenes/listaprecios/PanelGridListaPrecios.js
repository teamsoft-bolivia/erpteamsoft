/* 
* @Autor: Max marcelo jimenez T
 * @Email: maxmjt@gmail.com
 */

Ext.define("Erp.view.almacenes.listaprecios.PanelGridListaPrecios",{

		extend: "Ext.grid.Panel",
                alias: ['widget.panelgridlistaprecios'],
		modegrid:'createmoneda',
                hidden:true,
                frame:true,
                title: '',
                //bodyStyle: 'text-align: center;background:green;',
                //store: store,
                columns: [
                    //new Ext.grid.RowNumberer(),
                    {header: 'id',  dataIndex: 'iditemlistprice', field: 'textfield',hidden:true,css : 'color: #000000 !important;'},
                    {header: 'Nombre',  dataIndex: 'namelist', field: 'textfield',flex:1},
                    {header: '%', dataIndex: 'factorlist', width:50,
                        editor: {
                            xtype:'numberfield',
                            allowBlank:false
                        }
                    },
                    {header: '',dataIndex: 'active',width:40,renderer:function(value){
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
                                var ideliminar=rec.data.iditemlistprice;
                                var baselist=rec.data.baselist;
                                var store = grid.getStore();
                                var combo = grid.up('window').down('combobox');
                                //rec.data.xaction='deleteraiz';
                                
                                
                                if(baselist!='1'){
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
                                            url  : 'data/classes/sis_erp_item_list_price.php',
                                             params : {
                                               xaction   : 'deletelistaprecio',
                                               iditemlistprice : ideliminar

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
                                                combo.getStore().load();

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
                                           
                                        }
                                    }
                                });
                                //aqui
                                }else{
                                   Ext.create('widget.uxNotification', {
                                               title: 'Advertencia',
                                               position: 'tr',
                                               manager: 'instructions',
                                               cls: 'ux-notification-light',
                                               iconCls: 'ux-notification-icon-information',
                                               html: 'Este elemento no forma parte de la lista de precios',
                                               autoHideDelay: 4000,
                                               slideBackDuration: 500,
                                               slideInAnimation: 'bounceOut',
                                               slideBackAnimation: 'easeIn'
                                             }).show(); 
                                }
                                
                                
                               }
                        }]
                    }
                ],
                selType: 'rowmodel',
                height: 156,
                width: 359
                


});




