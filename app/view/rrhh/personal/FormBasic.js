
/*
 * @Autor: Pablo Garcia guaman
 * @Email: garcia_guaman_pablo@hotmail.com
 */

Ext.define('Erp.view.rrhh.personal.FormBasic', {
    requires:[],
    extend: 'Ext.form.Panel',
    alias:'widget.formbasic',
    frame: true,
    height: 215,//209,
    margin: 5,
    layout: {
                type: 'column'
             },
    bodyPadding: 5,
    initComponent: function() {
        var me = this;
        
        Ext.applyIf(me, {
                            
                            items: [
                                {
                                    xtype: 'fieldset',
                                    columnWidth: 0.20,
                                    height: 200,
                                    margin: '0 5 0 0',
                                    title: 'Fotografía',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            height: 130,
                                            //width:147,
                                            margin:'0 0 5 0',
                                            option:'photo' 
                                        },
                                        {
                                            xtype: 'filefield',
                                            anchor: '100%',
                                            name:'upphoto'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    columnWidth: 0.8,
                                    height: 200,
                                    layout: {
                                        type: 'column'
                                    },
                                    title: 'Datos Basicos',
                                    items: [
                                        {
                                            xtype: 'fieldset',
                                            columnWidth: 0.5,
                                            border: 0,
                                            defaults:{
                                                anchor:'100%',
                                                xtype:'textfield'
                                             },
                                            items: [
                                                {
                                                    xtype: 'numberfield',
                                                    fieldLabel: 'idperson',
                                                    name:'idperson',
                                                    hidden:true
                                                },
                                                {
                                                    xtype: 'numberfield',
                                                    fieldLabel: 'idemployee',
                                                    name:'idemployee',
                                                    hidden:true
                                                },
                                                {
                                                    fieldLabel: 'photo',
                                                    name:'photo',
                                                    hidden:true
                                                },
                                                {
                                                    fieldLabel: 'Codigo',
                                                    name:'code'
                                                },
                                                {
                                                    fieldLabel: 'Nombres:',
                                                    name:'name',
                                                    allowBlank:false
                                                },
                                                {
                                                    fieldLabel: 'Apellidos',
                                                    name:'lastname',
                                                    allowBlank:false
                                                },
                                                {
                                                    xtype: 'combobox',
                                                    fieldLabel: 'Tipo Documento',
                                                    name:'dnitype',
                                                    store:Ext.create('Erp.store.StoreType',{}),
                                                    valueField:'idtype',
                                                    displayField:'type',
                                                    editable:false,
                                                    queryMode:'local',
                                                    allowBlank:false
                                                },
                                                {
                                                    xtype: 'fieldcontainer',
                                                    height: 28,
                                                    width: 515,
                                                    layout: {
                                                        type: 'column'
                                                    },
                                                    fieldLabel: 'Nro. Documento',
                                                    items: [
                                                        {
                                                            xtype: 'numberfield',
                                                            margin: '0 3 0 0',
                                                            width: 134,
                                                            name:'dni',
                                                            hideTrigger:true,
                                                            allowBlank:false
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            width: 51,
                                                            name:'dnilocation',
                                                            allowBlank:false
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'fieldset',
                                            columnWidth: 0.5,
                                            border: 0,
                                            margin: '0 0 0 5',
                                            items: [
                                                {
                                                    xtype: 'datefield',
                                                    anchor: '100%',
                                                    fieldLabel: 'Fecha Nacimiento',
                                                    name:'birthdate',
                                                    allowBlank:false
                                                },
                                                {
                                                    xtype: 'combobox',
                                                    anchor: '100%',
                                                    fieldLabel: 'Sexo',
                                                    name:'gender',
                                                    store:Ext.create('Erp.store.StoreType',{}),
                                                    valueField:'idtype',
                                                    displayField:'type',
                                                    editable:false,
                                                    queryMode:'local',
                                                    allowBlank:false
                                                },
                                                {
                                                    xtype: 'combobox',
                                                    anchor: '100%',
                                                    fieldLabel: 'Estado Civil',
                                                    name:'maritalstatus',
                                                    store:Ext.create('Erp.store.StoreType',{}),
                                                    valueField:'idtype',
                                                    displayField:'type',
                                                    editable:false,
                                                    queryMode:'local',
                                                    allowBlank:false
                                                },
                                                {
                                                    xtype: 'combobox',
                                                    anchor: '100%',
                                                    fieldLabel: 'Estado',
                                                    name:'state',
                                                    store:Ext.create('Erp.store.StoreType',{}),
                                                    valueField:'idtype',
                                                    displayField:'type',
                                                    editable:false,
                                                    queryMode:'local',
                                                    allowBlank:false
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

