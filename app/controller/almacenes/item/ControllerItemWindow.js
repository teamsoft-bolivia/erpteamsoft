
/*
 * @Autor: Pablo Garcia guaman
 * @Email: garcia_guaman_pablo@hotmail.com
 */


Ext.define('Erp.controller.almacenes.item.ControllerItemWindow',{
    extend      :       'Ext.app.Controller',
    stores      :       ['StoreType'],
    models      :       ['ModelType','Erp.model.almacenes.item.composition.ModelItemComposition'],
    views       :       [
                'almacenes.item.datosbasicos.WindowItem'
    ],
    init:function(){
        this.control({
            'windowitem':{
                beforerender:this.initAll
            },
            'windowitem buttongroup button':{
                click:this.actionButton
            },
            'gridesptecnicas':{
                beforeedit:this.beditesp,
                validateedit:this.veditesp,
                canceledit:this.cancelEditEsp,
                cellclick:this.deleteEspTec
            },
            'gridcomposicion':{
                beforeedit:this.beditCom,
                validateedit:this.veditCom,
                canceledit:this.cancelEditCom,
                cellclick:this.deleteCom
            },
            'gridesptecnicas button[option=addEspTec]':{
                click:this.newEspTec
            },
            'gridcomposicion button[option=addComp]':{
                click:this.newCom
            }
        });
    },
    loadGrids:function(window,data){
        var gridesptec=window.down('gridesptecnicas');
        var gridcompos=window.down('gridcomposicion');
        
        var gridprov=window.down('gridprovedoresdatosgenerales');
        var gridunit=window.down('gridunidades');
        var gridcomp=window.down('gridcomposicion');
        var gridesp=window.down('gridesptecnicas');
        
            gridprov.getStore().getProxy().extraParams.iditem=data.iditem;
            gridunit.getStore().getProxy().extraParams.iditem=data.iditem;
            gridcomp.getStore().getProxy().extraParams.iditem=data.iditem;
            gridesp.getStore().getProxy().extraParams.iditem=data.iditem;
            gridprov.getStore().load();
            gridunit.getStore().load();
            gridcomp.getStore().load();
            gridesp.getStore().load();

            gridesptec.getStore().getProxy().extraParams.iditem=data.iditem;//{xaction:'read',yaction:'readdatasheet',iditem:record.data.iditem};
            gridcompos.getStore().getProxy().extraParams.iditem=data.iditem;//{xaction:'readcomposition',yaction:'',iditem:record.data.iditem};
            gridesptec.getStore().load();
            gridcompos.getStore().load();
    },
     initAll:function(window){
        //window.stateMode='R'
        var form=window.down('formitembasic');
        var record=form.getForm().getRecord();
        var gridcompos=window.down('gridcomposicion');
 
        //grid composition
        var cboeditorcode;
        var cbochildunit;
        if (window.stateMode=="N") {
           this.loadGrids(window,{iditem:-1}); 
        }else{
            this.loadGrids(window,{iditem:record.data.iditem});
        }
        
        
        Ext.each(gridcompos.columns,function(item,index,allitems){
           if (item.dataIndex=='iditemchild') {
               cboeditorcode=item.getEditor();
            }else if (item.dataIndex=='idunitcomposition') {
                cbochildunit=item.getEditor();
            }
        });
        cboeditorcode.on('keyup',function(cbo,e,eOpts){
           if ((e.getKey() === e.ENTER) || (e.getKey()==8) ||(e.getKey()>47 && e.getKey()<58) || (e.getKey()>63 && e.getKey()<91) || (e.getKey()>=96 && e.getKey()<123) || (e.getKey()==32))
            {
                if(cbo.getSubmitValue()!=null && cbo.getSubmitValue().length>=3)
                {
                     cbo.getStore().getProxy().extraParams.query=cbo.getSubmitValue();
                        //if(e.getKey() === e.ENTER)
                        //{           
                              cbo.getStore().load();

                        //}
                }

            }
        });
        cboeditorcode.on('select',function(cbo,r){
            cbochildunit.getStore().getProxy().extraParams.iditem=r[0].data.iditem;
            cbochildunit.getStore().getProxy().extraParams.xaction='readcbo';
            cbochildunit.setValue();
            cbochildunit.getStore().load();
        });
     
        this.enableControls(window);
        
    },
    cancelEditCom:function(editor,e,eOpts){
        e.grid.getStore().load();
    },
    beditCom:function(editor,e,eOpts){
      var window=e.grid.up('windowitem');
      if (window.stateMode=='E') {
            window.stateEdit='E';
        }else{
            e.grid.getStore().load();
        }
    },
     veditCom:function(editor,e,eOpts){
        var window=e.grid.up('windowitem');
        var iditem=window.down('numberfield[name=iditem]');
        var changes=e.newValues;
        changes.xaction='save';
        if (window.stateEdit=='E') {
            changes.yaction='update';
        }else if (window.stateEdit=='N')
        {   
            changes.iditem=iditem.getValue();
            changes.yaction='insert';
        }
        
        Ext.Ajax.request({
            url  : 'data/classes/sis_erp_item_composition.php',
            params : changes,
            method : 'POST',
            success: function(response) {
                var result=Ext.decode(response.responseText);
                window.stateEdit='R';
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
                e.grid.getStore().getProxy().extraParams.iditem=iditem.getValue();
                e.grid.getStore().load();
            },
            failure: function(response) {
                var result=Ext.decode(response.responseText);
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
    
    deleteCom:function(view,html,cellindex,record){
        var iditemcomposition=record.data.iditemcomposition;
        var window=view.up('windowitem');
        var grid=view.up('gridcomposicion');
        if (cellindex==7 && window.stateMode=='E') {
            Ext.Msg.show({
                title : 'Confirmacion',
                msg : 'Esta seguro de eliminar el Registro?',
                buttons : Ext.Msg.YESNO,
                icon : Ext.MessageBox.WARNING,
                scope : this,
                fn : function(btn, ev){
                    if (btn == 'yes') {
                        Ext.Ajax.request({
                            url  : 'data/classes/sis_erp_item_composition.php',
                            params : {xaction: 'delete',yaction:'',iditemcomposition:iditemcomposition},
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
                                grid.getStore().load();

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
                            }
                        });
                    }
                }
            });
        }
    },
    newCom:function(button){
      var window=button.up('windowitem');
      if (window.stateMode=='E') {
            var grid=button.up('gridcomposicion');
            var newrecord=Ext.create('Erp.model.almacenes.item.composition.ModelItemComposition',{});
            grid.getStore().insert(0,newrecord);
            grid.getPlugin().startEdit(0,0);
            window.stateEdit='N';
        }
        
    },
    
    deleteEspTec:function(view,html,cellindex,record){
        var iditemdatasheet=record.data.iditemdatasheet;
        var window=view.up('windowitem');
        var grid=view.up('gridesptecnicas');
        if (cellindex==6 && window.stateMode=='E') {
            Ext.Msg.show({
                title : 'Confirmacion',
                msg : 'Esta seguro de eliminar el Registro?',
                buttons : Ext.Msg.YESNO,
                icon : Ext.MessageBox.WARNING,
                scope : this,
                fn : function(btn, ev){
                    if (btn == 'yes') {
                        Ext.Ajax.request({
                            url  : 'data/classes/sis_erp_item_datasheet.php',
                            params : {xaction: 'delete',yaction:'',iditemdatasheet:iditemdatasheet},
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
                                grid.getStore().load();

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
                            }
                        });
                    }
                }
            });
        }
    },
    
    newEspTec:function(button){
      var window=button.up('windowitem');
      if (window.stateMode=='E') {
            var grid=button.up('gridesptecnicas');
            var newrecord=Ext.create('Erp.model.almacenes.item.ModelItemDatosTecnicos',{});
            grid.getStore().insert(0,newrecord);
            grid.getPlugin().startEdit(0,0);
            window.stateEdit='N';
        }
        
    },
    cancelEditEsp:function(editor,e,eOpts){
        e.grid.getStore().load();
    },
    beditesp:function(editor,e,eOpts){
      var window=e.grid.up('windowitem');
      if (window.stateMode=='E') {
            window.stateEdit='E';
        }else{
            e.grid.getStore().load();
        }
    },
    veditesp:function(editor,e,eOpts){
        var window=e.grid.up('windowitem');
        var iditem=window.down('numberfield[name=iditem]');
        var changes=e.newValues;
        changes.xaction='save';
        if (window.stateEdit=='E') {
            changes.yaction='update';
        }else if (window.stateEdit=='N')
        {   
            changes.iditem=iditem.getValue();
            e.grid.getStore().getProxy().extraParams.iditem=iditem.getValue();
            //console.log(changes);
           
            changes.yaction='insert';
        }
        
        Ext.Ajax.request({
            url  : 'data/classes/sis_erp_item_datasheet.php',
            params : changes,
            method : 'POST',
            success: function(response) {
                var result=Ext.decode(response.responseText);
                window.stateEdit='R';
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
                e.grid.getStore().load();
            },
            failure: function(response) {
                var result=Ext.decode(response.responseText);
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
    enableForm:function(form,stateMode){
        var items=form.getForm().getFields().items;
        
        if (stateMode=='R') {
           Ext.each(items,function(item,index,allitems){
               item.setReadOnly(1);
           });
        }else if (stateMode=='E') {
                Ext.each(items,function(item,index,allitems){
                    if (item.name!='iditem' && item.name!='identerprise' && item.name!='image') {
                        item.setReadOnly(0);
                    }
                   
                });
        }else if (stateMode=='N') {
               form.getForm().reset();
               Ext.each(items,function(item,index,allitems){
                   
                    if (item.name!='iditem' && item.name!='identerprise' && item.name!='image') {
                        item.setReadOnly(0);
                    }
                    
                });
        }
    },
    enableControls:function(window){
        var form=window.down('formitembasic');
        var formdatosg=window.down('formitemdatosgenerales');
        var formdatosad=window.down('formitemdatosadicionales');
        this.enableForm(form,window.stateMode);
        this.enableForm(formdatosg,window.stateMode);
        this.enableForm(formdatosad,window.stateMode);
        this.enableButtons(window);
        this.enableGridProvUnit(window);
    },
    actionButton:function(button){
        var win=button.up('windowitem');
        var tab=win.down('tabpaneldata');
        var formbasic=win.down('formitembasic');
        var record=formbasic.getForm().getRecord();
        var formdatosg=win.down('formitemdatosgenerales');
        var formdatosad=win.down('formitemdatosadicionales');
        tab.setActiveTab(2);
        tab.setActiveTab(0);
        switch (button.option) {
            case 'btnNuevo':
                win.stateMode='N';
                this.loadGrids(win,{iditem:-1});
                this.enableControls(win);
            break;
            case 'btnEditar':
                win.stateMode='E'
                this.enableControls(win);
            break;
            case 'btnGuardar':
                this.saveData(win);
            break;
            case 'btnCancelar':
                win.stateMode='R';
                this.enableControls(win);
                this.loadGrids(win,{iditem:record.data.iditem});
                //this.updateValues(formbasic.getForm());
                formbasic.getForm().loadRecord(formbasic.getForm().getRecord());
                formdatosg.getForm().loadRecord(formdatosg.getForm().getRecord());
                formdatosad.getForm().loadRecord(formdatosad.getForm().getRecord());
                
            break;
            default:
                break;
        }

        
    },
    updateValues:function(basicForm){
        basicForm.updateRecord();
    },
    saveForms:function(window,action){

        var formdg=window.down('formitemdatosgenerales');
        var formda=window.down('formitemdatosadicionales');
        var tabpanel=window.down('tabpaneldata');
        
        formdg.down('textfield[name=iditem]').setValue(action.result.iditem);
        formda.down('textfield[name=iditem]').setValue(action.result.iditem);
        tabpanel.setActiveTab(2);
        formda.getForm().submit({
                clientValidation: true,
                url: 'data/classes/sis_erp_item.php',
                params: {xaction:'save',yaction: 'updateadicionales',iditem:action.result.iditem},
                success: function(frm, action) {
                    
                },
                failure: function(frm, action) {
                    
                }
            });
       var yaction;
        if (window.stateMode=='N') {
            yaction='insert';
        }else if (window.stateMode=='E') {
            yaction='update';
        }
       formdg.getForm().submit({
                clientValidation: true,
                url: 'data/classes/sis_erp_item_category.php',
                params: {xaction:'save',yaction: yaction,iditem:action.result.iditem},
                success: function(frm, action) {
                    
                },
                failure: function(frm, action) {
                    
                }
            });
           tabpanel.setActiveTab(0); 
    },
    saveData:function(win){
        var me=this;
        var form=win.down('formitembasic');
        var formdatosg=win.down('formitemdatosgenerales');
        
        var iditem=form.down('numberfield[name=iditem]');
        var identerprise=form.down('numberfield[name=identerprise]');
        var image=form.down('textfield[name=image]');
        if (form.getForm().isValid() && formdatosg.getForm().isValid()) {
            var yaction;
            if (win.stateMode=='N') {
                yaction='insert';
            }else if (win.stateMode=='E') {
                yaction='update';
            }
            form.getForm().submit({
                clientValidation: true,
                url: 'data/classes/sis_erp_item.php',
                params: {xaction:'save',yaction: yaction},
                success: function(frm, action) {
                    
                    if (win.stateMode=='N') {
                        iditem.setValue(action.result.iditem);
                        identerprise.setValue(action.result.identerprise);
                    }
                    image.setValue(action.result.image);
                    me.updateValues(form.getForm());
                    
                    
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
                    var rdm=Math.random()*100;
                    rdm=Math.round(rdm);
                   var imagepanel=win.down('panel[option=image]');
                   imagepanel.update('<a><img src="data/dataimages/items/'+action.result.image+'?'+rdm+'" height="100%" width="100%"></a>');
                   
                   me.saveForms(win,action);
                   
                   win.stateMode='R';
                    me.enableControls(win);
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
    enableGridProvUnit  : function (window){
       var gridprov=window.down('gridprovedoresdatosgenerales');
       var gridunit=window.down('gridunidades');
       if(window.stateMode=='R'){
           gridprov.down('combo[name=provedores]').setDisabled(false);
           gridunit.down('button[option=btnAgregar]').setDisabled(true);
       }else if(window.stateMode=='E'){
            gridprov.down('combo[name=provedores]').setDisabled(true);
            gridunit.down('button[option=btnAgregar]').setDisabled(false);
       }else if(window.stateMode=='N'){
           gridprov.down('combo[name=provedores]').setDisabled(true);
           gridunit.down('button[option=btnAgregar]').setDisabled(true);
       }
        
    }
});