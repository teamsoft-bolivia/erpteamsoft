Ext.require('Ext.layout.container.Accordion');
Ext.require('Ext.layout.container.Border');

Ext.define('Erp.controller.Principal', {
    extend: 'Ext.app.Controller',
    stores:['StoreType',
            'configuraciones.StoreCuentasRaiz',
            'configuraciones.StoreMonedas',
            'almacenes.item.StoreListaItem',
            'almacenes.StoreItemListPrice',
            'almacenes.StoreGrillaItemPrecio',
            'almacenes.item.unit.StoreUnit',
            'almacenes.proveedores.StoreListaProveedores',
            'almacenes.proveedores.StoreCategoriaProveedor',
            'configuraciones.StoreAccountingType',
            'almacenes.proveedores.StoreContactos',
            'configuraciones.StoreListaTiposAsientos',
            'rrhh.personal.StoreListaPersonal'
        ],
    models:['ModelType',
        'configuraciones.ModelMonedas',
        'almacenes.item.ModelListaItem',
        'almacenes.ModelItemListPrice',
        'almacenes.item.unit.ModelUnit',
    ],
    views:[
        'Principal',
        'HeadMenu',
        'HeadPanel',
        'MenuPanel',
        'CenterPanel',        
        'configuraciones.WindowConfiFinanzas',
        'configuraciones.TapPanelConfiguraciones',
        'configuraciones.TapConfiPlanCuentas',
        'configuraciones.PanelCuentasRaiz',
        'configuraciones.PanelNomenclatura',
        'configuraciones.PanelMonedas',
        
        'finanzas.WindowTipoCambio',
        
        'almacenes.item.WindowListaItem',
        'almacenes.item.PanelListaItem',

               
        
        'almacenes.listaprecios.WindowListaPrecios',
        'almacenes.listaprecios.FormListaPrecios',
        'almacenes.listaprecios.FormAddPrecios',

        'almacenes.listaprecios.PanelGridItemAsignadosPrecios',
        'almacenes.listaprecios.PanelGridListaPrecios',

        'almacenes.item.categorias.WindowCategorias',
        'almacenes.item.unit.WindowUnit',
        'almacenes.item.unit.PanelGridUnit',
        'almacenes.proveedores.WindowProveedores',
        'almacenes.proveedores.PanelGridProveedores',
        'almacenes.proveedores.FormAddProveedores',
        'almacenes.proveedores.PanelGridContactos',

        'almacenes.proveedores.PanelGridCategoriaProveedor',
        'configuraciones.almacenes.WindowConfiAlmacen',
        'configuraciones.almacenes.FormPanelActivar',
        'configuraciones.almacenes.PanelContenedorHoriz',
        'configuraciones.almacenes.PanelGridListaAsientos',
        'configuraciones.almacenes.PanelGridModeloAsiento',

        'almacenes.transacciones.compras.WindowListaCompras',
        'almacenes.transacciones.entradas.WindowListaEntradas',
        'almacenes.transacciones.salidas.WindowListaSalidas',
        'almacenes.transacciones.transferencias.WindowListaTransferencias',
        'almacenes.transacciones.transferencias.WindowTxnTransferencias',
        'almacenes.transacciones.transferencias.FormTxnTransferencias',
        'almacenes.transacciones.transferencias.GridTxnTransferencias',

        'almacenes.transacciones.recepciontransferencias.WindowListaRecepcionTransferencias',

        'almacenes.transacciones.recepciontransferencias.WindowListaRecepcionTransferencias',
        
        'rrhh.personal.WindowListaPersonal',        
        'rrhh.personal.WindowPersonal',
        'rrhh.cargos.WindowCargos',
        'rrhh.planilla.WindowPlanilla'





    ],
    
    init: function() {
        this.control({
            'principal headpanel[region=north]':{
                beforeshow:this.initButtons
            },
            'principal headpanel[region=north] button':{
                click:this.actionButtonHead
            },
            'menupanel panel button[option=btnplancuentas]':{
                click:this.action
            },
            'menupanel panel button[option=btnconfplancuentas]':{
                click:this.confplancuentas

            },
            'menupanel panel button':{
                click:this.actionButtonMenu

            }
            
        });
    },
    initButtons:function(panel){
        var viewp=panel.up('principal');
        var btnuser=panel.down('button[option=usuario]');
        var btnenterprise=panel.down('button[option=empresa]');
        btnuser.setText(viewp.login);
        btnenterprise.setText(viewp.enterprise);
        
    },
    actionButtonHead:function(button){
       
       switch (button.option) {
            case 'salir':
                Ext.Ajax.request({
                        url:'data/classes/sis_erp_user.php',
                        params:{xaction:'logout'},
                        success:function(response){
                            var result=Ext.JSON.decode(response.responseText);
                            Ext.create('widget.uxNotification', {
                                    title: result.title,
                                    position: 't',
                                    manager: 'instructions',
                                    cls: 'ux-notification-light',
                                    iconCls: 'ux-notification-icon-information',
                                    html: result.msg,
                                    autoHideDelay: 4000,
                                    slideBackDuration: 500,
                                    slideInAnimation: 'bounceOut',
                                    slideBackAnimation: 'easeIn'
                            }).show();
                            document.location.href='index.php';
                        }

                    });
                break;
            default:
                break;
        }

    },
    actionButtonMenu:function(button){
        var fp=Ext.getCmp('center-panel');
        switch (button.option) {
            case 'btntipocambio':
                var wintc=Ext.create('Erp.view.finanzas.WindowTipoCambio',{});
                fp.add(wintc);
                wintc.show();
            break;
            case 'btncompras':
               var listacompraitems=Ext.getCmp('listacompraitems');
               if(listacompraitems==undefined){
               var wincompras=Ext.create('Erp.view.almacenes.transacciones.compras.WindowListaCompras',{id:'listacompraitems'});
               fp.add(wincompras);
               wincompras.show();
               }else{
                  listacompraitems.show(); 
               }
            break;
            
             case 'btnentradas':
               var listentradaitems=Ext.getCmp('listentradaitems');
               if(listentradaitems==undefined){
               var winentradas=Ext.create('Erp.view.almacenes.transacciones.entradas.WindowListaEntradas',{id:'listentradaitems'});
               fp.add(winentradas);
               winentradas.show();
               }else{
                   listentradaitems.show();
               }
            break;
            
            case 'btnsalidas':
               var lista=Ext.getCmp('listsalidasmecaderia');
               var winsalidas;
               if(lista==undefined){
               winsalidas=Ext.create('Erp.view.almacenes.transacciones.salidas.WindowListaSalidas',{id:'listsalidasmecaderia'});
               fp.add(winsalidas);
               winsalidas.show();
               }
               Ext.getCmp('listsalidasmecaderia').show();
            break;
            
            case 'btntransferencias':
               var listtransferenciasitems=Ext.getCmp('listtransferenciasitems');
                    //console.log(winformgrid);
                    //console.log(editar);
                    if(listtransferenciasitems==undefined){
                        var wintransferencias=Ext.create('Erp.view.almacenes.transacciones.transferencias.WindowListaTransferencias',{id:'listtransferenciasitems'});
                        fp.add(wintransferencias);
                        wintransferencias.show();
                    }else{
                        listtransferenciasitems.show();
                    } 
               //var wintransferencias=Ext.create('Erp.view.almacenes.transacciones.transferencias.WindowListaTransferencias',{id:'listtransferencias'});
               //fp.add(wintransferencias);
               //wintransferencias.show();
            break;
            
            case 'btnrecepciontransferencias':
               var listarecepciontransferenciaitems=Ext.getCmp('listarecepciontransferenciaitems'); 
               if(listarecepciontransferenciaitems==undefined){
               var winrecepciontransferencias=Ext.create('Erp.view.almacenes.transacciones.recepciontransferencias.WindowListaRecepcionTransferencias',{id:'listarecepciontransferenciaitems'});
               fp.add(winrecepciontransferencias);
               winrecepciontransferencias.show();
               }else{
                   listarecepciontransferenciaitems.show();
               }
            break;
            
            case 'btnitem':
                var listaitems=Ext.getCmp('listaitems');
                if(listaitems==undefined){
                var storeListaItem=Ext.create('Erp.store.almacenes.item.StoreListaItem',{autoLoad: true,start: 0, limit: 25});

                var winpcLista=Ext.create('Erp.view.almacenes.item.WindowListaItem',{id:'listaitems'});
                var PanelListaItem=Ext.create('Erp.view.almacenes.item.PanelListaItem',{store: storeListaItem});
                PanelListaItem.addDocked({

                                xtype       : 'pagingtoolbar',
                                store       : storeListaItem,
                                dock        : 'bottom',
                                displayInfo : true
                            });
                winpcLista.add(PanelListaItem);
                fp.add(winpcLista);
                winpcLista.show();
                }else{
                  listaitems.show();  
                }
            break;
            case 'btnitemprecios':
                var listaasignarprecios=Ext.getCmp('listaasignarprecios');
                if(listaasignarprecios==undefined){
                var contenedor1=Ext.create('Erp.view.almacenes.listaprecios.PanelContenedorLista',{alias : 'widget.contenedor1',layout: {align: 'stretch',type: 'hbox'},frame:true});
                var contenedor2=Ext.create('Erp.view.almacenes.listaprecios.PanelContenedorLista',{alias : 'widget.contenedor2',layout: {align: 'stretch',type: 'vbox'}});
                var winpcListaPrecios=Ext.create('Erp.view.almacenes.listaprecios.WindowListaPrecios',{id:'listaasignarprecios'});
               //console.log(this.adicionaritems());
               var grillalistaprecio=Ext.create('Erp.view.almacenes.listaprecios.PanelGridListaPrecios',{store:Ext.create('Erp.store.almacenes.StoreItemListPrice',{}),
                plugins: [
                Ext.create('Ext.grid.plugin.RowEditing',{
                saveBtnText: 'Editar',
                cancelBtnText: 'Cancelar'
                })
                ]
                });
               
               
               
               var formleft=Ext.create('Erp.view.almacenes.listaprecios.FormListaPrecios',{items:this.adicionaritems()});
               var formright=Ext.create('Erp.view.almacenes.listaprecios.FormAddPrecios',{});
               var storegrilla=Ext.create('Erp.store.almacenes.StoreGrillaItemPrecio',{});
               var grilla=Ext.create('Erp.view.almacenes.listaprecios.PanelGridItemAsignadosPrecios',{store:storegrilla});
               grilla.addDocked({

                                xtype       : 'pagingtoolbar',
                                store       : storegrilla,
                                dock        : 'bottom',
                                displayInfo : true
                            });
               contenedor1.add(formleft);
               contenedor1.add(formright);
               contenedor1.add(grillalistaprecio);
               contenedor2.add(grilla);
               winpcListaPrecios.add(contenedor1);
               winpcListaPrecios.add(contenedor2);
               
               //winpcListaPrecios.add(formleft);
               //winpcListaPrecios.add(formright);
               //winpcListaPrecios.add(grilla);
                fp.add(winpcListaPrecios);
                winpcListaPrecios.show();
                }else{
                    listaasignarprecios.show();
                }
            break;
            case 'btnunit':
                var listaunidades=Ext.getCmp('listaunidades');
                if(listaunidades==undefined){
                var storeunit=Ext.create('Erp.store.almacenes.item.unit.StoreUnit',{});
                var panelunit=Ext.create('Erp.view.almacenes.item.unit.PanelGridUnit',{store:storeunit,plugins: [
                                                                                                            Ext.create('Ext.grid.plugin.RowEditing',{
                                                                                                                saveBtnText: 'Editar',
                                                                                                                cancelBtnText: 'Cancelar'
                                                                                                                })
                                                                                                        ]});
                var winpcUnit=Ext.create('Erp.view.almacenes.item.unit.WindowUnit',{id:'listaunidades'});
                winpcUnit.add(panelunit);
                fp.add(winpcUnit);
                winpcUnit.show();
                }else{
                    listaunidades.show();
                }
                
            break;
            case 'btncategorias':
                var listacateorias=Ext.getCmp('listacateorias');
                if(listacateorias==undefined){
                var winCategorias=Ext.create('Erp.view.almacenes.item.categorias.WindowCategorias',{id:'listacateorias'});
                fp.add(winCategorias);
                winCategorias.show();
                }else{
                listacateorias.show();
                }
            break;
            case 'btnproveedor':
                var provedoresalmacen=Ext.getCmp('provedoresalmacen');
                if(provedoresalmacen==undefined){
                var winProveedores=Ext.create('Erp.view.almacenes.proveedores.WindowProveedores',{id:'provedoresalmacen'});
                var storegrid=Ext.create('Erp.store.almacenes.proveedores.StoreListaProveedores',{});
                var tappanel=Ext.create('Erp.view.configuraciones.TapPanelConfiguraciones',{width: 306,
                height: 310,disabled:true});
                var tapPlanCuentas=Ext.create('Erp.view.configuraciones.TapConfiPlanCuentas',{title:'otros'});
                var grillaproveedores=Ext.create('Erp.view.almacenes.proveedores.PanelGridProveedores',{store:storegrid});
                var storegridcatprov=Ext.create('Erp.store.almacenes.proveedores.StoreCategoriaProveedor',{});
                var grillacategoriaproveedor=Ext.create('Erp.view.almacenes.proveedores.PanelGridCategoriaProveedor',{title:'Categorias',store:storegridcatprov});
                var formproveedores=Ext.create('Erp.view.almacenes.proveedores.FormAddProveedores',{});
                var storecontact=Ext.create('Erp.store.almacenes.proveedores.StoreContactos',{});
                var grillacontactos=Ext.create('Erp.view.almacenes.proveedores.PanelGridContactos',{store:storecontact});
                tappanel.add(grillacategoriaproveedor);
                tappanel.add(grillacontactos);
                formproveedores.add(tappanel);
                tappanel.setActiveTab(grillacategoriaproveedor);
                winProveedores.add(grillaproveedores);
                winProveedores.add(formproveedores);
                fp.add(winProveedores);
                winProveedores.show();
                }else{
                    provedoresalmacen.show();
                }
            break;

            case 'btnconfAlmacenes':
                var winAlmacen=Ext.create('Erp.view.configuraciones.almacenes.WindowConfiAlmacen',{});
                var tapcontenedor=Ext.create('Erp.view.configuraciones.TapPanelConfiguraciones',{layout          : {
                                  align: 'stretch',
                                  type: 'vbox'
                                  },height          : 470,
                                  width           : 870});
                var panelcontenedorglobal=Ext.create('Erp.view.configuraciones.TapConfiPlanCuentas',{title:'Asientos',layout          : {
                                  align: 'stretch',
                                  type: 'vbox'
                                  },height          : 477,
                                  width           : 881});
                var formactivar=Ext.create('Erp.view.configuraciones.almacenes.FormPanelActivar',{});
                var panelcontenedor=Ext.create('Erp.view.configuraciones.almacenes.PanelContenedorHoriz',{});
                
                var grillalistaasientos=Ext.create('Erp.view.configuraciones.almacenes.PanelGridListaAsientos',{});
                var grillamodelasiento=Ext.create('Erp.view.configuraciones.almacenes.PanelGridModeloAsiento',{});
                
                panelcontenedorglobal.add(formactivar);
                panelcontenedorglobal.add(panelcontenedor);
                
                panelcontenedor.add(grillalistaasientos);
                panelcontenedor.add(grillamodelasiento);
                tapcontenedor.add(panelcontenedorglobal);
                winAlmacen.add(tapcontenedor);
                tapcontenedor.setActiveTab(panelcontenedorglobal);
                fp.add(winAlmacen);
                //winAlmacen.add(panelcontenedor);
                winAlmacen.show();
            break;

            
            case    'btnmaestroalmacen':
                var maestroalmacenes=Ext.getCmp('maestroalmacenes');
                if(maestroalmacenes==undefined){
                var winAlmacenes=Ext.create('Erp.view.almacenes.maestroalmacen.WindowAlmacenes',{id:'maestroalmacenes'});
                var gridalmacenes=Ext.create('Erp.view.almacenes.maestroalmacen.PanelGridAlmacenes',{});
                var formalmacen=Ext.create('Erp.view.almacenes.maestroalmacen.FormAlmacen',{});
                var gridencargados=Ext.create('Erp.view.almacenes.maestroalmacen.PanelGridEncargadosAlmacen',{height:150});
           
                formalmacen.down('fieldset[fieldset=encargados]').add(gridencargados);
                 
                 winAlmacenes.items.items[0].add(gridalmacenes);
                 winAlmacenes.items.items[0].add(formalmacen);
              
                fp.add(winAlmacenes);
                winAlmacenes.show();
                }else{
                    maestroalmacenes.show();
                }
            break;
            
             case 'btnkardexitem':
                
                var window=Ext.create('Erp.view.almacenes.kardex.WindowKardexItem',{});
                var panelform=window.down('panel[alias=contentform]');
                var paneldetail=window.down('tabpanel[alias=contentdetail]');
                var formkardex=Ext.create('Erp.view.almacenes.kardex.FormKardexItem',{});
                var griddetallekardex=Ext.create('Erp.view.almacenes.kardex.GridDetalleMovimientoItem',{});
               
                window.stateMode='R';
                panelform.add(formkardex);
                paneldetail.add(griddetallekardex);
                paneldetail.setActiveTab(griddetallekardex);
                fp.add(window);
                window.show();
                
            break;

 
            
            /**********************RRHH************************/
            case 'btnpersonal':
                var windowlistapersonal=Ext.getCmp('listapersonal');
                if (windowlistapersonal==undefined) {
                    windowlistapersonal=Ext.create('Erp.view.rrhh.personal.WindowListaPersonal',{id:'listapersonal'});
                    var gridlista=windowlistapersonal.down('gridpanel');
                    gridlista.addDocked({

                                    xtype       : 'pagingtoolbar',
                                    store       : gridlista.getStore(),
                                    dock        : 'bottom',
                                    displayInfo : true
                                });
                    fp.add(windowlistapersonal);
                    windowlistapersonal.show();
                }else{
                    windowlistapersonal.show();
                }
                
            break;
             case 'btnEstructuraOrganica':
                var windoworganigrama=Ext.getCmp('organigrama');
                if (windoworganigrama==undefined) {
                    windoworganigrama=Ext.create('Erp.view.rrhh.organigrama.WindowOrganigrama',{id:'organigrama'});
                    fp.add(windoworganigrama);
                    windoworganigrama.show();
                }else{
                    windoworganigrama.show();
                }
                
            break;

            case 'btnPlanilla':
                var windowplanilla =Ext.getCmp('planilla');
              
                if(typeof windowplanilla=="undefined" ){
                    windowplanilla=Ext.create('Erp.view.rrhh.planilla.WindowPlanilla',{id:'planilla'});
                    fp.add(windowplanilla);
                    windowplanilla.show();

                }else{
                    windowplanilla.show();
                }
                
            break;
             case 'btnKardex':
                var windowkardex =Ext.getCmp('kardex');
              
                if(typeof windowkardex=="undefined" ){
                    windowkardex=Ext.create('Erp.view.rrhh.kardex.WindowKardex',{id:'kardex'});
                    fp.add(windowkardex);
                    windowkardex.show();

                }else{
                    windowkardex.show();
                }
                
            break;
                   
        }

    },
    action:function(button){
        var fp=Ext.getCmp('center-panel');
        var winpc=Ext.create('Erp.view.plancuentas.WindowPlanCuentas',{});
        //winpc.add(Ext.create('Erp.view.plancuentas.TabPlanCuentas',{}));
        var storetree=Ext.create('Erp.store.StoreTreeCuentas',{});
        var tree=Ext.create('Erp.view.plancuentas.TreeCuentas',{store:storetree});
//        tree.on('itemcontextmenu', function(view, record, item, index, event){
//            //alert(record)
//            //treePanelCurrentNode = record;
//            menutree=Ext.create('Ext.menu.Menu', {
//                width: 100,
//                plain: true,
//                floating: true,  // usually you want this set to True (default)
//                renderTo: Ext.getBody(),  // usually rendered by it's containing component
//                animate: true,
//                items: [{
//                    text: 'Eliminar',
//                    iconCls: 'cancelAccount',
//                    listeners: {
//                        click: {
//                            element: 'el', //bind to the underlying el property on the panel
//                            fn: function(){ 
//                                
//                                    Ext.MessageBox.show({
//                                       title:'Save Changes?',
//                                       msg: 'Esta seguro de eliminar. <br />la cuenta: ?',
//                                       buttons: Ext.MessageBox.YESNOCANCEL,
//                                       //fn: showResult,
//                                       //animateTarget: 'mb4',
//                                       icon: Ext.MessageBox.QUESTION
//                                   });
//                               
//                               function showResult(btn){
//                                    Ext.example.msg('Button Click', 'You clicked the {0} button', 'jeje');
//                                };
//                            }
//                        }
//                        
//                    }
//                }]
//            });
//            menutree.showAt(event.getXY());
//            event.stopEvent();
//    },this);
        winpc.add(tree);
        winpc.add(Ext.create('Erp.view.plancuentas.FormPlanCuentas',{stateMode:'R'}));
        fp.add(winpc);
        winpc.show();

    },
    confplancuentas: function(){
       //console.log('hola');
       
       Ext.Ajax.request({
                        url  : 'data/classes/sis_erp_configuration.php',
                         params : {
                           xaction   : 'readnomenclatura'//,
                           //idaccountplan : ideliminar

                         },
                         method : 'POST',


                         success: function(r) {
                           result=Ext.decode(r.responseText);
                             //console.log(result.results[0]);


                             var formNomenclatura=Ext.create('Erp.view.configuraciones.PanelNomenclatura',{});
                             //formNomenclatura.getForm().loadRecord(result.results[0]);
                             formNomenclatura.getForm().getFields().items[0].setValue(result.results[0].idnomenclatura);
                             formNomenclatura.getForm().getFields().items[1].setValue(result.results[0].code);
                             formNomenclatura.getForm().getFields().items[2].setValue(result.results[0].incremento);
                             formNomenclatura.getForm().getFields().items[3].setValue(result.results[0].formato);
                             var fp=Ext.getCmp('center-panel');
                             
                             var winpcf=Ext.create('Erp.view.configuraciones.WindowConfiFinanzas',{});
                             var tappanel=Ext.create('Erp.view.configuraciones.TapPanelConfiguraciones',{});
                             var tapPlanCuentas=Ext.create('Erp.view.configuraciones.TapConfiPlanCuentas',{});
                             var tapPlanCuentas1=Ext.create('Erp.view.configuraciones.TapConfiPlanCuentas',{title:'Otros'});

                               //var storecuentasRaiz=Ext.create('Erp.store.configuraciones.StoreCuentasRaiz',{});
                             var panelCuentasRaiz=Ext.create('Erp.view.configuraciones.PanelCuentasRaiz',{store:Ext.create('Erp.store.configuraciones.StoreCuentasRaiz',{autoLoad: true})});
                               //console.log(panelCuentasRaiz);
                             var panelMonedas=Ext.create('Erp.view.configuraciones.PanelMonedas',{store:Ext.create('Erp.store.configuraciones.StoreMonedas',{autoLoad: true})});//Erp.store.configuraciones.StoreNomenclatura

                               //console.log(formNomenclatura.getForm().getFields().items[0].setValue());
                             tapPlanCuentas.add(formNomenclatura);
                             tapPlanCuentas.add(panelCuentasRaiz);
                             tapPlanCuentas.add(panelMonedas);

                             tappanel.add(tapPlanCuentas);
                             tappanel.add(tapPlanCuentas1);
                             tappanel.setActiveTab(tapPlanCuentas);
                               //console.log(tappanel);
                             winpcf.add(tappanel);
                             fp.add(winpcf);
                             winpcf.show();







                         },
                         failure: function(r) {
                          result=Ext.decode(r.responseText);
                           //console.log('result');
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

    },
    adicionaritems:function(){
        var item1=[{
            xtype: 'combobox',
            fieldLabel: 'Lista',
            width: 200,
            labelWidth: 30,
            store       :Ext.create('Erp.store.almacenes.StoreItemListPrice',{proxy:{
                type:'ajax',

                url:'data/classes/sis_erp_item_list_price.php',
                actionMethods: {
                read: 'POST'
            },
                extraParams:{
                    xaction:'readlistaprecios'
                },
                reader:{
                    type:'json',
                    root:'results',
                    totalProperty:'total'
                }
            }}),
            name        : 'namelist',
            valueField  :'iditemlistprice',
            displayField:'namelist',
            queryMode   :'local',
            allowBlank  : false,
            option      : 'comboTipoEntidad1'
        },
        {
                            xtype: 'panel',
                            height: 32,
                            width: 45,
                            title: '',
                            bodyPadding: '0 0 0 10',
                            border: 0,
                            frame:true,
                            style: {
                                //borderColor: '#DFE9F6',
                                padding: 0,
                                borderStyle: 'hidden'
                                //borderwidth: '0px'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    tooltip : 'Adicionar a la lista',
                                    //text: 'Add',
                                    iconCls :'addAccount',
                                    option:'AddListaPrecios'
                                }
                            ]
         },
         {
                            xtype: 'panel',
                            height: 32,
                            width: 90,
                            title: '',
                            bodyPadding: '0 0',
                            border: 0,
                            frame:true,
                            style: {
                                //borderColor: '#DFE9F6',
                                padding: 0,
                                borderStyle: 'hidden'
                                //borderwidth: '0px'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    tooltip : 'Asignar items a estos precios',
                                    text: 'Asignar',
                                    iconCls :'addAccount',
                                    option:'AsignarPrecios'
                                }
                            ]
         }
        ];
     return item1;
    }
});


