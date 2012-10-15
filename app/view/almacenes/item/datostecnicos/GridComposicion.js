/*
 * @Autor: Pablo Garcia guaman
 * @Email: garcia_guaman_pablo@hotmail.com
 */

Ext.define('Erp.view.almacenes.item.datostecnicos.GridComposicion', {
    requires:['Erp.store.almacenes.item.composition.StoreItemComposition',
              'Erp.store.almacenes.item.composition.StoreItemCboComposition'],
    extend: 'Ext.grid.Panel',
    alias:'widget.gridcomposicion',
    iconCls:'right2',
    title: '<b>Composici&oacute;n del Item</b>',
    margin: '0 0',
    height:215,
    rendererActive:function(value,metaData,rowIndex,colIndex,store,view){
       if (value) {
        return '<img src="resources/images/true.png">';    
       }else{
        return '<img src="resources/images/false.png">';   
       }
        
    },
    rendererColumns:function(value,metaData,record,rowIndex,colIndex,store,view){
        var val;
        if (colIndex==2) {
            val=record.data.code;
        }else if (colIndex==4) {
            val=record.data.unitname;
        }
        return val;
    },
    initComponent: function() {
        var me = this;
        var cbochildunit=Ext.create('Ext.form.field.ComboBox',{
           store:Ext.create('Erp.store.almacenes.StoreItemUnidades',{}),
            name:'uniteditor',
            queryMode:'local',
            displayField:'unitname',
            valueField:'idunit',
            triggerAction:'all',
            matchFieldWidth:false ,
            allowBlank:false,
            typeAhead: false
        });
        
        var cboitemcode=Ext.create('Ext.form.field.ComboBox',{
            store:Ext.create('Erp.store.almacenes.item.composition.StoreItemCboComposition',{}),
            name:'codeeditor',
            queryMode:'local',
            displayField:'code',
            valueField:'iditem',
            triggerAction:'all',
            matchFieldWidth:false,
            allowBlank:false,
            enableKeyEvents:true,
            minChars:3,
            typeAhead: false,
            listConfig:{
                width:300,
                itemTpl : Ext.create('Ext.XTemplate',
                    '<div style="float:left;width:40%;">{code}</div> <div style="overflow:hidden;white-space: pre;">{description}</div>'
                )
            }
        });
        
        Ext.applyIf(me, {
            store:Ext.create('Erp.store.almacenes.item.composition.StoreItemComposition',{}),
            plugins:[Ext.create('Ext.grid.plugin.RowEditing',{
                        clicksToEdit:2,
                        errorSummary:false,
                        saveBtnText:'Aceptar',
                        cancelBtnText:'Cancelar'
                    })
            ],
            columns: [
                {header: 'iditemcomposition',dataIndex: 'iditemcomposition',hidden:true},
                {header: 'iditem',dataIndex: 'iditem',hidden:true},
                {header: 'Codigo',width:150,dataIndex: 'iditemchild',editor:cboitemcode,renderer:this.rendererColumns},
                {header: 'Descripci&oacute;n',width:300,dataIndex: 'description'},
                {header: 'Unidad',width:80,dataIndex: 'idunitcomposition',editor:cbochildunit,renderer:this.rendererColumns},
                {header:'Cantidad',width:60,dataIndex:'quantitycomposition',editor:new Ext.form.field.Number({spinDownEnabled:false})},
                {header:'Activo',width:50,dataIndex:'active',renderer:this.rendererActive,editor:new Ext.form.field.Checkbox()},
                {xtype:'actioncolumn',width:30,
                 items:[{
                    action:'deleterow',
                    icon:'resources/images/delete.gif',
                    tooltip:'Eliminar registro'
                 }]
                }
             ],
            tbar:['->',{
                pressed  :   true,
                text     :   'Agregar Item',
                tooltip  :   'Agregar Item a la Composici&oacute;n',
                iconCls  :   'btnNew',
                option   :   'addComp'
            }]
        });

        me.callParent(arguments);
    }

});

