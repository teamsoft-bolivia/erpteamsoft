/*
 * @Autor: Max marcelo jimenez T,Crithian Valencia, Pablo Garcia Guaman
 * @Email: maxmjt@gmail.com, fox_tian@hotmail.com ,garcia_guaman_pablo@hotmail.com
 */

Ext.define ('Erp.view.plancuentas.GridCuentasAsociadas',{
    extend      : 'Ext.grid.Panel',
    alias       : 'widget.gridcuentasasociadas',
    flex        : 3,
    selModel: {
        selType: 'rowmodel'
    },
    enterpriseName : '',
   
    initComponent : function (){
        var thiss=this;
        var plugin = Ext.create('Ext.grid.plugin.CellEditing', {
                        clicksToEdit: 1,
                        autoCancel  : false
                     });
        thiss.plugins=plugin;
        thiss.dockedItems=thiss.buildDocked();
        thiss.columns=thiss.buildColumns();
        
        this.callParent (arguments);
        
        
    },
     viewConfig: {

        getRowClass: function(record, index) {
            var c = record.get('asociada');
            if (c == 1) {
                return 'price-fall';
            } else if (c == 0) {
                return 'price-rise';
            }
        }
    },
    buildDocked : function (){
        return [
                {
                    xtype : 'toolbar',
                    dock  : 'top',
                    items : [
                            {
                                xtype : 'label',
                                //forId : 'idTitleLabel',
                                text  : '',
                                margin  : '0 0 0 10',
                                option  : 'gridTitleLabel'
                                
                            },
                            '->',{
                                xtype   : 'button',
                                text    : 'Actualizar',
                                iconCls : 'updateAccount',
                                option  : 'btnActualizar',
                                disabled: true
                            },
                            '-',{
                                xtype           : 'triggerfield',
                                fieldLabel      : 'Buscar',
                                labelWidth      : 50,
                                enableKeyEvents : true,
                                option          : 'search',
                                triggerCls      : 'search-trigger',
                                disabled        : true
                            }
                            
                            
                     ]
                }

    ]
        
        
    },
    buildColumns    : function (){
        return [
            {xtype  : 'rownumberer',header : '#'},
            { header : 'idccountassociated',dataIndex:'idaccountassociated',sortable : false, hideable : false, hidden:true},
            { header : 'ID',dataIndex:'id',sortable : false, hideable : false, hidden:true},
            { header : 'Codigo',dataIndex:'code',sortable : false, hideable : false, width : 75, draggable:false},
            { header : 'Nombre',dataIndex:'name', sortable  : false, hideable : false, flex: 3},
            {
                xtype       : 'checkcolumn',
                header      : 'Asociada?',
                dataIndex   : 'asociada',
                width       : 60,
                sortable    : true,
				
                editor: {
                    xtype: 'checkbox',
                    cls: 'x-grid-checkheader-editor'
                }
            }
           
            
        ]
        
        
    }
});

