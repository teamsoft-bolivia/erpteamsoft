/*
 * @Autor: Max marcelo jimenez T
 * @Email: maxmjt@gmail.com
 */

Ext.define('Erp.view.almacenes.listaprecios.FormListaPrecios',{
    extend: 'Ext.form.Panel',
    alias : 'widget.formlistaprecios',
    margin: '5 5 5 5',
    //colspan:1,
    frame:true,
    border:0,
    height: 50,
    width: 715,
    activeItem: 0,
    bodyPadding: 10,
    title: '',
    layout: {
             type: 'column'
            },
    items: [
        
    ],
    
    initComponent: function() {
        var thiss = this;
        thiss.callParent(arguments);
    }

    
    
});