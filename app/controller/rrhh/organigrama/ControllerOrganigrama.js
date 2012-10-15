/*
 * @Autor: Pablo Garcia Guaman, Cristhian Valencia F, Max Jimenez
 * @Email:garciaguamanpablo@gmail.com, fox_tian@hotmail.com
 */


Ext.define('Erp.controller.rrhh.organigrama.ControllerOrganigrama', {
    extend: 'Ext.app.Controller',
    stores: ['rrhh.StoreOrganigrama',
             'rrhh.StoreEstructuraOrganizacional',
             'rrhh.cargo.StoreRolFuncionesCargos'],
    models: ['rrhh.ModelOrganigrama',
             'rrhh.ModelEstructuraOrganizacional',
             'rrhh.cargo.ModelCaracteristicasCargos'],
    
    views: ['rrhh.organigrama.WindowOrganigrama',
            'rrhh.organigrama.TreeDepartamentos',
            'rrhh.organigrama.TreeEstructuraOrganizacional',
            'rrhh.organigrama.GridAsignacionOrganigrama',
            'rrhh.organigrama.FormOrganigramaDepartamentos',
            'rrhh.organigrama.FormOrganigramaCargos'
            
            ],
  
    init: function(e) {
        
        this.control({
              'windoworganigrama':{
                    afterrender:this.initAll,
                    beforeclose      : function (window){
                        var estado=true;
                        if(window.stateMode=='E'){
                           this.showMsg({title:'Error:',msg:'Existen operaciones pendientes en el formulario de entrada!!'},false,4000);
                           estado=false; 
                        }
                        
                        return estado;
                    }
               },
              'windoworganigrama buttongroup[option=BtnsDepartamentos] button':{
                    click:this.actionButton
              },
              'windoworganigrama buttongroup[option=BtnsCargos] button':{
                    click:this.actionButtonCargo
              },

              'formorganigramacargos button':{
                    click:this.actionButtonCargo1
                    
              },
              'formorganigramadepartamentos button':{
                    click:this.actionButtonCargo2
                    
              },
              'formorganigramacargos button[option=nuevoRol]':{
                    click:this.nuevoRol
                    
              },
              'formorganigramacargos grid[option=RolFuncionesResponsabilidades]':{
                   edit         : this.editGridRol,
                   beforeedit   : this.beforeeditRol,
                   validateedit : this.validateeditRol,
                   canceledit   : this.canceleditRol,
                   itemdblclick : this.itemdblclickRol
              },
              //'formorganigramacargos button[option=back]':{
                   // click:function(button){
                       // console.log('nextqwe');
                        /*var window=button.up('windowtxncompras');
                        var formtxn=window.down('formtxncompras');
                        var gridtxn=window.down('griddoccompras');
                        var cardwiz=window.down('panel[alias=contentform]');
                        this.txnAnimate(cardwiz,gridtxn,formtxn,500,0,false);*/
                   // }
             // },




              'formtxnentradas':{
                  deactivate:function(form){

                  },
                  dirtychange : function (form,dirty,eOpts){
                     
                      
                  }
              },
              'griddetalletxnentradas':{
                   edit         : this.editGridDetalleEntradas,
                   beforeedit   : this.beforeeditGridDetalleEntradas,
                   validateedit : this.validateeditGridDetalleEntradas,
                   canceledit   : this.canceleditGridDetalleEntradas,
                   itemdblclick : this.itemdblclick
              },
              'griddetalletxnentradas button[option=addItem]'   : {
                   click        : this.addNuevoDetalle
              },
              'treedepartamentos':{
                  itemclick: this.gridSelectionChange
              },
              'treeestructuraorganizacional':{
                  itemclick: this.gridCargosSelectionChange
              }
              
              

        });
    },
    idfhater:0,
    idfhaterdpto:0,
    namefather:'',
    namejefe:'',
    namedpto:'',
    record:'',
    recordDpto:'',
    idcargo:0,
    initAll:function(window,eOpts){
        
        var thiss=this; 
        var store=Ext.create('Erp.store.rrhh.StoreEstructuraOrganizacional',{proxy:{type: 'ajax', actionMethods: {read: 'POST' }, extraParams:{xaction:'readdepartaments1', id:1 },url: 'data/classes/sis_erp_organizational_chart.php' },});
        var treedepartamentos=Ext.create('Erp.view.rrhh.organigrama.TreeDepartamentos',{});
        var treeorganigrama=Ext.create('Erp.view.rrhh.organigrama.TreeEstructuraOrganizacional',{store:store});
       // var gridasignaciones=Ext.create('Erp.view.rrhh.organigrama.GridAsignacionOrganigrama',{});
        window.down('panel[name=panelcontentorganigrama]').add(treedepartamentos,treeorganigrama/*,gridasignaciones*/);
        thiss.idfhater=0;
        thiss.idfhaterdpto=0;
        thiss.namefather='';
        thiss.namejefe='';
        thiss.namedpto='';
        thiss.record='';
        thiss.recordDpto='';
        console.log(treeorganigrama.getStore());
//        var store=Ext.create('Erp.store.crm.StoreCrmEmployee',{storeFilter:true});
//      
//        var cboautocompletado=Ext.create('Erp.helper.ComboAutoCompletado',store,'responsible2','employeename','id_person','Responsable');
//        console.log(cboautocompletado);
//        var form=window.down('formtxnentradas');
//        var griddetail=window.down('griddetalletxnentradas');
//        var cboalmacen=form.down('combobox[name=destinationstore]');
//        var cboresponsible=form.down('combobox[name=responsible]');
//              
//        var cboconcepto=form.down('combobox[name=concept]');
//        var cboestado=form.down('combobox[name=state]');
//        
//       griddetail.getStore().on('load',function(){
//            thiss.calculateTotals(griddetail);
//        });
//      
//     
//       
//        if (window.stateMode=='E') {
//            var record=form.getRecord();
//            griddetail.getStore().getProxy().extraParams={xaction:'read',yaction:'readdetailentradas',idtxnstore:record.data.idtxnstore};
//            griddetail.getStore().load();
//            cboresponsible.setValue(record.data.responsible);
//            cboresponsible.getStore().getProxy().extraParams.responsible=record.data.responsible;
//            cboresponsible.getStore().load();
//            window.stateMode='R';
//        }else{
//            window.stateMode='N';
//            
//        }
//        
//        
//        cboalmacen.getStore().load();
//        cboconcepto.getStore().getProxy().extraParams={xaction:'readtxnentradaconcept'};
//        cboconcepto.getStore().load();
//        cboestado.getStore().getProxy().extraParams={xaction:'readbytype',type:'estado_txn'};
//        cboestado.getStore().load();
//        //console.log(cboresponsible);
//       
//        this.enableControls(window);
//        this.enableButtons(window);
    },
    gridSelectionChange: function(view, records) {
        var me=this;
        var win=view.up('window');
        console.log(records);
        var grid2=win.down('treeestructuraorganizacional');
        console.log(grid2);
        //var form=win.down('panel[option=panelcargos1]');
        //var formid=form.down('idorganizationalchart');
        me.namedpto=records.data.jobtitle;
        me.idfhater=0;
        me.idfhaterdpto=records.data.idorganizationalchart;
        me.namefather='';
        me.recordDpto=records;
        //if(records.data.leaf==true){
            grid2.setTitle(records.data.jobtitle);
            grid2.getStore().getProxy().extraParams.id=records.data.idorganizationalchart;
            grid2.getStore().load();
        //}
           
        
    },
    gridCargosSelectionChange: function(view, records) {
        var me=this;
        var win=view.up('formorganigramacargos');
        console.log(records);
        me.idfhater=records.data.id;
        me.namefather=records.data.jobtitle;
        me.record=records;
        //me.namejefe=records.data.id;
        //me.namedpto=records.data.id;
        //fieldid.setValue(records.data.id);
        
    },
    actionButton:function(button){
        var me=this;
        var window=button.up('window');
        //var form=window.down('formtxnentradas');
        //var griddetail=window.down('griddetalletxnentradas');
      var fp=Ext.getCmp('center-panel');
       switch (button.option) {
            case 'btnNuevoDpto':
              var fatheractual=0;
               
                    fatheractual=me.idfhaterdpto;
               
                var TreeDepartamentos=window.down('treedepartamentos');
                var windowdpto=Ext.create('Erp.view.rrhh.organigrama.FormOrganigramaDepartamentos',{stateMode:"N",TreeDepartamentos:TreeDepartamentos});
                var fieldid=windowdpto.down('[option=father]');
                fieldid.setValue(fatheractual);
                var fieldnamedpto=windowdpto.down('[option=dptosuperior]');
                fieldnamedpto.setValue(me.namedpto);
                fp.add(windowdpto);
                windowdpto.show();
            break;
            case 'btnEditarDpto':
               var fatheractual=0;
               
                    fatheractual=me.idfhaterdpto;
               
                var TreeDepartamentos=window.down('treedepartamentos');
                var windowdpto=Ext.create('Erp.view.rrhh.organigrama.FormOrganigramaDepartamentos',{stateMode:"E",TreeDepartamentos:TreeDepartamentos});
                var form=windowdpto.down('[option=formDpto]');
                form.getForm().loadRecord(me.recordDpto);
                var fieldid=windowdpto.down('[option=father]');
                fieldid.setValue(fatheractual);
                var fieldnamedpto=windowdpto.down('[option=dptosuperior]');
                fieldnamedpto.setValue(me.namedpto);
                fp.add(windowdpto);
                windowdpto.show();
                
                
            break;
               
            default:
                break;
        }

        
    },
    actionButtonCargo:function(button){
        var me=this;
        //var thiss=this;
        var window=button.up('window');
        var TreeEstructuraOrganizacional=window.down('treeestructuraorganizacional');
        //var griddetail=window.down('griddetalletxnentradas');
      var fp=Ext.getCmp('center-panel');
       switch (button.option) {
            case 'btnNuevoCargo':
               //Erp.view.rrhh.organigrama.FormOrganigramaCargos
               var fatheractual=0;
               if(me.idfhater==0){
                    fatheractual=me.idfhaterdpto;
               }else{
                    fatheractual=me.idfhater;
               }
               if(me.namedpto!=''){
                    if(fatheractual!=0){
                    var windowcargos=Ext.create('Erp.view.rrhh.organigrama.FormOrganigramaCargos',{stateMode:"N",TreeEstructuraOrganizacional:TreeEstructuraOrganizacional});
                   
                    fp.add(windowcargos);
                    var fieldid=windowcargos.down('[option=father]');
                    fieldid.setValue(fatheractual);//namedpto namejefe
                    var fieldnamedpto=windowcargos.down('[option=namedpto]');
                    fieldnamedpto.setValue(me.namedpto);
                    var fieldnamejefe=windowcargos.down('[option=namejefe]');
                    fieldnamejefe.setValue(me.namejefe);
                    windowcargos.show();
                   }else{
                        Erp.helper.Tools.showMsg({title:'Error',msg:'Seleccione una fila padre de cargos'},false,4000)
                   }
               }else{
                Erp.helper.Tools.showMsg({title:'Error',msg:'Seleccione una fila de Departamentos'},false,4000)
               }
               
                
                
            break;
            case 'btnEditarCargo':
              var fatheractual=0;
               if(me.idfhater==0){
                    fatheractual=me.idfhaterdpto;
               }else{
                    fatheractual=me.idfhater;
               }
               if(me.record!=''){
                    if(fatheractual!=0){
                    var windowcargos=Ext.create('Erp.view.rrhh.organigrama.FormOrganigramaCargos',{stateMode:"E",TreeEstructuraOrganizacional:TreeEstructuraOrganizacional});
                    fp.add(windowcargos);
                    var form=windowcargos.down('[option=formulariocargos]');
                    form.getForm().loadRecord(me.record);
                    var fieldid=windowcargos.down('[option=father]');
                    fieldid.setValue(fatheractual);//namedpto namejefe
                    var fieldnamedpto=windowcargos.down('[option=namedpto]');
                    fieldnamedpto.setValue(me.namedpto);
                    var fieldnamejefe=windowcargos.down('[option=namejefe]');
                    fieldnamejefe.setValue(me.namejefe);
                    windowcargos.show();
                   }else{
                        Erp.helper.Tools.showMsg({title:'Error',msg:'Seleccione una fila padre de cargos'},false,4000)
                   }
               }else{
                Erp.helper.Tools.showMsg({title:'Error',msg:'Seleccione una fila de Departamentos'},false,4000)
               } 
                
                
            break;
               
            default:
                break;
        }

        
    },
    actionButtonCargo1:function(button){
        var me=this;
        var window=button.up('formorganigramacargos');
        var formtxn=window.down('panel[option=panelcargos1]');
        var gridrol=window.down('panel[option=panelcargos2]');
        var gridatribuciones=window.down('panel[option=panelcargos3]');
        var gridperfil=window.down('panel[option=panelcargos4]');
        var permit=true;
        switch (button.option) {
            //Panel Nro 1
            case 'next':
            //console.log('dddddd'); 
                window.stateMode='N'; 
                me.saveTxn(window,permit);
                var gridRol=window.down('grid[option=RolFuncionesResponsabilidades]');
                //var store=Ext.create('Erp.store.rrhh.cargo.StoreRolFuncionesCargos');   
                //gridRol.store=store; 
                //var idformcargo=window.down('numberfield[option=idorganizationalchart]');
                //var idcargo=idformcargo.getValue();
                gridRol.getStore().getProxy().extraParams.yaction='readRol';
                gridRol.getStore().getProxy().extraParams.idcargo=me.idcargo;  
                                 
                gridRol.getStore().load();                    
                me.txnAnimate(window,formtxn,gridrol,500,0,true);                
            break;
            case 'btnCancelarCargo':
               window.close();
            break;
            case 'btnTerminarCargo':
               window.stateMode='N'; 
               me.saveTxn(window,permit);
               window.close();
            break;

            //Panel Nro 2
            case 'next1':                      
                me.txnAnimate(window,gridrol,gridatribuciones,500,0,true);
                
            break;
            case 'back1': 

                  //console.log(window.getLayout().getActiveItem());                       
                me.txnAnimate(window,gridrol,formtxn,500,0,false);
            break;
            case 'btnCancelarCargo1':
               window.close();
                
                
            break;

            //Panel Nro 3
            case 'next2':
                              
                this.txnAnimate(window,gridatribuciones,gridperfil,500,0,true);
                
            break;
            case 'back2':
                             
                this.txnAnimate(window,gridatribuciones,gridrol,500,0,false);
            break;
            case 'btnCancelarCargo2':
               window.close();
                
                
            break;

            //Panel Nro 4
            case 'back3':
                               
                this.txnAnimate(window,gridperfil,gridatribuciones,500,0,false);
            break;   
            case 'btnCancelarCargo3':
               window.close();
                
                
            break; 
            default:
            break;
        }
    },
    actionButtonCargo2:function(button){
      var me=this;
      var permit=true;
      var window=button.up('formorganigramadepartamentos');
        switch (button.option) {
            case 'btnGuardar':
                me.saveDpto(window,permit);
               window.close();
                
            break;
            case 'btnCancelar':
                window.close();
                
                
            break;
               
            default:
                break;
        }
    },
    enableButtons:function(window){
        var buttons=window.down('buttongroup[group=edicion]').items.items;
        var buttonstran=window.down('buttongroup[group=opciones]').items.items;
       
        var state=window.down('formtxnentradas').down('combo[name=state]').getValue();
        if (window.stateMode=='R') {
            Ext.each(buttons,function(item){
                if (item.option=='btnNuevo' || item.option=='btnEditar') {
                    item.setDisabled(0);
                }else if (item.option=='btnGuardar' || item.option=='btnCancelar') {
                    item.setDisabled(1);
                }
            });
            if(state==44){
                Ext.each(buttonstran,function(item){
                if (item.option=='btnAnular') {
                    item.setDisabled(0);
                }else{
                    item.setDisabled(1);
                }
            });
            }else if(state==45){
                Ext.each(buttonstran,function(item){
                    item.setDisabled(1);
                   
                });  
            } else {
                 Ext.each(buttonstran,function(item){
                    if (item.option=='btnAprobar') {
                        item.setDisabled(0);
                    }else if (item.option=='btnImprimir'  || item.option=='btnAnular') {
                        item.setDisabled(1);
                    }
                 });
                
            }
           
        }else if (window.stateMode=='E') {
            Ext.each(buttons,function(item){
                if (item.option=='btnGuardar' || item.option=='btnCancelar') {
                    item.setDisabled(0);
                }else if (item.option=='btnNuevo' || item.option=='btnEditar') {
                    item.setDisabled(1);
                }
            });
            
             Ext.each(buttonstran,function(item){
                if (item.option=='btnAprobar' || item.option=='btnAnular'  || item.option=='btnImprimir') {
                    item.setDisabled(1);
                   
                }
            });
        }else if (window.stateMode=='N') {
            Ext.each(buttons,function(item){
                if (item.option=='btnGuardar' || item.option=='btnCancelar') {
                    item.setDisabled(0);
                }else if (item.option=='btnNuevo' || item.option=='btnEditar') {
                    item.setDisabled(1);
                }
            });
            Ext.each(buttonstran,function(item){
                if (item.option=='btnAprobar' || item.option=='btnAnular'  || item.option=='btnImprimir') {
                    item.setDisabled(1);
                   
                }
            });
            
        }
    },
    
    enableControls:function(window){
        var formHead=window.down('formtxnentradas');
        this.enableForm(window,formHead,window.stateMode);
        this.enableGrid(window);
    },
    
    enableForm:function(window,form,stateMode){
      
        var items=form.getForm().getFields().items;
        if (stateMode=='R') {
           Ext.each(items,function(item,index,allitems){
                    item.setReadOnly(1);
           });
        }else if (stateMode=='E') {

                Ext.each(items,function(item,index,allitems){
                    if (item.name!='idtxnstore' && item.name!='correlative' && item.name!='state') {
                        item.setReadOnly(0);
                    }
                   
                });
        }else if (stateMode=='N') {

               form.getForm().reset();
               form.down('datefield[name=date]').setValue(Erp.helper.Constants.getServerDate());
               form.down('combo[name=state]').setValue(43);
               Ext.each(items,function(item,index,allitems){
                   if (item.name!='idtxnstore' && item.name!='correlative'  && item.name!='state') {
                        item.setReadOnly(0);
                   }else{
                       item.setReadOnly(1);
                   }     
                });
                
                
              
        }
    },
    enableGrid  : function(window){
       
        var grid=window.down('griddetalletxnentradas');
        if(window.stateMode=='R'){
            grid.down('button[option=addItem]').setDisabled(true);
            Ext.each(grid.columns,function (item,index,allitems){
                    if(item.dataIndex=='iditem' || item.dataIndex=='idunit' || item.dataIndex=='quantity' || item.dataIndex=='cost' ){
                        item.getEditor().setReadOnly(1);
                        item.getEditor().setDisabled(true);
                        
                    }
            });
        }else{
            if(window.stateMode=='N'){
                
                grid.getStore().removeAll();
                grid.down('label[option=labelcantidad]').setText('Total Items: 0');
                grid.down('label[option=labeltotal]').setText('Total General: 0');
            }
            grid.down('button[option=addItem]').setDisabled(false);
            Ext.each(grid.columns,function (item,index,allitems){
                    if(item.dataIndex=='iditem' || item.dataIndex=='idunit' || item.dataIndex=='quantity' || item.dataIndex=='cost' ){
                        item.getEditor().setReadOnly(0);
                        item.getEditor().setDisabled(false);
                    }
            });
            
        }
        
    },
    
    save    :    function (form,grid,window){
        var thiss=this;
        var updatedetalle=new Array();
        var insertdetalle=new Array();
        var count=0;
                
        grid.getStore().each(function(record){
            if(record.data.state=='insert' ){
                insertdetalle.push(record.data);

            }else{
                if(record.data.iddtxnstore!=0 && record.data.state=='update'){
                    updatedetalle.push(record.data);  

                }
            }
            count=count+1;
                
        });
            
        if(form.getForm().isValid() ){
            if(count==0){
                thiss.showMsg({title:'Error',msg:'No se puede crear una entrada a almacen sin detalle'},false,4000);
               
            }else{
                var idtxnstore=form.down('numberfield[name=idtxnstore]');
                var correlative=form.down('textfield[name=correlative]');
                var xaction;
                
                if (window.stateMode=='N') {
                    xaction='insert';
                }else if (window.stateMode=='E') {
                    xaction='update';
                }
            
                form.getForm().submit({
                    clientValidation    : true,
                    url     : 'data/classes/sis_erpd_txn_store.php',
                    params  : {
                            xaction:xaction,
                            yaction:'entradamercaderia',
                            updatedetalle:Ext.JSON.encode(updatedetalle),
                            insertdetalle: Ext.JSON.encode(insertdetalle)
                    },
                    success : function (form, action){
                       thiss.showMsg({title:action.result.title,msg:action.result.msg},true,4000);
                        if(window.stateMode=='N'){
                            grid.getStore().getProxy().extraParams.idtxnstore=action.result.id;
                            grid.getStore().getProxy().extraParams.yaction='readdetailentradas';
                            idtxnstore.setValue(action.result.id);
                            correlative.setValue(action.result.correlative);
                        }
                        window.stateMode='R';
                        thiss.enableButtons(window);
                        thiss.enableControls(window);
                        grid.getStore().load();
                        var storelistentradas = Ext.data.StoreManager.lookup('storeListEntradas');
                        storelistentradas.load();



                    },
                    failure : function (form,action){
                        thiss.showMsg({title:action.result.title,msg:action.result.msg},false,4000);
                     }

                });
            }
        }
        
       
    },
    addNuevoDetalle             : function (button){
     
      var grid=button.up('griddetalletxnentradas');
      var form=button.up('windowtxnentradas').down('formtxnentradas');
     
       if(!form.getForm().isValid() ){
         this.showMsg({title:'Atencion',msg:'Complete el formulario de datos basicos'},false,4000);
       }else{
            
            grid.modegrid='insert';
            var store=grid.getStore();
            var plugingrilla=grid.getPlugin();
           
            
            var r=Ext.create('Erp.model.almacenes.transacciones.ModelDTxnStore', {
                  
            });
            
            r.data.simbolo=grid.currencysimbol;
            if(Ext.util.Format.undef(plugingrilla.editing)!=''){
                 this.showMsg({title:'Atencion',msg:'Hay ediciones pendientes en el detalle de la entrada'},false,4000);
            }else{
           
                store.insert(0, r);
                grid.currentrowselected=0;
                plugingrilla.startEdit(0, 0);
                
            }
       }
      
    },
    editGridDetalleEntradas     : function (editor, e,eopts){
       
        this.calculateTotals(e.grid);
       
    },
    beforeeditGridDetalleEntradas   : function (editor,e){
         var window=e.grid.up('windowtxnentradas');
         var estado;
         if(window.stateMode=='R'){
                estado=false;
         }else{
                 if(e.record.data.iditem!=''){
                    Ext.each(e.grid.columns,function (item,index,allitems){
                                if(item.dataIndex=='iditem' || item.dataIndex=='idunit'){
                                    item.getEditor().getStore().load({params :{iditem:e.record.data.iditem}});                     
                                }
                    });
                }
                estado=true;
         }
                   
         return estado;
        
        
    },
    validateeditGridDetalleEntradas : function (editor,e){
       
                if(e.record.data.iddtxnstore==0){
                    e.record.data['state']='insert';
                    e.record.commit();
                }else{
                    e.record.data['state']='update';
                    e.record.commit();
                }
         
     
    },
    canceleditGridDetalleEntradas   : function (editor,e){
     
        if(e.record.data.state=='new'){
                e.store.removeAt(e.rowIdx);       

            }
      
        
        
        
    },
     showMsg:function(oOpts,confirm,time){
        var tipomsg;
        if(confirm)tipomsg='ux-notification-icon-information';
        else tipomsg='ux-notification-icon-error';
        Ext.create('widget.uxNotification', {
                        title: oOpts.title,
                        position: 'tr',
                        manager: 'instructions',
                        cls: 'ux-notification-light',
                        iconCls: tipomsg,
                        html: oOpts.msg,
                        autoHideDelay: time,
                        slideBackDuration: 500,
                        slideInAnimation: 'bounceOut',
                        slideBackAnimation: 'easeIn'
         }).show();
    },
    calculateTotals:function(grid){
       
       var labelItems=grid.down('label[option=labelcantidad]');
       var labelTotal=grid.down('label[option=labeltotal]');
       var store=grid.getStore();
       var costo=0;
       var quantity=0;
       store.each(function(record){
           
           
           costo+=(record.data.cost*record.data.quantity);
           quantity+=record.data.quantity;
        
       });
      
       labelItems.setText('Total Items: '+quantity);
       labelTotal.setText('Total General: '+Ext.util.Format.currency(costo,grid.currencysimbol));
   
    },
    itemdblclick : function (view,record,item,index,e,eOpts ){
        var grid = view.up('griddetalletxnentradas');
        grid.currentrowselected=index;
       
    },


    txnAnimate:function(cardwiz,component,destination,time,opacity,go){
        console.log('actual');
        console.log(component);
        console.log('destino');
        console.log(destination);
        component.animate({
            duration: time,
            easing:'elasticOut',
                to: {
                    opacity: opacity
                },
                listeners:{
                    afteranimate:function(a){
                        if (go) {
                            cardwiz.getLayout().next();
                        }else{
                            cardwiz.getLayout().prev();
                        }
                        destination.animate({
                                duration: time,
                                easing:'elasticIn',
                                    to: {
                                        opacity: 100
                                    }
                        });

                    }


                }
     });
    },
    saveTxn:function(window,permit){
        var me=this;
        var panel1=window.down('panel[option=panelcargos1]');
        var idformcargo=window.down('numberfield[option=idorganizationalchart]');
        var formtxn=panel1.down('form');
        console.log(window.stateMode);
            if (formtxn.getForm().isValid()) {
                var yaction;
                if (window.stateMode=='N' ) {
                    yaction='savecargo';
                }else if (window.stateMode=='E') {
                    yaction='updateCargos';
                }
                console.log('siiiii');
                formtxn.getForm().submit({
                    clientValidation: true,
                    url: 'data/classes/sis_erp_organizational_chart.php',
                    params: {xaction:yaction,yaction: yaction/*,detail:Ext.encode(datadetail),documents:Ext.encode(datadoc)*/},
                    success:function(form,action){
                        var result=Ext.decode(action.response.responseText);
                        if(window.stateMode=="N"){
                            console.log('holassssssss');                        
                        idformcargo.setValue(result.iditem);
                        me.idcargo=result.iditem;
                        //correlativoformcab.setValue(result.correlative);
                        //formtxn.getForm().updateRecord();
                        }
                        window.TreeEstructuraOrganizacional.getStore().load();
                        window.stateMode='R';
                        var gridRol=window.down('grid[option=RolFuncionesResponsabilidades]');
                        gridRol.getStore().getProxy().extraParams.yaction='readRol';
                        gridRol.getStore().getProxy().extraParams.idcargo=result.iditem;
                        gridRol.getStore().load();
                        //console.log(gridRol);
                        //Ext.getStore('treeestructuraorganizacional').load();
                        /*var panelcentral=Ext.getCmp('center-panel');
                        
                        
                        var winlista=panelcentral.down('windowlistatransferencias');
                        
                        winlista.items.items[0].getStore().load();*/
                        //Ext.getStore('storelistatransferencias').load();
                        
                        //habilitarBtn.setDisabled(0);
                        //console.log(formtxn.items.items[0].items.items[0]);
                        //if(permit=='si'){
                            //window.stateMode='R';
                            //thiss.enableControls(window);
                            //thiss.enableButtons(window);
                        //}
                        
                        //thiss.showMsg(result);
                       // valor=true;
                        //Ext.getStore('storelistacompras').load();
                    },
                    failuer:function(response){
                       
                    }
                });
            }else{
                console.log('noooo');
                /*Ext.create('widget.uxNotification', {
                        title: 'Advertencia',
                        position: 'tr',
                        manager: 'instructions',
                        cls: 'ux-notification-light',
                        iconCls: 'ux-notification-icon-information',
                        html: 'Llene todos los campos requeridos',
                        autoHideDelay: 4000,
                        slideBackDuration: 500,
                        slideInAnimation: 'bounceOut',
                        slideBackAnimation: 'easeIn'
                }).show();
                valor=false;*/
            }
            //return valor;
       // }    
    },
    saveDpto:function(window,permit){
        var me=this;
        //var panel1=window.down('panel[option=panelcargos1]');
        //var idformcargo=window.down('numberfield[option=idorganizationalchart]');
        var formtxn=window.down('[option=formDpto]');
        console.log(window.stateMode);
            if (formtxn.getForm().isValid()) {
                var yaction;
                if (window.stateMode=='N' ) {
                    yaction='saveDpto';
                }else if (window.stateMode=='E') {
                    yaction='updateDpto';
                }
                console.log('siiiii');
                formtxn.getForm().submit({
                    clientValidation: true,
                    url: 'data/classes/sis_erp_organizational_chart.php',
                    params: {xaction:yaction,yaction: yaction/*,detail:Ext.encode(datadetail),documents:Ext.encode(datadoc)*/},
                    success:function(form,action){
                        var result=Ext.decode(action.response.responseText);
                        if(window.stateMode=="N"){
                            console.log('holassssssss');                        
                        //idformcargo.setValue(result.iditem);
                        //correlativoformcab.setValue(result.correlative);
                        //formtxn.getForm().updateRecord();
                        }
                        window.TreeDepartamentos.getStore().load();
                        window.stateMode='R';
                        //Ext.getStore('treeestructuraorganizacional').load();
                        /*var panelcentral=Ext.getCmp('center-panel');
                        
                        
                        var winlista=panelcentral.down('windowlistatransferencias');
                        
                        winlista.items.items[0].getStore().load();*/
                        //Ext.getStore('storelistatransferencias').load();
                        
                        //habilitarBtn.setDisabled(0);
                        //console.log(formtxn.items.items[0].items.items[0]);
                        //if(permit=='si'){
                            //window.stateMode='R';
                            //thiss.enableControls(window);
                            //thiss.enableButtons(window);
                        //}
                        
                        //thiss.showMsg(result);
                       // valor=true;
                        //Ext.getStore('storelistacompras').load();
                    },
                    failuer:function(response){
                       
                    }
                });
            }else{
                console.log('noooo');
                /*Ext.create('widget.uxNotification', {
                        title: 'Advertencia',
                        position: 'tr',
                        manager: 'instructions',
                        cls: 'ux-notification-light',
                        iconCls: 'ux-notification-icon-information',
                        html: 'Llene todos los campos requeridos',
                        autoHideDelay: 4000,
                        slideBackDuration: 500,
                        slideInAnimation: 'bounceOut',
                        slideBackAnimation: 'easeIn'
                }).show();
                valor=false;*/
            }
            //return valor;
       // }    
    },
    nuevoRol        : function(button){
       console.log('entro');
        var grid=button.up('grid');
        //grid.modegrid='insert';
        //Ext.each(grid.columns,function(item,index,allitems){
            //if(item.dataIndex=='idcategoricalgrouping' || item.dataIndex=='idcategory'){
                //item.getEditor().setValue('');
            //}
                    
        // });
        var store=grid.getStore();
        var plugingrilla=grid.getPlugin();
        
         var r=Ext.create('Erp.model.rrhh.cargo.ModelCaracteristicasCargos', {
            idfeaturesposition : 0,
            idorganizationalchart:0,
            name:'',
            description:'',
            type:161,
            identerprise:'',
            percentage:0
        
        });
          
        store.insert(0, r);
         plugingrilla.startEdit(0, 0);
        
        
    },
    editGridRol:function(editor,e){
      var me=this;
      var store=editor.grid.getStore();
      
      var win=editor.grid.up('window');
      var idformcargo=win.down('numberfield[option=idorganizationalchart]');
      //console.log(editor.context.newValues);
      var idcargo=idformcargo.getValue();
      //store.getProxy().extraParams.idtxnstore=idtxnstore;
      
      Ext.Ajax.request({
              url  : 'data/classes/sis_erp_features_position.php',
               params : {
                 xaction   : 'insert',
                 yaction   : 'insertcargo',
                 idcargo: idcargo,
                 valores : Ext.JSON.encode(editor.context.newValues) 
                 //valoresraiz : Ext.JSON.encode(changes.record.data)

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
                  /*store.load({callback:function(){

                      if(this.getCount()>0){
                          me.permitirElegir=false;
                          idcombo.setReadOnly(1);
                          idcombodest.setReadOnly(1);
                          //cboalmacenorg.setDisabled(true);
                      }else{
                          me.permitirElegir=true;
                          idcombo.setReadOnly(0);
                          idcombodest.setReadOnly(0);
                          //cboalmacenorg.setDisabled(false);
                      }

                      }});*/

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
    },
    beforeeditRol:function(editor,e){

    },
    validateeditRol:function(editor,e){

    },
    canceleditRol:function(editor,e){

        //if(e.record.data.state=='new'){
                e.store.removeAt(e.rowIdx);       

            //}
    },
    itemdblclickRol:function(editor,e){

    }
   
});