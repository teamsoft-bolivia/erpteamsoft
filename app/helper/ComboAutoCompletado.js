/*
 * @Autor: Pablo Garcia guaman, Cristhian Valencia  
 * @Email: garcia_guaman_pablo@hotmail.com, fox_ian@hotmail.com
 */

Ext.define("Erp.helper.ComboAutoCompletado",{
	
        extend      : 'Ext.form.field.ComboBox',
        config      : {
                store           : '',
                name            : '',
                displayField    : '',
                valueField      : '',
                queryMode       : 'remote',
                triggerAction   : 'remote',
                matchFieldWidth : false,
                allowBlank      : false,
                enableKeyEvents : true,
                minChars        : 3,
                typeAhead       : false,
                currentRow      : 0,
                fieldLabel      : '',
                forceSelect     : true
            
        },
        constructor     : function (options){
            this.initConfig(options);
          

        },
        initComponent: function() {
            
             this.callParent();
         }
       
        
      
});