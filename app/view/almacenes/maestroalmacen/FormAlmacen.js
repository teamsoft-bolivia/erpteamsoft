/*
 * @Autor: Max marcelo jimenez T
 * @Email: maxmjt@gmail.com
 */
Ext.define('Erp.view.almacenes.maestroalmacen.FormAlmacen',{
    extend  : 'Ext.form.Panel',
    alias   : 'widget.formalmacen',
    requires: [
                'Erp.store.StoreCboCentroCostos',
                'Erp.store.StoreCboBranch',
                'Erp.store.StoreType'
                ],
    frame   : true,
    height  : 410,
    margin  : '5 5 5 0',
    layout: {
       align: 'stretch',
       type: 'vbox'
    },
    bodyPadding: 0,
    columnWidth: 0.6,
    initComponent: function() {
        var thiss = this;
       // thiss.dockedItems=thiss.buildDockedItems();
        thiss.items = thiss.buildItems();
        thiss.callParent(arguments);
    },
    buildItems  : function (){
        return [
            {
                xtype       : 'fieldset',
                title       : 'Datos Almacen',
                fieldset    : 'datosalmacen',
                flex        :1.1,
                items: [
                    {
                        xtype: 'numberfield',
                        fieldLabel: 'idstore',
                        name:'idstore',
                        anchor: '100%',
                        allowBlank: true,
                        hidden:true
                    }
                    ,{
                        xtype: 'textfield',
                        fieldLabel: 'Nombre',
                        name:'storename',
                        anchor: '100%',
                        allowBlank: false,
                        readOnly :true
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Descripcion',
                        name:'description',
                        anchor: '100%',
                        allowBlank: false,
                        readOnly :true
                    },
                     {
                        xtype: 'fieldcontainer',
                        layout: {
                            align: 'top',
                            type: 'hbox'
                        },
                        items: [
                            {
                                xtype   : 'combobox',
                                store   :Ext.create('Erp.store.StoreType',{storeId : 'storetipoalmacen'}),
                                //id      :'combo-tipoalmacen',
                                name    :'storetype',
                                fieldLabel  : 'Tipo de Almacen', 
                                queryMode   :'local',
                                displayField:'type',
                                valueField  :'idtype',
                                allowBlank  :false,
                                editable    : false,
                                anchor: '100%',
                                readOnly :true,
                                flex: 1
                            },
                            {
                                xtype   : 'button',
                                width   : 50,
                                autoWidth: false,
                                iconCls : 'btnnew',
                                align   : 'center',
                                option  : 'btnTipoAlmacen',
                                margins : '0 0 0 10'
                            }
                        ]
                     },
                    
                    {
                        xtype   : 'combobox',
                        store   :Ext.create('Erp.store.StoreCboBranch',{}),
                        name    :'idbranch',
                        fieldLabel  : 'Sucursal', 
                        queryMode   :'local',
                        displayField:'branch_name',
                        valueField  :'idbranch',
                        editable    : false,
                        allowBlank  :false,
                        anchor: '100%',
                        readOnly :true
      
                    },
                    {
                        xtype: 'checkboxfield',
                        fieldLabel: 'Activo',
                        name:'active',
                        anchor: '100%',
                        allowBlank: false,
                        readOnly :true
                    },
                    {
                        xtype   : 'combobox',
                        store   :Ext.create('Erp.store.StoreCboCentroCostos',{}),
                        name    :'costcenter',
                        fieldLabel  : 'Centro de costos', 
                        queryMode   :'local',
                        displayField:'accountcode',
                        valueField  :'idaccountplan',
                        triggerAction   :'all',
                        matchFieldWidth :false,
                        allowBlank  :false,
                        enableKeyEvents:true,
                        minChars    :3,
                        typeAhead   : false,
                        editable    : false,
                        listConfig  :{
                            width:300,
                            itemTpl : Ext.create('Ext.XTemplate',
                                '<div style="float:left;width:40%;">{accountcode}</div> <div style="overflow:hidden;white-space: pre;">{accountname}</div>'
                            )
                        },
                         anchor: '100%',
                         readOnly :true
      
                    }
                        
                ]
            },{
                xtype       : 'fieldset',
                fieldset    : 'encargados',
                title       : 'Encargados',
                flex        : 1,
                items       : []
            }
        ]
    },
    buildDockedItems  : function (){
        return [{
                xtype: 'toolbar',
                dock: 'top',
                layout: {
                type: 'hbox',
                align: 'stretch'
                },
                items: [{
                    xtype: 'buttongroup',
                    title: 'Edici&oacute;n',
                    columns: 4,
                    items: [
                        {
                            xtype: 'button',
                            text: 'Nuevo',
                            iconCls:'btnnew',
                            option:'btnNuevo'
                        },
                        {
                            xtype: 'button',
                            text: 'Guardar',
                            iconCls:'btnsave',
                            option:'btnGuardar'
                            //disabled:true
                        },
                        {
                            xtype: 'button',
                            text: 'Editar',
                            iconCls:'btnedit',
                            option:'btnEditar'
                        },
                        {
                            xtype: 'button',
                            text: 'Cancelar',
                            iconCls:'btncancel',
                            option:'btnCancelar'
                            //disabled:true
                        }
                    ]
               },
               {
                    xtype: 'buttongroup',
                    title: 'Herramientas',
                    columns: 1,
                    items   : [
                        {
                            xtype: 'button',
                            text: 'Tipo de Almacen',
                            iconCls:'btnnew',
                            option:'btnTipoAlmacen'
                            //disabled:true
                        }
                        
                    ]
               }]
        }]
        
    }

    
    
});