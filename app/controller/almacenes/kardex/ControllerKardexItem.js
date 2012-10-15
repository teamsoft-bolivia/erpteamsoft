/*
 * @Autor: Pablo Garcia Guaman, Cristhian Valencia F,Max Jimenez
 * @Email:garciaguamanpablo@gmail.com, fox_tian@hotmail.com
 */


Ext.define('Erp.controller.almacenes.kardex.ControllerKardexItem', {
    extend: 'Ext.app.Controller',
   
    models: ['almacenes.kardex.ModelDetalleKardex'],
    stores: ['almacenes.kardex.StoreDetalleKardex'],
    views: [
            'almacenes.kardex.WindowKardexItem',
            'almacenes.kardex.FormKardexItem',
            'almacenes.kardex.GridDetalleMovimientoItem'
            
   ],
  
    init: function(e) {
        
        this.control({
            
              'windowkardexitem':{
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
               'formkardexitem button[option=mostrarkardex]' : {
                   click : function (button){
                      
                       var thiss=this;
                       var window=button.up('windowkardexitem');
                       thiss.mostrarKardex(window);
                      
                   }
                   
               },
               'formkardexitem combobox' : {
                   beforeselect : function (combo,record,index,eOpts){
                                          
                       var window=combo.up('windowkardexitem');
                       var btnimprimir=window.down('griddetallemovimientoitem button[option=btnImprimir]');
                       btnimprimir.setDisabled(true);
                      
                      
                   }
                   
               },
               'griddetallemovimientoitem button[option=btnImprimir]' : {
                   click : function (button){
                      
                       this.txnImprimir(button);
                      
                   }
                   
               }
        });
    },
    initAll:function(window,eOpts){
        var thiss=this; 
        var form=window.down('formkardexitem');
        var btnimprimir=window.down('griddetallemovimientoitem button[option=btnImprimir]');
        btnimprimir.setDisabled(true);
        var fechafinal = form.down('datefield[name=fechafinal]');
        Erp.helper.Tools.getServerDate(fechafinal,true);
       

    },
     saldoAnterior   : function (store){
        var thiss=this;
        var saldo=0;
        
        store.each(function (record){
           saldo+=record.data.quantity; 
          
        });
        return saldo;
    },
    mostrarKardex    :    function (window){
        var thiss=this;
        var form=window.down('formkardexitem');
        var griddetail=window.down('griddetallemovimientoitem');
        var btnimprimir=window.down('griddetallemovimientoitem button[option=btnImprimir]');
       
        if(form.getForm().isValid() ){
           var store =griddetail.getStore();
           var fields=form.getForm().getFieldValues();
          
            var iditem=fields.iditem;
            var idunit=fields.idunit;
            var idstore=fields.idstore;
            var fechainicial=fields.fechainicial;
            var fechafinal=fields.fechafinal;
            form.fechaini=fechainicial;
            form.fechafinal=fechafinal;
            btnimprimir.setDisabled(false);   
            
            Ext.Ajax.request({
                url  : 'data/classes/sis_erpdd_txn_store.php',
                params : {
                    xaction     : 'read',
                    yaction     : 'readsaldoanterior',
                    iditem      : iditem,
                    idunit      : idunit,
                    idstore     : idstore,
                    fechafinal  : fechainicial

                },
                method : 'POST',


                success: function(r) {
                    var result=Ext.decode(r.responseText);
                    var saldoanterior=result.saldoanterior;
                    var saldovaloradoanterior=result.saldovaloradoanterior;
                    form.saldoanterior=saldoanterior;
                    form.saldovaloradoanterior=saldovaloradoanterior
                    griddetail.down('label[option=saldoanterior]').setText(saldoanterior);
                    griddetail.down('label[option=saldovaloradoanterior]').setText(Ext.util.Format.currency(saldovaloradoanterior,'$'));
                    
                    store.getProxy().extraParams.iditem=iditem;
                    store.getProxy().extraParams.idunit=idunit;
                    store.getProxy().extraParams.idstore=idstore;
                    store.getProxy().extraParams.fechainicial=fechainicial;
                    store.getProxy().extraParams.fechafinal=fechafinal;
                    store.getProxy().extraParams.saldo=saldoanterior;
                    store.getProxy().extraParams.saldovalorado=saldovaloradoanterior;
                     
                    store.load({
                        callback:function (){
                            var saldo=0;
                            var saldovalorado=0;
                            if(this.getCount()>0){
                                 var record=this.getAt(this.getCount()-1);
                                 griddetail.down('label[option=saldo]').setText(record.data.saldo);
                                 griddetail.down('label[option=saldovalorado]').setText(Ext.util.Format.currency(record.data.saldovalorado,'$','3'));
                                
                            }else{
                                griddetail.down('label[option=saldo]').setText('0');
                                 griddetail.down('label[option=saldovalorado]').setText('0');
                                
                            }
                           
                        }
                    
                    });
                    
                    


                    

                },
                failure: function(r) {
                    var result=Ext.decode(r.responseText);
                    thiss.showMsg({title:result.title,msg:result.msg},false,4000);
                }

            });
        
        }else {
            
            Erp.helper.Tools.showMsg({title:'Error',msg:'Complete el formulario'},false,4000);
        }
        
       
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
       labelTotal.setText('Total General: '+Ext.util.Format.currency(costo,'$'));
   
    },
    itemdblclick : function (view,record,item,index,e,eOpts ){
        var grid = view.up('griddetalletxnentradas');
        grid.currentrowselected=index;
        
    },
    txnImprimir:function(button){
        //console.log('entro');
        //var panel=

        var win=button.up('windowkardexitem');
        var form=win.down('formkardexitem');
        var formato1234='pdf';
        var panelr=Ext.create('Ext.panel.Panel', {
                //title: 'Hello',
                //width: 200,
               /* html: '<iframe src=" http://'+'192.168.1.150'+
					  ':8000/jasperserver/flow.html?_flowId=viewReportFlow&ParentFolderUri=%2Ferpreports%2Freports%2Finventarios&reportUnit=%2Ferpreports%2Freports%2Finventarios%2Fkardexporitem'+
					  '&output='+formato1234+
					  '&identerprise=2&fechaini='+form.fechaini+
                                          '&fechafin='+form.fechafin+
                                          '&iditem='+form.iditem+
                                          '&idunit='+form.idunit+
                                          '&originstore='+form.idstore+
                                          '&destinationstore='+form.idstore+
                                          '&storename='+form.storename+
                                          '&itemname='+form.description+
                                          '&unitname='+form.unitname+
                                          '&saldoanteriorf='+form.saldoanterior+
                                          '&saldoanteriorv='+form.saldovaloradoanterior+
                                          '&valoracion='+form.valoracion+
					  //'&final_date='+ff+
					  '&j_username=jasperadmin&j_password=jasperadmin" style="width:100%;height:100%;border:none;"></iframe>'
                //renderTo: Ext.getBody()*/
            });
        
        var html='<iframe src="http://'+'192.168.1.150'+
					  ':8000/jasperserver/rest_v2/reports/erpreports/reports/inventarios/kardexporitem.'+formato1234+
					  '?identerprise=2&fechaini='+Ext.util.Format.date(form.fechaini,'Y-m-d')+
                                          '&fechafin='+Ext.util.Format.date(form.fechafinal,'Y-m-d')+
                                          '&iditem='+form.iditem+
                                          '&idunit='+form.idunit+
                                          '&originstore='+form.idstore+
                                          '&destinationstore='+form.idstore+
                                          '&storename='+form.storename+
                                          '&itemname='+form.description+
                                          '&unitname='+form.unitname+
                                          '&saldoanteriorf='+form.saldoanterior+
                                          '&saldoanteriorv='+form.saldovaloradoanterior+
                                          '&valoracion='+form.valoracion+
					  //'&final_date='+ff+
					  '&j_username=jasperadmin&j_password=jasperadmin" style="width:100%;height:100%;border:none;"></iframe>';
        
        var panel=Ext.getCmp('center-panel'); 
        var winpcListaPrecios=Ext.create('Erp.view.almacenes.item.WindowListaItem',{
            title:'Kardex Cronologico por item',
            alias:'WindowReporte',
            width:750,
            items:[panelr],
            maximizable:true
        });
        panel.add(winpcListaPrecios);
        /*Ext.Ajax.request({
            url:"http://192.168.1.150:8000/jasperserver/rest/login?j_username=jasperadmin&j_password=jasperadmin",
            method:'POST',
            //params:{j_username:'jasperadmin',j_password:'jasperadmin'},
            success:function(res){
                
            }
        });*/
        Ext.define('login',{
            extend:'Ext.data.Model',
            fields:['id']
        });
        Ext.define('login',{
            extend:'Ext.data.Store',
            model:'login',
            proxy:{
              type:'rest',
              url:'http://192.168.1.150:8000/jasperserver/rest/login?j_username=jasperadmin&j_password=jasperadmin',
              reader:{
                type:'xml',
                root:'login'
              }
            },
            autoLoad:false
        });
        Ext.define('report',{
            extend:'Ext.data.Model',
            fields:['id']
        });
        Ext.define('report',{
            extend:'Ext.data.Store',
            model:'report',
            proxy:{
              type:'rest',
              url:'http://192.168.1.150:8000/jasperserver/rest/report/erpreports/reports/inventarios/kardexporitem/?RUN_OUTPUT_FORMAT=pdf',
              reader:{
                type:'xml',
                root:'report'
              },
              actionMethods: {
                read: 'PUT',
                update:'PUT',
                write:'PUT'
            },
            },
            autoLoad:false
        });
        winpcListaPrecios.show();
        var store=Ext.create('login',{});
        var storere=Ext.create('report',{});

        store.load({
          callback:function(){
            panelr.update(html);
            console.log(panelr);
          }
        });
        panelr.update(html);
        //storere.load();
        
        
        
       // panelr.update(html);
        
    }
   
});