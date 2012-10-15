/* 
* @Autor: Max marcelo jimenez T
 * @Email: maxmjt@gmail.com
 */

Ext.define("Erp.view.configuraciones.almacenes.PanelGridModeloAsiento",{

		extend: "Ext.grid.Panel",
                alias: ['widget.panelgridmodeloasiento'],
		frame: true,
                height: 373,
                width: 644,
                title: 'Asiento->',
                idtipo:'',
                viewConfig: {
                    //Return CSS class to apply to rows depending upon data values
                    getRowClass: function(record, index) {
                        //console.log(record.get('debit_credit'));
                        var c = record.get('debit_credit');
                        if (c == 1) {
                            return 'debe';
                        } else if (c == 0) {
                            return 'haber';
                        }
                    }
                },
                tbar:['->',{
                pressed  :   true,
                text     :   'Agregar',
                tooltip  :   'Agregar',
                iconCls  :   'btnNew',
                option   :   'addtransaction'
                 }],
                initComponent	: function (){
                        var thiss = this;
                        var cboplancode=Ext.create('Ext.form.field.ComboBox',{
                            store:Ext.create('Erp.store.StorePlanCuentas',{
                                remoteFilter:false,
                                    proxy:{

                                        type: 'ajax',
                                        actionMethods: {
                                           read: 'POST'
                                       },
                                        extraParams:{
                                            xaction:'readcbocomposition',
                                            yaction:''
                                        },
                                        reader:{
                                                type:'json',
                                                root:'results',
                                                rootProperty: 'data',
                                                totalProperty:'total'
                                            },
                                        url: 'data/classes/sis_erp_account_plan.php'

                                    }}),
                            option:'cuentas123',
                            name:'codeeditor',
                            queryMode:'remote',
                            displayField:'accountcode',
                            valueField:'idaccountplan',
                            triggerAction:'remote',
                            matchFieldWidth:false,
                            allowBlank:false,
                            enableKeyEvents:true,
                            minChars:3,
                            typeAhead: false,
                            listConfig:{
                                width:300,
                                itemTpl : Ext.create('Ext.XTemplate',
                                    '<div style="float:left;width:40%;">{accountcode}</div> <div style="overflow:hidden;white-space: pre;">{accountname}</div>'
                                )
                            },
                             listeners:{
                                /*keyup:{
                                    fn: function(cbo,e,eOpts){//keyup  : thiss.prueba
                                        //console.log(cbo.getSubmitValue());
                                        cbo.getStore().getProxy().extraParams.accountcode='';
                                        cbo.getStore().getProxy().extraParams.query='';
                                        if ((e.getKey() === e.ENTER) || (e.getKey()==8) ||(e.getKey()>47 && e.getKey()<58) || (e.getKey()>63 && e.getKey()<91) || (e.getKey()>=96 && e.getKey()<123) || (e.getKey()==32))
                                        {
                                            if(cbo.getSubmitValue()!=null && cbo.getSubmitValue().length>=3)
                                            {
                                                 cbo.getStore().getProxy().extraParams.query=cbo.getSubmitValue();
                                                    //if(e.getKey() === e.ENTER)
                                                    //{           
                                                          cbo.getStore().load();

                                                    //}
                                            }

                                        }
                                    }
                                }*/
                            }
                        });
                        thiss.store=Ext.create('Erp.store.configuraciones.StoreAccountingType',{});
                        Ext.applyIf(thiss, {
                            store:Ext.create('Erp.store.configuraciones.StoreAccountingType',{}),
                            columns: [
                            {
                                field: 'numberfield',
                                width: 42,
                                dataIndex: 'order',
                                text: '#'
                            },
                            {
                                width: 370,
                                dataIndex: 'idaccountplan',
                                flex:1,
                                text: 'Cuenta',renderer:function(value,metaData,record,rowIndex,colIndex,store,view){
                                                                         var val;
                                                                            //if (colIndex==2) {
                                                                               // val=record.data.code;
                                                                            //}else if (colIndex==4) {
                                                                            if(record.data.debit_credit){
                                                                                
                                                                                val='<div style="text-align: left;">'+record.data.accountcode+'  '+record.data.accountname+'</div>';
                                                                            }else{
                                                                                val='<div style="text-align: right">'+record.data.accountcode+'  '+record.data.accountname+'</div>';
                                                                            }
                                                                                //val='<span style="text-align: left;">'+record.data.accountcode+'  '+record.data.accountname;
                                                                            //}
                                                                            return val;
                                                                    },editor:cboplancode
                            },
                            {
                                //field: 'textfield',
                                dataIndex: 'debit_credit',
                                text: 'Debe/Haber',
                                renderer:function(value){
                                                                if (value == true) {
                                                                    return '<img src="resources/images/true.png">';
                                                                }else{
                                                                return '<img src="resources/images/false.png">';
                                                                }
                                                            },
                                editor: {
                                
                                xtype:'checkboxfield',
                                allowBlank:false
                            }
                            },
                            {
                                field: 'numberfield',
                                dataIndex: 'percentage',
                                text: '%',
                                width:45
                            },
                            {
                            xtype:'actioncolumn',
                            width:40,
                            items: [{
                                icon: 'lib/ext/examples/shared/icons/fam/delete.gif',
                                tooltip: 'Delete',
                                option: 'EliminarCuentaRaiz',
                                handler: function(grid, rowIndex, colIndex) {
                                var rec = grid.getStore().getAt(rowIndex);
                                //console.log(rec.data);
                                var ideliminar=rec.data.idaccountingtype;
                                var store = grid.getStore();
                                
                                
                                
                                
                                Ext.Msg.show({
                                    title : 'Confirmacion',
                                    msg : 'Esta seguro de eliminar el registro selecionado?',
                                    buttons : Ext.Msg.YESNO,
                                    icon : Ext.MessageBox.WARNING,
                                    scope : this,
                                    width : 450,
                                    fn : function(btn, ev){
                                        if (btn == 'yes') {
                                            
                                            
                                            
                                            Ext.Ajax.request({
                                            url  : 'data/classes/sis_erp_accounting_type.php',
                                             params : {
                                               xaction   : 'deleteTransaction',
                                               id : ideliminar

                                             },
                                             method : 'POST',


                                             success: function(r) {
                                               result=Ext.decode(r.responseText);

                                                 Ext.create('widget.uxNotification', {
                                                title: result.title,
                                                position: 'tr',
                                                manager: 'instructions',
                                                cls: 'ux-notification-light',
                                                iconCls: 'ux-notification-icon-information',
                                                html: result.msg,
                                                autoHideDelay: 4000,
                                                slideBackDuration: 500,
                                                slideInAnimation: 'bounceOut',
                                                slideBackAnimation: 'easeIn'
                                              }).show();
                                                store.load();
                                                    
                                             },
                                             failure: function(r) {
                                              result=Ext.decode(r.responseText);
                                               //console.log(result);
                                              Ext.create('widget.uxNotification', {
                                               title: result.title,
                                               position: 'tr',
                                               manager: 'instructions',
                                               cls: 'ux-notification-light',
                                               iconCls: 'ux-notification-icon-information',
                                               html: result.msg,
                                               autoHideDelay: 4000,
                                               slideBackDuration: 500,
                                               slideInAnimation: 'bounceOut',
                                               slideBackAnimation: 'easeIn'
                                             }).show();
                                             }

                                            });
                                            
                                            
                                            
                                            
                                           // store.remove(rec);
                                           // store.load();
                                        }
                                    }
                                });
                               //store.load(); 
                            }
                        }]
                        }
                        ],
                        plugins:[Ext.create('Ext.grid.plugin.RowEditing',{
                            //dbclicksToEdit: 2,
                            //alias:'rowedit',
                            clicksToEdit: 2,
                            autoCancel: false,
                            saveBtnText: 'Editar',
                            cancelBtnText: 'Cancelar',
                            errorSumary: false
                            })]
                        });
                        thiss.callParent();
		
		}
                


});
