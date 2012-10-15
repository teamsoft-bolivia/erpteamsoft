/*
 * @Autor: Max marcelo jimenez T,Crithian Valencia, Pablo Garcia Guaman
 * @Email: maxmjt@gmail.com, fox_tian@hotmail.com ,garcia_guaman_pablo@hotmail.com
 */

Ext.define ('Erp.controller.almacenes.ControllerItemDatosAdicionales',{
    extend  : 'Ext.app.Controller',
    stores   : ['StoreType',
                'almacenes.StoreItemUnidades',
                'almacenes.StoreItemCategory'],
    models   : ['ModelType',
                'almacenes.ModelItemUnidades',
                'almacenes.ModelItemCategory'],
    views    : [
                
                'almacenes.item.datosadicionales.PanelDatosAdicionales',
                'almacenes.item.datosadicionales.FormDatosAdicionales',
                'almacenes.item.datosadicionales.GridUnidades'
            ],
    
   
    init    : function (){
        var thiss=this;
        
        thiss.control({
                'paneldatosadicionales'      : {
                    beforerender    : thiss.iniciarPanelDatosAdicionales
                },
                
                 'gridunidades'              :{
                   edit        : thiss.editGrid,
                   beforeedit  : thiss.beforeEdit,
                   validateedit: thiss.afterEdit,
		   afterrender : thiss.iniciarGridUnidades,
                   canceledit  : thiss.cancelEdit
                   
				                      
                    
                },
                'formitemdatosadicionales'  :{
                    beforerender    : thiss.iniciarFormularioDatosAdicionales
                    
                },
                
                 'gridunidades button[option=btnAgregar]'  :{
                   click        : thiss.agregarRegistro
                   
                }
                
            });
            
            
       
        
         },
         iniciarPanelDatosAdicionales             : function (panel){
             if(panel.state!='N'){
                var grid=panel.down('gridunidades');
              
                grid.getStore().getProxy().extraParams.iditem=grid.iditem;
                grid.getStore().load();
             }
		  
		   
           
         },
        
         iniciarFormularioDatosAdicionales    : function (form){
            
            if(form.up('paneldatosadicionales').state=='N'){
                 var newRecord=Ext.create('Erp.model.almacenes.item.ModelListaItem',{});
                 form.getForm().loadRecord(newRecord);
                 
             }else{
              
              form.getForm().loadRecord(form.record);
             }
        
        },
        editGrid    :	function(editor,e){
            var window=e.grid.up('windowitem');
            var iditem=window.down('numberfield[name=iditem]').getValue();
            
           Ext.Ajax.request({
            url  : 'data/classes/sis_erp_item_unit.php',
                params : {
                xaction         : e.grid.modegrid,
                nuevosvalores   : Ext.JSON.encode(editor.context.newValues) ,
                iditem          : iditem
                },
                method : 'POST',

                success: function(r) {

                var result=Ext.decode(r.responseText);

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
                    
                    e.grid.getStore().getProxy().extraParams.iditem=iditem;
                    
                    e.grid.getStore().load();
                    e.grid.modegrid='update';

                },
                failure: function(r) {
                var result=Ext.decode(r.responseText);
                    
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
                    e.grid.modegrid='update';

                }

            });                

        },
        agregarRegistro : function(button){
           var grid=button.up('grid');
           var window=grid.up('windowitem');
           var iditem=window.down('numberfield[name=iditem]');
           
           if (window.stateMode=="E") {

                    grid.modegrid='insert';
                    var record=Ext.create('Erp.model.almacenes.ModelItemUnidades', {
                        iditemunit:'',
                        iditem:iditem.getValue(),
                        idunit:'',
                        unitname:'',
                        idunitcontent:'',
                        quantity:'0'

                    });
                    grid.getStore().insert(0, record);
                    grid.getPlugin().startEdit(0,0);
              
            }
           
            
           
            
        },
        beforeEdit  :	function(editor,e){
           
            var window=e.grid.up('windowitem');
            var res=true;
            if(window.stateMode=='R'){
                res=false;
            }else if(window.stateMode=='E'){
                res= true;
            }else if (window.stateMode=='N'){
                res= false;
            }
             return res;       

        },
        afterEdit   :	function(editor,e){
          
        },
        cancelEdit  : function (editor,e){
            
                  e.grid.modegrid='update';
                  e.grid.getStore().load();    
        },
        iniciarGridUnidades:	function(grid){
                              

        }
		
		
});
    
