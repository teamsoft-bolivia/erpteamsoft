/*
 * @Autor: Max marcelo jimenez T,Crithian Valencia, Pablo Garcia Guaman
 * @Email: maxmjt@gmail.com, fox_tian@hotmail.com ,garcia_guaman_pablo@hotmail.com
 */

Ext.define("Erp.view.plancuentas.WindowPlanCuentas",{

		extend		: "Ext.window.Window",
		layout		: "column",
                title		: "Plan de Cuentas",
		width		: 1000,
		height		: 400,
                x               : 10,
                y               : 10,
                constrain       : true,
		plain		: true,
		headerPosition  : 'left',
                resizable       : false,
                closeAction     : 'destroy',
                //defaults        : {columnWidth:0.5},
                alias           : ['widget.windowplancuentas'],
                dockedItems     : [{
                    xtype : 'toolbar',
                    dock  : 'left',
                    items : []
                },{
                    
                    xtype : 'toolbar',
                    dock  : 'right',
                    items: [
                        
                        {
                                xtype 	: 'button',
                                name  	: 'btnNuevo',
                                text	: 'Nuevo',
                                tooltip : 'Nueva Cuenta',
                                option  : 'btnNuevo',
                                textAlign   : 'left',
                                iconCls     : 'addAccount'
                        },'-',
                        {
                                xtype 	: 'button',
                                name  	: 'btnEditar',
                                text	: 'Editar',
                                option  : 'btnEditar',
                                textAlign   : 'left',
                                iconCls     : 'editAccount'
                        },'-',{
                                xtype 	: 'button',
                                name  	: 'btnGuardar',
                                text	: 'Guardar',
                                option      : 'btnGuardar',
                                textAlign   : 'left',
                                iconCls     : 'saveAccount'
                        },
                        '-',{
                                xtype	: 'button',
                                name  	: 'btnCancelar',
                                text	: 'Cancelar',
                                option      : 'btnCancelar',
                                textAlign   : 'left',
                                iconCls     : 'cancelAccount'
                        },
                        '-',{
                                xtype 	: 'button',
                                name  	: 'btnAsociar',
                                text	: 'Asociar',
                                option      : 'btnAsociar',
                                textAlign   : 'left',
                                iconCls     : 'associatedAccount',
                                disabled    :   true
                        }
                    ]
                }],

		initComponent	: function (){
                        var thiss = this;
                        thiss.callParent();
		
		}


});