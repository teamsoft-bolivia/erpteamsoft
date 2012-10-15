/*
 * @Autor: Max marcelo jimenez T
 * @Email: maxmjt@gmail.com
 */
Ext.define('Erp.view.configuraciones.almacenes.FormPanelActivar',{
    extend: 'Ext.form.Panel',
    alias : 'widget.formpanelactivar',
    frame: true,
    height: 49,
    layout: {
        align: 'stretch',
        type: 'hbox'
    },
    items: [
        {
           
            xtype: 'label',
            padding: '13 0 0 5',
            text: 'Activo',
            style: 'color: #04468C; font-weight: bold; font-size: 11px'

                        
        },{
            xtype: 'checkboxfield',
            name: 'active',
            //fieldLabel: 'Activo',
            padding: '0 0 0 10',
            option:'activarAsientos',
            bandera:1,
            boxLabel: 'Si/No',
            style: 'color: #04468C; font-weight: bold; font-size: 11px'   
            
           // flex: 1
        },
        {
            xtype: 'label',
            padding: '13 0 0 40',
            text: 'Fiscal',
            hidden:false,
            //style: 'background:#99FE80; color: #04468C; font-weight: bold; font-size: 11px; border-width: 3px !important; border-top: 2px solid #ff9999; border-bottom: 2px solid #ff9999; border-left: 2px solid #ff9999; '
        },
        {
            xtype      : 'radiogroup',
            option:'fiscal',
            columns: 2,
            vertical: true,
            padding: '0 0 0 10',
            hidden:false,
            //style: 'background:#99FE80; color: #04468C; font-weight: bold; font-size: 11px; border-width: 2px !important; border-top: 2px solid #ff9999; border-bottom: 2px solid #ff9999; border-right: 2px solid #ff9999;  ',
            layout: 'hbox',
            items: [
                {
                    boxLabel  : 'Si',
                    name      : 'size',
                    inputValue: 'fiscal',
                    id        : 'radio1',
                    padding: '0 0 0 10',
                    checked: true,
                    //style: 'color: #04468C; font-weight: bold; font-size: 11px '
                    
                }, {
                    boxLabel  : 'No',
                    name      : 'size',
                    inputValue: 'Nofiscal',
                    id        : 'radio2',
                    padding: '0 0 0 10',
                    //style: 'color: #04468C; font-weight: bold; font-size: 11px'
                }
            ]
        },
        {
           
            xtype: 'label',
            padding: '13 0 0 40',
            text: 'Activar todos',
            style: 'color: #04468C; font-weight: bold; font-size: 11px',
            hidden:true
                        
        },
        {
            xtype: 'checkboxfield',
            name: 'activotodos',
            //fieldLabel: 'Activo',
            hidden:true,
            padding: '0 0 0 10',
            option:'activarTodosAsientos',
            bandera:1,
            boxLabel: 'Si/No',
            style: 'color: #04468C; font-weight: bold; font-size: 11px'           
           // flex: 1
        }
    ],
    
    initComponent: function() {
        var thiss = this;
        thiss.callParent(arguments);
    }

    
    
});