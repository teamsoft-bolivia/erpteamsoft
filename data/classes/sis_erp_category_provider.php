<?php

/*
 * @Autor: Max marcelo jimenez T,Cristhian Valencia, Pablo Garcia G.
 * @Email: maxmjt@gmail.com,fox_tian@hotmail.com ,garcia_guaman_pablo@hotmail.com
 */
session_start();

require_once '../include.php';
    class sis_erp_category_provider
    {
        public $_iduser;
        public $_tablename;
        public $_identerprise;

        public function __construct($usuario,$enterprise) {
            $this->_iduser=$usuario;
            $this->_identerprise=$enterprise;
            $this->_tablename= erp_category_provider::table_name();

        }
        
        public function getActualDate($mode){
            $sql="SELECT CURRENT_TIMESTAMP as fecha";
            $result=erp_account_plan::find_by_sql($sql);
            $res=$result[0]->fecha;
            $res= explode($res, '.');
            //$date=new ActiveRecord\DateTime();
            //echo $date->format('Y-m-d H:i:s');
            if ($mode=='N') {
                return $res[0];
            }else{
                return $result[0]->fecha;//2012-07-03 22:09:41.488-04:30
            }
            
        }
      
        public function __call($option,$att) {
            $datos=$att[0];
            $yaction=$datos['yaction'];
            //echo $datos['xaction'];
            switch ($option)
            {
                
                case 'read':
                    $start=$datos['start'];
                    $limit=$datos['limit'];
                    $idprovider=$datos['idprovider'];
                    $arreglo= array();
                    $total=0;
                    $filter='';
                    if (isset($datos['filter']) && $datos['filter']!='') {
                                $filter="AND (categoryname  ILIKE '%".$datos['filter']."%')" ;
                    }
                    $sql ="SELECT 
                            cp.idcategoryprovider,
                            cp.idcategory,
                            c.categoryname,
                            c.idcategoricalgrouping,
                            (SELECT t.type FROM erp_type t WHERE t.idtype=c.idcategoricalgrouping) as agrupacion_categorica,
                            (SELECT t.alias FROM erp_type t WHERE t.idtype=c.idcategoricalgrouping) as alias,
                            cp.idprovider,
                            c.active
                            FROM erp_category_provider cp
                            INNER JOIN erp_category c ON c.idcategory=cp.idcategory
                            INNER JOIN erp_provider p ON p.idprovider=cp.idprovider
                            WHERE cp.idprovider= $idprovider AND cp.identerprise=$this->_identerprise $filter
                            ORDER BY c.idcategoricalgrouping ASC
                            LIMIT $limit OFFSET $start
                            ";
                     $sql2 ="SELECT 
                            cp.idcategoryprovider,
                            cp.idcategory,
                            c.categoryname,
                            c.idcategoricalgrouping,
                            (SELECT t.type FROM erp_type t WHERE t.idtype=c.idcategoricalgrouping) as agrupacion_categorica,
                            (SELECT t.alias FROM erp_type t WHERE t.idtype=c.idcategoricalgrouping) as alias,
                            cp.idprovider,
                            c.active
                            FROM erp_category_provider cp
                            INNER JOIN erp_category c ON c.idcategory=cp.idcategory
                            INNER JOIN erp_provider p ON p.idprovider=cp.idprovider
                            WHERE cp.idprovider= $idprovider AND cp.identerprise=$this->_identerprise  $filter
                            ORDER BY c.idcategoricalgrouping ASC
                            ";
                    //echo $sql;
                    $categorias= erp_category_provider::find_by_sql($sql);
                    $total=count(erp_category_provider::find_by_sql($sql2));
                  
                  
                   $json='';
                    foreach ($categorias as $categoria) {
                       $json.= $categoria->to_json().',';
                    }
                    $json=substr($json, 0,  strlen($json)-1);
                    
                    echo '{"success":"true","total":'.$total.',"results":['.$json.']}';
                    
               
                    
                break;
                
                case 'update':
                    
                    $dataJson=json_decode($datos['valoresCategoria']);
                     
                    $idprovider=$datos['idprovider'];
                    
                    $data=array();
                   
                    $data['idcategory']=$dataJson->idcategoryprovider;                 
                    $data['idcategory']=$dataJson->idcategory;
                    $data['idprovider']=$idprovider;
                                      
                   
                    $categoria= erp_category_provider::find($data['idcategory']);
                    $categoria->update_attributes($data);
                    $categoria->save();
                    if ($categoria) {
                         
                        echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!"}';

                    }else{
                        echo '{"success":false,"title":"Error:","msg":"No se pudo guardar!!"}';
                    }
                
                break;
                
                 case 'insert':
                    
                    $dataJson=json_decode($datos['valoresCategoria']);
                    $idprovider=$datos['idprovider'];
                   
                    $data=array();
                   
                                   
                    $data['idcategory']=$dataJson->idcategory;
                    $data['idprovider']=$idprovider;
                    $data['identerprise']=$this->_identerprise ;
                   
                   
                    $categoriasproveedor= erp_category_provider::all(array('conditions'=>array('idprovider=? AND idcategory=?',$idprovider,$dataJson->idcategory)));
                    $total=count($categoriasproveedor);
                   //print_r($categoriasproveedor);
                   
                    if($total>0){
                          echo '{"success":true,"title":"Error:","msg":"Ya existe esa categoria para este proveedor!!"}';
                    }else{
                         $categoriaprovedor=erp_category_provider::create($data);
                    

                        if ($categoriaprovedor) {
                            echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!"}';
                        }else{
                            echo '{"success":false,"title":"Error:","msg":"No se pudo guardar!!"}';
                        }
                
                        
                    }
                        
                        
                   
                break;
                
                case 'deletecategoryprovider': 
                    $idcategoryprovider=(int)$datos['idcategoryprovider'];
                    $categoryprovider = erp_category_provider::find($idcategoryprovider);
                   
                    $result=$categoryprovider->delete();
                            if ($result) {
                                echo '{"success":true,"title":"Correcto:","msg":"Se elimino correctamente!!"}';
                                
                            }else{
                                echo '{"success":false,"title":"Error:","msg":"No se pudo eliminar!!"}';
                            }
                    
                break;
               
                case 'loadrecordcategory':
                $iditem=$datos['iditem'];
                $marca='';
                $modelo='';
                $rubro='';
                
                $sql ="SELECT
                c.idcategory,
                c.categoryname,
                t2.alias

                FROM
                erp_category AS c
                INNER JOIN erp_item_category ic ON ic.idcategory=c.idcategory
                INNER JOIN erp_item i ON i.iditem=ic.iditem
                INNER JOIN erp_type AS t2 ON t2.idtype = c.idcategoricalgrouping

                WHERE
                c.identerprise=$this->_identerprise AND 
                i.iditem=$iditem

                GROUP BY
                c.idcategory,
                c.categoryname,
                t2.type,
                t2.alias";
                //echo $sql;
                $categorias= erp_category::find_by_sql($sql);
                $total=count($categorias);
                $data= 'iditem:'.$iditem.',';
                if($total>0){
                
                   
                    foreach ($categorias as $categoria) {
                        $data.=$categoria->alias.':'.$categoria->idcategory.',';
                       
                    
                    }
                     $data=substr($data, 0,  strlen($data)-1);
                } 
              
                     echo '{"success":true,"total":'.$total.',"data":{'.$data.'}}';
                break;
                
               
            }
        }
    }
   
    
    if (!isset($_POST['yaction'])) {
        $_POST['yaction']='';
    }
    
    if (!isset($_POST['xaction'])) {
        $_POST['xaction']='update';
    }
      $xaction=$_POST['xaction'];
    
     $iduser=isset($_SESSION['ERP']['iduser'])?$_SESSION['ERP']['iduser']:0;
     $identerprise=isset($_SESSION['ERP']['identerprise'])?$_SESSION['ERP']['identerprise']:0;
     
    $categoryprovider=new sis_erp_category_provider($iduser,$identerprise);
    $categoryprovider->$xaction($_POST);
?>
