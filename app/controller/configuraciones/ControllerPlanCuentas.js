/*
 * @Autor: Max marcelo jimenez T
 * @Email: maxmjt@gmail.com
 */


Ext.define('Erp.controller.configuraciones.ControllerPlanCuentas', {
    extend: 'Ext.app.Controller',
    stores: ['configuraciones.StoreCuentasRaiz','configuraciones.StoreMonedas'],
    models: ['ModelTreeCuentas','configuraciones.ModelMonedas'],
    views: ['configuraciones.TapConfiPlanCuentas','configuraciones.PanelCuentasRaiz','configuraciones.PanelNomenclatura','configuraciones.PanelMonedas'],
    
 
    init: function() {
        
        var thiss=this;
 
        thiss.control({
              
               'panelcuentasraiz button[option=AddCuentaRaiz]' :{
                  click : thiss.functionAgregarCuentasRaiz
                  
              },
              'panelcuentasraiz': {
                itemdblclick: this.gridSelectionChange
              },
              'panelcuentasraiz button[option=EliminarCuentaRaiz]': {
                click: this.functionEliminarCuentasRaiz
              },
               'panelmonedas button[option=AddMoneda]' :{
                  click : thiss.functionAgregarMoneda
                  
              },
              
               'panelmonedas ' :{
                  itemdblclick: this.gridSelectionEdit
                  
              }
              

        });
    },
    
    functionAgregarCuentasRaiz : function (btn,e,eOpts){
        
               
        
        
        
        var grilla=btn.up('panel');
        var storegrilla=grilla.getStore();
        grilla.modegrid='createraiz';
        
        var plugingrilla=grilla.getPlugin();
        //var confEdit=grilla.getElConfig();
         var r=Ext.create('Erp.model.ModelTreeCuentas', {
         idaccountplan:'',
         accountcode:null,
         accountfather:0,
         fathername:'Ningun',
         accountname:'',
         level:1,
         associated:'false',
         active:'true',
         debit:0,
         credit:0,
         iduser:'',
         transactional:'false',
         currency:1  
        });
        storegrilla.insert(0, r);
        //console.log(grilla);
        plugingrilla.startEdit(0, 0);
    },
    gridSelectionChange : function (view,record, item,index, e, eOpts){
        var llave=2;
        //console.log(view);
        var grilla=view.up('panelcuentasraiz');
        grilla.modegrid='updateraiz';
        
    },
    functionEliminarCuentasRaiz : function (btn,e,eOpts){
        
        var grilla=btn.up('panel');
        var storegrilla=grilla.getStore();
        //console.log(grilla.getPlugin());
        
    },
    functionFormatoCode: function(code,incremento){
       var newcode;
       
       
       return newcode;
    },
    functionAgregarMoneda : function (btn,e,eOpts){
        
        var grillaM=btn.up('panel');
        //console.log(grillaM);
        var storegrillaM=grillaM.getStore();
        grillaM.modegrid='createmoneda';
        
        var plugingrillaM=grillaM.getPlugin();
        //var confEdit=grilla.getElConfig();
         var r=Ext.create('Erp.model.configuraciones.ModelMonedas', {
         idtype:'',
         type:'',
         option:'tipo_moneda',
         alias:'',
         father:'',
         value:'',
         primaria:'false',
         secundaria:'false'
        });
        storegrillaM.insert(0, r);
        //console.log(grilla);
        plugingrillaM.startEdit(0, 0);
    },
    gridSelectionEdit : function (view,record, item,index, e, eOpts){
        //var llave=2;
        //console.log('jeje');
        var grilla=view.up('panelmonedas');
        //console.log(grilla);
        grilla.modegrid='updatemoneda';
        
    }
   
});


