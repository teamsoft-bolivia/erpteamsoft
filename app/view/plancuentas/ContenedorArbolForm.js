/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('Erp.view.plancuentas.ContenedorArbolForm' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.contenedorarbolform',
 
    frame: true,
    title: 'Arbol',
    bodyPadding: 5,
    layout: 'column',    // Specifies that the items will now be arranged in columns
 
    fieldDefaults: {
        labelAlign: 'left',
        msgTarget: 'side'
    },
 
    items: [{
        xtype: 'arbolcuentas',
        columnWidth: .70
    },{
        xtype: 'formcuenta',
        columnWidth: .30
    }]
 
});


