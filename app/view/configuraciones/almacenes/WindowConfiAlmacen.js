/*
 * @Autor: Max jimenez
 * 
 */
Ext.define("Erp.view.configuraciones.almacenes.WindowConfiAlmacen",{

		extend		: "Ext.window.Window",
		height          : 480,
                width           : 883,
                layout		: "column",
                title: 'Configuraciones',
                constrain       : true,
		plain		: true,
		headerPosition  : 'top',
                resizable       : false,
                closeAction     : 'destroy',
                //defaults        : {columnWidth:0.5},
                alias           : ['widget.windowconfialmacen'],
                dockedItems     : [],

		initComponent	: function (){
                        var thiss = this;
                        thiss.callParent();
		
		}


});

