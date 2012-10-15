/*
 * @Autor: Pablo Garcia guaman
 * @Email: garcia_guaman_pablo@hotmail.com
 */
Ext.Loader.setConfig({
    enabled: true
});
Ext.Loader.setPath('Erp.helper', 'app/helper/');
Ext.require(
    ['Erp.helper.Constants',
     'Erp.helper.Tools'//,
   //  'Erp.helper.ComboAutoCompletado'
    ]
    );

Ext.application({
    name: 'Erp',
    appFolder: 'app',
    autoCreateViewport: false,
    controllers:[
        'Principal',
        'ControllerPlanCuentas',
        'configuraciones.ControllerPlanCuentas',
        'ControllerLogin',        
        'plancuentas.ControllerCuentasAsociadas',
        'finanzas.ControllerTipoCambio',
        
        'almacenes.item.ControllerItemWindow',
        'almacenes.item.ControllerItemList',
        'almacenes.ControllerListaPrecios',
        'almacenes.ControllerItemDatosGenerales',
        'almacenes.ControllerItemDatosAdicionales',
        'almacenes.ControllerCategoria',
        'almacenes.item.unit.ControllerUnit',

        'almacenes.proveedores.ControllerProveedores',

        'configuraciones.ControllerAlmacenes',

        'almacenes.maestroalmacen.ControllerMaestroAlmacen',
        
        'almacenes.transacciones.ControllerListaCompras',
        'almacenes.transacciones.ControllerCondicionPago',
        'almacenes.transacciones.ControllerDocImage',
        'almacenes.transacciones.ControllerTxnCompras',
        'almacenes.transacciones.ControllerListaEntradas',
        'almacenes.transacciones.ControllerTxnEntradas',
        'almacenes.transacciones.ControllerListaSalidas',
        'almacenes.transacciones.ControllerListaTransferencias',
        'almacenes.transacciones.ControllerTxnTransferencias',
        'almacenes.transacciones.ControllerListaRecepcionTransferencias',

        'almacenes.transacciones.ControllerTxnRecepcionTransferencias',
        'almacenes.transacciones.ControllerTxnSalidas',
        'almacenes.kardex.ControllerKardexItem',
        'rrhh.contratacion.ControllerDatosContratacion',
        //RRHH
        'rrhh.organigrama.ControllerOrganigrama',
        'rrhh.personal.ControllerListaPersonal',
        'rrhh.personal.ControllerPersonal',
        'rrhh.cargos.ControllerCargos',
        'rrhh.planilla.ControllerPlanilla',
        'rrhh.kardex.ControllerKardex'

    ],
    //views:['Principal'],
    launch: function() {
        
		var hideMask = function () {
		  Ext.get('loading').remove();
		  Ext.fly('loading-mask').animate({
			opacity : 0,
			remove  : true
		  });
                  
                  Ext.Ajax.request({
                        url:'data/classes/sis_erp_user.php',
                        params:{xaction:'isLoged'},
                        success:function(response){
                            var result=Ext.JSON.decode(response.responseText);
                            if (!result.success) {
                                var winLogin=Ext.create('Erp.view.Login',{
                                        
                                }).show();
                            }else{
                                
                                
                                var headmenu=Ext.create('Erp.view.HeadMenu',{
                                    items:[{text:result.login,
                                            iconCls:'icon-user',
                                            option:'usuario'},
                                            {text:result.enterprise,
                                            iconCls:'icon-enterprise',
                                            option:'empresa'},
                                            {text:'Salir',
                                            tooltip:'Salir del Sistema',
                                            iconCls:'icon-logout',
                                            option:'salir'}
                                    ]
                                });
                                var head=Ext.create('Erp.view.HeadPanel',{
                                    tbar:[headmenu]
                                });

                                var viewport=Ext.create('Erp.view.Principal',{
                                    login:result.login,
                                    enterprise:result.enterprise
                                });
                                viewport.add(head);
                                
                            }

                        }

                    });
                  
		};
		Ext.defer(hideMask, 2500);
  }
    
});


