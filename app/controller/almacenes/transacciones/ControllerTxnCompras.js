/*
 * @Autor: Pablo Garcia Guaman
 * @Email:garciaguamanpablo@gmail.com
 */


Ext.define('Erp.controller.almacenes.transacciones.ControllerTxnCompras', {
    extend: 'Ext.app.Controller',
    stores: ['almacenes.transacciones.StoreTxnStore',
             'almacenes.transacciones.StoreDTxnStore',
             'crm.StoreCrmEmployee',
             'StoreType'],
    views: ['almacenes.transacciones.compras.WindowTxnCompras',
            'almacenes.transacciones.compras.GridTxnCompras',
            'almacenes.transacciones.compras.GridDocCompras',
            'almacenes.transacciones.compras.FormTxnCompras',
            'almacenes.transacciones.compras.WindowCondicionPago',
            'almacenes.transacciones.compras.WindowDocImage',
            'almacenes.listaprecios.WindowListaPrecios'
        ],
        
    refs: [
        {
            ref     :   'windowTxnCompras',
            selector:   'windowtxncompras'
        },
        {
            ref     :   'formTxnCompras',
            selector:   'formtxncompras'
        },
        {
            ref     :   'gridTxnCompras',
            selector:   'gridtxncompras'
        },
        {
            ref     :   'gridDocCompras',
            selector:   'griddoccompras'
        }
        
    ],
    init: function(e) {
        
        this.control({
              'windowtxncompras':{
                    afterrender:this.initAll,
                    beforeclose:function(panel,eOpts){
                        var action=false
                        var form=panel.down('formtxncompras');
                        if (this.getWindowTxnCompras().stateMode=="E") {
                            
                            if (form.getForm().isDirty()) {
                                this.showMsg({title:'Alerta:',msg:'Debe guardar o cancelar los cambios antes de cerrar al ventana!!'},false,4000);
                                action= false;
                            }else{
                                action= true;
                            }
                            
                        }else{
                            action=true;
                        }
                        return action;
                        
                    }
              },
              'windowtxncompras buttongroup button':{
                    click:this.actionButton
              },
              'windowtxncompras button[option=documents]':{
                    click:function(button){
                        var window=button.up('windowtxncompras');
                        var formtxn=window.down('formtxncompras');
                        var gridtxn=window.down('griddoccompras');
                        var cardwiz=window.down('panel[alias=contentform]');
                        this.txnAnimate(cardwiz,formtxn,gridtxn,500,0,true);
                    }
              },
              'windowtxncompras button[option=back]':{
                    click:function(button){
                        var window=button.up('windowtxncompras');
                        var formtxn=window.down('formtxncompras');
                        var gridtxn=window.down('griddoccompras');
                        var cardwiz=window.down('panel[alias=contentform]');
                        this.txnAnimate(cardwiz,gridtxn,formtxn,500,0,false);
                    }
              },
              'gridtxncompras':{
                    itemdblclick:function(view,record,htmlItem,index,e,eOpts){
                            this.getGridTxnCompras().stateEdit="E";
                    },
                    beforeedit:function(editor,e,eOpts){
                        var estado;
                        if(this.getWindowTxnCompras().stateMode=='R'){
                                estado=false;
                        }else{
                                if(e.record.data.iditem!=''){
                                    Ext.each(e.grid.columns,function (item,index,allitems){
                                                if(item.dataIndex=='iditem' || item.dataIndex=='idunit'){
                                                    item.getEditor().getStore().getProxy().extraParams.iditem=e.record.data.iditem;
                                                    item.getEditor().getStore().load();
                                                }
                                    });
                                }
                                estado=true;
                        }

                        return estado;
                    },
                    validateedit:function(editor,e,eOpts){
                        var me=this;
                        var window=e.grid.up('windowtxncompras');
                        if (window.stateMode=="E") {
                            var idtxnstore=window.down('numberfield[name=idtxnstore]');
                            var changes=e.newValues;
                            changes.xaction='save';
                            changes.iddocument=e.grid.iddocument;
                            if (e.grid.stateEdit=='E') {
                                changes.yaction='update';
                            }else if (e.grid.stateEdit=='N')
                            {   
                                changes.idtxnstore=idtxnstore.getValue();
                                changes.yaction='insert';
                            }


                            Ext.Ajax.request({
                                url  : 'data/classes/sis_erpdd_txn_store.php',
                                params : changes,
                                method : 'POST',
                                success: function(response) {
                                    var result=Ext.decode(response.responseText);
                                    window.stateEdit='R';
                                    me.showMsg(result,true,4000);
                                    e.grid.getStore().load();
                                    
                                },
                                failure: function(response) {
                                    var result=Ext.decode(response.responseText);
                                    me.showMsg(result,false,4000);
                                }

                            });
                        }
                        
                    },
                    canceledit:function(editor,e,eOpts){
                        if (this.getGridTxnCompras().stateEdit=="N") {
                            e.grid.getStore().removeAt(e.rowIdx);
                        }
                    }
              },
              'gridtxncompras actioncolumn':{
                  click:this.actColumnDetail
              },
              'griddoccompras actioncolumn':{
                  click:this.actColumDocuments
              },
              'griddoccompras':{
                    itemdblclick:function(view,recdoc,htmlItem,index,e,eOpts){
                            
                            var griddoc=view.up('griddoccompras');;
                            griddoc.stateEdit="E";
                            
                    },
                    itemclick:function(view,recdoc,htmlItem,index,e,eOpts){
                        var griddoc=view.up('griddoccompras');
                        var gridtxn=griddoc.nextNode('gridtxncompras');
                        var gridtxt=gridtxn.down('label');

                        gridtxn.iddocument=recdoc.data.iddocument;
                        gridtxt.setText('Proveedor: '+recdoc.data.providername+' - '+recdoc.data.typedocname+': '+recdoc.data.document);
                        
                       
                    },
                    
                    beforeedit:function(editor,e,eOpts){
                        var estado;
                        if(this.getWindowTxnCompras().stateMode=='R'){
                                estado=false;
                        }else{
                                if(e.record.data.iditem!=''){
                                    Ext.each(e.grid.columns,function (item,index,allitems){
                                                if(item.dataIndex=='idprovider' || item.dataIndex=='idprovidercontact'){
                                                    item.getEditor().getStore().getProxy().extraParams.idprovider=e.record.data.idprovider;
                                                    item.getEditor().getStore().load();
                                                }
                                    });
                                }
                                estado=true;
                        }

                        return estado;
                    },
                    
                    validateedit:function(editor,e,eOpts){
                            var me=this;
                            var window=e.grid.up('windowtxncompras');
                            if (window.stateMode=="E") {
                                
                                var idtxnstore=window.down('numberfield[name=idtxnstore]');
                                var changes=e.newValues;
                                changes.xaction='save';
                                if (e.grid.stateEdit=='E') {
                                    changes.yaction='update';
                                }else if (e.grid.stateEdit=='N')
                                {   
                                    changes.idtxnstore=idtxnstore.getValue();
                                    changes.yaction='insert';
                                }

                                Ext.Ajax.request({
                                    url  : 'data/classes/sis_erpd_txn_document.php',
                                    params : changes,
                                    method : 'POST',
                                    success: function(response) {
                                        var result=Ext.decode(response.responseText);
                                        window.stateEdit='R';
                                        me.showMsg(result,true,4000);
                                        e.grid.getStore().load();
                                    },
                                    failure: function(response) {
                                        var result=Ext.decode(response.responseText);
                                        me.showMsg(result,false,4000);
                                    }

                                });
                            }
                    },
                    canceledit:function(editor,e,eOpts){
                        if (this.getGridDocCompras().stateEdit=="N") {
                            e.grid.getStore().removeAt(e.rowIdx);
                        }
                    }
              },
              'griddoccompras button[option=adddoc]':{
                    click:function(button){
                        var griddoc=button.up('griddoccompras');
                        var count=griddoc.getStore().getCount();
                        if (this.getWindowTxnCompras().stateMode=="N") {
                            var newrecord=Ext.create('Erp.model.almacenes.transacciones.compras.ModelTxnDocument',{
                                iddocument:count
                            });
                            griddoc.stateEdit="N";
                            griddoc.getStore().insert(0,newrecord);
                            griddoc.getPlugin().startEdit(0,0);
                        }else if (this.getWindowTxnCompras().stateMode=="E") {
                                   var newrecorde=Ext.create('Erp.model.almacenes.transacciones.compras.ModelTxnDocument',{

                                    });
                                    griddoc.stateEdit="N";
                                    griddoc.getStore().insert(0,newrecorde);
                                    griddoc.getPlugin().startEdit(0,0);
                                }
                            
                        
                    }
              },
              'gridtxncompras button[option=addItem]':{
                  click:function(button){
                        
                        var gridtxn=button.up('gridtxncompras');
                        var deststore=this.getFormTxnCompras().down('combobox[name=destinationstore]');
                        var newrecord;
                     if ( gridtxn.iddocument>=0) {
                        if (this.getWindowTxnCompras().stateMode=="N") {
                            //var count=gridtxn.getStore().getCount();
                            newrecord=Ext.create('Erp.model.almacenes.transacciones.ModelDTxnStore',{
                                iddocument:this.getGridTxnCompras().iddocument
                            });
                            gridtxn.stateEdit="N";
                            gridtxn.getStore().insert(0,newrecord);
                            gridtxn.getPlugin().startEdit(0,0);
                            
                        }else if (this.getWindowTxnCompras().stateMode=="E") {
                            newrecord=Ext.create('Erp.model.almacenes.transacciones.ModelDTxnStore',{
                                destinationstore:deststore.getValue()
                            });
                            gridtxn.stateEdit="N";
                            gridtxn.getStore().insert(0,newrecord);
                            gridtxn.getPlugin().startEdit(0,0);
                        }
                        this.calculateTotals(button.up('windowtxncompras'));
                    }else{
                        this.showMsg({title:'Error:',msg:'Debe seleccionar primero el Proveedor y Documento correspondiente!!'},false,4000);
                    }
                        
                 }
              }
              
              

        });
    },
    
    loadGrids:function(window,idtxnstore){
        var griddetail=window.down('gridtxncompras');
        var griddocument=window.down('griddoccompras');
        griddetail.getStore().getProxy().extraParams={xaction:'read',yaction:'readdetail',idtxnstore:idtxnstore};
        griddetail.getStore().load();
            
        griddocument.getStore().getProxy().extraParams={xaction:'read',yaction:'readdocs',idtxnstore:idtxnstore};
        griddocument.getStore().load();
        
        
    },
    initAll:function(window,eOpts){
        var me=this;
        var record=window.down('formtxncompras').getRecord();
        var cboalmacen=window.down('combobox[name=destinationstore]');
        var cboresponsible=window.down('combobox[name=responsible]');
        var cboestado=window.down('combobox[name=state]');
        
        
        var fecha=window.down('datefield[name=date]');
        var txntype=window.down('numberfield[name=txntype]');
        var concept=window.down('numberfield[name=concept]');
        var estado=window.down('combobox[name=state]');
        
        if (window.stateMode=='E') {
            this.loadGrids(window,record.data.idtxnstore);
            cboresponsible.getStore().getProxy().extraParams.responsible=record.data.responsible;
            window.stateMode='R';
        }else{
            window.stateMode='N';
            cboresponsible.setValue();
            
            cboalmacen.setValue();
        }

        cboestado.getStore().getProxy().extraParams={xaction:'readbytype',type:'estado_txn'};
        cboalmacen.getStore().getProxy().extraParams={xaction:'readalmacenusuario'};
        
        cboalmacen.getStore().load();
        cboresponsible.getStore().load();
        cboestado.getStore().load();

        this.enableButtons(window);
        this.enableControls(window);
        
        if (window.stateMode=='N') {
            txntype.setValue(35);
            concept.setValue(38);
            estado.setValue(43);
            //fecha.setValue(Erp.helper.Constants.getServerDate());
            Erp.helper.Tools.getServerDate(fecha,true);
            
        }
        var griddetail=window.down('gridtxncompras');
        griddetail.getStore().on('load',function(){
            me.calculateTotals(window);
        });

        
    },
    actColumnDetail:function(gridview,el,rowindex,colindex,e,record){
        var me=this;
        var window=gridview.up('windowtxncompras');
        var gridtxn = window.down('gridtxncompras');
        var m = e.getTarget().className.match(/\bicon-(\w+)\b/);
        if(m){
            switch(m[1]){
                case 'delete':
                    if (window.stateMode=="E") {
                            Ext.MessageBox.confirm('Alerta:', 'Esta seguro de eliminar el Registro?', 
                            function(option){
                                        if (option=='yes') {
                                            Ext.Ajax.request({
                                                url  : 'data/classes/sis_erpdd_txn_store.php',
                                                params : {xaction:'delete',yaction:'',iddtxnstore:record.data.iddtxnstore},
                                                method : 'POST',
                                                success: function(response) {
                                                    var result=Ext.decode(response.responseText);
                                                    me.showMsg(result,true,4000);
                                                    
                                                     gridtxn.getStore().load();
                                                },
                                                failure: function(response) {
                                                    var result=Ext.decode(response.responseText);
                                                    me.showMsg(result,false,4000);
                                                }

                                            });
                                        } 
                                });
                    }else if (this.getWindowTxnCompras().stateMode=="N") {
                        Ext.MessageBox.confirm('Alerta:', 'Esta seguro de eliminar el Registro?', 
                            function(option){
                                        if (option=='yes') {
                                            gridtxn.getStore().removeAt(rowindex);
                                        } 
                                });
                    }
                break;
                
            }
        }
    },
    actColumDocuments:function(gridview,el,rowindex,colindex,e,record){
        var me=this;
        var win=gridview.up('windowtxncompras');
        var gridtxn = win.down('gridtxncompras');
        var griddoc = win.down('griddoccompras');
        var m = e.getTarget().className.match(/\bicon-(\w+)\b/);
        if(m){
            switch(m[1]){
                case 'delete':
                    if (win.stateMode=="E") {
                            Ext.MessageBox.confirm('Alerta:', 'Esta seguro de eliminar el Registro??, <br/> se eliminara tambien el detalle de esta compra.', 
                            function(option){
                                        if (option=='yes') {
                                            Ext.Ajax.request({
                                                url  : 'data/classes/sis_erpd_txn_document.php',
                                                params : {xaction:'delete',yaction:'',iddocument:record.data.iddocument},
                                                method : 'POST',
                                                success: function(response) {
                                                    var result=Ext.decode(response.responseText);
                                                    
                                                    var gridtxt=gridtxn.down('label');
                                                    me.showMsg(result,true,4000);
                                                    gridtxn.iddocument='';
                                                    gridtxt.setText('');
                                                    gridtxn.getStore().load();
                                                    griddoc.getStore().load();
                                                },
                                                failure: function(response) {
                                                    var result=Ext.decode(response.responseText);
                                                    me.showMsg(result,false,4000);
                                                }

                                            });
                                        } 
                                });
                    }
                break;
                case 'conditions':
                    if (win.stateMode=="E") {
                      if (record.data.conditionpayment==70) {
                            var wincondition=Ext.create('Erp.view.almacenes.transacciones.compras.WindowCondicionPago',{});
                            var grid=wincondition.down('gridpanel');
                            var formcondition=wincondition.down('form');
                            formcondition.getForm().loadRecord(record);
                            grid.getStore().getProxy().extraParams.iddocument=record.data.iddocument;
                            var acu=0;
                                gridtxn.getStore().each(function(rec){
                                if (record.data.iddocument==rec.data.iddocument) {
                                    acu+=(rec.data.quantity*rec.data.cost)-rec.data.discount;
                                }

                                });
                            wincondition.totaldoc=acu;
                            wincondition.show();
                        }else{
                            Erp.helper.Tools.showMsg({title:'Alerta:',msg:'No se aplica para este tipo de compra!!'},false,4000);
                        }
                        
                    }else if(win.stateMode=='N'){
                         Erp.helper.Tools.showMsg({title:'Alerta:',msg:'Primero debe guardar la Transacci&oacute;n!!'},false,4000);
                    }
                break;
                case 'imagedoc':
                   if (win.stateMode!="N") {
                        var winimage=Ext.create('Erp.view.almacenes.transacciones.compras.WindowDocImage',{});
                        winimage.iddocument=record.data.iddocument;
                        winimage.image=record.data.image;
                        winimage.stateMode=win.stateMode
                        winimage.show();
                    }else{
                        Erp.helper.Tools.showMsg({title:'Alerta:',msg:'Primero debe guardar la Transacci&oacute;n!!'},false,4000);
                    }
                    
                break;
            }
        }
    },
    actionButton:function(button){
       var me=this;
        var window=button.up('windowtxncompras');
        var gridtxn=window.down('gridtxncompras');
        var griddoc=window.down('griddoccompras');
        var form=window.down('formtxncompras');
        switch (button.option) {
            case 'btnAnular':
                if (window.stateMode=="R" && form.down('combobox[name=state]').getValue()==44) {
                    Ext.MessageBox.confirm('Alerta:', 'Esta seguro Anular este documento??.', 
                            function(option){
                                if (option=='yes') {
                                    window.stateMode="E";
                                    form.down('combobox[name=state]').setValue(45);
                                    me.saveTxn(window);
                                }else{
                                    form.down('combobox[name=state]').setValue(44);
                                }
                            });
                    
                }
            break;
            case 'btnAprobar':
                if (window.stateMode=="R") {
                    Ext.MessageBox.confirm('Alerta:', 'Esta seguro Aprobar este documento??.', 
                            function(option){
                                if (option=='yes') {
                                    window.stateMode="E";
                                    form.down('combobox[name=state]').setValue(44);
                                    me.saveTxn(window);
                                }else{
                                    form.down('combobox[name=state]').setValue(43);
                                }
                            });
                    
                }
            break;
            case 'btnNuevo':
                window.stateMode="N";
                var gridtxt=gridtxn.down('label');
                
                gridtxn.iddocument=-1;
                gridtxt.setText('');
                
                var record=Ext.create('Erp.model.almacenes.transacciones.ModelTxnStore',{
                    
                });
                record.data.responsible='';
                record.data.destinationstore='';
                form.getForm().loadRecord(record);
                this.enableButtons(window);
                this.enableControls(window);
                var fecha=window.down('datefield[name=date]');
                var txntype=window.down('numberfield[name=txntype]');
                var concept=window.down('numberfield[name=concept]');
                var responsible=window.down('combobox[name=responsible]');
                var deststore=window.down('combobox[name=destinationstore]');
                var estado=window.down('combobox[name=state]');

                txntype.setValue(35);
                concept.setValue(38);
                estado.setValue(43);
                responsible.focus();
                
                //fecha.setValue(Erp.helper.Constants.getServerDate());
                Erp.helper.Tools.getServerDate(fecha,true);
                gridtxn.getStore().removeAll();
                griddoc.getStore().removeAll();
            break;
            case 'btnEditar':
                if (form.down('combobox[name=state]').getValue()==43) {
                   window.stateMode="E";
                    this.enableButtons(window);
                    this.enableControls(window); 
                }else{
                    me.showMsg({title:'Alerta:',msg:'Solo puede editar compras en REVISI&Oacute;N!!'},false,4000);
                }
                
                
            break;
            case 'btnGuardar':
                this.saveTxn(window);
            break;
            case 'btnCancelar':
                if (window.stateMode=="E") {
                    window.stateMode="R";
                    form.getForm().loadRecord(form.getForm().getRecord());
                    this.enableButtons(window);
                    this.enableControls(window);
                }else if (window.stateMode=="N") {
                    window.close();
                }
                
                
            break;
            
            case 'btnImprimir':
                console.log('imprimir');
               me.txnImprimir();
            break;
            default:
                break;
        }

        
    },
    calculateTotals:function(window){
       var grid=window.down('gridtxncompras');
       var labelItems=grid.down('label[option=labelitems]');
       var labelTotal=grid.down('label[option=labeltotal]');
       var store=grid.getStore();
       var costo=0;
       var quantity=0;
       store.each(function(record){

           costo+=(record.data.cost*record.data.quantity)-record.data.discount;
           quantity+=record.data.quantity;

       });
       labelTotal.setText(Ext.util.Format.currency(costo,'$'));
       labelItems.setText(quantity);
       
    },
    saveTxn:function(window){
        var me=this;
        var formtxn=window.down('formtxncompras');
        var idtxnstore=window.down('numberfield[name=idtxnstore]');
        var correlative=formtxn.down('textfield[name=correlative]');
        var griddoc=window.down('griddoccompras');
        var gridtxn=window.down('gridtxncompras');
        if (window.stateMode=="N") {
            var datadoc=[]; 
            var datadetail=[];
            
            griddoc.getStore().each(function(record){
                datadoc.push(record.data);
            });
            gridtxn.getStore().each(function(record){
                datadetail.push(record.data);
            });
        }
        var nrodoc=griddoc.getStore().getCount();
        var nrodet=gridtxn.getStore().getCount();
        var valid=false;
        if (nrodoc>0 && nrodet>0) {
            valid=true;
        }
        
            if (formtxn.getForm().isValid() && valid) {
                var yaction;
                var params;
                if (window.stateMode=='N') {
                    yaction='insert';
                    params={xaction:'save',yaction: yaction,detail:Ext.encode(datadetail),documents:Ext.encode(datadoc)};
                }else if (window.stateMode=='E') {
                    
                    yaction='update';
                    params={xaction:'save',yaction: yaction};
                }
                formtxn.getForm().submit({
                    clientValidation: true,
                    url: 'data/classes/sis_erpd_txn_store.php',
                    params: params,
                    success:function(form,action){
                        
                        me.showMsg(action.result,true,4000);
                        if (window.stateMode=="N") {
                            idtxnstore.setValue(action.result.idtxnstore);
                            correlative.setValue(action.result.correlative);
                            
                        }
                        formtxn.getForm().updateRecord();
                        formtxn.getForm().loadRecord(formtxn.getForm().getRecord());
                        window.stateMode='R';
                        me.enableControls(window);
                        me.enableButtons(window);
                        Ext.getStore('storelistacompras').load();
                        
                    },
                    failuer:function(form,action){
                        
                    }
                });
            }else{
                this.showMsg({title:'Error:',msg:'Porfavor verifique los datos'},false,4000);
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
    enableButtons:function(window){
        var me=this;
        var buttons=window.down('buttongroup[group=edicion]').items.items;
        var buttonstran=window.down('buttongroup[group=opciones]').items.items;
        var state=me.getFormTxnCompras().down('combobox[name=state]');

        if (window.stateMode=='R') {
            Ext.each(buttons,function(item){
                if (item.option=='btnNuevo' || item.option=='btnEditar') {
                    item.setDisabled(0);
                }else if (item.option=='btnGuardar' || item.option=='btnCancelar') {
                    item.setDisabled(1);
                }
            });
            Ext.each(buttonstran,function(item){
              if (state.getValue()==44) {
                  if (item.option=='btnAnular' || item.option=='btnImprimir') {
                        item.setDisabled(0);
                    }else{
                        item.setDisabled(1);
                    }
                    
                }else if(state.getValue()==43){
                    if (item.option=='btnImprimir' || item.option=='btnAprobar') {
                        item.setDisabled(0);
                    }else{
                        item.setDisabled(1);
                    }
                }else{
                    if (item.option=='btnImprimir') {
                        item.setDisabled(0);
                    }else{
                        item.setDisabled(1);
                    }
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
            Ext.each(buttonstran,function(item){
                    item.setDisabled(1);
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
                    item.setDisabled(1);
            });
        }
    },
    
    enableControls:function(window){
        var formHead=window.down('formtxncompras');
        this.enableForm(window,formHead,window.stateMode);
    },
    
    enableForm:function(window,form,stateMode){
        var griddet=window.down('gridtxncompras');
        var griddoc=window.down('griddoccompras');
        var items=form.getForm().getFields().items;
        var idtxnstore=form.down('numberfield[name=idtxnstore]');
        if (stateMode=='R') {
           Ext.each(items,function(item,index,allitems){
                    item.setReadOnly(1);
           });
           this.loadGrids(window,idtxnstore.getValue());
        }else if (stateMode=='E') {

                Ext.each(items,function(item,index,allitems){
                    if (item.name!='idtxnstore' && item.name!='correlative' && item.name!='state') {
                        item.setReadOnly(0);
                    }
                   
                });
                
                
        }else if (stateMode=='N') {

               form.getForm().reset();
               Ext.each(items,function(item,index,allitems){
                    if (item.name!='idtxnstore' && item.name!='correlative' && item.name!='state') {
                        item.setReadOnly(0);
                    }else{
                        item.setReadOnly(1);
                    }   
                });
        }
    },
    txnAnimate:function(cardwiz,component,destination,time,opacity,go){
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
    txnImprimir:function(){
        //console.log('entro');
        var winpcListaPrecios=Ext.create('Erp.view.almacenes.item.WindowListaItem',{title:'reporte',alias:'WindowReporte',frame:false,tools:[{
            type:'maximize',
            tooltip: 'Refresh form Data',
            hidden:false,
            handler: function(event, toolEl, panel){
                // refresh logic maximize
                winpcListaPrecios.maximize();
                //console.log(winpcListaPrecios);
            }
        },
        {
            type:'restore',
            tooltip: 'Get Help',
            hidden:false,
            handler: function(event, toolEl, panel){
                // show help here restore
                winpcListaPrecios.restore();
            }
        }]});
        var panel=Ext.getCmp('center-panel');
        panel.add(winpcListaPrecios);
        winpcListaPrecios.show();
    }
   
});