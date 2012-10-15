/*
 * @Autor: Max marcelo jimenez T,Crithian Valencia, Pablo Garcia Guaman
 * @Email: maxmjt@gmail.com, fox_tian@hotmail.com ,garcia_guaman_pablo@hotmail.com
 */

Ext.define ('Erp.controller.almacenes.ControllerItemDatosGenerales',{
    extend  : 'Ext.app.Controller',
    stores   : ['StoreType',
                'almacenes.StoreItemProvedores',
                'almacenes.StoreCategorias',
                'almacenes.StoreItemCategory',
//                'almacenes.categoria.StoreItemMarca',
//                'almacenes.categoria.StoreItemModelo',
//                'almacenes.categoria.StoreItemRubro',
//                'almacenes.categoria.StoreItemFamilia',
                'almacenes.categoria.StoreItemCategoria'
//                'almacenes.categoria.StoreItemSubCategoria'
               ],
    models   : ['ModelType',
                'almacenes.ModelItemProvedores',
                'almacenes.ModelCategorias',
                'almacenes.ModelItemCategory',
//                'almacenes.categoria.ModelItemMarca',
//                'almacenes.categoria.ModelItemModelo',
//                'almacenes.categoria.ModelItemRubro',
//                'almacenes.categoria.ModelItemFamilia',
                'almacenes.categoria.ModelItemCategoria'
//                'almacenes.categoria.ModelItemSubCategoria'
                ],
    views    : [
                
                'almacenes.item.datosgenerales.PanelItemDatosGenerales',
                'almacenes.item.datosgenerales.FormDatosGenerales',
                'almacenes.item.datosgenerales.PanelGridDatosGenerales',
                'almacenes.item.datosgenerales.GridProvedoresDatosGenerales'
            ],
    
   
    init    : function (){
        var thiss=this;
        
        thiss.control({
                'panelitemdatosgenerales'      : {
                    beforerender    : thiss.iniciarPanelDatosGenerales
                },
                
                 'gridprovedoresdatosgenerales combobox '       :{
                    select          : thiss.seleccionarCboCategoriaProvedor
                       
                    
                },
                 'formitemdatosgenerales combobox[name=familia]'       :{
                    select          : thiss.seleccionarcboFamilia
                  
                },
                'formitemdatosgenerales combobox[name=categoria]'       :{
                   select          : thiss.seleccionarCboCategoria
                  
                }
                
          
            });
            
            
       
        
         },
         iniciarPanelDatosGenerales             : function (panel){
            var comboCategoria= panel.down('combo[option=comboCategoria]');
            var window=panel.up('windowitem');
            comboCategoria.getStore().getProxy().extraParams.xaction='readagrupacioncategorica';
            comboCategoria.getStore().load();
            if(window.stateMode=='R'){
                panel.down('combo[name=provedores]').setDisabled(false);
               
            }else if(window.stateMode=='E'){
                panel.down('combo[name=provedores]').setDisabled(true);
               
            }else if(window.stateMode=='N'){
               panel.down('combo[name=provedores]').setDisabled(true);
               
            }
           
          
         },

        
         seleccionarCboCategoriaProvedor        : function(combo,records){
             if(combo.up('panelitemdatosgenerales').state!='N'){
             
                var iditem=combo.up('panelitemdatosgenerales').iditem;

                var grid=combo.up('grid');
                var store=grid.getStore();
                store.getProxy().extraParams.iditem=iditem;
                store.getProxy().extraParams.categoria=combo.getValue();

                store.loadPage(1);
             }
             
             
         },
         seleccionarcboFamilia     : function (combo,records){
                      
                      var cboCategoria=combo.up('panel').down('combobox[name=categoria]');
                      var cboSubCategoria=combo.up('panel').down('combobox[name=subcategoria]');
                      cboSubCategoria.setValue('');
                      cboCategoria.setValue('');
                      cboCategoria.getStore().load({
                          params : {idfather:combo.getValue()}
                      });
                        
          },
          seleccionarCboCategoria : function (combo,records){
                      
                      var cboSubCategoria=combo.up('panel').down('combobox[name=subcategoria]');
                      cboSubCategoria.setValue('');
                      cboSubCategoria.getStore().load({
                          params : {idfather:combo.getValue()}
                      });
                        
          }
         
         
       
    
});
    
