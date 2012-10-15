/*
 * @Autor: Max jimenez
 * 
 */
Ext.define("Erp.view.almacenes.item.unit.WindowUnit",{

		extend		: "Ext.window.Window",
		layout		: "fit",
                title		: "Unidades",
		width		: 600,
		height		: 250,
                constrain       : true,
		plain		: true,
		headerPosition  : 'left',
                resizable       : false,
                closeAction     : 'destroy',
                //defaults        : {columnWidth:0.5},
                alias           : ['widget.WindowUnit'],
                dockedItems     : [],

		initComponent	: function (){
                        var thiss = this;
                        thiss.callParent();
		
		}


});




