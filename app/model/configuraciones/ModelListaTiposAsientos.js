
/*
 * @Autor: Pablo Garcia guaman
 * @Email: garcia_guaman_pablo@hotmail.com
 */

Ext.define('Erp.model.configuraciones.ModelListaTiposAsientos', {
    extend: 'Ext.data.Model',
    fields: [
                { name: 'idtype', type: 'int'},
                { name: 'idtypeenterprise', type: 'int'},
                { name: 'type', type: 'string'},
                { name: 'option', type: 'string'},
                { name: 'alias', type: 'string'},
                { name: 'father'},
                { name: 'value', type: 'string'},
                { name: 'identerprise'}
           ]
});



