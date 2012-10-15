/*
 * @Autor: Pablo Garcia guaman
 * @Email: garcia_guaman_pablo@hotmail.com
 */

Ext.define("Erp.helper.Constants",{
	singleton	: true,
        ID_ENTERPRISE   : '',
        ID_USER         : '',
        SERVER_DATE     : '',
	getServerDate   : function(){
            return Ext.util.Format.date(new Date(),'d-m-Y');
        }
});