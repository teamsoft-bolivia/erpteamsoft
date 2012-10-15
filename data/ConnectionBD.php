<?php
/*
 * @Autor: Pablo Garcia guaman
 * @Email: garcia_guaman_pablo@hotmail.com
 */

require_once __DIR__ . '/lib/activerecord/ActiveRecord.php';
// initialize ActiveRecord
ActiveRecord\Config::initialize(function($cfg)
{
    $cfg->set_model_directory(__DIR__ . '/models');
    $cfg->set_connections(array('development' => 'pgsql://postgres:Sistemas007@192.168.1.150/crmelite;'));
    ActiveRecord\DateTime::$DEFAULT_FORMAT = 'short';
   

	// you can change the default connection with the below
    //$cfg->set_default_connection('production');
});
?>
