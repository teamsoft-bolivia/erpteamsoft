<?php

/*
 * @Autor: Max marcelo jimenez T
 * @Email: maxmjt@gmail.com
 */
/** treegrid.php **/
$children = array();
$children['root'] = array(); // Root folder
$children['root'][] = array(
    'numero' => 1,  // Data values
    'text'  => 'Activo Corriente',         //   "    "
    'value'  => '5',         //   "    "
    'iconCls'  => 'task-folder', // Style
    'expanded' => false,         // Expanded
    'leaf'     => false,         // Leaf
    'id'       => 'soft_1'       // Unique ID
);
$children['root'][] = array(
    'numero' => 2,
    'text'  => 'Activo No Corriente',
    'value'  => '10',
    'iconCls'  => 'task',
    'expanded' => false,
    'leaf'     => true,
    'id'       => 'hard_1'
    );

$children['soft_1'] = array(); // Software folder
$children['soft_1'][] = array(
    'numero' => 3,
    'text'  => 'Activo',
    'value'  => '2',
    'iconCls'  => 'task',
    'expanded' => false,
    'leaf'     => true,
    'id'       => 'soft_1a'
    );
$children['soft_1'][] = array(
    'numero' => 4,
    'text'  => 'Activo',
    'value'  => '2',
    'iconCls'  => 'task',
    'expanded' => false,
    'leaf'     => true,
    'id'       => 'soft_1b'
    );

$id = $_GET['node'];
//echo $_GET['node'];
$data = array(
    'text' => '.',
    'children' => $children[$id]);
echo json_encode($data);



?>
