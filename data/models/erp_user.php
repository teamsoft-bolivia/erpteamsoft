<?php
/*
 * @Autor: Pablo Garcia guaman
 * @Email: garcia_guaman_pablo@hotmail.com
 */

class erp_user extends ActiveRecord\Model
{
    public static $table_name = 'erp_user';
    public static $primary_key = 'iduser';
    
    /*static $belongs_to=array(
        array('enterprise','class_name'=>'crm_enterprise','readonly'=>true)
    );*/
    
}





?>
