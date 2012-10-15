/*
 * @Autor: Max marcelo jimenez T
 * @Email: maxmjt@gmail.com
 */

Ext.define ('Erp.view.almacenes.listaprecios.PanelGridItemAsignadosPrecios',{
    extend      : 'Ext.grid.Panel',
    alias       : 'widget.panelgriditemasignadosprecios',
    
    width:730,
    height: 328,
    //colspan:2,
    title: 'Items asignados',
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
            xtype: 'numbercolumn',
            dataIndex: 'cost',
            text: 'Precio',
            width:70
        }
    ],
    viewConfig: {

    },
   


    initComponent : function (){
        this.callParent (arguments);
        
        
    }
    
    
});

