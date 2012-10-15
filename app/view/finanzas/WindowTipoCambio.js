Ext.define('Erp.view.finanzas.WindowTipoCambio', {
    extend          : 'Ext.window.Window',
    alias           : 'widget.windowtipocambio',
    layout          : 'hbox',
    headerPosition  : 'left',
    constrain       : true,
    resizable       :false,
    title           : 'Maestro Tipos de Cambio',
    x               : 20,
    y               : 10,
    renderGridMon:function(value,metaData,record,rowIndex,colIndex,store,view){
        var val;
         if (colIndex==3) {
             if (value=='11') {
                val= '<img src="resources/images/true.png">';
             }else{
                val= '<img src="resources/images/false.png">'; 
             }
        }else if (colIndex==4) {
            if (value=='12') {
                val= '<img src="resources/images/true.png">';
             }else{
                val= '<img src="resources/images/false.png">'; 
             } 
        }
        return val;
    },
    renderGridTC:function(value,metaData,record,rowIndex,colIndex,store,view){
        var val;
         if (colIndex==2) {
              val=Ext.util.Format.date(value, 'd/m/Y');  
        }
        return val;
    },
    initComponent   : function() {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'gridpanel',
                    store:Ext.create('Erp.store.finanzas.StoreMoneda',{}),
                    grid:'moneda',
                    //columnWidth: 0.4,
                    height: 330,
                    margin: 5,
                    width: 210,
                    title: 'Moneda',
                    columns: [
                        {header:'idtype',dataIndex:'idtype',hidden:true},
                        {header:'Moneda',width:80,dataIndex:'type'},
                        {header:'Alias',width:35,dataIndex:'alias'},
                        {header:'1ra',width:35,dataIndex:'value',renderer:this.renderGridMon},
                        {header:'2da',width:35,dataIndex:'value',renderer:this.renderGridMon}
                    ],
                    viewConfig: {

                    },
                    dockedItems: [ ]
                },
                {
                    xtype: 'gridpanel',
                    store:Ext.create('Erp.store.finanzas.StoreTipoCambio',{}),
                    grid:'tipocambio',
                    moneda:0,
                    first:false,
                    //columnWidth: 0.6,
                    height: 330,
                    width:200,
                    margin: '5 5 5 0',
                    title: 'Tipo de Cambio',
                    columns: [
                        {header:'idexchangerate',dataIndex:'idexchangerate',hidden:true},
                        {header:'currency',dataIndex:'currency',hidden:true},
                        {header:'Fecha T/C',width:100,dataIndex:'dateexchange',renderer:this.renderGridTC,allowBlank:false,editor:{xtype:'datefield',editable:false}},
                        {header:'Valor',width:75,dataIndex:'amount',editor:{xtype:'numberfield',allowBlank:false,hideTrigger:true}}
                        
                    ],
                    viewConfig: { },
                    dockedItems: [ ],
                    plugins:[Ext.create('Ext.grid.plugin.RowEditing',{
                        clicksToEdit:2,
                        errorSummary:false,
                        saveBtnText:'Aceptar',
                        cancelBtnText:'Cancelar'
                    })],
                    tbar:[{
                        pressed  :   true,
                        text     :   'Agregar T/C',
                        tooltip  :   'Agregar Tipo de Cambio',
                        iconCls  :   'btnNew',
                        option   :   'addtc'
                    }]
                }
            ]
        });

        me.callParent(arguments);
    }

});


