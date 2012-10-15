/*
 * @Autor: Max marcelo jimenez T,Crithian Valencia, Pablo Garcia Guaman
 * @Email: maxmjt@gmail.com, fox_tian@hotmail.com ,garcia_guaman_pablo@hotmail.com
 */


Ext.define('Erp.controller.ControllerPlanCuentas', {
    extend: 'Ext.app.Controller',
    stores: ['StorePlanCuentas','StoreTreeCuentas'],
    models: ['ModelPlanCuentas','ModelTreeCuentas'],
    views: ['plancuentas.WindowPlanCuentas','plancuentas.TreeCuentas','plancuentas.FormPlanCuentas'],
    
 
    init: function() {
        
        var thiss=this;
 
        thiss.control({
              'windowplancuentas' :{
                  beforerender    : thiss.cargarBotonesPrimerNivel
                  
              },


              'windowplancuentas button':{
                  click   : thiss.actionButton
              },

              'treecuentas': {
                itemclick: this.gridSelectionChange
              },
              
              'formplancuentas ':{
                  render:thiss.initComponents
              },
              'formplancuentas checkbox':{
                  change:this.checkboxChange
              }
              

        });
    },
    checkboxChange:function(chk, eOpts){
        var form=chk.up('form');
        var win=form.up('windowplancuentas');
        var btnactualizar=win.down('button[option="btnAsociar"]');
        var transactional=form.down('checkbox[name=transactional]');
        var associated=form.down('checkbox[name=associated]');
        if (transactional.getValue()) {
            associated.setVisible(1);
            if (form.stateMode=='E' || form.stateMode=='R') {
                btnactualizar.setDisabled(0); 
            }
            
        }else{
            associated.setVisible(0);
            btnactualizar.setDisabled(1); 
        }
        
    },
    initComponents:function(form,e){
        form.down('textfield[name="currency"]').getStore().getProxy().extraParams={xaction:'readbytype',type:'tipo_moneda'};
        form.down('textfield[name="currency"]').store.load();
        this.enableComponents(form);
        this.enableButtons(form);
    },
    actualizarTree: function(btn){
       
        var window1= btn.up('window');                
        var tree = window1.down('treecuentas');
        tree.body.highlight('#ACFA8A');
        var store = tree.getStore();
        store.load();
    },
    
    enableButtons:function(form){
        var win=form.up('window');
        var buttons=win.getDockedComponent(2).items.items;
        
        if (form.stateMode=='R') {
            Ext.each(buttons,function(item){
                if (item.option=='btnNuevo' || item.option=='btnEditar') {
                    item.setDisabled(0);
                }else if (item.option=='btnGuardar' || item.option=='btnCancelar') {
                    item.setDisabled(1);
                }
            });
        }else if (form.stateMode=='E') {
            Ext.each(buttons,function(item){
                if (item.option=='btnGuardar' || item.option=='btnCancelar') {
                    item.setDisabled(0);
                }else if (item.option=='btnNuevo' || item.option=='btnEditar') {
                    item.setDisabled(1);
                }
            });
        }else if (form.stateMode=='N') {
            Ext.each(buttons,function(item){
                if (item.option=='btnGuardar' || item.option=='btnCancelar') {
                    item.setDisabled(0);
                }else if (item.option=='btnNuevo' || item.option=='btnEditar') {
                    item.setDisabled(1);
                }
            });
        }
    },
    enableComponents:function(form){
        var me=this;
        var win=form.up('window');
        var tree=win.down('treecuentas');
        
        var fidaccount=form.down('textfield[name=idaccountplan]');
        var idaccount=fidaccount.getValue();
        var faccountname=form.down('textfield[name=accountname]');
        var accountname=faccountname.getValue();
        var faccfather=form.down('textfield[name=accountfather]');
        var accfather=faccfather.getValue();
        var fnivel=form.down('numberfield[name=level]')
        var nivel=fnivel.getValue();
        var ffathername=form.down('textfield[name=fathername]');
        var faccountcode=form.down('textfield[name=accountcode]');
        var accountcode=faccountcode.getValue();
        var factive=form.down('checkbox[name=active]');
        
        
        if (form.stateMode=='N') {
            
                this.enableButtons(form);
                Ext.each(form.items.items[0].items.items,function(item,index,allitems){
                    item.setValue();
                    if (item.name!='idaccountplan' && item.name!='accountfather' && 
                        item.name!='fathername' && item.name!='level' && item.name!='accountcode') 
                    {
                        item.setReadOnly(0);
                    }
                    
                });
                faccfather.setValue(idaccount);
                ffathername.setValue(accountname);
                fnivel.setValue(nivel+1);
                factive.setValue(true);
                //tree.setDisabled(1);
            
            
            
        }else if (form.stateMode=='E') {
            
                this.enableButtons(form);
                Ext.each(form.items.items[0].items.items,function(item,index,allitems){
                  if (item.name!='idaccountplan' && item.name!='accountfather' && 
                        item.name!='fathername' && item.name!='level' && item.name!='accountcode') 
                    {
                        item.setReadOnly(0);
                    }
                });

        }else if (form.stateMode=='R') {
            Ext.each(form.items.items[0].items.items,function(item,index,allitems){
                item.setReadOnly(1);
                //item.setValue();
            });
            
        }
        
    },
    save:function(form){
        var me=this;
        var win=form.up('window');
        var idaccountplan=form.down('textfield[name=idaccountplan]');
        var accountcode=form.down('textfield[name=accountcode]');
        var tree=win.down('treecuentas');
        if (form.getForm().isValid()) {
            var yaction;
            if (form.stateMode=='N') {
                yaction='insert';
            }else if (form.stateMode=='E') {
                yaction='update';
            }
            form.getForm().submit({
                clientValidation: true,
                url: 'data/classes/sis_erp_account_plan.php',
                params: {xaction:'save',yaction: yaction},
                success: function(frm, action) {
                   Ext.create('widget.uxNotification', {
                        title: action.result.title,
                        position: 'tr',
                        manager: 'instructions',
                        cls: 'ux-notification-light',
                        iconCls: 'ux-notification-icon-information',
                        html: action.result.msg,
                        autoHideDelay: 4000,
                        slideBackDuration: 500,
                        slideInAnimation: 'bounceOut',
                        slideBackAnimation: 'easeIn'
                    }).show();
                    if (form.stateMode=='N') {
                        idaccountplan.setValue(action.result.idaccountplan);
                        accountcode.setValue(action.result.accountcode);
                    }
                    form.stateMode='R';
                    me.enableButtons(form);
                    me.enableComponents(form);
                    tree.getStore().load();
                },
                failure: function(frm, action) {
                    Ext.create('widget.uxNotification', {
                        title: action.result.title,
                        position: 'tr',
                        manager: 'instructions',
                        cls: 'ux-notification-light',
                        iconCls: 'ux-notification-icon-information',
                        html: action.result.msg,
                        autoHideDelay: 4000,
                        slideBackDuration: 500,
                        slideInAnimation: 'bounceOut',
                        slideBackAnimation: 'easeIn'
                }).show();
                }
            });
        }
            
    },
    actionButton : function (button){
        var thiss=this;
        var btn=button;
        var btnOption=button.option;
        var win=button.up('window');
        var form=win.down('formplancuentas');
        var fidaccount=form.down('textfield[name=idaccountplan]');
        var idaccount=fidaccount.getValue();

        var faccfather=form.down('textfield[name=accountfather]');
        var accfather=faccfather.getValue();
        var faccountname=form.down('textfield[name=accountname]');
        var accountname=faccountname.getValue();

    switch (btnOption) {
        case 'btnNuevo':
        

            if (idaccount!='' && accfather!='') {
                form.stateMode='N';
            }else{
                Ext.create('widget.uxNotification', {
                        position: 'tr',
                        useXAxis: true,
                        cls: 'ux-notification-light',
                        iconCls: 'ux-notification-icon-error',
                        title: 'Alerta:',
                        html: 'Para crear una nueva cuenta debe elegir primero una cuenta Padre!!!',
                        slideInDuration: 800,
                        slideBackDuration: 1500,
                        autoHideDelay: 4000,
                        slideInAnimation: 'elasticIn',
                        slideBackAnimation: 'elasticIn'
                }).show();
            }
            //
            this.enableComponents(form);
        break;

        case 'btnEditar':
            if (idaccount!='' && accountname!='') {
                form.stateMode='E';
                this.enableComponents(form);
            }else{
                Erp.helper.Tools.showMsg({title:'Alerta:',msg:'Para editar elija primero una Cuenta!!!'},false,4000);
            }
            
        break;

        case 'btnGuardar':
            this.save(form);
        break;

        case 'btnCancelar':
            form.stateMode='R';
            form.getForm().loadRecord(form.getForm().getRecord());
            this.enableButtons(form);
            this.enableComponents(form);
        break;

        case 'btnActualizar':
              
            

        break;
        case 'btnActualizarTree':
                this.actualizarTree(btn);
        break;    

        case 'btnAsociar':
            var idaccountplan=win.down('textfield[name=idaccountplan]').getValue();
            var accountcode=win.down('textfield[name=accountcode]').getValue();
            var accountname=win.down('textfield[name=accountname]').getValue();
            var associated=win.down('checkbox[name=associated]').getValue();
            
            var winCA=Ext.create('Erp.view.plancuentas.WindowCuentasAsociadas');
            var panelCA=Ext.create('Erp.view.plancuentas.PanelCuentasAsociadas',{
							idaccountplan	: idaccountplan,
							accountcode		: accountcode,
							accountname		: accountname});
		//panelCA.setPanelAccountValues(1,100000000,'Activos');
             var gridStore = Ext.create('Erp.store.plancuentas.StoreCuentasAsociadas',{});
            gridStore.getProxy().url="data/classes/sis_erp_account_associated.php";
            gridStore.getProxy().extraParams.xaction='read';
            //gridStore.getProxy().extraParams.yaction='read';
            gridStore.getProxy().extraParams.idaccountplan=idaccountplan;
            gridStore.getProxy().extraParams.filter='';
            gridStore.getProxy().extraParams.tablename='';
     
		
            var gridCA=Ext.create('Erp.view.plancuentas.GridCuentasAsociadas',{
                store:gridStore

            });
            gridCA.addDocked({

                        xtype       : 'pagingtoolbar',
                        store       : gridStore,
                        dock        : 'bottom',
                        displayInfo : true
                    });
        
           if(associated){
               winCA.add(panelCA,gridCA);
               winCA.show();
           }else{
               Ext.create('widget.uxNotification', {
                        title: 'Alerta:',
                        position: 'tr',
                        manager: 'instructions',
                        cls: 'ux-notification-light',
                        iconCls: 'ux-notification-icon-error',
                        html: 'No se puede asociar a la cuenta elegida!!',
                        autoHideDelay: 4000,
                        slideBackDuration: 500,
                        slideInAnimation: 'bounceOut',
                        slideBackAnimation: 'easeIn'
                }).show();
           }
             

        break;

        default :
            if(form.stateMode=='R'){
                var itemsTbar=button.up('window').getDockedComponent(1).items;
                var buttonTbar;
                
                Ext.each(itemsTbar, function(name,index,allItems){ 

                    buttonTbar=button.up('window').getDockedComponent(1).getComponent(index); 

                    if(buttonTbar.xtype=='button'){
                        if(buttonTbar.option==btnOption){
                           
                                if(buttonTbar.pressed){ 
                                        buttonTbar.setIconCls('iconCuenta2');
                                        thiss.cargarStoreTreeCuentas(buttonTbar);
                                } 

                        }else{
                                    buttonTbar.pressedCls='';
                                    buttonTbar.pressed=false;
                                    buttonTbar.setIconCls('iconCuenta1');
                        }

                    }

                    });

                 }else {
                         button.pressed=false;
                         button.pressedCls='';
                        if(button.option!=btnOption){
                            button.setIconCls('iconCuenta1');
                        }
                       
                        Ext.create('widget.uxNotification', {
                        title: 'Alerta:',
                        position: 'tr',
                        manager: 'instructions',
                        cls: 'ux-notification-light',
                        iconCls: 'ux-notification-icon-error',
                        html: 'Existen acciones pendientes en el formulario de edicion!!!',
                        autoHideDelay: 4000,
                        slideBackDuration: 500,
                        slideInAnimation: 'bounceOut',
                        slideBackAnimation: 'easeIn'
                        }).show();
                                  
                 }
            break;
            
            
        }
    },
    cargarStoreTreeCuentas    : function (button){
        
        var idpadre = button.idaccountplan; 
        var window1= button.up('window');                
        var tree = window1.down('treecuentas');
        tree.body.highlight('#8AE9FA');
        tree.setTitle(button.text);
        var store = tree.getStore();
        var proxy=store.getProxy();
        proxy.url="data/classes/sis_erp_account_plan.php";
        proxy.extraParams.id=idpadre
        store.load()
		
        
    },
    gridSelectionChange: function(view, records) {
        
        var win1 = view.up('window');
        var form = win1.down('formplancuentas');
        if (form.stateMode=="R") {
            form.getForm().loadRecord(records);
        }
    
    },
    cargarBotonesPrimerNivel : function (window){
      
        var store=Ext.create('Erp.store.StorePlanCuentas');
        var optionaccountname;
        var btn;
        store.getProxy().url='data/classes/sis_erp_account_plan.php';
        store.getProxy().extraParams.xaction='readFirstLevelAccount';

        store.addListener('load',function(store){
            var pressedValue,iconClsValue;
            store.each(function(item){
                optionaccountname='btn'+item.data.accountname;
                if(item.data.accountname=='Activos'){
                    pressedValue=true;
                    iconClsValue='iconCuenta2';
                }else{
                    pressedValue=false;
                    iconClsValue='iconCuenta1';
                }
                btn= Ext.create('Ext.button.Button',{
                    iconCls         : iconClsValue,
                    text            : item.data.accountname,
                    tooltip         : item.data.accountname,
                    textAlign       : 'left',
                    scale           : 'large',
                    pressed         : pressedValue,
                    idaccountplan   : item.data.idaccountplan,
                    enableToggle    : true,
                    option          : optionaccountname
            
               });
                
               window.getDockedComponent(1).add(btn);
               window.getDockedComponent(1).add('-');   
                
            });
            
        })
        store.load();
    
    }
   
});

