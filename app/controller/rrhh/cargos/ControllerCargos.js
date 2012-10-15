
Ext.define('Erp.controller.rrhh.cargos.ControllerCargos',{
   extend       : 'Ext.app.Controller' ,
   views        : [
       'rrhh.cargos.WindowCargos',
       'rrhh.cargos.FormCargos',
   ],
   
   init: function(){
       var thiss = this;
      thiss.control({
            "menupanel panel button[option=btnCargos]" : {
                click : this.initCargos
            }
        });
   },
   initCargos   : function(window)
   {
       var centerPanel      = Ext.getCmp('center-panel');
       var windowCargos     = Ext.create('Erp.view.rrhh.cargos.WindowCargos');
       var formCargos       = Ext.create('Erp.view.rrhh.cargos.FormCargos');
       
       windowCargos.add(formCargos);
       centerPanel.add(windowCargos);
       windowCargos.show();

   }
});