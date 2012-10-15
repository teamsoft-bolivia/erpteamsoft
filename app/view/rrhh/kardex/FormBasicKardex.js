
/*
 * @Autor: Pablo Garcia guaman
 * @Email: garcia_guaman_pablo@hotmail.com
 */

Ext.define('Erp.view.rrhh.kardex.FormBasicKardex', {
    requires:[],
    extend: 'Ext.form.Panel',
    alias:'widget.formbasickardex',
    frame: true,
    height: 185,//209,
    margin: 5,
    layout: {
                type: 'column'
             },
    bodyPadding: 5,
    initComponent: function() {
        var me = this;
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
            //margin: '0 10 0 10',
            labelWidth: 60,
            //flex        : 1,
            listConfig:{
                    width:200//

            }/*,
            listeners   :{
                select:function(cbo,records,eOpts){
                   
                   txtcode.setValue(records[0].data.code);
                   //var panelphoto=window.down('panel[option=photo]');
                   var rdm=Math.random()*100;
                   rdm=Math.round(rdm);
                   panelphoto.update('<a><img src="data/dataimages/personal/'+records[0].data.photo+'?'+rdm+'" height="100%" width="100%"></a>');
                   
                }
            }*/
        });
        var txtcode = Ext.create('Ext.form.field.Text',{
            fieldLabel  : 'Codigo',
            name        : 'code'
        });
        
        var txtphoto = Ext.create ('Ext.form.field.Text',{
            fieldLabel: 'photo',
            name:'photo',
            hidden:false
         });
         var panelphoto=Ext.create('Ext.panel.Panel',{
            height: 130,
            //width:147,
            margin:'0 0 5 0',
            option:'photo' 
             
         });
         
        
        
        Ext.applyIf(me, {
                            
                            items: [
                                {
                                    xtype: 'fieldset',
                                    columnWidth: 0.20,
                                    height: 170,
                                    margin: '0 5 0 0',
                                    title: 'Fotografía',
                                    items: [
                                        panelphoto
//                                        {
//                                            xtype: 'panel',
//                                            height: 130,
//                                            //width:147,
//                                            margin:'0 0 5 0',
//                                            option:'photo' 
//                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    columnWidth: 0.8,
                                    height: 170,
                                    layout: {
                                        type: 'column'
                                    },
                                    title: 'Datos Empleado',
                                    items: [
                                        {
                                            xtype: 'fieldset',
                                            columnWidth: 0.6,
                                            border: 0,
                                            defaults:{
                                                anchor:'100%',
                                                xtype:'textfield'
                                             },
                                            items: [
                                                
                                                
                                               
                                                cboemployee,
                                                txtcode,
                                                txtphoto,
                                                {
                                                    xtype: 'combobox',
                                                    fieldLabel: 'Cargo',
                                                    name:'dnitype',
                                                    store:Ext.create('Erp.store.StoreType',{}),
                                                    valueField:'idtype',
                                                    displayField:'type',
                                                    editable:false,
                                                    queryMode:'local',
                                                    allowBlank:false
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'fieldset',
                                            columnWidth: 0.4,
                                            border: 0,
                                            margin: '0 0 0 5',
                                            items: [
                                               {
                                                    xtype: 'datefield',
                                                    labelWidth: 80,
                                                    fieldLabel: 'Fecha de Contratacion',
                                                    name:'birthdate',
                                                    allowBlank:false,
                                                    anchor:'90%'
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

