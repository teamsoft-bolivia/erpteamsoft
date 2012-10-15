/*
 * @Autor: Max marcelo jimenez T,Crithian Valencia, Pablo Garcia Guaman
 * @Email: maxmjt@gmail.com, fox_tian@hotmail.com ,garcia_guaman_pablo@hotmail.com
 */


Ext.define('Erp.controller.almacenes.item.ControllerItemList', {
    extend: 'Ext.app.Controller',
    stores: ['almacenes.item.StoreListaItem','StoreType','almacenes.StoreItemProvedores'],
    models: ['almacenes.item.ModelListaItem','ModelType'],
    views: ['almacenes.item.WindowListaItem',
            'almacenes.item.PanelListaItem',
            
            'almacenes.item.datosbasicos.PanelFormBasic',
            'almacenes.item.datosbasicos.WindowItem',
            'almacenes.item.datosbasicos.FormItemBasic',
            'almacenes.item.datosbasicos.TabPanelData',
            
            'almacenes.item.datostecnicos.PanelDatosTecnicos',
            'almacenes.item.datostecnicos.GridEspTecnicas',
            'almacenes.item.datostecnicos.GridComposicion'
        ],
    init: function() {
        var thiss=this;
        thiss.control({
              'panellistaitem trigger[option=searchitem]':{
                        keypress        : thiss.buscarItem
              },
              'panellistaitem actioncolumn':{
                        click:this.editItemWindow
                        //itemdblclick:this.openItemWindow
              },
              'panellistaitem button[option=addItem]':{
                  click:this.newItemWindow
              }
        });
    },
    newItemWindow:function(button){
        var nuevoitem=Ext.getCmp('nuevoitem');
        if(nuevoitem==undefined){
        var lista=button.up('panellistaitem');
        var newrecord=Ext.create('Erp.model.almacenes.item.ModelListaItem',{
            
        });
        this.itemWindow(newrecord,'N');
        }else{
            nuevoitem.show();
        }
         
    },
    editItemWindow:function(gridview,el,rowindex,colindex,e,record){
        var window=gridview.up('WindowListaItem');
        var gridlist = window.down('panellistaitem');
        var m = e.getTarget().className.match(/\bicon-(\w+)\b/);
        if(m){
            switch(m[1]){
                case 'edit':
                    //console.log(record.data.iditem);
                    var editar=Ext.getCmp(record.data.iditem+'item');
                    if(editar==undefined){
                    this.itemWindow(record,'R');
                    }else{
                        editar.show();
                    }
                break;
                
            }
        }
    },
    loadCombos:function(window,records,formItemDatosGenerales){
       
        var cboclass=window.down('combobox[name=classitem]');
        var cbovaluation=window.down('combobox[name=valuation]');
        var cbomarca=window.down('combobox[name=marca]');
        var cbomodelo=window.down('combobox[name=modelo]');
        var cborubro=window.down('combobox[name=rubro]');
        var cbofamilia=window.down('combobox[name=familia]');
        var cbocategoria=window.down('combobox[name=categoria]');
        var cbosubcategoria=window.down('combobox[name=subcategoria]');
        
        cboclass.getStore().getProxy().extraParams={xaction:'readbytype',type:'clase_item'};
        cboclass.getStore().load();
        cbovaluation.getStore().getProxy().extraParams={xaction:'readbytype',type:'tipo_valoracion'};
        cbovaluation.getStore().load();
        
        cbomarca.getStore().getProxy().extraParams={xaction:'readmarca'};
        cbomodelo.getStore().getProxy().extraParams={xaction:'readmodelo'};
        cborubro.getStore().getProxy().extraParams={xaction:'readrubro'};
        cbofamilia.getStore().getProxy().extraParams={xaction:'readfamilia'};
        cbocategoria.getStore().getProxy().extraParams={xaction:'readcategoria'};
        cbosubcategoria.getStore().getProxy().extraParams={xaction:'readsubcategoria'};
        
        cbomarca.getStore().load();
        cbomodelo.getStore().load();
        cborubro.getStore().load();
        cbofamilia.getStore().load({
            
            callback : function (){
                  
                  if(window.stateMode==='R'){
                        Ext.Ajax.request({
                            url		: 'data/classes/sis_erp_category.php',
                            params	: {
                                            xaction         : 'loadrecordcategory',
                                            iditem          : records.data.iditem
                                            
                            },
                            method	: 'POST',
                            success: function(r) {

                                var result=Ext.decode(r.responseText);
                                
                                    cbocategoria.getStore().load({
                                        params :{idfather:result.data.familia},
                                        callback : function(){
                                            cbosubcategoria.getStore().load({
                                                params :{idfather:result.data.categoria},
                                                callback : function (){
                                                   
                                                    var r=Ext.create('Erp.model.almacenes.ModelItemCategory', {
                                                        iditem:records.data.iditem,
                                                        marca:result.data.marca,
                                                        modelo:result.data.modelo,
                                                        rubro:result.data.rubro,
                                                        familia:result.data.familia,
                                                        categoria:result.data.categoria,
                                                        subcategoria:result.data.subcategoria

                                                    });
                                                formItemDatosGenerales.getForm().loadRecord(r);  
                                                }
                                            });

                                        }
                                 });
                               

                            },
                            failure: function(r) {
                                    //var result=Ext.decode(r.responseText);
                            }

                        });

                    }
            }
        }
        );
        //cbocategoria.getStore().load();
        //cbosubcategoria.getStore().load();
    },
    itemWindow:function(record,state){
        
        var idasignar;
        if(state=="N"){
            idasignar='nuevoitem';
        }else{
            idasignar=record.data.iditem+'item';
        }
        var fp=Ext.getCmp('center-panel');
        var winitem=Ext.create('Erp.view.almacenes.item.datosbasicos.WindowItem',{id:idasignar,stateMode:state});
        var formbasic=Ext.create('Erp.view.almacenes.item.datosbasicos.FormItemBasic',{});
            
            
        var panelbasic=Ext.create('Erp.view.almacenes.item.datosbasicos.PanelFormBasic',{});
            panelbasic.add(formbasic);
            
            if (state=='R') {
                var imagepanel=formbasic.down('panel[option=image]');
                var rdm=Math.random()*100;
                rdm=Math.round(rdm);
                imagepanel.update('<a><img src="data/dataimages/items/'+record.data.image+'?image'+rdm+'" height="100%" width="100%"></a>');
            }

            var tabpaneldata=Ext.create('Erp.view.almacenes.item.datosbasicos.TabPanelData',{});
            
            //Tab Datos Generales
            var formItemDatosGenerales = Ext.create ('Erp.view.almacenes.item.datosgenerales.FormDatosGenerales',{iditem:record.get('iditem'),record:record});
                
                
            var gridProvedoresDatosGenerales=Ext.create('Erp.view.almacenes.item.datosgenerales.GridProvedoresDatosGenerales',{
                store : Ext.create('Erp.store.almacenes.StoreItemProvedores',{})
             });
           
            var panelGridsDatosGenerales = Ext.create('Erp.view.almacenes.item.datosgenerales.PanelGridDatosGenerales',{});
                panelGridsDatosGenerales.add(gridProvedoresDatosGenerales);
             
            var panelItemDatosGenerales = Ext.create('Erp.view.almacenes.item.datosgenerales.PanelItemDatosGenerales',{
                iditem:record.get('iditem'),
                state : state,
                record: record
                
            }); 
                panelItemDatosGenerales.add(formItemDatosGenerales,panelGridsDatosGenerales);// Panel Principal Datos Generales
            //
            
            var paneldatostecnicos=Ext.create('Erp.view.almacenes.item.datostecnicos.PanelDatosTecnicos',{});
            var gridesptec=Ext.create('Erp.view.almacenes.item.datostecnicos.GridEspTecnicas',{});
            var gridcomp=Ext.create('Erp.view.almacenes.item.datostecnicos.GridComposicion',{});
            paneldatostecnicos.add(gridesptec,gridcomp);
            
            //Tab Datos Adicionales
            var formDatosAdicionales=Ext.create('Erp.view.almacenes.item.datosadicionales.FormDatosAdicionales',{
                iditem:record.get('iditem'),
                record:record
            });
            
            var gridUnidades=Ext.create('Erp.view.almacenes.item.datosadicionales.GridUnidades',{iditem:record.data.iditem});
            var panelDatosAdicionales=Ext.create('Erp.view.almacenes.item.datosadicionales.PanelDatosAdicionales',{
                iditem  :   record.data.iditem,
                state   :   state
            });
            panelDatosAdicionales.add(formDatosAdicionales,gridUnidades);
            
            tabpaneldata.add(panelItemDatosGenerales,paneldatostecnicos,panelDatosAdicionales);
            tabpaneldata.setActiveTab(panelItemDatosGenerales);
            
            winitem.add(panelbasic);
            winitem.add(tabpaneldata);
            fp.add(winitem);
            
            this.loadCombos(winitem,record,formItemDatosGenerales);
            formbasic.getForm().loadRecord(record);
            //formItemDatosGenerales.getForm().loadRecord(record);
            winitem.show();
            
    },
    buscarItem: function (field,e){
        
        var store=field.up('grid').getStore();
            //store.loadPage(1);
            if(e.getKey()==13){
                    store.getProxy().extraParams.filter=field.getValue();
                    store.loadPage(1); 
            }
        
    }
    
   
});




