/*
 * @Autor: Max marcelo jimenez T
 * @Email: maxmjt@gmail.com
 */


Ext.define('Erp.controller.almacenes.ControllerListaPrecios', {
    extend: 'Ext.app.Controller',
    stores: ['almacenes.StoreItemListPrice','almacenes.StoreItemAsignados'],
    views: ['almacenes.listaprecios.FormAddPrecios',
            'almacenes.listaprecios.FormListaPrecios',
            'almacenes.listaprecios.PanelGridItemAsignadosPrecios',
            'almacenes.listaprecios.WindowListaPrecios',
            'almacenes.listaprecios.PanelContenedorLista',
            'almacenes.listaprecios.WindowAsignarPrecio',
            'almacenes.listaprecios.FormFiltroItem',
            'almacenes.listaprecios.PanelGridListaItemAsignar',
            'almacenes.listaprecios.PanelGridListaItemAsignados',
            'almacenes.listaprecios.PanelGridListaPrecios'
        ],
    init: function() {
        
        var thiss=this;
        
        thiss.control({
              'WindowListaPrecios'      :{
                    beforerender	 : thiss.iniciarVentanaLista
                    
                },
                'WindowAsignarPrecio'      :{
                    beforerender	 : thiss.iniciarVentanaAsignarPrecio
                    
                },
                'formlistaprecios combobox '       :{
                    select  : thiss.opcionSeleccionada
                       
                    
                },
                'WindowAsignarPrecio combobox '       :{
                    select  : thiss.categoriaSeleccionada
                       
                    
                },
              'formlistaprecios button[option=AddListaPrecios]':{
                        click        : thiss.actionBtn

              },
              'formlistaprecios button[option=AsignarPrecios]':{
                  click : thiss.asignarPrecios  
              },
              'formaddprecios button[option=listaAdd]':{
                        click        : thiss.actionBtnGuardar

              },
              'formaddprecios button[option=listaCancel]':{
                        click        : thiss.actionBtnCalcelar

              },
              'panelgridlistaitemasignados gridviewdragdrop':{
                  drop:thiss.asignando
              },
              'formfiltroitem trigger[option=searchitem]':{
                        keypress        : thiss.buscarItem,
                        onTriggerClick  : thiss.limpiarCampo
              },
              'panelgridlistaprecios': {
                itemdblclick: this.gridSelectionChange,
                canceledit: this.cancelargrillalistapreios,
                edit: this.guardarDatosModificadosListaPrecios
              }
              

        });
    },
    iniciarVentanaLista             : function (window){
             window.down('formlistaprecios combobox[option=comboTipoEntidad1]').getStore().load();
             
    },
    iniciarVentanaAsignarPrecio             : function (window){
             window.down('formfiltroitem combobox[option=comboCategoria1]').getStore().load();
             
    },
    asignando:function(node, data, dropRec, dropPosition){
        console.log('entro');
    },
    categoriaSeleccionada:function(combo,records){
            var win=combo.up('window');
            //console.log(win.combosel);
            var grid=combo.up('window').down('panelgridlistaitemasignar');
            var store=grid.getStore();
            //console.log(grid);
            store.getProxy().extraParams.idselectcategoria=combo.getValue();
            store.getProxy().extraParams.iditemlist=win.combosel;
            //store.getProxy().extraParams.filter='';
            //console.log(combo.getValue());
            store.load();
    },
    opcionSeleccionada:function(combo,records){
            
            var grid=combo.up('window').down('panelgriditemasignadosprecios');
            var store=grid.getStore();
            
            store.getProxy().extraParams.iditemlist=combo.getValue();
            //store.getProxy().extraParams.filter='';
            //console.log(combo.getValue());
            store.load();
            //grid.down('trigger').setValue('');
            //grid.down('label[option=gridTitleLabel]').setText(grid.enterpriseName +' - '+records[0].get('type'));
           
            //store.loadPage(1);
            
           
        
    },
    asignarPrecios:function(btn,e,eOpts){
        var combo=btn.up('window').down('combobox');
        var comboselec=combo.getValue();
        var titulo=combo.getSubTplData().value;
        
        var gridlista=btn.up('window').down('grid');
        
        //console.log(combo);
        //console.log(combo.getSubTplData().value);
        if(combo.getValue()!=null){
        var fp=Ext.getCmp('center-panel');
        var winpcAsignarPrecios=Ext.create('Erp.view.almacenes.listaprecios.WindowAsignarPrecio',{combosel:comboselec});
        var paneltop=Ext.create('Erp.view.almacenes.listaprecios.PanelContenedorLista',{xtype: 'panel',
                    frame: true,
                    height: 75,
                    title: ''//,
                    //flex: 1
                });
        var panelbuttom=Ext.create('Erp.view.almacenes.listaprecios.PanelContenedorLista',{xtype: 'panel',
                    height: 325,
                    width: 604,
                    layout: {
                        type: 'column'
                    },
                    title: ''//,
                    //flex: 1
                });
        var formfiltro=Ext.create('Erp.view.almacenes.listaprecios.FormFiltroItem',{});
        
        var storegrilla=Ext.create('Erp.store.almacenes.StoreGrillaItemPrecio',{proxy:{
        type:'ajax',

        url:'data/classes/sis_erp_item_list_price.php',
        actionMethods: {
        read: 'POST'
    },
        extraParams:{
            xaction:'readitemAsignar',
            idselectcategoria:comboselec
        },
        reader:{
            type:'json',
            root:'results',
            totalProperty:'total'
        }
    }});
        var gridasignar=Ext.create('Erp.view.almacenes.listaprecios.PanelGridListaItemAsignar',{store:storegrilla});
        gridasignar.addDocked({

                                xtype       : 'pagingtoolbar',
                                store       : storegrilla,
                                dock        : 'bottom',
                                displayInfo : true
                            });
        var storegrilla1=Ext.create('Erp.store.almacenes.StoreItemAsignados',{proxy:{
        type:'ajax',

        url:'data/classes/sis_erp_item_list_price.php',
        actionMethods: {
        read: 'POST'
    },
        extraParams:{
            xaction:'readitemAsignados',
            idselectcategoria:comboselec
        },
        reader:{
            type:'json',
            root:'results',
            totalProperty:'total'
        }
    }});
        var gridasignados=Ext.create('Erp.view.almacenes.listaprecios.PanelGridListaItemAsignados',{store:storegrilla1,title:titulo,viewConfig: {
        plugins: {
                ptype: 'gridviewdragdrop',
                dragGroup: 'secondGridDDGroup',
                dropGroup: 'firstGridDDGroup'
            },
            listeners: {
                drop: function(node, data, dropRec, dropPosition) {
                    var dropOn = dropRec ? ' ' + dropPosition + ' ' + dropRec.get('Descripcion') : ' on empty view';
                    //console.log(data);
                    var ids=new Array();
                    for(i=0;i<data.records.length;i++){
                        ids[i]=data.records[i].data.iditem;
                    }
                    
                    Ext.Ajax.request({
                            url  : 'data/classes/sis_erp_item_list_price.php',
                             params : {
                               xaction   : 'asignarprecioitem',
                               ids : Ext.JSON.encode(ids),
                               iditemlistprice:comboselec

                             },
                             method : 'POST',


                             success: function(r) {
                               result=Ext.decode(r.responseText);

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
                                storegrilla1.load();
                                storegrilla.load();
                                gridlista.getStore().getProxy().extraParams.iditemlist=comboselec;
                                gridlista.getStore().load();

                             },
                             failure: function(r) {
                              result=Ext.decode(r.responseText);
                               //console.log(result);
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
                    
                    
                    //Ext.example.msg("Drag from left to right", 'Dropped ' + data.records[0].get('name') + dropOn);
                }
            }
    }});
        gridasignados.addDocked({

                                xtype       : 'pagingtoolbar',
                                store       : storegrilla1,
                                dock        : 'bottom',
                                displayInfo : true
                            });
        storegrilla1.load();
        paneltop.add(formfiltro);
        panelbuttom.add(gridasignar);
        panelbuttom.add(gridasignados);
        winpcAsignarPrecios.add(paneltop);
        winpcAsignarPrecios.add(panelbuttom);
        fp.add(winpcAsignarPrecios);
        winpcAsignarPrecios.show();
    }else{
        Ext.create('widget.uxNotification', {
        title: 'Advertencia',
        position: 'tr',
        manager: 'instructions',
        cls: 'ux-notification-light',
        iconCls: 'ux-notification-icon-information',
        html: 'Seleccione una opcion de la lista para asignar',
        autoHideDelay: 4000,
        slideBackDuration: 500,
        slideInAnimation: 'bounceOut',
        slideBackAnimation: 'easeIn'
      }).show();
    }
    },
    actionBtn:function(btn,e,eOpts){
        var winlista=btn.up('window');
        
        var formlista=winlista.down('formaddprecios');
        //console.log(winlista);
        var formlistaprecios=winlista.down('formlistaprecios');
         //console.log(winlista);
        var griditemsasignados=winlista.down('panelgriditemasignadosprecios');
        var gridlistaprecios=winlista.down('panelgridlistaprecios');
        formlista.setVisible(true);
        formlistaprecios.setVisible(false);
        griditemsasignados.setVisible(false);
        gridlistaprecios.setVisible(true);
        gridlistaprecios.getStore().load();
        //formlistaprecios.setDisabled(true);
        //griditemsasignados.setDisabled(true);
        //formlista.setDisabled(false);
        winlista.height=176;
        winlista.doLayout();
        //console.log(formlista);
       //console.log('hola');
    },
    actionBtnGuardar:function(btn,e,eOpts){
        var winlista=btn.up('window');
        var formlista=winlista.down('formaddprecios');
        var formlistaprecios=winlista.down('formlistaprecios');
        var griditemsasignados=winlista.down('panelgriditemasignadosprecios');
        var gridlistaprecios=winlista.down('panelgridlistaprecios');
        formlistaprecios.setVisible(true);
        griditemsasignados.setVisible(true);
        formlista.setVisible(false);
        gridlistaprecios.setVisible(false);
        winlista.height=410;
        winlista.doLayout();
        
        //console.log(combo);
       //console.log('hola');
    },
    actionBtnCalcelar:function(btn,e,eOpts){
        var winlista=btn.up('window');
        var formlista=winlista.down('formaddprecios');
        var formlistaprecios=winlista.down('formlistaprecios');
        var griditemsasignados=winlista.down('panelgriditemasignadosprecios');
        var gridlistaprecios=winlista.down('panelgridlistaprecios');
        formlistaprecios.setVisible(true);
        griditemsasignados.setVisible(true);
        formlista.setVisible(false);
        gridlistaprecios.setVisible(false);
        winlista.height=410;
        winlista.doLayout();
        
        //console.log(formlista);
       //console.log('hola');
    },
    limpiarCampo: function (trigger){
            
         },
    buscarItem: function (field,e){
        var win=field.up('window');
        var combo=field.up('window').down('combobox');
        var comboselec=combo.getValue();
        
        var grid=field.up('window').down('panelgridlistaitemasignar');
        var store=grid.getStore();
            //console.log(grid);
            store.getProxy().extraParams.idselectcategoria=comboselec;
            store.getProxy().extraParams.iditemlist=win.combosel;
            //store.getProxy().extraParams.filter='';
            //console.log(combo.getValue());
            //store.load();
        
        
        //var store=field.up('grid').getStore();
            //console.log(store);
            //store.loadPage(1);
            if(e.getKey()==13){
                    store.getProxy().extraParams.filter=field.getValue();
                    store.loadPage(1); 
            }
        
    },
    gridSelectionChange: function(){
        
    },
    cancelargrillalistapreios:function(roweditor, changes, record, rowIndex){
        roweditor.grid.getStore().load();
    },
    guardarDatosModificadosListaPrecios:function(roweditor, changes, record, rowIndex){
         var combo=roweditor.grid.up('window').down('combobox');
         
         var store=roweditor.grid.getStore();
         Ext.Ajax.request({
         url  : 'data/classes/sis_erp_item_list_price.php',
         params : {
           xaction   : 'updatelistaprecios',
           litaprecio : Ext.JSON.encode(changes.record.data)
         },
         method : 'POST',
         success: function(r) {
             
            result=Ext.decode(r.responseText);
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
            combo.getStore().load();

         },
         failure: function(r) {
             
           result=Ext.decode(r.responseText);
           console.log(result);
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
    }
    
   
});






