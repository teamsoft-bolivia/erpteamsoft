<?php

/*
 * @Autor: Max marcelo jimenez T,Cristhian Valencia, Pablo Garcia G.
 * @Email: maxmjt@gmail.com, ,garcia_guaman_pablo@hotmail.com
 */
session_start();

require_once '../include.php';
    class sis_erp_period
    {
        public $_iduser;
        public $_tablename;
        public $_identerprise;

        public function __construct($usuario,$enterprise) {
            $this->_iduser=$usuario;
            $this->_identerprise=$enterprise;
            $this->_tablename= erp_period::table_name();

        }
        
        public function getActualDate($mode){
            $sql="SELECT CURRENT_TIMESTAMP as fecha";
            $result=crm_employee::find_by_sql($sql);
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
                
                 case 'readcbodepartaments':
                
                   
                        $sql="SELECT * FROM erp_period where father<>0 AND active=TRUE ORDER BY alias,idperiod desc";
                  
                     try {
                         //echo $sql;
                    $periods=  erp_period::find_by_sql($sql);
                     
                    } catch (Exception $exc) {
                        print_r($exc);
                    }

                    $total=count($periods);
                    $json='';
                    foreach ($periods as $datas) {
                    $json.= $datas->to_json().',';
                    }
                    $json=substr($json, 0,  strlen($json)-1);

                    echo '{"total":"'.$total.'","results":['.$json.']}';
                    
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
     
    $period=new sis_erp_period($iduser,$identerprise);
    $period->$xaction($_POST);
?>
