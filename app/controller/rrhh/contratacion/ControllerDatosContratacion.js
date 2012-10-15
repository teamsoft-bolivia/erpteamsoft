/* 
 * @Autor Estiven Humbetro Salinas Chiri
 * email: humsal05@gmail.com
 */
Ext.define("Erp.controller.rrhh.contratacion.ControllerDatosContratacion",{
    extend : "Ext.app.Controller",
//    stores : [],
//    models : [],
    views : ["rrhh.contratacion.WindowDatosContratacion","rrhh.contratacion.tabDatosContratacion"],
    
    init : function(){
        this.control({
            "menupanel panel button[option=btnDatosContratacion]" : {
                click : this.action
            }
        });
    },
    
    action : function() {
        var fp = Ext.getCmp("center-panel");
        var windc = Ext.create("Erp.view.rrhh.contratacion.WindowDatosContratacion",{});
        var paneldatoscontratacion = Ext.create("Erp.view.rrhh.contratacion.tabDatosContratacion",{});
        fp.add(windc);
        windc.add(paneldatoscontratacion);
        windc.show();
        
    }
});