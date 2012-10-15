/*
 * @Autor: Max marcelo jimenez T
 * @Email: maxmjt@gmail.com
 */

Ext.define ('Erp.view.almacenes.listaprecios.PanelGridListaItemAsignar',{
    extend      : 'Ext.grid.Panel',
    alias       : 'widget.panelgridlistaitemasignar',
    frame: true,
    width: 234,
    multiSelect: true,
    stripeRows: true,
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
        }
    ],
    viewConfig: {
        plugins: {
                ptype: 'gridviewdragdrop',
                dragGroup: 'firstGridDDGroup',
                dropGroup: 'secondGridDDGroup'
            },
            listeners: {
                drop: function(node, data, dropRec, dropPosition) {
                    var dropOn = dropRec ? ' ' + dropPosition + ' ' + dropRec.get('name') : ' on empty view';
                    //Ext.example.msg("Drag from right to left", 'Dropped ' + data.records[0].get('name') + dropOn);
                }
            }
    },
    initComponent : function (){
        this.callParent (arguments);
        
        
    }
    
    
});

