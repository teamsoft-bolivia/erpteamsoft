/*
 * @Autor: Pablo Garcia guaman
 * @Email: garcia_guaman_pablo@hotmail.com
 */

Ext.define("Erp.helper.Tools",{
	singleton	: true,
        getServerDate   : function(field,option){
            var serverDate;
            var me=this;
                Ext.Ajax.request({
                    url  : 'data/classes/tools/sis_tools.php',
                    params : {xaction:'getServerDate'},
                    method : 'POST',
                    success: function(response) {
                        var result=Ext.decode(response.responseText);
                        if (result.success) {
                            serverDate=Ext.util.Format.date('d-m-Y',result.serverdate);
                            if (option) { //true setvalue afield, false actuliza constante de fecha actual
                                field.setValue(serverDate);
                            }
                            else{
                                return serverDate;
                            }
                        }else{
                            me.showMsg(result,false,4000);
                        }
                        
                        
                    },
                    failure: function(response) {
                        var result=Ext.decode(response.responseText);
                        me.showMsg(result,false,4000);
                    }
                });
            
        },
        showMsg:function(oOpts,confirm,time){
            
            var tipomsg;
            if(confirm)tipomsg='ux-notification-icon-information';
            else tipomsg='ux-notification-icon-error';
            Ext.create('widget.uxNotification', {
                            title: oOpts.title,
                            position: 'tr',
                            manager: 'instructions',
                            cls: 'ux-notification-light',
                            iconCls: tipomsg,
                            html: oOpts.msg,
                            autoHideDelay: time,
                            slideBackDuration: 500,
                            slideInAnimation: 'bounceOut',
                            slideBackAnimation: 'easeIn'
            }).show();
        },
        getPrimaryCurrency  : function (grid){
            var thiss=this;
           
            Ext.Ajax.request({
                url     : 'data/classes/tools/sis_tools.php',
                method  : 'POST',
                callback: function(res){
                    //console.log(res);
                },
                params  : {xaction:'readprimarycurrency'},
                success : function (response){
                    var res=Ext.decode(response.responseText);
                   grid.currencyid=res.currencyid;
                   grid.currencysimbol=res.currencysimbol;
                
                    
                },
                failure : function (response){
                    var res=Ext.decode(response.responsText);
                     this.showMsg(res,false,4000);
                }
            });
        }
});