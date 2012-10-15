/*
 * @Autor: Max marcelo jimenez T,Crithian Valencia, Pablo Garcia Guaman
 * @Email: maxmjt@gmail.com, fox_tian@hotmail.com ,garcia_guaman_pablo@hotmail.com
 */

Ext.define ('Erp.controller.plancuentas.ControllerCuentasAsociadas',{
    extend  : 'Ext.app.Controller',
    stores   : ['plancuentas.StoreCuentasAsociadas'],
    models   : ['plancuentas.ModelCuentasAsociadas'],
    views    : [
                'plancuentas.WindowCuentasAsociadas',
                'plancuentas.PanelCuentasAsociadas',
                'plancuentas.GridCuentasAsociadas'
            ],
    
   
    init    : function (){
        var thiss=this;
        
        thiss.control({
           
		'windowcuentasasociadas'      :{
                    beforerender	 : thiss.iniciarVentana
                    
	    },
            
                'gridcuentasasociadas checkcolumn'      :{
                    checkchange	 : thiss.checkColumnChange
                   
	    },
			
             
			
                'gridcuentasasociadas button[option=btnActualizar]'    :{
                     click   : thiss.actualizarGrid 
                
            },
                'gridcuentasasociadas trigger[option=search]  '    :{
                        keypress        : thiss.buscarEntidad,
                        onTriggerClick  : thiss.limpiarCampo

           },
            
                'panelcuentasasociadas combobox '       :{
                    select  : thiss.tipoEntidadSeleccionada
                       
                    
                }
                    
            });
            
            
       
        
         },
         iniciarVentana             : function (window){
             var cboEntidad = window.down('panelcuentasasociadas combobox[option=comboTipoEntidad]');
              cboEntidad.getStore().getProxy().extraParams.xaction='readtypeentidad';
              cboEntidad.getStore().load();
            Ext.Ajax.request({
                    url		: 'data/classes/sis_erp_account_associated.php',
                    params	: {
                                    xaction         : 'enterprisename'
                    },
                    method	: 'POST',
                    success: function(r) {
                        var result=Ext.decode(r.responseText);
                        window.down('grid').enterpriseName=result.enterpriseName;
                        window.down('label[option=gridTitleLabel]').setText(result.enterpriseName);
                       
                    },
                    failure: function(r) {
                            //var result=Ext.decode(r.responseText);
                    }
					
              });
         },
         
         limpiarCampo               : function (trigger){
            
         },
         
         buscarEntidad              : function (field,e){
            var store=field.up('grid').getStore();
            
            if(e.getKey()==13){
                
                
                    store.getProxy().extraParams.filter=field.getValue();
                    store.loadPage(1);
                
                   
            }
             
         },
	
        tipoEntidadSeleccionada     : function (combo,records){
            var grid=combo.up('window').down('grid');
            var store=grid.getStore();
            
            store.getProxy().extraParams.tablename=combo.getValue();
            store.getProxy().extraParams.filter='';
           
            if(grid.down('trigger').isDisabled()&& grid.down('button[option=btnActualizar]').isDisabled() ){
                grid.down('trigger').setDisabled(false);
                grid.down('button[option=btnActualizar]').setDisabled(false);
            }
            grid.down('trigger').setValue('');
            grid.down('label[option=gridTitleLabel]').setText(grid.enterpriseName +' - '+records[0].get('type'));
           
            store.loadPage(1);
            
           
        },
        
        
	checkColumnChange	: function (CheckColumn, rowIndex, checked, eOpts){
		
		
		var panel=CheckColumn.up('grid').up('window').down('panel');
		var store=CheckColumn.up('grid').getStore();
		
		var idaccountplan=panel.getIdaccountplan();
		var id=store.getAt(rowIndex).get('id');
                var tablename=store.getProxy().extraParams.tablename;
		var action;
		if(checked){
			action='insert';
		
		}else{
			action='delete';
		}
		
		
		Ext.Ajax.request({
                    url		: 'data/classes/sis_erp_account_associated.php',
					params	: {
							xaction			: action,
							idaccountplan	: idaccountplan,
							id		: id,
                                                        tablename       : tablename
					
					},
					method	: 'POST',
                    
					
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
						store.load();
                            
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
                                        store.load();
					}
					
        });
		
	
	},
   
    cargarGridStore     : function (grid){

         grid.getStore().loadPage(1);
       
       
    },
    actualizarGrid      : function (button){
        button.up('grid').getStore().load();
       
        
    }
    
    
});
    
