/*
 * @Autor: 
 * 
 */
Ext.define("Erp.view.almacenes.maestroalmacen.PanelGridEncargadosAlmacen", {
    extend  : "Ext.grid.Panel",
    alias   : ['widget.panelgridencargadosalmacen'],
    requires: ['Erp.store.crm.StoreCrmEmployee'],
    height  : 250,
    padding : 5,
    modegrid:'update',
    currentrowselected:-1,
    selType     : 'rowmodel',
    hideHeaders : true,
    initComponent   : function (){
        var thiss=this;
        var store = Ext.create('Erp.store.almacenes.maestroalmacen.StoreEncargadosAlmacen',{});
      
        var cboEmployee=Ext.create('Ext.form.ComboBox',{
            store:Ext.create('Erp.store.crm.StoreCrmEmployee',{storeFilter:true}),
            name:'cboemployee',
            valueField:'id_person',
            displayField:'employeename',
            queryMode:'remote',
            enableKeyEvents:true,
            minChars:2,
            typeAhead: false,
            allowBlank:false,
            matchFieldWidth:false,
            disabled    :true,
            listeners:{
                focus:function(cbo){

                },
                select:function(cbo,records,eOps){
                    var gridrecactual=thiss.getStore().getAt(thiss.currentrowselected);
                    gridrecactual.data.employeename=records[0].data.employeename;
                   
                }
            },
            listConfig:{
                width:200
                
        }});
        var checkboxactive=Ext.create('Ext.form.field.Checkbox',{
              
                listeners : {

                }
        });
                            
        Ext.applyIf(thiss, {
            store   : store,
            columns : thiss.buildColumns(cboEmployee,checkboxactive),
            dockedItems : thiss.buildDockedItems(store),
            plugins : Ext.create('Ext.grid.plugin.RowEditing', {
                        clicksToEdit: 2,
                        autoCancel  : false,
                        saveBtnText : 'Guardar',
                        cancelBtnText: 'Cancelar'
                    })
            
        });

                
        thiss.callParent(arguments);

    },
    buildColumns    : function(cboEmployee,checkboxactive) {
        return [
            {xtype  : 'rownumberer',header : '#'},
            {header: 'idstoredependent',  dataIndex: 'idstoredependent',hidden:true},
            {header: 'Nombre',  dataIndex: 'id_person', hidden:false,flex: 2,renderer : function (value,metadata,record){return record.get('employeename');}, editor :cboEmployee},
            {header: 'Activo',  dataIndex: 'active',width:40, align : 'center',
                renderer:function(value,metaData,record,rowIndex,colIndex,store){
                   var render='<img src="resources/images/false.png">';
                        if (value) {
                            
                            render='<img src="resources/images/true.png">';
                        }
                         
                         return render;

                },
                editor: checkboxactive
            },
            {
                xtype   : 'actioncolumn',
                alias   : 'actiondeleteencargado',
                width   : 30,
                items   : [
                    {
                        iconCls:'icon-delete',
                        icon   :'resources/images/delete.gif',
                        tooltip:'Eliminar Encargado'
                    }
                ]
                
            },
           
            {header: 'Estado',  dataIndex: 'state', hidden:true}
           

    ]
                    
                    
    },
    buildDockedItems  : function (store){
        return [ 
               {
                xtype : 'toolbar',
                dock  : 'top',
                items : [

                        {
                            xtype   : 'button',
                            text    : 'Asignar Personal',
                            iconCls : 'addAccount',
                            option  : 'btnAddPersonal'
                        }


                ]
                },{
                        xtype       : 'pagingtoolbar',
                        store       :  store,
                        dock        : 'bottom',
                        displayInfo : true,
                        displayMsg  : "Tot:{2}"
                }
                

        ]
    }

});



