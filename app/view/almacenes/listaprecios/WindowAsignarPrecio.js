/*
 * @Autor: Max jimenez
 * @Email: maxmjt@gmail.com
 */
Ext.define("Erp.view.almacenes.listaprecios.WindowAsignarPrecio",{

		 extend		: "Ext.window.Window",
		layout          : {align: 'stretch',type: 'vbox'},
                defaults        : {
                                   bodyStyle: 'padding:20px',
                                   rame: true
                                   },		
                title		: "Asignar..",
		width		: 820,
		height		: 410,
                constrain       : true,
		plain		: true,
		headerPosition  : 'left',
                resizable       : false,
                closeAction     : 'destroy',
                alias           : ['widget.WindowAsignarPrecio'],
                dockedItems     : [],

		initComponent	: function (){
                        var thiss = this;
                        thiss.callParent();
		
		}


});

