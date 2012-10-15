Ext.define('Erp.view.rrhh.organigrama.FormOrganigramaDepartamentos', {
    extend: 'Ext.window.Window',
    alias               : 'widget.formorganigramadepartamentos',
    frame: false,
    height: 188,
    width: 466,
    bodyBorder: false,
    resizable: false,
    header: true,
    headerPosition: 'left',
    hideCollapseTool: false,
    overlapHeader: false,
    title: 'Registro departamento',
    modal: false,
    constrain: true,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    option:'formDpto',
                    frame: true,
                    height: 170,
                    margin: 3,
                    padding: 5,
                    bodyPadding: 10,
                    title: '',
                    items: [
                        {
                            xtype: 'fieldset',
                            title: 'Datos departamento',
                            items: [
                                {
                                    xtype: 'numberfield',
                                    name:'idorganizationalchart',
                                    anchor: '100%',
                                    option: 'idorganizationalchart',
                                    hidden:true,
                                    editable:false,
                                    readOnly:'true',
                                    //allowBlank:false,
                                    fieldLabel: 'id'
                                },
                                {
                                    xtype: 'numberfield',
                                    name:'father',
                                    anchor: '100%',
                                    option: 'father',
                                    hidden:true,
                                    editable:false,
                                    readOnly:'true',
                                    allowBlank:false,
                                    fieldLabel: 'id'
                                },
                                {
                                    xtype: 'textfield',
                                    anchor: '100%',
                                    name:'dptosuperior',
                                    fieldLabel: 'Superior',
                                    option:'dptosuperior'
                                },
                                {
                                    xtype: 'textfield',
                                    anchor: '100%',
                                    name:'jobtitle',
                                    fieldLabel: 'Departamento'
                                }
                            ]
                        },
                        {
                            xtype: 'button',
                            height: 27,
                            margin: 3,
                            width: 77,
                            text: 'Guardar',
                            option:'btnGuardar',
                        },
                        {
                            xtype: 'button',
                            height: 27,
                            margin: 3,
                            width: 77,
                            text: 'Cancelar',
                            option:'btnCancelar',

                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});