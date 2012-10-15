/* 
* @Autor: Max marcelo jimenez T
 * @Email: maxmjt@gmail.com
 */
Ext.define('Erp.model.rrhh.personal.ModelListaPersonal', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idemployee'},
        {name: 'idperson'},
        {name: 'code'},
        {name: 'pretensewage'},
        {name: 'state',type:'int'},
        {name: 'name'},
        {name: 'lastname'},
        {name: 'dnitype',type:'int'},
        {name: 'dni'},
        {name: 'dnilocation'},
        {name: 'gender', type:'int'},
        {name: 'maritalstatus',type:'int'},
        {name: 'birthdate'},
        {name: 'phone'},
        {name: 'phone2'},
        {name: 'corporativephone'},
        {name: 'mobilephone'},
        {name: 'corporativemobilephone'},
        {name: 'email'},
        {name: 'corporativeemail'},
        {name: 'photo'},
        {name: 'country',type:'int'},
        {name: 'city',type:'int'},
        {name: 'province'},
        {name: 'locality'},
        {name: 'active'},
        {name: 'identerprise'},
        {name: 'iduser'},
        {name: 'observation'},
        {name: 'datecontract'},
        {name: 'typecontract',type:'int'},
        {name: 'from'},
        {name: 'to'},
        {name: 'socialnumber'},
        {name: 'afpnumber'},
        {name: 'contractposition',type:'int'},
        {name: 'paymentway',type:'int'},

        {name: 'dnitypename'},
        {name: 'gendername'},
        {name: 'maritalstatusname'},
        {name: 'statename'},
        {name: 'employeename'},
        {name: 'instantmessaging'}
    ]
});