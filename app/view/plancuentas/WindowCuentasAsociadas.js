/*
 * @Autor: Max marcelo jimenez T,Crithian Valencia, Pablo Garcia Guaman
 * @Email: maxmjt@gmail.com, fox_tian@hotmail.com ,garcia_guaman_pablo@hotmail.com
 */

Ext.define("Erp.view.plancuentas.WindowCuentasAsociadas",{

		extend		: "Ext.window.Window",
		layout		: {
                                    type    :'vbox',
                                    align   :'stretch',
                                    padding : 1
                },
                title		: "Cuentas Asociadas",
		width		: 550,
		height		: 400,
                constrain       : true,
		plain		: true,
		headerPosition  : 'left',
                modal           : true,
                resizable       : false,
                closeAction     : 'destroy',
                alias           : ['widget.windowcuentasasociadas'],
		initComponent	: function (){
                        var thiss = this;
                        thiss.callParent();
		
		}


});