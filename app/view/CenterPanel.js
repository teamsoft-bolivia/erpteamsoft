

/*
 * @Autor: Pablo Garcia guaman
 * @Email: garcia_guaman_pablo@hotmail.com
 */

Ext.define('Erp.view.CenterPanel',{
    extend:'Ext.panel.Panel',
    alias:'widget.centerpanel',
    split:true,
    region: 'center',
    margins:'5 5 5 0',

    items: [],
    initComponet:function(){
        this.callParent(arguments);
    }
});


