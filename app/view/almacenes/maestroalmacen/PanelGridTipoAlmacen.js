/*
 * @Autor: 
 * 
 */
Ext.define("Erp.view.almacenes.maestroalmacen.PanelGridTipoAlmacen", {
    extend  : "Ext.grid.Panel",
    alias   : ['widget.panelgridtipoalmacen'],
    height  : 250,
    padding : 5,
    disableSelection:false,
    selType     : 'rowmodel',
    hideHeaders : true,
    initComponent   : function (){
        var thiss=this;
        thiss.store=Ext.create('Erp.store.StoreType',{});
        thiss.columns=thiss.buildColumns();
        thiss.dockedItems =this.buildDockedItems(thiss.store);
        thiss.plugins = Ext.create('Ext.grid.plugin.RowEditing', {
                        clicksToEdit: 2,
                        autoCancel  : false,
                        saveBtnText : 'Guardar',
                        cancelBtnText: 'Cancelar'
                    });
                
        thiss.callParent(arguments);

    },
    buildColumns    : function() {
        return [
            {xtype  : 'rownumberer',header : '#',
                    renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                            if (this.rowspan){
                                metaData.cellAttr = 'rowspan="'+this.rowspan+'"';
                            }

                            metaData.tdCls = Ext.baseCSSPrefix + 'grid-cell-special';
                         return store.indexOfTotal(record) + 1;
                         
                        }
             },
            
            {header: 'idtype',  dataIndex: 'idtype',hidden:true},
            {header: 'Tipo de Almacen',  dataIndex: 'type', field: 'textfield',flex:1 ,editor:{}}

    ]
                    
                    
    },
    buildDockedItems  : function (store){
        return [ 
               {
                        xtype       : 'pagingtoolbar',
                        store       :  store,
                        dock        : 'bottom',
                        displayInfo : true,
                        displayMsg  : "Tot:{2}"
                }

        ]
    }

});



