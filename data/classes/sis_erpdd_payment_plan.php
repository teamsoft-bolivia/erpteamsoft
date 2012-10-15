<?php session_start(); ?>
<?php

/*
 * @Autor: Pablo Garcia Guaman
 * @Email: garciaguamanpablo@gmail.com
 */

require_once '../include.php';
    class sis_erpdd_payment_plan 
    {
        public $_iduser;
        public $_tablename;
        public $_identerprise;

        public function __construct($usuario,$enterprise) {
            $this->_iduser=$usuario;
            $this->_identerprise=$enterprise;
            $this->_tablename= erpdd_payment_plan::table_name();

        }
        
        public function getActualDate($mode){
            $sql="SELECT CURRENT_TIMESTAMP as fecha";
            $result=erpdd_payment_plan::find_by_sql($sql);
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
                    switch ($yaction)
                    {
                        case 'readlist':
                            $order="$this->_tablename.numberfee ASC";
                            $conditions=array("iddocument=?",$datos['iddocument']);
                            try {
                                
                                $txns= erpdd_payment_plan::find('all',array('conditions'=>$conditions,'order'=>$order));

                            } catch (Exception $exc) {
                                print_r($exc);
                            }

                            $json='';
                            foreach ($txns as $cuenta) {
                                $json.= $cuenta->to_json().',';
                            }
                            $json=substr($json, 0,  strlen($json)-1);

                            echo '{"total":"0","results":['.$json.']}';
                            
                        break;
                    }
                break;
                case 'save':
                    switch ($yaction) {
                        case 'insert':

                            
                        break;
                                
                        case 'update':

                        break;
                    }
                break;
                case 'delete':

                    
                break;
 
            }
        }
    }

    $xaction=$_POST['xaction'];
    $iduser=isset($_SESSION['ERP']['iduser'])?$_SESSION['ERP']['iduser']:0;
    $identerprise=isset($_SESSION['ERP']['identerprise'])?$_SESSION['ERP']['identerprise']:0;

    $item=new sis_erpdd_payment_plan($iduser,$identerprise);
    $item->$xaction($_POST);
?>
