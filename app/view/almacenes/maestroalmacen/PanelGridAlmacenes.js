/*
 * @Autor: 
 * 
 */
Ext.define("Erp.view.almacenes.maestroalmacen.PanelGridAlmacenes", {
    extend  : "Ext.grid.Panel",
    alias   : ['widget.panelgridalmacenes'],
    height  : 420,
    padding : 5,
    disableSelection:false,
    selType : 'rowmodel',
    columnWidth : 0.4,
    initComponent   : function (){
        var thiss=this;
        thiss.store=Ext.create('Erp.store.almacenes.maestroalmacen.StoreListaAlmacenes',{});
        thiss.columns=thiss.buildColumns();
        thiss.dockedItems =this.buildPagingToolBar(thiss.store);

        thiss.callParent(arguments);

    },
    buildColumns    : function() {
        return [
            {xtype  : 'rownumberer',header : '#'},
            {header: 'idstore',  dataIndex: 'idstore',hidden:true},
            {header: 'Nombre',  dataIndex: 'storename', field: 'textfield',flex:1},
            {header: 'Activo',  dataIndex: 'active',width:40, align : 'center',
                renderer:function(value){
                        if (value === '1') {
                            return '<img src="resources/images/true.png">';
                        }else{
                            return '<img src="resources/images/false.png">';
                        }

                    },
                editor: {
                        xtype:'checkboxfield',
                        allowBlank:false
                    }
            }

    ]
                    
                    
    },
    buildPagingToolBar  : function (store){
                    return [ {
                                xtype       : 'pagingtoolbar',
                                store       :  store,
                                dock        : 'bottom',
                                displayInfo : true,
                                displayMsg  : '{1}-{2} de {3}'
                            }
                            ]
    },               

    viewConfig: {
        getRowClass: function(record, index) {

            var c = record.get('active');
            if (c == 1) {
                return 'price-rise';
            } else if (c == 0) {
                return 'price-fall';
            }
        }
}

});



