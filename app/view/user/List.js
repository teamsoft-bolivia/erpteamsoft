/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Erp.view.user.List' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.userlist',
    title : 'Todos los Usuarios',
    autoShow:true,
    closable:true,
    store:'Users',
    height:400,
    width:400,
    initComponent: function() {
        this.columns = [
            {header: 'Name',  dataIndex: 'name',  flex: 0},
            {header: 'Email', dataIndex: 'email', flex: 1}
        ];

        this.callParent(arguments);
    }
});

