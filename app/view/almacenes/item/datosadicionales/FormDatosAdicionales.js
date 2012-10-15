/*
 * @Autor: Max marcelo jimenez T,Crithian Valencia, Pablo Garcia Guaman
 * @Email: maxmjt@gmail.com, fox_tian@hotmail.com ,garcia_guaman_pablo@hotmail.com
 */
Ext.require('Erp.store.almacenes.StoreCategorias');
Ext.define('Erp.view.almacenes.item.datosadicionales.FormDatosAdicionales',{
    extend: 'Ext.form.Panel',
    alias : 'widget.formitemdatosadicionales',
    margin: '5 5 5 5',
   
    height:220,
    frame:true,
    //columnWidth: 0.4,
    initComponent: function() {
        var thiss = this;
         Ext.applyIf(thiss, {
            items: [
            {
                xtype: 'fieldset',
                //height: 180,
                margin: '0 5 0 5',
                padding: '5 5 5 5',
                title: '<b>Datos Adicionales</b>',
                defaults:{
                    anchor: '100%'
                },
                
                items: [
                    
                    
                {   xtype:'numberfield',
                    fieldLabel:'iditem',
                    name:'iditem',
                    readOnly:'true',
                    hidden:true
                },{   
		    xtype:'numberfield',
                    fieldLabel:'Stock Minimo',
                    name:'stockmin',
                    readOnly:'true',
                    hidden:false
                },{   
		    xtype:'numberfield',
                    fieldLabel:'Stock Ideal',
                    name:'stockideal',
                    readOnly:'true',
                    hidden:false
                },{   
		    xtype:'numberfield',
                    fieldLabel:'Stock Maximo',
                    name:'stockmax',
                    readOnly:'true',
                    hidden:false
                },{
                    xtype     : 'textareafield',
                    grow      : true,
                    name      : 'observation',
                    fieldLabel: 'Observaciones',
                    anchor    : '100%'
                }
               
            ]
            }]
         });
        
        
        thiss.callParent(arguments);
    }

    
    
});

