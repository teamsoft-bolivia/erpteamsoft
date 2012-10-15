/*
 * @Autor: Max marcelo jimenez T
 * @Email: maxmjt@gmail.com
 */
Ext.define('Erp.view.almacenes.listaprecios.FormFiltroItem',{
    extend: 'Ext.form.Panel',
    alias : 'widget.formfiltroitem',
    //stores:['StoreType'],
    requires:['Erp.store.StoreType'],
    frame: true,
    
    style: {
        borderStyle: 'hidden'
    },
    width: 282,
    height:75,
    bodyPadding: 10,
    title: '',
    /*items: [
        {
        xtype       :'combobox',
        anchor: '100%',
        store       :Ext.create('Erp.store.StoreType',{
            autoLoad:false,
            proxy:{
                type:'ajax',
                url:'data/classes/sis_erp_type.php',
                actionMethods: {
                read: 'POST'
            },
                extraParams:{
                    xaction:'readagrupacioncategorica'
                },
                reader:{
                    type:'json',
                    root:'results',
                    totalProperty:'total'
                }
            }
        }),
        fieldLabel  : 'Categoria:',
        name        : 'entity',
        valueField  :'idtype',
        displayField:'type',
        queryMode   :'local',
        allowBlank  : true,
        option      : 'comboCategoria1'
    },
       
        {
            xtype           : 'triggerfield',
            fieldLabel      : 'code/descripcion',
            //labelWidth      : 50,
            enableKeyEvents : true,
            option          : 'searchitem',
            triggerCls      : 'search-trigger'
        }
    ],*/
    
    initComponent: function() {
        this.items   = [
        {
        xtype       :'combobox',
        anchor: '100%',
        store       :Ext.create('Erp.store.StoreType',{
            autoLoad:false,
            proxy:{
                type:'ajax',
                url:'data/classes/sis_erp_type.php',
                actionMethods: {
                read: 'POST'
            },
                extraParams:{
                    xaction:'readagrupacioncategorica'
                },
                reader:{
                    type:'json',
                    root:'results',
                    totalProperty:'total'
                }
            }
        }),
        fieldLabel  : 'Categoria:',
        name        : 'entity',
        valueField  :'idtype',
        displayField:'type',
        queryMode   :'local',
        allowBlank  : true,
        option      : 'comboCategoria1'
    },
        /*{
            xtype: 'combobox',
            fieldLabel: 'Sub categoria',
            anchor: '100%'
        },*/
        {
            xtype           : 'triggerfield',
            fieldLabel      : 'code/descripcion',
            //labelWidth      : 50,
            enableKeyEvents : true,
            option          : 'searchitem',
            triggerCls      : 'search-trigger'
        }
    ];
        var thiss = this;
        thiss.callParent(arguments);
    }

    
    
});