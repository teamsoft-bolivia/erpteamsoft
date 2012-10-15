
/*
 * @Autor: Pablo Garcia guaman
 * @Email: garcia_guaman_pablo@hotmail.com
 */

Ext.define('Erp.view.Login',{
        extend  :   'Ext.window.Window',
        alias   :   'widget.login',
        title   :   'Acceso',
        layout  :   'fit',
        height  :   100,
        width   :   450,
        closable:   false,
        margins :   '5 5 5 5',
        modal   :   true,
        headerPosition  : 'left',
        items   :   [{
                        xtype   :   'form',
                        //height  :   500,
                        //width   :   500,
                        bodyStyle: "background-image:url('data/dataimages/items/cadena.png')",
                        
                        border  :   false,
                        items   :   [{
                                        xtype:'fieldset',
                                        columnWidth: 0.5,
                                        defaultType: 'textfield',
                                        defaults: {
                                            anchor: '100%',
                                            labelWidth:120
                                        },
                                        layout: 'anchor',
                                        height:150,
                                        border:false,
                                        padding: '20 10 0 10',
                                        items :[
                                                {	
                                                        xtype:'textfield',
                                                        fieldLabel: 'Usuario',
                                                        name: 'login',
                                                        allowBlank:false,
                                                        emptyText:'Usuario...',
                                                        labelCls : 'letralogin'
                                                }, {
                                                        xtype:'textfield',
                                                        inputType:'password',
                                                        fieldLabel: 'Password',
                                                        name: 'password',
                                                        allowBlank:false,
                                                        emptyText:'Password...',
                                                        labelCls : 'letralogin'
                                                }
                                                ]
					}]
                        
                    }],
        dockedItems:[{
                        xtype:'toolbar',
                        dock:'right',
                        items:[{
                                    xtype:'button',
                                    text:'Aceptar',
                                    scale:'large',
                                    //id:'acept',
                                    width:100,
                                    pressed:true,
                                    option:'aceptar'
                                },{
                                    xtype:'button',
                                    text:'Cancelar',
                                    width:100,
                                    scale:'large',
                                    pressed:true,
                                    option:'cancelar'
                                }]
                    }],
       initComponent: function() {
           var me = this;
           
            
           me.callParent(arguments);
       }
});


