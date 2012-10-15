<?php

/*
 * @Autor: Max marcelo jimenez T,Cristhian Valencia, Pablo Garcia G.
 * @Email: maxmjt@gmail.com,fox_tian@hotmail.com ,garcia_guaman_pablo@hotmail.com
 */
session_start();

require_once '../include.php';
    class sis_erp_item_category
    {
        public $_iduser;
        public $_tablename;
        public $_identerprise;

        public function __construct($usuario,$enterprise) {
            $this->_iduser=$usuario;
            $this->_identerprise=$enterprise;
            $this->_tablename= erp_item_category::table_name();

        }
        
        public function getActualDate($mode){
            $sql="SELECT CURRENT_TIMESTAMP as fecha";
            $result=erp_item_category::find_by_sql($sql);
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
  
                break;
                
                case 'save':
                    switch ($yaction) {
                        case 'insert':
                            $iditem=$datos['iditem'];
                            $identerprise=$this->_identerprise;
                            erp_item_category::table()->delete(array('iditem' => array($datos['iditem'])));
                            foreach ($datos as $key=>$value) {
                                
                                if ($key!='xaction' && $key!='yaction' && $key!='iditem' && $value!='') {
                                    $itc=new erp_item_category();
                                    $itc->iditem=$iditem;
                                    $itc->idcategory=$datos[$key];
                                    $itc->identerprise=$identerprise;
                                    $itc->save();
                                }
                            }
                                echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!"}';

                            break;
                        
                        case 'update':
                            $iditem=$datos['iditem'];
                            $identerprise=$this->_identerprise;
                            erp_item_category::table()->delete(array('iditem' => array($datos['iditem'])));
                            foreach ($datos as $key=>$value) {
                                
                                if ($key!='xaction' && $key!='yaction' && $key!='iditem') {
                                    $itc=new erp_item_category();
                                    $itc->iditem=$iditem;
                                    $itc->idcategory=$value;
                                    $itc->identerprise=$identerprise;
                                    $itc->save();
                                }
                            }
                                echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!"}';
                            break;

                        default:
                            break;
                    }
                break;
  
            }
        }
    }
   
  
      $xaction=$_POST['xaction'];
    
     $iduser=isset($_SESSION['ERP']['iduser'])?$_SESSION['ERP']['iduser']:0;
     $identerprise=isset($_SESSION['ERP']['identerprise'])?$_SESSION['ERP']['identerprise']:0;
     
    $category=new sis_erp_item_category($iduser,$identerprise);
    $category->$xaction($_POST);
?>
