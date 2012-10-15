/*
 * @Autor: Max marcelo jimenez T,Crithian Valencia, Pablo Garcia Guaman
 * @Email: maxmjt@gmail.com, fox_tian@hotmail.com ,garcia_guaman_pablo@hotmail.com
 */


Ext.define('Erp.controller.rrhh.personal.ControllerListaPersonal', {
    extend: 'Ext.app.Controller',
    stores: [],
    models: [],
    views: ['rrhh.personal.WindowPersonal',
            'rrhh.personal.FormBasic',
            'rrhh.personal.TabPanelDatosPersonal',
            'rrhh.personal.PanelDatosGenerales',
            'rrhh.personal.PanelDireccionPersonal',
            'rrhh.personal.PanelFormacionAcademica',
            'rrhh.personal.PanelExperienciaLaboral',
            'rrhh.personal.PanelRelacionBancaria',
            'rrhh.personal.PanelDatosGarantia',
            'rrhh.personal.PanelDatosContrato',
            'rrhh.personal.PanelIdiomas'
        ],
    init: function() {
        var thiss=this;
        thiss.control({
              'windowlistapersonal grid actioncolumn':{
                        click:this.editPersonal
              },
              'windowlistapersonal button[option=newpersonal]':{
                  click:this.newPersonalWindow
              }
        });
    },
    newPersonalWindow:function(button){
        var nuevopersonal=Ext.getCmp('nuevopersonal');
        if(nuevopersonal==undefined){
            var lista=button.up('panellistaitem');
            var newrecord=Ext.create('Erp.model.almacenes.item.ModelListaItem',{

            });
            this.personalWindow(newrecord,'N');
        }else{
            nuevopersonal.show();
        }
         
    },
    editPersonal:function(gridview,el,rowindex,colindex,e,record){
        var gridlist=gridview.up('gridpanel');
        console.log(gridlist);
        var m = e.getTarget().className.match(/\bicon-(\w+)\b/);
        if(m){
            switch(m[1]){
                case 'edit':
                    //console.log(record.data.iditem);
                    var editar=Ext.getCmp(record.data.idemployee+'-employee');
                    if(editar==undefined){
                        this.personalWindow(record,'R');
                    }else{
                        editar.show();
                    }
                break;
                
            }
        }
    },
   
    personalWindow:function(record,state){
        
        var idasignar;
        var recpersonal;
        if(state=="N"){
            recpersonal=Ext.create('Erp.model.rrhh.personal.ModelListaPersonal');
            idasignar='nuevopersonal';
        }else{
            recpersonal=record;
            idasignar=record.data.idemployee+'-employee';
        }
        var fp=Ext.getCmp('center-panel');
        var winpersonal=Ext.create('Erp.view.rrhh.personal.WindowPersonal',{id:idasignar,stateMode:state,record:recpersonal});
        var panel=Ext.create('Ext.panel.Panel',{
                    border: 0
                });
        var FormBasic=Ext.create('Erp.view.rrhh.personal.FormBasic',{});
        var panelDatGrls=Ext.create('Erp.view.rrhh.personal.PanelDatosGenerales');
        var tabpanel=Ext.create('Erp.view.rrhh.personal.TabPanelDatosPersonal',{});
        var paneldir=Ext.create('Erp.view.rrhh.personal.PanelDireccionPersonal',{});
        var panelformacademica=Ext.create('Erp.view.rrhh.personal.PanelFormacionAcademica',{});
        var panelidiomas=Ext.create('Erp.view.rrhh.personal.PanelIdiomas',{});
        var panelexper=Ext.create('Erp.view.rrhh.personal.PanelExperienciaLaboral',{});
        var panelrelbanca=Ext.create('Erp.view.rrhh.personal.PanelRelacionBancaria',{});
        var panelgarantia=Ext.create('Erp.view.rrhh.personal.PanelDatosGarantia',{});
        var panelcontrato=Ext.create('Erp.view.rrhh.personal.PanelDatosContrato',{});
        panel.add(FormBasic);
        winpersonal.add(panel);
        tabpanel.add(panelDatGrls);
        tabpanel.add(paneldir);
        tabpanel.add(panelcontrato);
        tabpanel.add(panelgarantia);
        tabpanel.add(panelformacademica);
        tabpanel.add(panelidiomas);
        tabpanel.add(panelexper);
        tabpanel.add(panelrelbanca);
        tabpanel.setActiveTab(0);
        winpersonal.add(tabpanel);
        fp.add(winpersonal);
        winpersonal.show();
            
    }
    
   
});




