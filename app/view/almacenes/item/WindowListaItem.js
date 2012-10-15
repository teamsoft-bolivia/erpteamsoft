/*
 * @Autor: Max jimenez
 * 
 */
Ext.define("Erp.view.almacenes.item.WindowListaItem",{

		extend		: "Ext.window.Window",
		layout		: "fit",
                title		: "Items",
		width		: 705,
		height		: 450,
                constrain       : true,
		plain		: true,
		headerPosition  : 'left',
                resizable       : false,
                closeAction     : 'destroy',
                //defaults        : {columnWidth:0.5},
                alias           : ['widget.WindowListaItem'],
                dockedItems     : [],

		initComponent	: function (){
                        var thiss = this;
                        thiss.callParent();
		
		}


});

