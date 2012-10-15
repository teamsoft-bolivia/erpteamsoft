/*
 * @Autor: Max jimenez
 * 
 */
Ext.define("Erp.view.configuraciones.WindowConfiFinanzas",{

		extend		: "Ext.window.Window",
		layout		: "column",
                title		: "Configuraciones",
		width		: 968,
		height		: 280,
                constrain       : true,
		plain		: true,
		headerPosition  : 'top',
                resizable       : false,
                closeAction     : 'destroy',
                //defaults        : {columnWidth:0.5},
                alias           : ['widget.windowconfifinanzas'],
                dockedItems     : [],

		initComponent	: function (){
                        var thiss = this;
                        thiss.callParent();
		
		}


});

