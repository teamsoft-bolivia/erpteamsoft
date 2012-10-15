/*
 * @Autor: Pablo Garcia guaman, Cristhian Valencia, Max Jimenez 
 * @Email: garcia_guaman_pablo@hotmail.com, fox_tian@hotmail.com
 */

Ext.define('Erp.view.almacenes.kardex.FormKardexItem', {
    extend  : 'Ext.form.Panel',
    alias   :'widget.formkardexitem',
    
    frame   :true,
    margin  :'2',
    height: 170,
    width: 708,
    layout: {
              type: 'auto'
    },
    initComponent: function() {
        var me = this;
         var store=Ext.create('Erp.store.almacenes.item.StoreListaItem',{
                remoteFilter:true
            });
         
        var cboitem=Ext.create('Ext.form.field.ComboBox',{
            store   :Ext.create('Erp.store.almacenes.item.StoreListaItem',{remoteFilter:true}),
            name    :'iditem',
            queryMode   :'remote',
            displayField:'code',
            valueField  :'iditem',
            forceSelection :  true,
            matchFieldWidth : false,
            allowBlank      : false,
            enableKeyEvents : true,
            minChars        : 2,
            typeAhead       : false,
            hideLabel       : false,
            hideTrigger     : true,
            columnWidth     : 0.6,
            fieldLabel      : 'Codigo Item',
            margin  : '0 10 0 10',
            listeners:{
                focus:function(cbo){
                    cbo.getStore().getProxy().extraParams.iditem=cbo.getValue();
                    cbo.getStore().load();
                    cbo.selectText();
                },
                select:function(cbo,records,eOps){
                    me.code=records[0].data.code;
                    me.description=records[0].data.description;
                    me.iditem=records[0].data.iditem;
                    cbounit.setValue('');
                    cbounit.getStore().getProxy().extraParams={xaction:'readcbo',iditem:records[0].data.iditem};
                    cbounit.getStore().load();
                    fieldtxtdescription.setValue(records[0].data.description);
                    cbovaloracion.setValue(records[0].data.valuation);
                }
            },
            listConfig:{
                width:350,
                itemTpl : Ext.create('Ext.XTemplate',
                    '<div style="float:left;width:40%;">{code}{valuation}</div> <div style="overflow:hidden;white-space: pre;">{description}</div>'
                )
            }
        });
        cboitem.getStore().getProxy().extraParams={xaction:'readcboitemkardex',yaction:'',iditem:''}
        cboitem.getStore().load();
        
         var cbounit=Ext.create('Ext.form.field.ComboBox',{
            store   :Ext.create('Erp.store.almacenes.StoreItemUnidades',{}),
            name    :'idunit',
            valueField  :'idunit',
            displayField:'unitname',
            queryMode   :'local',
            allowBlank  :false,
            columnWidth : 0.4,
            fieldLabel  : 'Unidad',
            editable    : false,
            margin      : '0 10 0 20',
            listeners   :{
                select:function(cbo,records,eOpts){
                    me.idunit=records[0].data.idunit;
                    me.unitname=records[0].data.unitname;
                   
                }
            }
        });
        
        var  fieldtxtdescription= Ext.create('Ext.form.field.Text',{
                //columnWidth: 0.5,
                margin  : '0 10 0 10',
                columnWidth : 0.6,
                fieldLabel  : 'Descripcion',
                name        : 'description',
                allowBlank  : true,
                readOnly    : true
            
        });
        
         var  cbovaloracion= Ext.create('Ext.form.field.ComboBox',{
                                         
                store       :Ext.create('Erp.store.StoreType',{}),
                valueField  :'idtype',
                displayField:'type',
                fieldLabel  : 'Tipo Valoraci&oacute;n',
                editable    :false,
                name        :'valuation',
                queryMode   :'local',
                allowBlank:false,
                margin      : '0 10 0 20',
                columnWidth : 0.4,
                hideTrigger : true,
                readOnly    : true,
                listeneres  :{ 
                    select : function (cbo,records,eOpts){
                        me.idvaloracion=records[0].data.idtype;
                        me.valoracion=records[0].data.type;
                        
                    }
                }
                
            
        });
        cbovaloracion.getStore().getProxy().extraParams={xaction:'readbytype',type:'tipo_valoracion'};
        cbovaloracion.getStore().load();                    
        
        var cbostore = Ext.create('Ext.form.field.ComboBox',{
          
            store       :Ext.create('Erp.store.almacenes.maestroalmacen.StoreListaAlmacenes',{}),
            fieldLabel  : 'Almacen',
            name        :'idstore',
            valueField  :'idstore',
            displayField:'storename',
            queryMode   :'local',
            editable    : false,
            columnWidth : 0.4,
            margin      : '0 5 0 5',
            labelWidth  : 70,
            allowBlank  :false,
             listeners  :{
                     focus   :function(cbo){
                        cbo.getStore().load();
                        cbo.selectText();
                    },
                    select : function (cbo,records,eOpts){
                        me.idstore=records[0].data.idstore;
                        me.storename=records[0].data.storename;
                    }
             }
        });
        
        Ext.applyIf(me, {
            items: [
                   {
                    xtype   : 'fieldset',
                    height  : 100,
                    margin  : '2 2 2 5',
                    padding : 5,
                    defaults: 'labelWidth:100',
                    layout  : {
                        align   : 'stretch',
                        type    : 'vbox'
                    },
                    title   : 'Datos Basicos',
                    items   : [
                        {
                            xtype   : 'fieldcontainer',
                            margin  : '5 0 5 0',
                            padding : 0,
                            layout: {
                                    type: 'column'
                            },
                            labelPad: 0,
                            items   : [
                               cboitem,
                               cbounit
                            ]
                        },
                        {
                            xtype   : 'fieldcontainer',
                            margin  : '5 0 5 0',
                            padding : 0,
                            width   : 650,
                            layout  : {
                                type    : 'column'
                               
                            },
                            labelPad    : 0,
                            items       : [
                                fieldtxtdescription,
                                cbovaloracion
//                               
                            ]
                        }
                    ]
                },
                {
                    xtype   : 'fieldset',
                    height  : 50,
                    padding : 2,
                    margin  : '2 2 2 5',
                    layout  : {
                            type: 'column'
                    },
                    defaults : {
                        
                         labelWidth : 70
                    },
                    title   : 'Filtros',
                    items   : [
                        cbostore,
                        
                        {
                            xtype       : 'datefield',
                            columnWidth : 0.3,
                            margin      : '0 5 0 5',
                            fieldLabel  : 'Fecha Inicial',
                            name        : 'fechainicial',
                            allowBlank  : false,
                            listeners   : {
                                select : function(field,value,eOpts){
                                    //me.fechaini=value;
                                    //console.log(me.fechaini);
                                }
                            }
                        },
                        {
                            xtype       : 'datefield',
                            columnWidth : 0.3,
                            margin      : '0 0 0 5',
                            fieldLabel  : 'Fecha Final',
                            name        : 'fechafinal',
                            allowBlank  :false,
                            listeners   : {
                                select : function(field,value,eOpts){
                                   // me.fechafin=value;
                                    //console.log(me.fechafin);
                                }
                            }
                        },
                        {
                            xtype : 'button',
                           
                            text  : 'Mostrar Kardex',
                            option : 'mostrarkardex',
                            margin: '0 5 0 5',
                            iconCls : 'icon-view',
                            border: 1,
                            style: {
                                borderColor: 'blue',
                                borderStyle: 'solid'
                            }
                                                  
                        }
                    ]
                }
            ]
        });
        me.callParent(arguments);
    }

});