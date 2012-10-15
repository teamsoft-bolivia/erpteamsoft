/*
 * @Autor: Max marcelo jimenez T,Crithian Valencia, Pablo Garcia Guaman
 * @Email: maxmjt@gmail.com, fox_tian@hotmail.com ,garcia_guaman_pablo@hotmail.com
 */

Ext.define("Erp.view.almacenes.item.categorias.WindowCategorias",{

		extend		: "Ext.window.Window",
		layout		: {
                                    type    :'vbox',
                                    align   :'stretch',
                                    padding : 1
                },
                title		: "Categorias",
		width		: 600,
		height		: 315,
                frame           : true,
                constrain       : true,
		plain		: true,
		headerPosition  : 'left',
                modal           : true,
                resizable       : false,
                closeAction     : 'destroy',
                alias           : ['widget.windowcategorias'],
		initComponent	: function (){
                        var thiss = this;
                        thiss.callParent();
		
		}


});