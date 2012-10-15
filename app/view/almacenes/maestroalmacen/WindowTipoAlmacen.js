/*
 * @Autor: Max jimenez
 * 
 */
Ext.define('Erp.view.almacenes.maestroalmacen.WindowTipoAlmacen',{

		extend		: "Ext.window.Window",
                title		: "Tipo de Almacen",
		height          : 320,
                width           : 350,
                layout          : {
                                     type: 'fit'
                                   },
                constrain       : true,
		plain		: true,
		headerPosition  : 'left',
                resizable       : false,
                closeAction     : 'destroy',
                stateMode       : 'R',
                alias           : ['widget.windowtipoalmacen'],
                modal           : true,

		initComponent	: function (){
                        var thiss = this;
                        thiss.dockedItems=thiss.buildDockedItems();
                        thiss.items=this.buildItems();
                        thiss.callParent(arguments);
		
		},
                buildItems      : function (){
                    return [
                                {
                                    xtype   : 'panel',
                                    alias   : 'widget.paneltipoalmacen',
                                    frame   : false,
                                    layout  : {
                                        type    :  'fit'
                                    }
                                }
                     ]
                },
                buildDockedItems: function (){
                    return [{
                            xtype: 'toolbar',
                            dock: 'top',
                            layout: {
                            type: 'hbox',
                            align: 'stretch'
                            },
                            items: [{
                                xtype: 'buttongroup',
                                title: 'Edici&oacute;n',
                                group : 'edicion',
                                columns: 4,
                                items: [
                                    {
                                        xtype: 'button',
                                        text: 'Nuevo Tipo de Almacen',
                                        iconCls:'btnnew',
                                        option:'btnAddTipoAlmacen'
                                    }
                                ]
                            }]
                    }]
        
    }


});

