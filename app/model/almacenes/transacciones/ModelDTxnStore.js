/*
 * @Autor: Pablo Garcia guaman, Cristhian Valencia, Max Jimenez 
 * @Email: garcia_guaman_pablo@hotmail.com, fox_tian@hotmail.com
 */

Ext.define('Erp.model.almacenes.transacciones.ModelDTxnStore', {
    extend: 'Ext.data.Model',
    fields: [
                    { name: 'iddtxnstore', type: 'int'},
                    { name: 'idtxnstore', type: 'int'},
                    { name: 'iditem'},
                    { name: 'idunit'},
                    { name: 'quantity'},
                    { name: 'cost'},
                    { name: 'discount',type:'float'},
                    { name: 'iddocument', type: 'int'},
                    { name: 'originstore'},//, type: 'int'
                    { name: 'destinationstore'},//, type: 'int'
                    { name: 'code', type: 'string'},
                    { name: 'description', type: 'string'},
                    { name: 'unitname', type: 'string'},
                    { name: 'originname', type: 'string'},
                    { name: 'destinationname', type: 'string'},
                    { name: 'recep'},
                    { name: 'norecep'},
                    { name: 'transferquantity'},
                    { name: 'state', type: 'string' ,defaultValue: 'new'},
                    { name: 'currency'},
                    { name: 'simbolo'},
                    
            ]
         
     /*      
     ,constructor    : function (){
         Ext.apply({
             
             fields:this.setsFields(this.fields)
         });
         this.callParent(arguments);
         
         //return this;
     },
     getsFields      : function (){
         return this.fields;
     },
     setsFields      : function (fields){
                var me = this,
                len = fields ? fields.length : 0,
                i = 0;

     this.fields.clear();
    
     for (; i < len; i++) {
                this.fields.add(new Ext.data.Field(fields[i]));
     }
     
        
     }
*/
});

