/*
 * @Autor: Max marcelo jimenez T
 * @Email: maxmjt@gmail.com
 */
Ext.define('Erp.view.almacenes.listaprecios.FormAddPrecios',{
    extend: 'Ext.form.Panel',
    alias : 'widget.formaddprecios',
    margin: '5 5 5 5',
    //height: 119,
    hidden:true,
    frame:true,
    border:0,
    //disabled:true,
    //collapsible:true,
    //collapsed:false,
    //colspan:1,
    width:350,
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
                    name:'iditemlistprice',
                    anchor: '100%',
                    allowBlank: true,
                    hidden:true
                }
                ,{
                    xtype: 'textfield',
                    fieldLabel: 'Nombre',
                    name:'nombre',
                    anchor: '100%',
                    allowBlank: false
                },
                {
                    xtype: 'numberfield',
                    fieldLabel: 'Porcentaje',
                    name:'porcentaje',
                    anchor: '100%',
                    allowBlank: false
                },
                {
                    xtype: 'button',
                    text: 'Guardar',
                    option: 'listaAdd',
                    handler: function() {
                        var formlistaprecios = this.up('form');
                        var form = this.up('form').getForm();
                        if (form.isValid()) {
                            form.submit({
                                url: 'data/classes/sis_erp_item_list_price.php',
                                params: {xaction:'createlistaprecio'},
                                success: function(form, action) {
                                   Ext.Msg.alert('Success', action.result.msg);
                                   //console.log(formlistaprecios);
                                   var combo=formlistaprecios.up('window').down('combobox');
                                    combo.getStore().load();
                                },
                                failure: function(form, action) {
                                    Ext.Msg.alert('Failed', action.result.msg);
                                }
                            });
                        }
                    }
                    
                },
                {
                    xtype: 'button',
                    text: 'Cancelar/Atras',
                    option: 'listaCancel',
                    handler: function() {
                        
                    }
                }
            ]
        }
    ],
    
    initComponent: function() {
        var thiss = this;
        thiss.callParent(arguments);
    }

    
    
});