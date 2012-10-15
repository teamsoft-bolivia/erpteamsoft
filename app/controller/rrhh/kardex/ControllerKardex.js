/*
 * @Autor: Max marcelo jimenez T,Crithian Valencia, Pablo Garcia Guaman
 * @Email: maxmjt@gmail.com, fox_tian@hotmail.com ,garcia_guaman_pablo@hotmail.com
 */


Ext.define('Erp.controller.rrhh.kardex.ControllerKardex', {
    extend: 'Ext.app.Controller',
    stores: ['rrhh.kardex.StoreDetalleDocumentos'],
    models: ['rrhh.kardex.ModelDetalleDocumentos'],
    views: [
        'rrhh.kardex.WindowKardex',
        'rrhh.kardex.FormBasicKardex',
        'rrhh.kardex.PanelDocumentos',
        'rrhh.kardex.PanelTrayectoria'
    ],
 
    init: function() {
        var thiss=this;
        thiss.control({
            'windowkardex':{
                beforerender:this.initAll
            },
            'windowkardex buttongroup button':{
                click:this.actionButton
            },
            'formbasickardex combo' :{
                beforerender : function(cbo,eOpts){
                   // console.log(cbo);
                    
                }
                
            },
            'formbasickardex combo[name=idemployee]':{
                select : function (cbo,records,eOpts){
                   var formbasickardex=cbo.up('formbasickardex');
                   var window=formbasickardex.up('windowkardex');
                   var griddocumentos=window.down('paneldocumentos').down('gridpanel');
                   console.log(griddocumentos.getStore());
                   var txtcode=formbasickardex.down('textfield[name=code]');
                   var panelphoto=formbasickardex.down('panel[option=photo]');
                   txtcode.setValue(records[0].data.code);
                   var rdm=Math.random()*100;
                   rdm=Math.round(rdm);
                   panelphoto.update('<a><img src="data/dataimages/personal/'+records[0].data.photo+'?'+rdm+'" height="100%" width="100%"></a>');
                   
                   griddocumentos.getStore().getProxy().extraParams.idemployee=records[0].data.idemployee;
                   griddocumentos.getStore().load();
                   
                   
                   
                
                }
            }
            
        });
    },
    initAll:function(window){
        
        var formbasic=Ext.create('Erp.view.rrhh.kardex.FormBasicKardex',{});
        
        var paneldocumentos= Ext.create('Erp.view.rrhh.kardex.PanelDocumentos');
        var paneltrayectoria=Ext.create('Erp.view.rrhh.kardex.PanelTrayectoria');
        var tabpanel = Ext.create('Ext.tab.Panel',{
            items : [
                paneldocumentos,
                paneltrayectoria
            ]
        });
        window.add(formbasic,tabpanel);
     
        
    },
    loadAll:function(window){

        var cbotipodoc=window.down('combobox[name="dnitype"]');
        cbotipodoc.getStore().getProxy().extraParams={xaction:'readbytype',type:'tipo_documento_rrhh'};
        cbotipodoc.getStore().load();
        var cbosexo=window.down('combobox[name="gender"]');
        cbosexo.getStore().getProxy().extraParams={xaction:'readbytype',type:'tipo_sexo'};
        cbosexo.getStore().load();
        var cbomarital=window.down('combobox[name="maritalstatus"]');
        cbomarital.getStore().getProxy().extraParams={xaction:'readbytype',type:'tipo_estado_civil'};
        cbomarital.getStore().load();
        var cbostate=window.down('combobox[name="state"]');
        cbostate.getStore().getProxy().extraParams={xaction:'readbytype',type:'tipo_estado_empleado'};
        cbostate.getStore().load();
        var cbocountry=window.down('combobox[name="country"]');
        var cbocity=window.down('combobox[name="city"]');
        cbocountry.getStore().getProxy().extraParams={xaction:'readbytype',type:'pais'};
        
        cbocountry.getStore().load();
        cbocountry.on('select',function(cbo,record,eOpts){
            cbocity.setValue();
            cbocity.getStore().getProxy().extraParams={xaction:'readbytypefather',type:'ciudad',father:record[0].data.idtype};

            cbocity.getStore().load();
        });
        
        //formulario datos contrato
        var cbotipocontrato=window.down('combobox[name=typecontract]');
        cbotipocontrato.getStore().getProxy().extraParams={xaction:'readbytype',type:'tipo_contrato'};
        cbotipocontrato.getStore().load();
        var cboformapago=window.down('combobox[name=paymentway]');
        cboformapago.getStore().getProxy().extraParams={xaction:'readbytype',type:'rh_forma_pago'}
        cboformapago.getStore().load();
        var cbopuesto=window.down('combobox[name=contractposition]');
        

        var chkss=window.down('checkbox[name=isSocial]');
        var chkafp=window.down('checkbox[name=isAfp]');
        var ss=window.down('textfield[name=socialnumber]');
        var afp=window.down('textfield[name=afpnumber]');
        chkss.on('change',function(chk,newVal,oldVal,eOpts){
            if (newVal) {
                ss.setVisible(1);
            }else{
                ss.setVisible(0);
            }
        });
        chkafp.on('change',function(chk,newVal,oldVal,eOpts){
            if (newVal) {
                afp.setVisible(1);
            }else{
                afp.setVisible(0);
            }
        });



        
        var formbasic=window.down('formbasic');
        var formdg=window.down('form[alias=formdatosgen]');
        var formcont=window.down('form[alias=formcontrato]');
        formbasic.getForm().loadRecord(window.record);
        formdg.getForm().loadRecord(window.record);
        formcont.getForm().loadRecord(window.record);
        if (window.stateMode=='R') {
            this.showPhoto(window,window.record.data.photo);
            cbocity.getStore().getProxy().extraParams={xaction:'readbytypefather',type:'ciudad',father:window.record.data.country};
            cbopuesto.getStore().getProxy().extraParams={xaction:'readpositions',id:window.record.data.contractposition};
            cbopuesto.getStore().load({callback:function(){cbopuesto.forceSelection=true;}});
            cbocity.getStore().load();

            if (window.record.data.socialnumber!='') {
                chkss.setValue(true);
            }
            if (window.record.data.afpnumber!='') {
                chkafp.setValue(true);
            }
            
        }else if(window.stateMode=='N'){
            
        }
        
    },
    showPhoto:function(window,photo){
        var panelphoto=window.down('panel[option=photo]');
        var rdm=Math.random()*100;
        rdm=Math.round(rdm);
        panelphoto.update('<a><img src="data/dataimages/personal/'+photo+'?'+rdm+'" height="100%" width="100%"></a>');
    },
    enableButtons:function(window){
        var buttons=window.down('buttongroup').items.items;
        if (window.stateMode=='R') {
            Ext.each(buttons,function(item){
                if (item.option=='btnNuevo' || item.option=='btnEditar') {
                    item.setDisabled(0);
                }else if (item.option=='btnGuardar' || item.option=='btnCancelar') {
                    item.setDisabled(1);
                }
            });
        }else if (window.stateMode=='E') {
            Ext.each(buttons,function(item){
                if (item.option=='btnGuardar' || item.option=='btnCancelar') {
                    item.setDisabled(0);
                }else if (item.option=='btnNuevo' || item.option=='btnEditar') {
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
        }
    },
    enableControls:function(window){
        var stateMode=window.stateMode;
        
        var formbasic=window.down('formbasic');
        var formdatgen=window.down('form[alias=formdatosgen]');
        var formcont=window.down('form[alias=formcontrato]');
        this.enableForm(formbasic,stateMode);
        this.enableForm(formdatgen,stateMode);
        this.enableForm(formcont,stateMode);
        this.enableButtons(window);
    },
    enableForm:function(form,stateMode){
        var window=form.up('windowpersonal');
        var panel=window.down('tabpaneldatospersonal');
        var items=form.getForm().getFields().items;
        if (stateMode=='R') {
           Ext.each(items,function(item,index,allitems){
               item.setReadOnly(1);
           });
        }else if (stateMode=='E') {
                Ext.each(items,function(item,index,allitems){
                        item.setReadOnly(0);
                   
                });
        }else if (stateMode=='N') {
               panel.setActiveTab(0);
               form.getForm().reset();
               Ext.each(items,function(item,index,allitems){
                   if (item.name!='idperson' && item.name!='idemployee' && item.name!='photo' && item.name!='code') {
                      item.setReadOnly(0);
                    }
                       
                });
        }
    },
    actionButton:function(button){
        var window=button.up('windowpersonal');
        var formbasic=window.down('formbasic');
        var formdatgen=window.down('form[alias=formdatosgen]');
        var formcont=window.down('form[alias=formcontrato]');
        switch (button.option) {
            case 'btnNuevo':
                window.stateMode='N';
                this.enableControls(window);
            break;
            case 'btnEditar':
                window.stateMode='E'
                this.enableControls(window);
            break;
            case 'btnGuardar':
                this.saveData(window);
            break;
            case 'btnCancelar':
                window.stateMode='R';
                this.enableControls(window);
                //this.loadGrids(window,{iditem:record.data.iditem});
                //this.updateValues(formbasic.getForm());
                formbasic.getForm().loadRecord(formbasic.getForm().getRecord());
                formdatgen.getForm().loadRecord(formdatgen.getForm().getRecord());
                formcont.getForm().loadRecord(formcont.getForm().getRecord());
                
            break;
            default:
                break;
        }

        
    },
    saveData:function(window){
        var me=this;
        
        
        var form=window.down('formbasic');
        var formgrls=window.down('form[alias=formdatosgen]');
        var idperson=form.down('numberfield[name="idperson"]');
        var idemployee=form.down('numberfield[name="idemployee"]');
        var code=form.down('textfield[name=code]');
        var photo=form.down('textfield[name="photo"]');
        
        if (form.getForm().isValid() && formgrls.getForm().isValid()) {
            var yaction;
            if (window.stateMode=='N') {
                yaction='insertemployee';
                
            }else if (window.stateMode=='E') {
                yaction='updateemployee';
            }
            form.getForm().submit({
                clientValidation: true,
                url: 'data/classes/sis_erp_person.php',
                params: {xaction:'save',yaction: yaction},
                success: function(frm, action) {
                    if (window.stateMode=='N') {
                        idperson.setValue(action.result.idperson);
                        idemployee.setValue(action.result.idemployee);
                        code.setValue(action.result.code);
                    }
                    me.updateValues(form.getForm());
                    me.updateValues(formgrls.getForm());
                    
                    photo.setValue(action.result.photo);
                    me.showPhoto(window,action.result.photo);
                    
                    
                   Erp.helper.Tools.showMsg(action.result,true,4000);
                   me.saveForms(window,action);                   
                   window.stateMode='R';
                    me.enableControls(window);
                    me.updateValues(form.getForm());
                    
                },
                failure: function(frm, action) {
                    Erp.helper.Tools.showMsg(action.result,false,5000);
                }
            });
        }else{
            Erp.helper.Tools.showMsg({title:'Alerta:',msg:'Porfavor verifique los datos!!!!'},false,4000);
        }
    },
    updateValues:function(basicForm){
        basicForm.updateRecord();
    },
    saveForms:function(window,action){

        var formdg=window.down('form[alias=formdatosgen]');
        var formcont=window.down('form[alias=formcontrato]');
        var windowlista=Ext.getCmp('listapersonal');
        var gridlista=windowlista.down('grid');
        formdg.getForm().submit({
                clientValidation: true,
                url: 'data/classes/sis_erp_person.php',
                params: {xaction:'save',yaction: 'updateemployee',idperson:action.result.idperson,idemployee:action.result.idemployee},
                success: function(frm, action) {
                    gridlista.getStore().load();
                },
                failure: function(frm, action) {
                    
                }
            });
       var yaction;
        if (window.stateMode=='N') {
            yaction='insertemployeecontract';
        }else if (window.stateMode=='E') {
            yaction='updateemployeecontract';
        }
       formcont.getForm().submit({
                clientValidation: true,
                url: 'data/classes/sis_erp_employee.php',
                params: {xaction:'save',yaction: yaction,idemployee:action.result.idemployee},
                success: function(frm, action) {
                    
                },
                failure: function(frm, action) {
                    
                }
            });
    }
    
});