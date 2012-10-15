/*
 * @Autor: Max marcelo jimenez T
 * @Email: maxmjt@gmail.com
 */


Ext.define('Erp.controller.almacenes.item.unit.ControllerUnit', {
    extend: 'Ext.app.Controller',
    stores: ['almacenes.item.unit.StoreUnit'],
    //models: ['almacenes.ModelListaItem','ModelType'],
    views: ['almacenes.item.unit.WindowUnit',
            'almacenes.item.unit.PanelGridUnit'
        ],
    init: function() {
        
        var thiss=this;
        
        thiss.control({
              'WindowUnit'      :{
                    beforerender: thiss.iniciarVentanaUnit
                    
                },
               'panelgridunit button[option=AddUnidad]' :{
                  click : thiss.functionAgregarUnit
                  
              },
              'panelgridunit':{
                  afteredit: thiss.grillaafteredit,
                  edit: thiss.guardarDatosModificadosUnit,
                  canceledit: this.cancelargrillalistapreios
              }
                
              

        });
    },
    iniciarVentanaUnit             : function (window){
             window.down('grid').getStore().load();
             
    },
    
    opcionSeleccionada:function(combo,records){
            
            var grid=combo.up('window').down('panelgriditemasignadosprecios');
            var store=grid.getStore();
            
            store.getProxy().extraParams.iditemlist=combo.getValue();
            //store.getProxy().extraParams.filter='';
            //console.log(combo.getValue());
            store.load();
            //grid.down('trigger').setValue('');
            //grid.down('label[option=gridTitleLabel]').setText(grid.enterpriseName +' - '+records[0].get('type'));
           
            //store.loadPage(1);
            
           
        
    },
    limpiarCampo: function (trigger){
            
         },
    buscarItem: function (field,e){
        var win=field.up('window');
        var combo=field.up('window').down('combobox');
        var comboselec=combo.getValue();
        
        var grid=field.up('window').down('panelgridlistaitemasignar');
        var store=grid.getStore();
            //console.log(grid);
            store.getProxy().extraParams.idselectcategoria=comboselec;
            store.getProxy().extraParams.iditemlist=win.combosel;
            //store.getProxy().extraParams.filter='';
            //console.log(combo.getValue());
            //store.load();
        
        
        //var store=field.up('grid').getStore();
            //console.log(store);
            //store.loadPage(1);
            if(e.getKey()==13){
                    store.getProxy().extraParams.filter=field.getValue();
                    store.loadPage(1); 
            }
        
    },
    functionAgregarUnit: function(btn,e,eOpts){
          
        var grillaM=btn.up('panel');
        //console.log(grillaM);
        var storegrillaM=grillaM.getStore();
        grillaM.modegrid='createmoneda';
        
        var plugingrillaM=grillaM.getPlugin();
        //var confEdit=grilla.getElConfig();
         var r=Ext.create('Erp.model.almacenes.item.unit.ModelUnit', {
         idunit:0,
         unitname:'',
         description:'',
         cantidad:'',
         active:'true',
         identerprice:''
        });
        
        
        storegrillaM.insert(0, r);
        //console.log(grilla);
        plugingrillaM.startEdit(0, 0);
    },
    grillaafteredit: function(roweditor, changes, record, rowIndex){
        console.log('after');
    },
    editgrilla: function(){
        console.log('edit');
    },
    cancelargrillalistapreios:function(roweditor, changes, record, rowIndex){
        roweditor.grid.getStore().load();
    },
    guardarDatosModificadosUnit:function(roweditor, changes, record, rowIndex){
         //var combo=roweditor.grid.up('window').down('combobox');
         
         var store=roweditor.grid.getStore();
         Ext.Ajax.request({
         url  : 'data/classes/sis_erp_unit.php',
         params : {
           xaction   : 'updateunit',
           litaprecio : Ext.JSON.encode(changes.record.data)
         },
         method : 'POST',
         success: function(r) {
             
            result=Ext.decode(r.responseText);
            Ext.create('widget.uxNotification', {
            title: result.title,
            position: 'tr',
            manager: 'instructions',
            cls: 'ux-notification-light',
            iconCls: 'ux-notification-icon-information',
            html: result.msg,
            autoHideDelay: 4000,
            slideBackDuration: 500,
            slideInAnimation: 'bounceOut',
            slideBackAnimation: 'easeIn'
            }).show();
            store.load();
            //combo.getStore().load();

         },
         failure: function(r) {
             
           result=Ext.decode(r.responseText);
           console.log(result);
           Ext.create('widget.uxNotification', {
           title: result.title,
           position: 'tr',
           manager: 'instructions',
           cls: 'ux-notification-light',
           iconCls: 'ux-notification-icon-information',
           html: result.msg,
           autoHideDelay: 4000,
           slideBackDuration: 500,
           slideInAnimation: 'bounceOut',
           slideBackAnimation: 'easeIn'
           }).show();
         }

        });
    }
    
   
});






