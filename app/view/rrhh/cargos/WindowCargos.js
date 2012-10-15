Ext.define('Erp.view.rrhh.cargos.WindowCargos',{
    extend          : 'Ext.window.Window',
    title           : 'Cargos',
    height          : 300,
    width           : 650,
    layout          : {type: 'fit'},
    constrain       : true,
    plain           : true,
    headerPosition  : 'left',
    resizable       : false,
    closeAction     : 'destroy',
    stateMode       : 'R',
    idstore         : 0,
    alias           : ['widget.windowcargos'],

 initComponent	: function (){
        var thiss = this;
        thiss.callParent();
		
    }
})
