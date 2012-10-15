/*
 * @Autor: Max marcelo jimenez T
 * @Email: maxmjt@gmail.com
 */
Ext.define('Erp.view.rrhh.contratacion.tabDatosContratacion',{
    extend: 'Ext.panel.Panel',
    alias : 'widget.tabdatoscontratacion',
    // layout: "hbox",
    items: [
    {
        xtype : "form",
        layout : "column",
        margin : 5,
        frame: true,
        height : 380,
        width : 960,
        items : [
        {
            xtype : "fieldset",
            columnWidth : 0.5,
            margin : "0 5 0 0",
            title : "Datos de contacto",
            items : [
            {
                xtype : "datefield",
                value : new Date(),
                fieldLabel : "Fecha"
            },
            {
                xtype : "textfield",
                fieldLabel : "Tipo de contrato"  
            },
            {
                xtype : "fieldcontainer",
                layout : "hbox",
                defaultType: 'datefield',
                items: [{
                    fieldLabel: 'Desde'
                }, {
                    fieldLabel: 'Hasta'
                }]
             
            },
            {
                xtype : "combobox",
                fieldLabel : "Puesto/Cargo"
            },
            {
                xtype : "checkbox",
                fieldLabel : "Seguro social"
            },
            {
                xtype : "textfield",
                fieldLabel : "Nro. Seguro social"
            },
            {
                xtype : "checkbox",
                fieldLabel : "Afp"
            },
            {
                xtype : "textfield",
                fieldLabel : "Nro. Afiliaci&oacute;n"
            },
            {
                xtype : "combobox",
                fieldLabel : "Horario"
            },
            {
                xtype : "combobox",
                fieldLabel : "Via de pago"
            }
                           
            ]
        },
        {
            xtype : "fieldset",
            columnWidth : 0.5,
            title : "Remuneraci&oacute;n",
            items : [
            {
                xtype : "grid",
                layout : "fit",
                columns : [
                {
                    text : "Tipo"
                },
                {
                    text : "Monto"
                },
                {
                    text : "Estado"
                }
                ]
            }
            ]
        },
        ]
    }
    ],
    
    initComponent: function() {
        var thiss = this;
        thiss.callParent(arguments);
    }

    
    
});