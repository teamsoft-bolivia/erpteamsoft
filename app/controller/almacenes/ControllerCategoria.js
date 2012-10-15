/*
 * @Autor: Max marcelo jimenez T,Crithian Valencia, Pablo Garcia Guaman
 * @Email: maxmjt@gmail.com, fox_tian@hotmail.com ,garcia_guaman_pablo@hotmail.com
 */

Ext.define ('Erp.controller.almacenes.ControllerCategoria',{
    extend  : 'Ext.app.Controller',
    stores   : [
                'almacenes.StoreCategorias',
                'StoreType',
                'almacenes.categoria.StoreItemCategoria'
    ],
    models   : ['almacenes.ModelCategorias',
                'ModelType',
                'almacenes.categoria.ModelItemCategoria'
    ],
    views    : [
                'almacenes.item.categorias.WindowCategorias',
                'almacenes.item.categorias.GridCategorias'
            ],
    
   
    init    : function (){
        var thiss=this;
        
        thiss.control({
                'windowcategorias'  : {
                    beforerender : this.iniciarVentanaCategorias
                },
                'gridcategorias'    : {
                   //afterrender : thiss.iniciarGridUnidades,
                   edit        : thiss.editGrid,
                   beforeedit  : thiss.beforeEdit,
                   //validateedit: thiss.afterEdit,
		   canceledit  : thiss.cancelEdit
                    
                },
                                              
                'gridcategorias button[option=btnAddCategoria]' :{
                    click   : thiss.nuevaCategoria
                    
                },
                'gridcategorias trigger[option=searchcategory]  '    :{
                        keypress        : thiss.buscarCategoria,
                        onTriggerClick  : thiss.limpiarCampo

                }
          
            });
            
            
       
        
    },
        
   iniciarVentanaCategorias             : function (window){
      
        var storeGridCategorias = Ext.create('Erp.store.almacenes.StoreCategorias',{
            autoLoad: true
        });
        var gridCategorias = Ext.create('Erp.view.almacenes.item.categorias.GridCategorias',{
                store:storeGridCategorias

         });
            gridCategorias.addDocked({

                            xtype       : 'pagingtoolbar',
                            store       : storeGridCategorias,
                            dock        : 'bottom',
                            displayInfo : true
                        });
         
        var cboeditorfather;
       
        var cboagrupacioncateg;
     
        Ext.each(gridCategorias.columns,function(item,index,allitems){
           if (item.dataIndex=='idfather') {
               cboeditorfather=item.getEditor();
               cboeditorfather.setDisabled(true);
               cboeditorfather.store=Ext.create('Erp.store.almacenes.categoria.StoreItemCategoria',{});
            }else if (item.dataIndex=='idcategoricalgrouping'){
                cboagrupacioncateg=item.getEditor();
                cboagrupacioncateg.store=Ext.create('Erp.store.StoreType',{});
                
                
            }
        });
        cboagrupacioncateg.getStore().load({params:{xaction:'readagrupacioncategorica'}});
        cboagrupacioncateg.on('select',function(combo,records){
            Ext.each(records,function(item,index,allitems){
                if(item.get('alias')=='categoria'){
                    cboeditorfather.getStore().getProxy().extraParams.xaction='readfamilia';
                    cboeditorfather.getStore().load();
                    cboeditorfather.setDisabled(false);
                }else if(item.get('alias')=='subcategoria'){
                    cboeditorfather.getStore().getProxy().extraParams.xaction='readcategoriaeditor';
                    cboeditorfather.getStore().load();
                    cboeditorfather.setDisabled(false);
                }else{
                    cboeditorfather.setValue('');
                    cboeditorfather.setDisabled(true);
                }
                
            })
           
        });
        
          
         window.add(gridCategorias);

},

nuevaCategoria        : function(button){
       
        var grid=button.up('grid');
        grid.modegrid='insert';
        // this.ocultarColumna(grid.columns,true);
        var store=grid.getStore();
              
        var plugingrilla=grid.getPlugin();
        
         var r=Ext.create('Erp.model.almacenes.ModelCategorias', {
            idcategory:'',
            categoryname:'',
            description:'',
            datecreated:'',
            idcategoricalgrouping:'',
            active:'false',
            agrupacion_categorica:''
        
        });
        store.insert(0, r);
       
        plugingrilla.startEdit(0, 0);
        
        
},
editGrid        : function (editor, e,eopts){
    var thiss=this;
   
    var store=e.grid.getStore();
                                    
    Ext.Ajax.request({
            url  : 'data/classes/sis_erp_category.php',
                params : {
                xaction   : e.grid.modegrid,
                valoresCategoria : Ext.JSON.encode(editor.context.newValues) 

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
                    store.load();
                    e.grid.modegrid='update';
                    thiss.ocultarColumna(e.grid.columns,false);

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
                    e.grid.modegrid='update';
                    thiss.ocultarColumna(e.grid.columns,false);

            }

            });
    
},
cancelEdit  : function (editor, e, eOpts){
      this.ocultarColumna(e.grid.columns,false);
      e.grid.modegrid='update';
      e.grid.getStore().load();   
      
}
,
beforeEdit  : function (editor, e, eOpts){
   
    var cboeditorfather;
    this.ocultarColumna(e.grid.columns,true); 
    
    Ext.each(e.grid.columns,function(item,index,allitems){
       
        if (item.dataIndex=='idfather') {
            cboeditorfather=item.getEditor();
            if(e.record.get('alias')=='marca' || e.record.get('alias')=='modelo' || e.record.get('alias')=='rubro' || e.record.get('alias')=='familia'){
                cboeditorfather.setValue('');
                cboeditorfather.setDisabled(true);
            }else if(e.record.get('alias')=='categoria'){
                cboeditorfather.getStore().getProxy().extraParams.xaction='readfamilia';
                cboeditorfather.getStore().load();
                cboeditorfather.setDisabled(false);
            }else if(e.record.get('alias')=='subcategoria'){
                    cboeditorfather.getStore().getProxy().extraParams.xaction='readcategoriaeditor';
                    cboeditorfather.getStore().load();
                    cboeditorfather.setDisabled(false);
           }

        }
    });
    
    
},
ocultarColumna  : function (columns,estado){
    Ext.each(columns,function(item,index,allitems){
        if(item.dataIndex=='idcategoricalgrouping'){
            item.setVisible(estado);
            
        }
    });
    
},

 buscarCategoria        : function (field,e){
            var store=field.up('grid').getStore();
            
            if(e.getKey()==13){
                    store.getProxy().extraParams.filter=field.getValue();
                    store.loadPage(1);
                
                   
            }
             
 },
 limpiarCampo          : function (e){
     console.log(e);
     
     
 }
    
});
    
