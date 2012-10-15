/*
 * @Autor: Max marcelo jimenez T
 * @Email: maxmjt@gmail.com
 */

Ext.define ('Erp.view.almacenes.listaprecios.PanelGridListaItemAsignados',{
    extend      : 'Ext.grid.Panel',
    alias       : 'widget.panelgridlistaitemasignados',
    frame: true,
    stripeRows : true,
    width: 234,
    height:325,
    title: '',
    columnWidth: 0.5,
    columns: [
        {
            xtype: 'gridcolumn',
            dataIndex: 'code',
            text: 'Codigo',
            width:100
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'description',
            text: 'Descripcion',
            flex:2
        },
        {
                        xtype:'actioncolumn',
                        width:50,
                        items: [{
                            icon: 'lib/ext/examples/shared/icons/fam/delete.gif',
                            tooltip: 'Delete',
                            option: 'EliminarAsignados',
                            handler: function(grid, rowIndex, colIndex) {
                                var rec = grid.getStore().getAt(rowIndex);
                                var iditem=rec.data.iditem;
                                var store = grid.getStore();
                                var winlista=grid.up('window');
                                var combo=grid.up('window').down('combobox');
                                var comboselec=combo.getValue();
                                var griditemsasignar=winlista.down('panelgridlistaitemasignar');
                                console.log(comboselec);
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
                                            url  : 'data/classes/sis_erp_item_list_price.php',
                                             params : {
                                               xaction   : 'EliminarAsignados',
                                               iditem : iditem,
                                               iditemlistprice: winlista.combosel

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
                                                if(comboselec!=null){
                                                    griditemsasignar.getStore().load();
                                                }
                                                

                                             },
                                             failure: function(r) {
                                              result=Ext.decode(r.responseText);
                                               console.log(result);
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
    


    initComponent : function (){
        this.callParent (arguments);
        
        
    }
    
    
});

