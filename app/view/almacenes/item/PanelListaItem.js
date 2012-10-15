/*
 * @Autor: Max jimenez
 * 
 */
Ext.define("Erp.view.almacenes.item.PanelListaItem", {
                extend: "Ext.grid.Panel",
                alias: ['widget.panellistaitem'],
		modegrid:'createraiz',
                cls:'resaltarfila',
                columns: [
                    {header: 'Codigo',  dataIndex: 'code',width:200},
                    {header: 'Descripcion',  dataIndex: 'description',width:300},
                    {header: 'Tipo Valoraci&oacute;n',  dataIndex: 'valuationname',width:100},
                    
                    {
                        header: 'Editar',
                        xtype:'actioncolumn',
                        width:50,
                        items:[{
                            xtype:'button',
                            iconCls:'icon-edit',
                            icon: 'resources/images/user_edit.png',
                            tooltip: 'Editar',
                            option: 'EditarItem'
                        }]
                        
                    }
                ],
                selType: 'rowmodel',
                
                height: 350,
                //width: 0.99,
                tbar: [{
            xtype:'button',
            text: 'Nuevo Item',
            option: 'addItem',
            iconCls: 'addAccount'
            
        },'->',
        
        {
            xtype           : 'triggerfield',
            fieldLabel      : 'Buscar',
            labelWidth      : 50,
            enableKeyEvents : true,
            option          : 'searchitem',
            triggerCls      : 'search-trigger'
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

