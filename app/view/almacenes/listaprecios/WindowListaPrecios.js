/*
 * @Autor: Max jimenez
 * @Email: maxmjt@gmail.com
 */
Ext.define("Erp.view.almacenes.listaprecios.WindowListaPrecios",{

		 extend		: "Ext.window.Window",
		layout          : {align: 'stretch',type: 'vbox'},
                defaults        : {
                                   bodyStyle: 'padding:20px',
                                   rame: true
                                   },		
                title		: "Items..",
		width		: 760,
		height		: 410,
                constrain       : true,
		plain		: true,
		headerPosition  : 'left',
                resizable       : false,
                closeAction     : 'destroy',
                alias           : ['widget.WindowListaPrecios'],
                dockedItems     : [],

		initComponent	: function (){
                        var thiss = this;
                        thiss.callParent();
		
		}


});

