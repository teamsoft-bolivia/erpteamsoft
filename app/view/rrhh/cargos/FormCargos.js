

Ext.define('Erp.view.rrhh.cargos.FormCargos',{
   extend       : 'Ext.form.Panel',
   alias        : 'widget.formcargos',
   requires     : [
                    
                  ],
   frame        : true,
   height       : 410,
   margin       : '5 5 5 0',
   layout: {
        align: 'stretch',
        type: 'vbox'
   },
   
   initComponent: function(){
       var thiss = this;
       thiss.items = thiss.buildItems();
       Ext.log(thiss.items);
       this.callParent(arguments);
   },
   
    buildItems : function(){
        return[
            {
                xtype       : 'fieldset',
                fieldset    : 'datoscargo',
                flex        : 1.1,
                border      : null,
                items: [
                    {
                        xtype   : "fieldset",
                        title   : 'Datos baicos',
                        layout  : 'column',
           
                        items:[
                            {
                                xtype   : 'fieldset',
                                border  : null,
                                items:[
                                    {
                                        xtype       : 'textfield',
                                        fieldLabel  : 'Departamento'
                                    },
                                    {
                                        xtype       : 'textfield',
                                        fieldLabel  : 'Cargo superior'
                                    },
                                    {
                                        xtype       : 'textfield',
                                        fieldLabel  : 'Nombre cargo'
                                    }
                                ]   
                            },
                            {
                                xtype   : 'fieldset',
                                border  : null,
                                items:[
                                    {
                                        xtype       : 'textfield',
                                        fieldLabel  : 'Nro. vacantes'
                                    },
                                    {
                                        xtype       : 'checkboxfield',
                                        fieldLabel  : 'Activo'
                                    }
                                ]   
                            }  
                        ]
                    },
                    {
                        xtype   : 'fieldset',
                        items   :[
                            {
                                xtype   : "tabpanel",
                                items:[
                                    {
                                        title:  'Funciones'
                                    },
                                    {
                                        title:  'Rol y responsabilides'
                                    },
                                    {
                                        title:  'Atribuciones'
                                    },
                                    {
                                        title:  'Perfil'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]  
    }
});