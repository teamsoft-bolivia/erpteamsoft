/*
 * @Autor: Max marcelo jimenez T
 * @Email: maxmjt@gmail.com
 */


Ext.define('Erp.controller.configuraciones.ControllerAlmacenes', {
    extend: 'Ext.app.Controller',
    stores: [],
    views: [
            'configuraciones.almacenes.PanelContenedorHoriz',
            'configuraciones.almacenes.PanelGridModeloAsiento',
            'configuraciones.almacenes.FormPanelActivar',
            'configuraciones.almacenes.WindowConfiAlmacen',
            'configuraciones.almacenes.PanelGridListaAsientos'
        ],
    init: function() {
        
        var thiss=this;
        
        thiss.control({
              'windowconfialmacen'      :{
                    beforerender	 : thiss.iniciarVentanaLista
                    
                },
              'formpanelactivar checkbox[option=activarAsientos]':{
                        change: thiss.activarDesactivarAsientos

              },
              'formpanelactivar fieldcontainer[option=fiscal]':{
                        change: thiss.verfiscalNofiscal
                  
              },
              'formpanelactivar checkbox[option=activarTodosAsientos]':{
                        change: thiss.activarDesactivarTodosAsientos

              },
              'panelgridlistaasientos': {
                    itemclick: this.gridSelectionChange,
                    edit        : thiss.editGrid,
                    beforeedit  : thiss.beforeEdit,
                    canceledit  : thiss.cancelEdit

               },
              'panelgridmodeloasiento':{
                    edit        : thiss.editGridModelaccounting,
                    beforeedit  : thiss.beforeEditModelaccounting,
                    canceledit  : thiss.cancelEditModelaccounting
                },
                'panelgridmodeloasiento[colums RowEditing[combobox]]':{
                    //edit        : thiss.editGridModelaccounting,
                    //keyup  : thiss.prueba
                },
                'panelgridmodeloasiento button[option=addtransaction]' :{
                  click : thiss.functionAgregarTransaction
                  
              }
              

        });
    },
    iniciarVentanaLista             : function (window){
        //console.log('dd');
        
        var formActivar=window.down('formpanelactivar');
        var grillalista=window.down('panelgridlistaasientos');
        grillalista.getStore().load();
        var checkboxActivar=window.down('formpanelactivar checkbox[option=activarAsientos]');
        //checkboxActivar.clearListeners();
        //checkboxActivar.clearListeners();
        //console.log(checkboxActivar.getValue());
            Ext.Ajax.request({
                        //url  : 'data/classes/sis_erp_type.php',
                        url  : 'data/classes/sis_erp_configuration.php',
                         params : {
                           xaction   : 'readActivoAsientos'//,
                           //idaccountplan : 'configuracion_model_asiento'

                         },
                         method : 'POST',


                         success: function(r) {
                           var result=Ext.decode(r.responseText);
                           formActivar.getForm().loadRecord(result);
                           //console.log(checkboxActivar.getValue());
                           if(checkboxActivar.getValue()==true){
                                formActivar.setBodyStyle('background:#CED9E7;');
                            }else{
                                formActivar.setBodyStyle('background:#fcc9cb;');
                            }
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
                      //checkboxActivar.addListener({
                                //beforerender: this.iniciarVentanaLista(),
                                //change: this.activarDesactivarAsientos
                            //});   
             //window.down('formlistaprecios combobox[option=comboTipoEntidad1]').getStore().load();
             
    },
    verfiscalNofiscal:function(thisscheck, newValue, oldValue, eOpts ){
        var window=thisscheck.up('window');
        var grillalista=window.down('panelgridlistaasientos');
        grillalista.validarfiscal=newValue.size;
        grillalista.getStore().getProxy().extraParams.fiscal=newValue.size;//fiscal,Nofiscal
        grillalista.getStore().load();
        console.log(thisscheck);
        console.log(newValue);
    },
    activarDesactivarAsientos:function( thisscheck, newValue, oldValue, eOpts ){
           console.log(thisscheck.bandera);
        if(thisscheck.bandera==0){
            Ext.Msg.show({
                    title : 'Confirmacion',
                    msg : 'Esta seguro de modificar este campo?',
                    buttons : Ext.Msg.YESNO,
                    icon : Ext.MessageBox.WARNING,
                    scope : this,
                    width : 450,
                    fn : function(btn, ev){
                        if (btn == 'yes') { 
        
        var panelform = thisscheck.up('panel');
        //console.log(panelform);
        if(newValue==true){
            panelform.setBodyStyle('background:#CED9E7;');
        }else{
            panelform.setBodyStyle('background:#fcc9cb;');
        }
        
        Ext.Ajax.request({
                        url  : 'data/classes/sis_erp_configuration.php',
                         params : {
                           xaction   : 'updateActivoAsientos',
                           option : 'configuracion_model_asiento',
                           value: newValue

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
     }else{
         thisscheck.bandera=1;
         thisscheck.setValue(oldValue);
     }}})
    }
    thisscheck.bandera=0;
    
                                       
    },
    activarDesactivarTodosAsientos:function( thisscheck, newValue, oldValue, eOpts ){
           console.log(thisscheck.bandera);
        if(thisscheck.bandera==0){
            Ext.Msg.show({
                    title : 'Confirmacion',
                    msg : 'Esta seguro de modificar este campo?',
                    buttons : Ext.Msg.YESNO,
                    icon : Ext.MessageBox.WARNING,
                    scope : this,
                    width : 450,
                    fn : function(btn, ev){
                        if (btn == 'yes') { 
        
        var panelform = thisscheck.up('panel');
        //console.log(panelform);
        if(newValue==true){
            panelform.setBodyStyle('background:#CED9E7;');
        }else{
            panelform.setBodyStyle('background:#fcc9cb;');
        }
        
        Ext.Ajax.request({
                        url  : 'data/classes/sis_erp_configuration.php',
                         params : {
                           xaction   : 'updateActivoAsientos',
                           option : 'configuracion_model_asiento',
                           value: newValue

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
     }else{
         thisscheck.bandera=1;
         thisscheck.setValue(oldValue);
     }
        }
         })
    }
    thisscheck.bandera=0;
    
                                       
    },
    gridSelectionChange: function(view, records) {
        //console.log(records.data.type);
        var window=view.up('window');
        var grillalista=window.down('panelgridlistaasientos');
        var valor='fiscal';
        if(grillalista.validarfiscal==undefined){
            valor=valor;
        }else{
            valor=grillalista.validarfiscal;
        }
        var grillamodeloasiento=window.down('panelgridmodeloasiento');
        grillamodeloasiento.validarfiscal=valor;
        grillamodeloasiento.idtipo=records.data.idtypeenterprise;
        grillamodeloasiento.setTitle('Asiento->'+records.data.type);
        grillamodeloasiento.getStore().getProxy().extraParams.idtipo=records.data.idtypeenterprise;
        grillamodeloasiento.getStore().getProxy().extraParams.validarfiscal=valor;
        grillamodeloasiento.getStore().load();
        
        console.log(grillalista.validarfiscal);
        //undefined
    },
    editGrid        : function (editor, e,eopts){
        var thiss=this;

        var store=e.grid.getStore();
        Ext.Ajax.request({
                                        url  : 'data/classes/sis_erp_type.php',
                                         params : {
                                           xaction   : 'updateListaAsientos',
                                           valorestipoasiento : Ext.JSON.encode(editor.context.newValues) 
                                           
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
    }
    ,
    cancelEdit  : function (editor, e, eOpts){
      //console.log(e);
      /*this.mostrarColumna(e.grid.columns,false,'idcategoricalgrouping');
      e.grid.modegrid='update';*/ 
      //e.grid.getStore().removeAt( e.rowIdx );  
      if(e.record.data.idtype==0){
            e.grid.getStore().removeAt( e.rowIdx );
        }
},
    cancelEditModelaccounting  : function (editor, e, eOpts){
        //console.log(e);
      /*this.mostrarColumna(e.grid.columns,false,'idcategoricalgrouping');
      e.grid.modegrid='update';*/ 
        if(e.record.data.idaccountingtype==0){
            e.grid.getStore().removeAt( e.rowIdx );
        }
        //e.grid.getStore().removeAt( e.rowIdx );
      //e.grid.getStore().reload();  
      
},
beforeEdit  : function (editor, e, eOpts){
    /*var win=e.grid.up('window');
    if(win.stateMode=='E'){
      var thiss=this;
    var cbocategoria;
    var cboagrupcategoria;
    this.mostrarColumna(e.grid.columns,true,'idcategoricalgrouping'); 
    var alias= e.record.data.alias;
    Ext.each(e.grid.columns,function(item,index,allitems){
       
        if (item.dataIndex=='idcategory') {
            cbocategoria=item.getEditor();
            thiss.cambiarParamsCombo(cbocategoria,alias);
            cbocategoria.getStore().load();

        }
        if(item.dataIndex=='idcategoricalgrouping'){
            cboagrupcategoria=item.getEditor();
            cboagrupcategoria.getStore().reload();
            
        }
    });  
    }else{
        //console.log(e.grid.editingPlugin);
        e.grid.getStore().load();
    }
   */
    
},
beforeEditModelaccounting  : function (editor, e, eOpts){
    //console.log(e.record.data.accountname);accountcode
    //var valorCargar=e.grid;
    var cboeditorcode='';
    var cbochildunit='';
    Ext.each(e.grid.columns,function(item,index,allitems){
           if (item.dataIndex=='idaccountplan') {
               cboeditorcode=item.getEditor();
            }else if (item.dataIndex=='idunitcomposition') {
                cbochildunit=item.getEditor();
            }
        });
    //console.log(cboeditorcode);
    cboeditorcode.getStore().getProxy().extraParams.accountcode=e.record.data.accountcode;
    cboeditorcode.getStore().load();
    cboeditorcode.getStore().getProxy().extraParams.accountcode='';
    /*var win=e.grid.up('window');
    if(win.stateMode=='E'){
      var thiss=this;
    var cbocategoria;
    var cboagrupcategoria;
    this.mostrarColumna(e.grid.columns,true,'idcategoricalgrouping'); 
    var alias= e.record.data.alias;
    Ext.each(e.grid.columns,function(item,index,allitems){
       
        if (item.dataIndex=='idcategory') {
            cbocategoria=item.getEditor();
            thiss.cambiarParamsCombo(cbocategoria,alias);
            cbocategoria.getStore().load();

        }
        if(item.dataIndex=='idcategoricalgrouping'){
            cboagrupcategoria=item.getEditor();
            cboagrupcategoria.getStore().reload();
            
        }
    });  
    }else{
        //console.log(e.grid.editingPlugin);
        e.grid.getStore().load();
    }
   */
    
},
editGridModelaccounting:function(editor, e,eopts){
    //console.log(cbo.getSubmitValue());
    
    var thiss=this;

        var store=e.grid.getStore();
        
        //var idprovider=e.grid.getStore().getProxy().extraParams.idprovider;
        
        Ext.Ajax.request({
                url  : 'data/classes/sis_erp_accounting_type.php',
                    params : {
                    xaction   : 'updateaccountingtype',
                    id: e.record.data.idaccountingtype,
                    valores: Ext.JSON.encode(editor.context.newValues),
                    idtipo: e.grid.idtipo,
                    validarfiscal:e.grid.validarfiscal
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
                        //e.grid.modegrid='update';
                        //thiss.mostrarColumna(e.grid.columns,false,'idcategoricalgrouping');

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
                        //store.load();
                        //e.grid.modegrid='update';
                        //thiss.mostrarColumna(e.grid.columns,false,'idcategoricalgrouping');

                }

         });
},
functionAgregarTransaction : function (btn,e,eOpts){
        
        var grillaM=btn.up('panel');
        //console.log(grillaM);
        var storegrillaM=grillaM.getStore();
        //grillaM.modegrid='createmoneda';
        
        var plugingrillaM=grillaM.getPlugin();
        //var confEdit=grilla.getElConfig();
         var r=Ext.create('Erp.model.configuraciones.ModelAccountingType', {
         idaccountingtype:0,
         idaccountplan:'',
         percentage:0,
         operation:'',
         debit_credit:'false',
         order:0,
         identerprise:0,
         idtypeenterprise:'',
         accountcode:'',
         accountname:''
        });
        storegrillaM.insert(0, r);
        //console.log(grilla);
        plugingrillaM.startEdit(0, 0);
    }
   
   
});






