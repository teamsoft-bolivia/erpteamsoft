/*
 * @Autor: Pablo Garcia guaman
 * @Email: garcia_guaman_pablo@hotmail.com
 */

Ext.define('Erp.view.almacenes.item.datostecnicos.GridEspTecnicas', {
    extend: 'Ext.grid.Panel',
    requires:['Erp.store.almacenes.item.StoreItemDatosTecnicos'],
    alias:'widget.gridesptecnicas',
    title: '<b>Especificaciones Tecnicas</b>',
    iconCls:'right2',
    margin: '0 0',
    height:215,
    rendererGrid:function(value,metaData,rowIndex,colIndex,store,view){
       if (value) {
        return '<img src="resources/images/true.png">';    
       }else{
        return '<img src="resources/images/false.png">';   
       }
        
    },
    initComponent: function() {
        var me = this;
        
        Ext.applyIf(me, {
            store:Ext.create('Erp.store.almacenes.item.StoreItemDatosTecnicos',{}),
            plugins:[Ext.create('Ext.grid.plugin.RowEditing',{
                        clicksToEdit:2,
                        errorSummary:false,
                        saveBtnText:'Aceptar',
                        cancelBtnText:'Cancelar'
                    })
            ],
            columns: [
                {header: 'iditem',dataIndex: 'iditem',hidden:true},
                {header: 'iditemdatasheet',dataIndex: 'iditemdatasheet',hidden:true},
                {header: 'Dato Tecnico',width:250,dataIndex: 'datatext',editor:new Ext.form.field.Text({allowBlank:false})},
                {header: 'Valor',width:150,dataIndex: 'valuetext',editor:new Ext.form.field.Text({allowBlank:false})},
                {header: 'Observaciones',width:250,dataIndex: 'observation',editor:new Ext.form.field.Text()},
                {header: 'Activo',width:50,dataIndex: 'active',align:'center',editor:new Ext.form.field.Checkbox({checkd:true}),renderer:this.rendererGrid},
                {xtype:'actioncolumn',width:30,
                 items:[{
                    action:'deleterow',
                    icon:'resources/images/delete.gif',
                    tooltip:'Eliminar registro'
                 }]
                }
            ],
            tbar:['->',{
                   text     :   'Agregar',
                   pressed  :   true,
                   tooltip  :   'Agregar nueva especificaci&oacute;n t&eacute;cnica',
                   iconCls  :   'btnNew',
                   option   :   'addEspTec'
               }]
        });

        me.callParent(arguments);
    }

});

