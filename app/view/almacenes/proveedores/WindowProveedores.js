/*
 * @Autor: Max jimenez
 * 
 */
Ext.define("Erp.view.almacenes.proveedores.WindowProveedores",{

		extend		: "Ext.window.Window",
                title		: "Proveedores",
		height          : 546,
                width           : 670,
                layout          : {
                                    type: 'column'
                                    },
                constrain       : true,
		plain		: true,
		headerPosition  : 'left',
                resizable       : false,
                closeAction     : 'destroy',
                stateMode       :'R',
                idProveedor     :0,
                //defaults        : {columnWidth:0.5},
                alias           : ['widget.WindowProveedores'],
                dockedItems     : [],

		initComponent	: function (){
                        var thiss = this;
                        thiss.callParent();
		
		}


});

