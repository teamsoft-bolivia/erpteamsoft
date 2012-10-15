/*
 * @Autor: Max marcelo jimenez T
 * @Email: maxmjt@gmail.com
 */
Ext.define('Erp.view.almacenes.proveedores.FormAddProveedores',{
    extend: 'Ext.form.Panel',
    alias : 'widget.formaddproveedores',
    margin: '5 5 5 5',
    //height: 119,
    //hidden:true,
    frame:true,
    border:0,
    //disabled:true,
    //collapsible:true,
    //collapsed:false,
    //colspan:1,
    width:328,
    bodyPadding: 10,
    title: '',
    items: [
        {
            xtype: 'fieldset',
            title: 'Adicionar',
            items: [
                {
                    xtype: 'numberfield',
                    fieldLabel: 'iditemlistprice',
                    name:'idprovider',
                    anchor: '100%',
                    allowBlank: true,
                    hidden:true
                }
                ,{
                    xtype: 'textfield',
                    fieldLabel: 'Nombre',
                    name:'providername',
                    anchor: '100%',
                    allowBlank: false,
                    readOnly :true
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Direccion',
                    name:'address',
                    anchor: '100%',
                    allowBlank: false,
                    readOnly :true
                },
                {
                    xtype: 'checkboxfield',
                    fieldLabel: 'Activo',
                    name:'active',
                    anchor: '100%',
                    allowBlank: false,
                    readOnly :true
                }
                
            ]
        }
    ],
    dockedItems     :[{
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
                                    option:'btnGuardar',
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
                                    option:'btnCancelar',
                                    //disabled:true
                                }
                            ]
                        }],
    initComponent: function() {
        var thiss = this;
        thiss.callParent(arguments);
    }

    
    
});