/*
 * @Autor: Max M. Jimenez Tarana
 * @Email: maxmjt@gmail.com
 */


Ext.define('Erp.controller.almacenes.transacciones.ControllerTxnSalidas', {
    extend: 'Ext.app.Controller',
    stores: ['almacenes.transacciones.StoreTxnStore',
             'almacenes.transacciones.StoreDTxnStore',
             'crm.StoreCrmEmployee',
             'StoreType'],
    views: ['almacenes.transacciones.salidas.WindowTxnSalidas',
            'almacenes.transacciones.salidas.GridTxnSalidas',
            'almacenes.transacciones.salidas.FormTxnSalidas'
        ],
        
    refs: [
        {
            ref     :   'WindowTxnSalidas',
            selector:   'windowtxnsalidas'
        },
        {
            ref     :   'GridTxnSalidas',
            selector:   'gridtxnsalidas'
        }
        
    ],
    init: function(e) {
        
        this.control({
              'windowtxnsalidas':{
                    afterrender:this.initAll,
                    beforeclose:function(panel,eOpts){
                        panel.listatransfer.getStore().load();
                        
                    }
              },
              'windowtxnsalidas buttongroup button':{
                    click:this.actionButton
              },
              'windowtxnsalidas button[option=documents]':{
                    click:function(button){
                        var window=button.up('windowtxnsalidas');
                        var formtxn=window.down('formtxnsalidas');
                        var gridtxn=window.down('gridtxntransferencias');
                        var cardwiz=window.down('panel[alias=contentform]');
                        this.txnAnimate(cardwiz,formtxn,gridtxn,500,0,true);
                    }
              },
              'windowtxnsalidas button[option=back]':{
                    click:function(button){
                        var window=button.up('windowtxnsalidas');
                        var formtxn=window.down('formtxnsalidas');
                        var gridtxn=window.down('gridtxntransferencias');
                        var cardwiz=window.down('panel[alias=contentform]');
                        this.txnAnimate(cardwiz,gridtxn,formtxn,500,0,false);
                    }
              },
              'formtxnsalidas':{
                  deactivate:function(form){

                  }
              },
              'gridtxnsalidas':{
                    beforeedit:function(editor,e,eOpts){
                         var estado;
                         var win=e.grid.up('window');
                         var formtxn=win.down('formtxnsalidas');
                        var idcombo=formtxn.down('combobox[option=comboorigen]');
                        var idstoreorigen=idcombo.getValue();
                        var cantidad=0;
                        var campocantidad='';
                        var idunit=e.grid.getStore().data.items[0].data.idunit;
                        //console.log(e.grid.getStore().data.items[0].data.idunit);
                        if(win.stateMode=='R'){
                                estado=false;
                        }else{
                                e.grid.idorigen=idstoreorigen;
                                if(e.record.data.iditem!=''){
                                    Ext.each(e.grid.columns,function (item,index,allitems){
                                                if(item.dataIndex=='iditem' || item.dataIndex=='idunit'){
                                                    if(item.dataIndex=='idunit'){
                                                    
                                                    item.getEditor().getStore().getProxy().extraParams={xaction:'readunitquantity',iditem:e.record.data.iditem,idstore:idstoreorigen};
                                                    item.getEditor().getStore().load({callback:function(){
                                                        //console.log(this);
                                                        var totalarray=this.data.length;
                                                        //console.log(this.data.length);
                                                        var i =0;
                                                        for(i=0;i<totalarray;i++){
                                                            if(this.data.items[i].data.idunit==idunit){
                                                                var cadena=this.data.items[i].data.unitname;
                                                                //gridrecactual.data.unitname=records[0].data.unitname;
                                                                var div=cadena.split(" ");
                                                                cantidad=div[1];
                                                            }
                                                        }
                                                        
                                                        
                                                        //console.log(cantidad);
                                                        if(cantidad>0){
                                                        Ext.each(e.grid.columns,function (item,index,allitems){
                                                            if(item.dataIndex=='quantity'){
                                                                //console.log('cantidad');
                                                                campocantidad=item.getEditor();//.setMaxValue(cantidad);
                                                                campocantidad.setMaxValue(cantidad);
                                                            }
                                                        });
                                                        }else{
                                                            campocantidad.setMaxValue(0);
                                                        }
                                                        }});
                                                    //console.log(item.getEditor().getStore().data.items[0].data.unitname);
                                                    }else{
                                                    item.getEditor().getStore().getProxy().extraParams.iditem=e.record.data.iditem;
                                                    item.getEditor().getStore().load();
                                                    }
                                                }
                                                //if(item.dataIndex=='quantity'){
                                                 //   console.log('cantidad');
                                                 //   campocantidad=item.getEditor();//.setMaxValue(cantidad);
                                               // }
                                                //if(cantidad>0){
                                                    //campocantidad.setMaxValue(cantidad);
                                                //}
                                    });
                                    
                                }
                                estado=true;
                        }

                        return estado;
                    },
                    validateedit:function(){},
                    canceledit:function(editor,e,eOpts){
                        //console.log(e.record.data.iddtxnstore);
                        if(e.record.data.iddtxnstore==0){
                            e.grid.getStore().removeAt( e.rowIdx );
                        }
                    },
                    edit:this.guardardetalle
              },
              /*'gridtxntransferencias button[option=adddoc]':{
                    click:function(button){
                        var griddoc=button.up('gridtxntransferencias');
                        var count=griddoc.getStore().getCount();
                        var newrecord=Ext.create('Erp.model.almacenes.transacciones.compras.ModelTxnDocument',{
                            iddocument:count,
                            idprovider:'',
                            idcontact:'',
                            txntype:'',
                            methodpayment:'',
                            conditionpayment:''
                        });
                        griddoc.getStore().insert(0,newrecord);
                        griddoc.getPlugin().startEdit(0,0);
                    }
              },*/
              'gridtxnsalidas button[option=addItem]':{
                  click:function(button){
                      var me=this;
                      //console.log('jejeje');
                      var window=button.up('window');
                      
                        var form123=window.down('formtxnsalidas');
                        var idformcab123=form123.down('numberfield[option=cabeceraid]');
                        
                        //if(){this.saveTxn(window);}
                        var grid=button.up('gridtxnsalidas');
                        //var count=griddoc.getStore().getCount();
                        //console.log(grid);
                        if(window.stateMode=="E" || window.stateMode=="N"){
                            if(grid.idorigen!=0){
                                if(idformcab123.getValue()==null){
                                    //console.log(idformcab123.getValue());
                                    //this.saveTxn(window);
                                    var permit='no';
                                    if(this.saveTxn(window,permit)){
                                        //console.log('eho');
                                        var newrecord=Ext.create('Erp.model.almacenes.transacciones.ModelDTxnStore',{
                                        //iddocument:this.getGridTxnCompras.iddocument
                                        originstore:'',
                                        destinationstore:''
                                        });
                                        
                                        grid.getStore().insert(0,newrecord);
                                        grid.getPlugin().startEdit(0,0);
                                    }
                                }else{
                                    //falta colocar el filtro si tiene el campo de almacen origen
                                    //console.log('entro2');
                                    var newrecord=Ext.create('Erp.model.almacenes.transacciones.ModelDTxnStore',{
                                        //iddocument:this.getGridTxnCompras.iddocument
                                        originstore:'',
                                        destinationstore:''
                                        });
                                    grid.getStore().insert(0,newrecord);
                                    grid.getPlugin().startEdit(0,0);
                                }
                                me.calculateTotals(window);
                            }else{
                                Ext.create('widget.uxNotification', {
                                        title: 'Advertencia',
                                        position: 'tr',
                                        manager: 'instructions',
                                        cls: 'ux-notification-light',
                                        iconCls: 'ux-notification-icon-information',
                                        html: 'Por favor seleccione su almacen origen',
                                        autoHideDelay: 4000,
                                        slideBackDuration: 500,
                                        slideInAnimation: 'bounceOut',
                                        slideBackAnimation: 'easeIn'
                                }).show();
                            }
                        }
                        
                        
                        
                    }
              },
              'formtxnsalidas combobox[option=comboorigen]':{
                  select:function(cbo,records,eOps){
                    var win=cbo.up('window');
                    var grid=win.down('gridtxnsalidas');
                    grid.idorigen=records[0].data.idstore;
                    console.log(grid);
                }
              },
              'gridtxnsalidas actioncolumn':{
                  click:this.actColumnDetail
              }
              
              

        });
    },
    permitirElegir:true,
    initAll:function(window,eOpts){
        //console.log('ggg');
        var me=this;
        var record=window.down('formtxnsalidas').getRecord();
        var cboalmacenorg=window.down('combobox[name=originstore]');
        //var cboalmacen=window.down('combobox[name=destinationstore]');
        var cboresponsible=window.down('combobox[name=responsible]');
        var cboestado=window.down('combobox[name=state]');
        var griddetail=window.down('gridtxnsalidas');
        var cboconcepto=window.down('combobox[name=concept]');
        
        var fecha=window.down('datefield[name=date]');
        var txntype=window.down('numberfield[name=txntype]');
        var estado=window.down('combobox[name=state]');
        //var griddocument=window.down('griddoccompras');
        
        
        if (window.stateMode=='E') {
            var rowCantidad=0;
            griddetail.getStore().getProxy().extraParams={xaction:'read',yaction:'readdetail',idtxnstore:record.data.idtxnstore};
            griddetail.getStore().load({callback:function(){
                    
            if(this.getCount()>0){
                me.permitirElegir=false;
                //cboalmacenorg.setDisabled(true);
            }else{
                me.permitirElegir=true;
                //cboalmacenorg.setDisabled(false);
            }
            
            }});
            cboresponsible.getStore().getProxy().extraParams.responsible=record.data.responsible;
            //griddocument.getStore().getProxy().extraParams={xaction:'read',yaction:'readdocs',idtxnstore:record.data.idtxnstore};
            //griddocument.getStore().load();
            //console.log(griddetail);
            //console.log(griddetail.getStore().getCount());
            window.stateMode='R';
        }else{
            window.stateMode='N';
            cboresponsible.setValue();
            cboalmacenorg.setValue();
            //cboalmacen.setValue();
        }
        
        
        //cboalmacen.getStore().load();
        cboresponsible.getStore().load();
        cboestado.getStore().getProxy().extraParams={xaction:'readbytype',type:'estado_txn'};
        cboestado.getStore().load();
        cboalmacenorg.getStore().getProxy().extraParams={xaction:'readalmacenusuario'};
        cboalmacenorg.getStore().load();
        cboconcepto.getStore().getProxy().extraParams={xaction:'readtxnsalidaconcept'};
        cboconcepto.getStore().load();
        this.enableButtons(window);
        this.enableControls(window);
        
        if (window.stateMode=='N') {
            //txntype.setValue(35);
            //concept.setValue(38);
            estado.setValue(43);
            fecha.setValue(Erp.helper.Constants.getServerDate());
        }
        //var griddetail=window.down('gridtxncompras');
        griddetail.getStore().on('load',function(){
            me.calculateTotals(window);
        });
        
    },
    actionButton:function(button){
        var me=this;
        var window=button.up('windowtxnsalidas');
        var form=window.down('formtxnsalidas');
        switch (button.option) {
            case 'btnNuevo':
                window.stateMode="N";
                this.enableButtons(window);
                this.enableControls(window);
                var fecha=window.down('datefield[name=date]');
                //var txntype=window.down('numberfield[name=txntype]');
                //var concept=window.down('numberfield[name=concept]');
                var estado=window.down('combobox[name=state]');
                
                //txntype.setValue(35);
                //concept.setValue(38);
                estado.setValue(43);
                fecha.setValue(Erp.helper.Constants.getServerDate());
            break;
            case 'btnEditar':
                if (form.down('combobox[name=state]').getValue()==43) {
                   window.stateMode="E";
                    this.enableButtons(window);
                    this.enableControls(window); 
                }else{
                    me.showMsg({title:'Alerta:',msg:'Solo puede editar salidas en REVISI&Oacute;N!!'},false);
                }
                
            break;
            case 'btnGuardar':
                var permit='si';
                this.saveTxn(window,permit);
            break;
            case 'btnCancelar':
                if (window.stateMode=="E") {
                    window.stateMode="R";
                    form.getForm().loadRecord(form.getForm().getRecord());
                    this.enableButtons(window);
                    this.enableControls(window);
                }else if (window.stateMode=="N") {
                    window.close();
                    window.listatransfer.getStore().load();
                }
                
                
            break;
            case 'btnTerminar':
                //this.terminarTransferencia(window,form);
                
                
            break;
            case 'btnAprobar':
                if (window.stateMode=="R") {
                    Ext.MessageBox.confirm('Alerta:', 'Esta seguro Aprobar este documento??.', 
                            function(option){
                                if (option=='yes') {
                                    window.stateMode="E";
                                    //form.down('combobox[name=state]').setValue(44);
                                    //me.saveTxn(window);
                                    //window.down('formtxntransferencias').getStore().load();
                                    me.terminarTransferencia(window,form);
                                    
                                }else{
                                    form.down('combobox[name=state]').setValue(43);
                                }
                            });
                    
                }
            break;
            
            case 'btnAnular':
                if (window.stateMode=="R" && form.down('combobox[name=state]').getValue()==44) {
                    Ext.MessageBox.confirm('Alerta:', 'Esta seguro Anular este documento??.', 
                            function(option){
                                if (option=='yes') {
                                    window.stateMode="E";
                                    //form.down('combobox[name=state]').setValue(45);
                                    //me.saveTxn(window);
                                    //window.down('formtxntransferencias').getStore().load();
                                    me.anularTransferencia(window,form);
                                    //window.listatransfer.getStore().load();
                                    /*var panelcentral=Ext.getCmp('center-panel');
                                    var winlista=panelcentral.down('windowlistatransferencias');
                                    winlista.items.items[0].getStore().load();*/
                                }else{
                                    //form.down('combobox[name=state]').setValue(43);
                                }
                            });
                    
                }
            break;
            
            default:
                break;
        }

        
    },
    saveTxn:function(window,permit){
        //console.log('entro');
        var valor=true;
        var thiss=this;
        var formtxn=window.down('formtxnsalidas');
        //var griddoc=window.down('griddoccompras');
        var gridtxn=window.down('gridtxnsalidas');//
        if (window.stateMode=="N") {
            //var datadoc=[]; 
            var datadetail=[];
            
            //griddoc.getStore().each(function(record){
              //  datadoc.push(record.data);
            //});
            gridtxn.getStore().each(function(record){
                datadetail.push(record.data);
            });
        }
            var idformcab=formtxn.down('numberfield[option=cabeceraid]');
            var correlativoformcab=formtxn.down('textfield[option=cabeceracorrelativo]');
            var habilitarBtn=gridtxn.down('button[option=addItem]');
             //console.log(idformcab);
            
            if (formtxn.getForm().isValid()) {
                var yaction;
                if (window.stateMode=='N' && idformcab.getValue()==null) {
                    yaction='insertCabeceraSalidas';
                }else if (window.stateMode=='E' || idformcab.getValue()!=null) {
                    yaction='updateCabeceraSalidas';
                }
                formtxn.getForm().submit({
                    clientValidation: true,
                    url: 'data/classes/sis_erpd_txn_store.php',
                    params: {xaction:'save',yaction: yaction/*,detail:Ext.encode(datadetail),documents:Ext.encode(datadoc)*/},
                    success:function(form,action){
                        var result=Ext.decode(action.response.responseText);
                        if(window.stateMode=="N"){
                            //console.log('holassssssss');                        
                        idformcab.setValue(result.iditem);
                        correlativoformcab.setValue(result.correlative);
                        formtxn.getForm().updateRecord();
                        }
                        window.listatransfer.getStore().load();
                        //Ext.getStore('storelistatransferencias').load();
                        
                        habilitarBtn.setDisabled(0);
                        //console.log(formtxn.items.items[0].items.items[0]);
                        if(permit=='si'){
                            window.stateMode='R';
                            thiss.enableControls(window);
                            thiss.enableButtons(window);
                        }
                        
                        thiss.showMsg(result);
                        valor=true;
                        //Ext.getStore('storelistacompras').load();
                    },
                    failuer:function(response){
                       
                    }
                });
            }else{
                Ext.create('widget.uxNotification', {
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
                valor=false;
            }
            return valor;
       // }    
    },
    showMsg:function(oOpts){
        Ext.create('widget.uxNotification', {
                        title: oOpts.title,
                        position: 'tr',
                        manager: 'instructions',
                        cls: 'ux-notification-light',
                        iconCls: 'ux-notification-icon-information',
                        html: oOpts.msg,
                        autoHideDelay: 4000,
                        slideBackDuration: 500,
                        slideInAnimation: 'bounceOut',
                        slideBackAnimation: 'easeIn'
         }).show();
    },
    enableButtons:function(window){
       var me=this;
        var buttons=window.down('buttongroup[group=edicion]').items.items;
        var buttonstran=window.down('buttongroup[group=opciones]').items.items;
        var formtxn=window.down('formtxnsalidas');
        var state=formtxn.down('combobox[name=state]');
        console.log('botones');
        console.log(window.stateMode);
        if (window.stateMode=='R') {
            Ext.each(buttons,function(item){
                if (item.option=='btnNuevo' || item.option=='btnEditar') {
                    item.setDisabled(0);
                }else if (item.option=='btnGuardar' || item.option=='btnCancelar') {
                    item.setDisabled(1);
                }
            });
            Ext.each(buttonstran,function(item){
              console.log(state.getValue());
              if (state.getValue()==44) {
                  if (item.option=='btnAnular' || item.option=='btnImprimir') {
                        item.setDisabled(0);
                    }else{
                        item.setDisabled(1);
                    }
                    
                }else if (state.getValue()==86) {
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
       /* var buttons=window.down('buttongroup[group=edicion]').items.items;
        var buttonstran=window.down('buttongroup[group=opciones]').items.items;
        if (window.stateMode=='R') {
            Ext.each(buttons,function(item){
                if (item.option=='btnNuevo' || item.option=='btnEditar') {
                    item.setDisabled(0);
                }else if (item.option=='btnGuardar' || item.option=='btnCancelar') {
                    item.setDisabled(1);
                }
            });
            Ext.each(buttonstran,function(item){
                if (item.option=='btnAprobar' || item.option=='btnAnular') {
                    item.setDisabled(0);
                }else if (item.option=='btnImprimir') {
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
        }*/
    },
    
    enableControls:function(window){
        var formHead=window.down('formtxnsalidas');
        //console.log(window.stateMode);
        this.enableForm(window,formHead,window.stateMode);
    },
    
    enableForm:function(window,form,stateMode){
        var me=this;
        
        var griddet=window.down('gridtxnsalidas');
        //var griddoc=window.down('griddoccompras');
        var items=form.getForm().getFields().items;
        if (stateMode=='R') {
           Ext.each(items,function(item,index,allitems){
                    item.setReadOnly(1);
           });
        }else if (stateMode=='E') {
                if(me.permitirElegir==false){
                           Ext.each(items,function(item,index,allitems){
                                if (item.name!='idtxnstore' && item.name!='correlative' && item.name!='state' && item.name!='originstore') {
                                    item.setReadOnly(0);
                                }

                            });
                        }else{
                            Ext.each(items,function(item,index,allitems){
                                if (item.name!='idtxnstore' && item.name!='correlative' && item.name!='state') {
                                    item.setReadOnly(0);
                                }

                            });
                        }
                /*Ext.each(items,function(item,index,allitems){
                    if (item.name!='idtxnstore' && item.name!='correlative' && item.name!='state') {
                        item.setReadOnly(0);
                    }
                   
                });*/
        }else if (stateMode=='N') {

               form.getForm().reset();
               Ext.each(items,function(item,index,allitems){
                        item.setReadOnly(0);
                        
                });
                griddet.getStore().removeAll();
                //griddoc.getStore().removeAll();
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
    guardardetalle:function(editor, e,eopts) {
                                var me=this;
                                var store=e.grid.getStore();
                                
                                var win=e.grid.up('window');
                                var formtxn=win.down('formtxnsalidas');
                                var idformcab=formtxn.down('numberfield[option=cabeceraid]');
                                var idtxnstore=idformcab.getValue();
                                var idcombo=formtxn.down('combobox[option=comboorigen]');
                                var idstoreorigen=idcombo.getValue();
                                //var idcombodest=formtxn.down('combobox[option=combodestino]');
                                //var idstoredestino=idcombodest.getValue();
                                console.log('idcabecera='+idtxnstore+'idstoreorigen='+idstoreorigen);
                                //console.log(editor.context.newValues);
                                
                                store.getProxy().extraParams.idtxnstore=idtxnstore;
                                
                                Ext.Ajax.request({
                                        url  : 'data/classes/sis_erpdd_txn_store.php',
                                         params : {
                                           xaction   : 'insert',
                                           yaction   : 'insertdetalleTransferencia',
                                           idtxnstore: idtxnstore,
                                           idstoreorg: idstoreorigen,
                                           idstoredest: 0,
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
                                            store.load({callback:function(){
                    
                                                if(this.getCount()>0){
                                                    me.permitirElegir=false;
                                                    idcombo.setReadOnly(1);
                                                    //cboalmacenorg.setDisabled(true);
                                                }else{
                                                    me.permitirElegir=true;
                                                    idcombo.setReadOnly(0);
                                                    //cboalmacenorg.setDisabled(false);
                                                }

                                                }});

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
      terminarTransferencia:function(window,form){
          //console.log('entro');
          var me=this;
          var idformcab=form.down('numberfield[option=cabeceraid]');
          var idtxnstore=idformcab.getValue();
          Ext.Ajax.request({
                    url  : 'data/classes/sis_erpdd_txn_store.php',
                     params : {
                       xaction   : 'update',
                       yaction   : 'updateCabeceraSalidaAprobado',
                       idtxnstore: idtxnstore//,
                       //valores : Ext.JSON.encode(editor.context.newValues) 
                       //valoresraiz : Ext.JSON.encode(changes.record.data)

                     },
                     method : 'POST',


                     success: function(r) {
                       window.stateMode='R';
                       //form.down('combobox[name=state]').setValue(44);
                       var result=Ext.decode(r.responseText);
                       //console.log(result.title);
                       if(result.title=='Error:'){
                           
                       }else{
                           //window.stateMode='R';
                           
                           form.down('combobox[name=state]').setValue(44);
                           me.enableControls(window);
                           me.enableButtons(window);
                           window.down('gridtxnsalidas').getStore().load();
                           window.listatransfer.getStore().load();
                       };
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

                     },
                     failure: function(r) {
                      form.down('combobox[name=state]').setValue(43);   
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
      anularTransferencia:function(window,form){
          //console.log('entro');
          var idformcab=form.down('numberfield[option=cabeceraid]');
          var idtxnstore=idformcab.getValue();
          Ext.Ajax.request({
                    url  : 'data/classes/sis_erpdd_txn_store.php',
                     params : {
                       xaction   : 'update',
                       yaction   : 'updateCabeceraTransferenciaAnulado',
                       idtxnstore: idtxnstore//,
                       //valores : Ext.JSON.encode(editor.context.newValues) 
                       //valoresraiz : Ext.JSON.encode(changes.record.data)

                     },
                     method : 'POST',


                     success: function(r) {
                       window.stateMode='R';
                       form.down('combobox[name=state]').setValue(45);
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
                      window.listatransfer.getStore().load();
                        //store.load();

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
      actColumnDetail:function(gridview,el,rowindex,colindex,e,record){
        var me=this;
        var window=gridview.up('window');
        var grid=window.down('gridtxnsalidas');
        
        var formtxn=window.down('formtxnsalidas');
        var idcombo=formtxn.down('combobox[option=comboorigen]');
        console.log(window.stateMode);
        var m = e.getTarget().className.match(/\bicon-(\w+)\b/);
        if(m){
            switch(m[1]){
                case 'delete':
                    if (window.stateMode=="E" || window.stateMode=="N") {
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
                                                    //var storegrid = Ext.data.StoreManager.lookup('storedtxnstore');
                                                     //storegrid.load();
                                                     grid.getStore().load({callback:function(){
                    
                                                if(this.getCount()>0){
                                                    me.permitirElegir=false;
                                                    idcombo.setReadOnly(1);
                                                    //cboalmacenorg.setDisabled(true);
                                                }else{
                                                    me.permitirElegir=true;
                                                    idcombo.setReadOnly(0);
                                                    //cboalmacenorg.setDisabled(false);
                                                }

                                                }});
                                                },
                                                failure: function(response) {
                                                    var result=Ext.decode(response.responseText);
                                                    me.showMsg(result,false,4000);
                                                }

                                            });
                                        } 
                                });
                    }/*else if (this.getWindowTxnCompras().stateMode=="N") {
                        Ext.MessageBox.confirm('Alerta:', 'Esta seguro de eliminar el Registro?', 
                            function(option){
                                        if (option=='yes') {
                                            me.getGridTxnCompras().getStore().removeAt(rowindex);
                                        } 
                                });
                    }*/
                break;
                
            }
        }
    },
    calculateTotals:function(window){
       var grid=window.down('gridtxnsalidas');
       //var grid=this.getGridTxnCompras();
       var labelItems=grid.down('label[option=labelitems]');
       var labelTotal=grid.down('label[option=labeltotal]');
       var store=grid.getStore();//Ext.data.StoreManager.lookup('storedtxnstore');
       var costo=0;
       var quantity=0;
       store.each(function(record){

           costo+=(record.data.cost*record.data.quantity)-record.data.discount;
           quantity+=record.data.quantity;

       });
       labelTotal.setText(Ext.util.Format.currency(costo,'$'));
       labelItems.setText(quantity);
       
    }
   
});