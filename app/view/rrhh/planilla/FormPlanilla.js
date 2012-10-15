/*
 * @Autor: Pablo Garcia guaman, Cristhian Valencia, Max Jimenez 
 * @Email: garcia_guaman_pablo@hotmail.com, fox_tian@hotmail.com
 */

Ext.define('Erp.view.rrhh.planilla.FormPlanilla', {
    extend  : 'Ext.form.Panel',
    alias   :'widget.formplanilla',
    frame   : true,
    margin  : 2,
    layout: {
              type: 'hbox',
              align : 'stretch'
    },
    initComponent: function() {
        var me = this;
         var store=Ext.create('Erp.store.almacenes.item.StoreListaItem',{
                remoteFilter:true
            });
        
        
         var cboemployee=Ext.create('Ext.form.field.ComboBox',{
            store       :Ext.create('Erp.store.rrhh.StoreCboEmployee',{}),
            name        :'idemployee',
            valueField  :'idemployee',
            displayField:'employeename',
            queryMode   :'remote',
            enableKeyEvents:true,
            minChars    :2,
            typeAhead   : false,
            hideTrigger : true,
            allowBlank  :true,
            fieldLabel  : 'Empleado',
            matchFieldWidth :false,
            forceSelection : true,
            margin: '0 10 0 10',
            labelWidth: 60,
            flex        : 1,
            listConfig:{
                    width:200

            },
            listeners   :{
                select:function(cbo,records,eOpts){
                   
                }
            }
        });
      
        
        var cbodepartamento=Ext.create('Ext.form.field.ComboBox',{
            store   :Ext.create('Erp.store.rrhh.StoreCboDepartaments',{}),
            name    :'idorganizationalchart',
            valueField  :'idorganizationalchart',
            displayField:'jobtitle',
            queryMode   :'local',
            allowBlank  : true,
            columnWidth : 0.4,
            fieldLabel  : 'Departamento',
            editable    : false,
            readOnly    : true,
            margin: '0 5 0 5',
            labelWidth: 80,
            flex        : 1,
           
            listeners   :{
                select:function(cbo,records,eOpts){
                   
                   
                }
            }
        });
        
           var cboperiodo=Ext.create('Ext.form.field.ComboBox',{
            store   :Ext.create('Erp.store.StoreCboPeriod',{}),
            name    :'idperiod',
            valueField  :'idperiod',
            displayField:'alias',
            queryMode   :'local',
            allowBlank  :true,
            fieldLabel  : 'Periodo',
            editable    : false,
            margin: '0 10 0 10',
            labelWidth: 50,
            width        : 150,
            listeners   :{
                select:function(cbo,records,eOpts){
                 
                   
                }
            }
        });
        
        Ext.applyIf(me, {
            items: [
                    
                    {
                    xtype   : 'fieldset',
                    flex    : 1,
                   
                    layout  : {
                            type: 'vbox',
                            align : 'stretch'
                    },
                    
                    title   : 'Filtros',
                    items   : [
                        {
                            xtype   : 'fieldcontainer',
                            flex    : 1,
                            height  : 26,
                            layout  : {
                                align   : 'stretch',
                                pack    : 'center',
                                type    : 'hbox'
                                
                            },
                            items   : [
                                 cboemployee,
                                cbodepartamento,
                                cboperiodo
                            ]
                        },
                        {
                            xtype   : 'fieldcontainer',
                            flex    : 1,
                            height  : 25,
                            layout  : {
                                align   : 'stretch',
                                pack    : 'end',
                                type    : 'hbox'
                                
                            },
                            items   : [
                                {
                                    xtype    : 'button',
                                    text    : 'Limpiar Campos',
                                    option  : 'btnlimpiarplanilla',
                                    margin  : '0 15 0 0',
                                    //iconCls : 'icon-view',
                                    border: 1,
                                    style: {
                                        borderColor: 'blue',
                                        borderStyle: 'solid'
                                    }

                                },
                                {
                                    xtype : 'button',
                                    text  : 'Mostrar Planilla',
                                    option : 'btnmostrarplanilla',
                                    //iconCls : 'icon-view',
                                    border: 1,
                                    style: {
                                        borderColor: 'blue',
                                        borderStyle: 'solid'
                                    }

                                }
                                
                            ]
                        }
                       
                        
                    ]
                }
            ]
        });
        me.callParent(arguments);
    }

});