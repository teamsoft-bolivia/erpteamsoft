/*
 * @Autor: Pablo Garcia guaman, Cristhian Valencia
 * @Email: garcia_guaman_pablo@hotmail.com, fox_tian@hotmail.com
 */

Ext.define('Erp.view.rrhh.planilla.GridPlanillaDetalle', {
    extend      : 'Ext.grid.Panel',
    alias       : 'widget.gridplanilladetalle',
    title       : 'Planilla',
    height      : 350,
    autoScroll  : true,
    columnLines : true,
    cls         : 'resaltarfila',
    
        
    initComponent: function() {
        var me = this;
      
        var store=Ext.create('Erp.store.rrhh.planilla.StorePlanilla',{});
        
        Ext.applyIf(me, {
            store:store,
            columns: [
                /*{
                    header  : '#',
                    xtype   : 'rownumberer',
                    locked  : true
                },*/{
                    xtype       : 'gridcolumn',
                    dataIndex   : 'idemployee',
                    width       : 70,
                    text        : 'idemployee',
                    hidden      : true,
                    hideable    : false,
                    locked      :true
                    
                },{
                    xtype       : 'gridcolumn',
                    dataIndex   : 'dni',
                    width       : 100,
                    text        : 'DNI',
                    hidden      : false,
                    hideable   : false,
                    locked  :true
                    
                },{
                    //xtype       : 'gridcolumn',
                    dataIndex   : 'name',
                    width       : 200,
                    header      : 'Apellidos y Nombre',
                    hidden      : false,
                    hideable    : true,
                    locked      : true
                    
                },{
                    xtype       : 'gridcolumn',
                    dataIndex   : 'country',
                    width       : 70,
                    text        : 'Nacionalidad',
                    hidden      : false,
                    hideable   : false
                    
                },{
                    //xtype: 'datecolumn',
                    dataIndex: 'birthdate',
                    width   : 100,
                    header: 'Fec. de Nacimiento',
                    sortable    : false,
                    renderer    : function (value,metaData,record,rowIndex,colIndex,store,view){
                        /*
                        var res='';
                        var arraySplited=value.split('-');
                        res+=arraySplited[2]+'-'+arraySplited[1]+'-'+arraySplited[0];
                        */
                        return record.data.birthdate;
                    }
                    
                 },{
                    xtype       : 'gridcolumn',
                    dataIndex   : 'gender',
                    width       : 50,
                    text        : 'Sexo',
                    hidden      : false,
                    hideable   : false
                    
                },{
                    xtype       : 'gridcolumn',
                    dataIndex   : 'charge',
                    width       : 100,
                    text        : 'Cargo',
                    hidden      : false,
                    hideable   : false
                    
                },{
                    //xtype: 'datecolumn',
                    dataIndex: 'hiredate',
                    width   : 100,
                    header: 'Fec. de Contrato',
                    sortable    : false,
                    renderer    : function (value){
                        
                        var res='';
                        var arraySplited=value.split('-');
                        res+=arraySplited[2]+'-'+arraySplited[1]+'-'+arraySplited[0];
                        
                        return res;
                    }
                    
                 },{
                    xtype       : 'numbercolumn',
                    dataIndex   : 'monthdays',
                    width       : 55,
                    text        : 'Dias/Mes',
                    hidden      : false,
                    hideable   : false
                    
                },{
                    xtype       : 'numbercolumn',
                    dataIndex   : 'hourdays',
                    width       : 55,
                    text        : 'Horas/Dia',
                    hidden      : false,
                    hideable   : false
                    
                },{
                    xtype       : 'numbercolumn',
                    dataIndex   : 'haberbasico',
                    width       : 90,
                    text        : 'Haber Basico',
                    renderer    : function(value,metaData,record,rowIndex,colIndex,store,view){ return Ext.util.Format.currency(record.data.haberbasico,'Bs.',3);},
                    hidden      : false,
                    hideable   : false
                    
                },{
                    xtype       : 'numbercolumn',
                    dataIndex   : 'bonoantiguedad',
                    width       : 90,
                    text        : 'Bono Antiguedad',
                    renderer    : function(value,metaData,record,rowIndex,colIndex,store,view){ return Ext.util.Format.currency(record.data.bonoantiguedad,'Bs.',3);},
                    hidden      : false,
                    hideable   : false
                    
                },{
                    text    : 'Horas Extras',
                    columns :[
                        {
                            xtype: 'numbercolumn',
                            dataIndex: 'numerohorassextra',
                            width   : 50,
                            text: 'Numero'
                        },{
                            xtype: 'numbercolumn',
                            dataIndex: 'horasextras',
                            width   : 95,
                            renderer    : function(value,metaData,record,rowIndex,colIndex,store,view){ return Ext.util.Format.currency(record.data.horasextras,'Bs.',3);},
                            text: 'Monto Pagado'
                        }
                    ]
                },{
                    text    : 'Bonos',
                    columns :[
                                {
                                    xtype       : 'numbercolumn',
                                    dataIndex   : 'bonoproduccion',
                                    width       : 100,
                                    renderer    : function(value,metaData,record,rowIndex,colIndex,store,view){ return Ext.util.Format.currency(record.data.bonoproduccion,'Bs.','3');},
                                    text        : 'Bono Produccion'
                                },
                                {
                                    xtype       : 'numbercolumn',
                                    dataIndex   : 'otrosbonos',
                                    renderer    : function(value,metaData,record,rowIndex,colIndex,store,view){ return Ext.util.Format.currency(record.data.otrosbonos,'Bs.',3);},
                                    width       : 100,
                                    text        : 'Otros'
                                }
                    ]
                },{
                    text    : 'Dominicales',
                    columns :[
                                {
                                    xtype       : 'numbercolumn',
                                    dataIndex   : 'nrodomingos',
                                    width       : 90,
                                    //renderer    : function(value,metaData,record,rowIndex,colIndex,store,view){ return Ext.util.Format.currency(record.data.ingresos,'$','3');},
                                    text        : 'Nro. Domingos'
                                },
                                {
                                    xtype       : 'numbercolumn',
                                    dataIndex   : 'dominical',
                                    renderer    : function(value,metaData,record,rowIndex,colIndex,store,view){ return Ext.util.Format.currency(record.data.dominical,'Bs.',3);},
                                    width       : 100,
                                    text        : 'Dominicales'
                                }
                    ]
                },{
                                    xtype       : 'numbercolumn',
                                    //dataIndex   : 'totalganado',
                                    width       : 100,
                                    renderer    : function(value,metaData,record,rowIndex,colIndex,store,view){ 
                                        var totalganado=record.data.haberbasico+record.data.bonoantiguedad+record.data.horasextras+record.data.bonoproduccion+record.data.otrosbonos+record.data.dominical
                                        return Ext.util.Format.currency(totalganado,'Bs.','3');
                                    },
                                    text        : 'Total Ganado'
                },{
                    text    : 'Descuentos',
                    columns :[
                                {
                                    xtype       : 'numbercolumn',
                                    dataIndex   : 'afp',
                                    width       : 90,
                                    renderer    : function(value,metaData,record,rowIndex,colIndex,store,view){ return Ext.util.Format.currency(record.data.afp,'Bs.','3');},
                                    text        : 'AFP'
                                },{
                                    xtype       : 'numbercolumn',
                                    dataIndex   : 'rciva',
                                    renderer    : function(value,metaData,record,rowIndex,colIndex,store,view){ return Ext.util.Format.currency(record.data.rciva,'Bs.',3);},
                                    width       : 90,
                                    text        : 'RC-IVA'
                                },{
                                    xtype       : 'numbercolumn',
                                    dataIndex   : 'otrosdescuentos',
                                    renderer    : function(value,metaData,record,rowIndex,colIndex,store,view){ return Ext.util.Format.currency(record.data.otrosdescuentos,'Bs.',3);},
                                    width       : 90,
                                    text        : 'Otros'
                                }
                    ]
                },{
                                    xtype       : 'numbercolumn',
                                    //dataIndex   : 'totaldsctos',
                                    width       : 100,
                                    renderer    : function(value,metaData,record,rowIndex,colIndex,store,view){
                                        var totaldescuentos=record.data.afp+record.data.rciva+record.data.otrosdescuentos;
                                       
                                        
                                        return Ext.util.Format.currency(totaldescuentos,'Bs.','3');
                                    },
                                    text        : 'Total Dsctos'
                },{
                                    xtype       : 'numbercolumn',
                                    //dataIndex   : 'liquidopagable',
                                    width       : 100,
                                    renderer    : function(value,metaData,record,rowIndex,colIndex,store,view){
                                        var totalganado=record.data.haberbasico+record.data.bonoantiguedad+record.data.horasextras+record.data.bonoproduccion+record.data.otrosbonos+record.data.dominical;
                                        var totaldescuentos=record.data.afp+record.data.rciva+record.data.otrosdescuentos;
                                        var liquidopagable=totalganado-totaldescuentos;
                                        
                                        return Ext.util.Format.currency(liquidopagable,'Bs.','3');
                                    },
                                    text        : 'liquido Pagable'
                }
            ],
            viewConfig: {
                stripeRows: true
            },
            tbar:[ {
                                    xtype: 'button',
                                    text: 'Imprimir',
                                    iconCls:'btnimprimir',
                                    option:'btnimprimirplanilla',
                                    border: 1,
                                    style: {
                                        borderColor: 'blue',
                                        borderStyle: 'solid'
                                    }
                    }
            ],
            bbar : [
                   '->'/*,
                    {
                        xtype   : 'label',
                        text    : 'Saldo Fisico: ',
                        margin  : '5',
                        option  : 'labelsaldo',
                        cls     : 'totales'
                    },{
                        xtype   : 'label',
                        text    : '0 ',
                        margin  : '5',
                        option  : 'saldo',
                        cls     : 'totales'
                    },'-',
                    {
                        xtype   : 'label',
                        text    : 'Saldo Valorado: ',
                        margin  : '5',
                        option  : 'labelsaldo',
                        cls     : 'totales'
                    },{
                        xtype   : 'label',
                        text    : '0 ',
                        margin  : '5',
                        option  : 'saldovalorado',
                        cls     : 'totales'
                    },'-'*/
            ]
        });

        me.callParent(arguments);
    }

});