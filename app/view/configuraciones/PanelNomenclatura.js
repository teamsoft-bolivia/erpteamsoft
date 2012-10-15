/*
 * @Autor: Max jimenez
 * 
 */
Ext.define("Erp.view.configuraciones.PanelNomenclatura", {
    extend: "Ext.form.Panel",
    alias: 'widget.panelnomenclatura',
    title: '(1)->Nomenclatura de Cuentas',
    disabled : 'true',
    bodyPadding: 5,
    width: 300,
    height: 222,
    // The form will submit an AJAX request to this URL when submitted
    url: 'save-form.php',

    // Fields will be arranged vertically, stretched to full width
    layout: 'vbox',
    //defaults: {
     //   anchor: '100%'
    //},
    defaults: {
                    labelWidth: 70,
                    anchor: '100%',
                    layout: {
                        type: 'hbox'
                        //defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
                    }
                },
    // The fields
    //defaultType: 'container',
    items: [{
                        xtype: 'fieldcontainer',
                        fieldLabel: 'Codigo',
                        //combineErrors: true,
                        msgTarget: 'under',
                        defaults: {
                            hideLabel: true
                        },
                        items: [                            
                            {xtype: 'numberfield',fieldLabel: 'idconfiguration', name: 'idconfiguration', width: 40, allowBlank: false,hidden:true},
                            {xtype: 'textfield',fieldLabel: 'code', name: 'code', width: 200, allowBlank: false},                            
                            //,                            
                            //{xtype: 'textfield',fieldLabel: 'nivel 3', name: 'nivel-3', width: 48, allowBlank: false},                            
                            //{xtype: 'textfield',fieldLabel: 'nivel 4', name: 'nivel-4', width: 48, allowBlank: false},                            
                            //{xtype: 'textfield',fieldLabel: 'nivel 5', name: 'nivel-5', width: 48, allowBlank: false},                            
                            //{xtype: 'textfield',fieldLabel: 'nivel 6', name: 'nivel-6', width: 48, allowBlank: false}
                        ]
                    },
                    {
                        xtype: 'fieldcontainer',
                        fieldLabel: 'Incremento',
                        combineErrors: false,
                        defaults: {
                            hideLabel: true
                        },
                        items: [                            
                            {xtype: 'numberfield',fieldLabel: 'incremento', name: 'incremento', width: 200, allowBlank: false}//,
                            //{xtype: 'numberfield',fieldLabel: 'incre 2', name: 'incre-2', width: 40, allowBlank: false},                            
                            //{xtype: 'numberfield',fieldLabel: 'incre 3', name: 'incre-3', width: 48, allowBlank: false},                            
                            //{xtype: 'numberfield',fieldLabel: 'incre 4', name: 'incre-3', width: 48, allowBlank: false},                            
                            //{xtype: 'numberfield',fieldLabel: 'incre 5', name: 'incre-3', width: 48, allowBlank: false},                            
                            //{xtype: 'numberfield',fieldLabel: 'incre 6', name: 'incre-3', width: 48, allowBlank: false}
                        ]
                    },{
                        xtype: 'fieldcontainer',
                        fieldLabel: 'Formato',
                        combineErrors: false,
                        defaults: {
                            hideLabel: true
                        },
                        items: [
                                 {                                
                                width:          200,
                                xtype:          'combo',
                                mode:           'local',
                                value:          'mrs',
                                triggerAction:  'all',
                                forceSelection: true,
                                editable:       false,
                                fieldLabel:     'formato',
                                name:           'formato',
                                displayField:   'name',
                                valueField:     'value',
                                queryMode: 'local',
                                store:          Ext.create('Ext.data.Store', {
                                    fields : ['name', 'value'],
                                    data   : [
                                        {name : 'Separado x (.)',   value: '.'},
                                        {name : 'Separado x (-)',  value: '-'},
                                        {name : 'Numerico', value: 'numero'}
                                            ]
                                        })
                                    }
                        ]
                    }/*{
                columnWidth: .5,
                items: [
                    {xtype: 'component', html: 'Codigo', cls:'x-form-check-group-label'},
                    {xtype: 'textfield',fieldLabel: 'Nivel 1',name: 'first',allowBlank: true},
                    {xtype: 'textfield',fieldLabel: 'Nivel 2',name: 'first',allowBlank: true},
                    {xtype: 'textfield',fieldLabel: 'Nivel 3',name: 'first',allowBlank: true},
                    {xtype: 'textfield',fieldLabel: 'Nivel 4',name: 'first',allowBlank: true},
                    {xtype: 'textfield',fieldLabel: 'Nivel 5',name: 'first',allowBlank: true},
                    {xtype: 'textfield',fieldLabel: 'Nivel 6',name: 'first',allowBlank: true}
                    //{xtype: 'radiofield', boxLabel: 'Item 1', name: 'rb-cust', inputValue: 1},
                    //{xtype: 'radiofield', boxLabel: 'Item 2', name: 'rb-cust', inputValue: 2}
                ]
            },{
                columnWidth: .35,
                items: [
                    {xtype: 'component', html: 'Incremento', cls:'x-form-check-group-label'},
                    {xtype: 'numberfield',name: 'basic',value: 1,minValue: 1,maxValue: 125,width:50},
                    {xtype: 'numberfield',name: 'basic',value: 1,minValue: 1,maxValue: 125,width:50},
                    {xtype: 'numberfield',name: 'basic',value: 1,minValue: 1,maxValue: 125,width:50},
                    {xtype: 'numberfield',name: 'basic',value: 1,minValue: 1,maxValue: 125,width:50},
                    {xtype: 'numberfield',name: 'basic',value: 1,minValue: 1,maxValue: 125,width:50},
                    {xtype: 'numberfield',name: 'basic',value: 1,minValue: 1,maxValue: 125,width:50}
                    //{xtype: 'radiofield', boxLabel: 'A long item just for fun', name: 'rb-cust', inputValue: 3}
                ]
            }*/],

    // Reset and Submit buttons
    buttons: [/*{
        text: 'Reset',
        handler: function() {
            this.up('form').getForm().reset();
        }
    }, */{
        text: 'Guardar',
        formBind: true, //only enabled once the form is valid
        disabled: true,
        width: 80,
        height: 30,
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                    url: 'data/classes/sis_erp_configuration.php',
                    params: {xaction:'updatenomenclatura'},
                    success: function(form, action) {
                       Ext.Msg.alert('Success', action.result.msg);
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result.msg);
                    }
                });
            }
        }
    }]
});

