
/*
 * @Autor: Pablo Garcia guaman
 * @Email: garcia_guaman_pablo@hotmail.com
 */

Ext.define('Erp.view.MenuPanel', {
    extend: 'Ext.panel.Panel',
    alias:'widget.menupanel',
    region: 'west',
    title: 'Menu Principal',
    layout:'accordion',
    //collapseMode:'mini',
    width: 200,
    collapsible:true,
    margins:'5 0 5 5',
    split:true,
    items:[
                     {
                            xtype: 'panel',
                            collapsed: false,
                            title: 'Finanzas',
                            items:[{
                                    xtype: 'button',
                                    option:'btnplancuentas',
                                    autoWidth:true,
                                    width:198,
                                    text: '<h1>Plan de Cuentas</h1>'
                                },
                                {
                                    xtype: 'button',
                                    option:'btntipocambio',
                                    autoWidth:true,
                                    width:198,
                                    text: '<h1>Tipos de Cambio</h1>'
                                }
                            ]
                        },{
                            xtype: 'panel',
                            collapsed: false,
                            title: 'Inventarios',
                            items:[{
                                    xtype: 'button',
                                    option:'btnitem',
                                    width:198,
                                    text: 'Maestro Items'
                                },
                                {
                                    xtype: 'button',
                                    option:'btnitemprecios',
                                    width:198,
                                    text: 'Precios Items'
                                },
                                {
                                    xtype: 'button',
                                    option:'btncategorias',
                                    width:198,
                                    text: 'Categorias'
                                },
                                {
                                    xtype: 'button',
                                    option:'btnunit',
                                    width:198,
                                    text: 'Unidades'
                                },{
                                    xtype: 'button',
                                    option:'btnproveedor',
                                    width:198,
                                    text: 'Proveedores'
                                },{
                                    xtype: 'button',
                                    option:'btncompras',
                                    width:198,
                                    text: 'Compra de Items'
                                },
                                {
                                    xtype: 'button',
                                    option:'btnentradas',
                                    width:198,
                                    text: 'Entrada de Items'
                                },
                                {
                                    xtype: 'button',
                                    option:'btnsalidas',
                                    width:198,
                                    text: 'Salida de Items'
                                },
                                {
                                    xtype: 'button',
                                    option:'btnmaestroalmacen',
                                    width:198,
                                    text: 'Maestro Almacenes'
                                },
                                {
                                    xtype: 'button',
                                    option:'btntransferencias',
                                    width:198,
                                    text: 'Transferencias'
                                },
                                {
                                    xtype: 'button',
                                    option:'btnrecepciontransferencias',
                                    width:198,
                                    text: 'Recepcion tranferencia'
                                },
                                {
                                    xtype: 'button',
                                    option:'btnkardexitem',
                                    width:198,
                                    text: 'Kardex Items'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            collapsed: false,
                            title: 'RRHH',
                            items:[{
                                    xtype: 'button',
                                    option:'btnEstructuraOrganica',
                                    autoWidth:true,
                                    width:198,
                                    text: '<h1>Estructura organizacional</h1>'
                                },{
                                    xtype: 'button',
                                    option:'btnpersonal',
                                    autoWidth:true,
                                    width:198,
                                    text: '<h1>Maestro Empleados</h1>'
                                },{
                                    xtype: 'button',
                                    option:'btnDatosContratacion',
                                    autoWidth:true,
                                    width:198,
                                    text: '<h1>Datos de Contrataci&oacute;n</h1>'                                
                                },{
                                    xtype       : 'button',
                                    option      : 'btnCargos',
                                    autoWidth   : true,
                                    width       : 198,
                                    text        : '<h1>Cargos</h1>'
                                },
                                {
                                    xtype       : 'button',
                                    option      : 'btnPlanilla',
                                    autoWidth   : true,
                                    width       : 198,
                                    text        : '<h1>Planilla</h1>'
                                },
                                {
                                    xtype       : 'button',
                                    option      : 'btnKardex',
                                    autoWidth   : true,
                                    width       : 198,
                                    text        : '<h1>Kardex</h1>'
                                }
                            ]
                        }
                        ,
                        {
                            xtype: 'panel',
                            collapsed: false,
                            title: 'Configuraciones',
                            items:[{
                                    xtype: 'button',
                                    option:'btnconfplancuentas',
                                    autoWidth:true,
                                    width:198,
                                    text: '<h1>Plan de Cuentas</h1>'
                                },{
                                    xtype: 'button',
                                    option:'btnconfAlmacenes',
                                    autoWidth:true,
                                    width:198,
                                    text: '<h1>Almacenes</h1>'
                                }
                            ]
                        }
                    ],
    initComponet:function(){

    }
});