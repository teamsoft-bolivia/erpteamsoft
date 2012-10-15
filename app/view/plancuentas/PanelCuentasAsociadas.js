/*
 * @Autor: Max marcelo jimenez T,Crithian Valencia, Pablo Garcia Guaman
 * @Email: maxmjt@gmail.com, fox_tian@hotmail.com ,garcia_guaman_pablo@hotmail.com
 */



Ext.define('Erp.view.plancuentas.PanelCuentasAsociadas',{
     requires:['Erp.store.StoreType'],
     extend         : 'Ext.panel.Panel',
     bodyPadding    : 1,
     alias          : 'widget.panelcuentasasociadas',
     flex           : 1,
	 idaccountplan	: '',
	 accountcode	: '',
	 accountname	: '',
	 thiss			: this,
	 layout         : {
                        type    : 'vbox',
                        align   : 'stretch'
      },
     
	getIdaccountplan	: function () {
		return this.idaccountplan;
	
	},
	getAccountname	: function () {
		return this.accountname;
	 },
	 setPanelAccountValues : function (id,code,name){
		this.idaccountplan=id;
		this.accountcode=code;
		this.accountname=name;
		this.down('fieldset').getComponent(0).setValue(id);
		this.down('fieldset').getComponent(1).setValue(code);
		this.down('fieldset').getComponent(2).setValue(name);
		
		
	 
	 },
      
     initComponent  : function (){
                 this.items=[
                      {
                        xtype   : 'fieldset',
                        defaults : {
                                    labelWidth: 120,
                                    layout:'anchor'
                        },
                        items   : [
                            {
                                xtype       : 'textfield',
                                fieldLabel  : 'idaccountplan',
                                name        : 'idaccountplan',
                                //id			: 'idaccountplan',
                                anchor      : '90%',
                                value		: '',
                                allowBlank  : false,
                                readOnly    : true,
                                hidden      : true
                            },{
                                xtype       : 'textfield',
                                fieldLabel  : 'Codigo de la Cuenta',
                                name        : 'accountcode',
                                //id			: 'accountcode',
                                anchor      : '90%',
				value		: '',
                                allowBlank  : false,
                                readOnly    : true
                            },{
                                xtype       : 'textfield',
                                fieldLabel  : 'Nombre de la Cuenta',
                                name        : 'nameaccountplan',
                                value		: '',
                                anchor      : '90%',
                                allowBlank  : false,
                                readOnly    : true
                            },{
                                xtype       :'combobox',
                                store       :Ext.create('Erp.store.StoreType',{}),
                                fieldLabel  : 'Tipo de Entidad',
                                name        : 'entidad',
                                valueField  :'alias',
                                displayField:'type',
                                queryMode   :'local',
                                allowBlank  : false,
                                option      : 'comboTipoEntidad'
                            }
                        ]
                        
                      }
                    ];
		 
		 this.callParent();
                 this.down('fieldset').getComponent(0).setValue(this.idaccountplan);
		 this.down('fieldset').getComponent(1).setValue(this.accountcode);
		 this.down('fieldset').getComponent(2).setValue(this.accountname);

     }
     
    
    
    
    
});
