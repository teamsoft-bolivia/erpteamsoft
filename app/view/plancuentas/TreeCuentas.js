/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Erp.view.plancuentas.TreeCuentas', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.treecuentas',
    height:380,
    width: 400,
    margin: '5 0 5 5',
    title: 'Activo',
    resizable: true,
    //renderTo: Ext.getBody(),
    //useArrows: true,
    rootVisible:false,
    tbar: [
          { xtype: 'button',
            iconCls: 'updateAccount',
            option: 'btnActualizarTree',
            text: 'Actualizar'            
        }
        ],
    
    //title: 'Plan de cuentas',
	//fields: ['numero','text','value'],
        //store: Ext.create('StoreTreeCuentas',{}),
	root: {
			expanded: true
			
	},
	columns: [
                {
                    //xtype: 'numbercolumn',
                    //width: 120,
                    flex : 1.2,
                    dataIndex: 'accountcode',
                    sortable: true,
                    text: 'Codigo'
                },
                {
                    xtype: 'treecolumn',
                    width:110,
                    dataIndex: 'accountname',
                    flex: 2,
                    sortable: true,
                    text: 'Cuentas'
                },
                {
                    //xtype: 'gridcolumn',
                    dataIndex   : 'level',
                    align       : 'center',
                    width       :35,
                    sortable: true,
                   // flex: 1,
                    text: 'Nivel'
                }
            ],
    initComponent: function() {
        var me = this;
        //this.store = 'ArbolCuentas';
        Ext.applyIf(me, {
            viewConfig: {

            },
            //store:'ArbolCuentas',
            columns: [
                {
                    //xtype: 'numbercolumn',
                    width: 51,
                    dataIndex: 'numero',
                    flex: 2,
                    sortable: true,
                    text: 'Nro'
                },
                {
                    xtype: 'treecolumn',
                    dataIndex: 'text',
                    flex: 1,
                    sortable: true,
                    text: 'Cuentas'
                },
                {
                    //xtype: 'gridcolumn',
                    dataIndex: 'value',
                    //groupable: false,
                    sortable: true,
                    flex: 2,
                    text: 'Value'
                }
            ]
        });

        me.callParent(arguments);
    }

});