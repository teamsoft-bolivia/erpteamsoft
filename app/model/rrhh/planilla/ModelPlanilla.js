/* 
* @Autor: Max marcelo jimenez T
 * @Email: maxmjt@gmail.com
 */
Ext.define('Erp.model.rrhh.planilla.ModelPlanilla', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idemployee'},
        {name: 'dni'},
        {name: 'name'},
        {name: 'country'},
        {name: 'birthdate'},
        {name: 'gender'},
        {name: 'charge'},
        {name: 'hiredate'},
        {name: 'monthdays'},
        {name: 'hourdays'},
        {name: 'haberbasico', type : 'float'},
        {name: 'bonoantiguedad', type : 'float'},
        {name: 'numerohorassextra'},
        {name: 'horasextras', type : 'float'},
        {name: 'bonoproduccion', type : 'float'},
        {name: 'otrosbonos', type : 'float'},
        {name: 'nrodomingos'},
        {name: 'dominical', type : 'float'},
        {name: 'afp', type : 'float'},
        {name: 'rciva', type : 'float'},
        {name: 'otrosdescuentos', type : 'float'}
    ]
});