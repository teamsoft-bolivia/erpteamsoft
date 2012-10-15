/*
 * @Autor: Max jimenez
 * 
 */
Ext.define("Erp.view.almacenes.maestroalmacen.WindowAlmacenes",{

		extend		: "Ext.window.Window",
                title		: "Maestro Almacenes",
		height          : 485,
                width           : 650,
                layout          : {
                                     type: 'fit'
                                   },
                constrain       : true,
		plain		: true,
		headerPosition  : 'left',
                resizable       : false,
                closeAction     : 'destroy',
                stateMode       : 'R',
                idstore         :0,
                alias           : ['widget.windowalmacenes'],
                dockedItems     : [],

		initComponent	: function (){
                        var thiss = this;
                        this.tbar=thiss.buildTbar();
                        Ext.applyIf(thiss,{
                            items : [
                                {
                                    xtype   : 'panel',
                                    alias   : 'widget.panelalmacenes',
                                    frame   : false,
                                    layout  : {
                                        type    :  'column'
                                    }
                                }
                            ]
        
    
                        });
                        thiss.callParent();
		
    },
    buildTbar  : function (){
        return [{
                    xtype: 'buttongroup',
                    title: 'Edici&oacute;n',
                    group: 'edicion',
                    columns: 4,
                    items: [
                        {
                            xtype: 'button',
                            text: 'Nuevo',
                            iconCls:'btnnew',
                            option:'btnNuevo'
                        },
                        {
                            xtype: 'button',
                            text: 'Guardar',
                            iconCls:'btnsave',
                            option:'btnGuardar'
                            //disabled:true
                        },
                        {
                            xtype: 'button',
                            text: 'Editar',
                            iconCls:'btnedit',
                            option:'btnEditar'
                        },
                        {
                            xtype: 'button',
                            text: 'Cancelar',
                            iconCls:'btncancel',
                            option:'btnCancelar'
                            //disabled:true
                        }
                    ]
               },
               {
                    xtype: 'buttongroup',
                    title: 'Herramientas',
                    group: 'herramientas',
                    columns: 1,
                    items   : [
                        {
                            xtype: 'button',
                            text: 'Tipo de Almacen',
                            iconCls:'btnnew',
                            option:'btnTipoAlmacen'
                            //disabled:true
                        }
                        
                    ]
               }]
       
        
    }


});

