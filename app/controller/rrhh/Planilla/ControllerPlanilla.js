/*
/*
 * @Autor: Pablo Garcia Guaman, Cristhian Valencia F,Max Jimenez
 * @Email:garciaguamanpablo@gmail.com, fox_tian@hotmail.com
 */


Ext.define('Erp.controller.rrhh.planilla.ControllerPlanilla', {
    extend: 'Ext.app.Controller',
   
    models: ['rrhh.planilla.ModelPlanilla',
             'rrhh.ModelCboEmployee',
             'rrhh.ModelCboDepartaments',
             'ModelCboPeriod'
            ],
    stores: ['rrhh.planilla.StorePlanilla',
             'rrhh.StoreCboEmployee',
             'rrhh.StoreCboDepartaments',
             'StoreCboPeriod'
            ],
    views: [
            'rrhh.planilla.WindowPlanilla',
            'rrhh.planilla.FormPlanilla',
            'rrhh.planilla.GridPlanillaDetalle'
            
   ],
  
    init: function(e) {
        
        this.control({
            
              'windowplanilla':{
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
               'formplanilla button[option=btnmostrarplanilla]' : {
                   click : function (button){
                        var thiss=this;
                        var formplanilla=button.up('formplanilla');
                        var idemployee=formplanilla.down('combo[name=idemployee]').getValue();
                        var iddepartament=formplanilla.down('combo[name=idorganizationalchart]').getValue();
                        var idperiod=formplanilla.down('combo[name=idperiod]').getValue();
                        var window=button.up('windowplanilla');
                        thiss.mostrarPlanilla(window,formplanilla,idemployee,iddepartament,idperiod);
                      
                   }
                   
               },
               'formplanilla button[option=btnlimpiarplanilla]' : {
                   click : function (button){
                        var thiss=this;
                        var formplanilla=button.up('formplanilla');
                       
                        var window=button.up('windowplanilla');
                        var gridplanilla=window.down('gridplanilladetalle');
                        gridplanilla.getStore().removeAll();
                        formplanilla.getForm().reset();
                       
                        
                      
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
        var panelform=window.down('panel[alias=contentplanillaform]');
        var paneldetail=window.down('tabpanel[alias=contentplanilladetail]');
        var formplanilla=Ext.create('Erp.view.rrhh.planilla.FormPlanilla',{});
        var gridplanilladetalle=Ext.create('Erp.view.rrhh.planilla.GridPlanillaDetalle',{});
      
               
       
        panelform.add(formplanilla);
        paneldetail.add(gridplanilladetalle);
        paneldetail.setActiveTab(gridplanilladetalle);
        gridplanilladetalle.getStore().getProxy().extraParams.yaction='readpayrol';
        //gridplanilladetalle.getStore().load();
        
        var cbodepartaments=formplanilla.down('combo[name=idorganizationalchart]');
        cbodepartaments.getStore().load();
        
        var cboperiod=formplanilla.down('combo[name=idperiod]');
        cboperiod.getStore().load();
       
       

    },
     saldoAnterior   : function (store){
        var thiss=this;
        var saldo=0;
        
        store.each(function (record){
           saldo+=record.data.quantity; 
          
        });
        return saldo;
    },
    mostrarPlanilla    :    function (window,formplanilla,idemployee,iddepartament,idperiod){
       var thiss=this;
       var griddetail=window.down('gridplanilladetalle');
       var store=griddetail.getStore();
       var btnimprimir=window.down('gridplanilladetalle button[option=btnimprimirplanilla]');
       store.getProxy().extraParams.idemployee=idemployee;
       store.getProxy().extraParams.iddepartament=iddepartament;
       store.getProxy().extraParams.idperiod=idperiod;
       store.load();
       
       
        
       
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
               
            });
        var login='<iframe src="http://192.168.1.150:8000/jasperserver/rest/login?j_username=jasperadmin&j_password=jasperadmin" style="width:100%;height:100%;border:none;"></iframe>';
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
        var header={Host:'Host 192.168.1.150:8000',
                    Connection:'keep-alive'};
        Ext.Ajax.request({
            defaultHeaders:header,
            url:"http://192.168.1.150:8000/jasperserver/rest/login",
            method:'GET',
            params:{j_username:'jasperadmin',j_password:'jasperadmin'},
            success:function(res){
                
            }
        });
        
        var winpcListaPrecios=Ext.create('Erp.view.almacenes.item.WindowListaItem',{
            title:'Kardex Cronologico por item',
            alias:'WindowReporte',
            width:750,
            items:[panelr],
            maximizable:true
        });
        var panel=Ext.getCmp('center-panel');
        panel.add(winpcListaPrecios);
        
        winpcListaPrecios.show();
        //panelr.update(login);
        panelr.update(html);
    }
   
});