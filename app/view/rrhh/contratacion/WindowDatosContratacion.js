/* 
 * @Autor Estiven Humbetro Salinas Chiri
 * email: humsal05@gmail.com
 */
Ext.define("Erp.view.rrhh.contratacion.WindowDatosContratacion",{
    
    extend : "Ext.window.Window",
    layout : "column",
    width  : 1000,
    height : 400,
    x      : 10,
    y      : 10,
    constrain : true,
    plain : true,
    headerPosition : "left",
    resizable : false,
    closeAction : "destroy",
    alias : ["widget.windowdatoscontratacion"],

    initComponent	: function (){
        var thiss = this;
        thiss.callParent();
		
    }
});


