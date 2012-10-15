<?php

/*
 * @Autor: Pablo Garcia G.
 * @Email: garcia_guaman_pablo@hotmail.com
 */
 session_start();
require_once '../../ConnectionBD.php';
    class sis_tools
    {
        public $_iduser;
        public $_identerprise;

        public function __construct($usuario,$enterprise) {
            $this->_iduser=$usuario;
            $this->_identerprise=$enterprise;

        }
      
        public function __call($option,$att) {
            $datos=$att[0];
            switch ($option)
            {   
                case 'getServerDate':
                    $sql="SELECT CURRENT_DATE as fecha";
                    
                    try {
                        $result=  erp_type::find_by_sql($sql);
                        $res=$result[0]->fecha;
                        echo '{"success":true,"serverdate":"'.$res.'"}';
                    } catch (Exception $exc) {
                        echo '{"success":false,"title":"Error:","msg":"Ocurrio un error en el servidor, porfavor comuniquese con el Administrador del Sistema!!!"}';
                    }

                    
                break;
                
                 case 'readprimarycurrency':
                    
                 try {
                     $currency=erp_type::first(array('select'=>'*','from'=>'erp_type','conditions'=>array('value=? AND option=? AND identerprise=?',11,'tipo_moneda',  $this->_identerprise)));
                     
					 echo '{"success":true,"currencyid":'.$currency->idtype.',"currencysimbol":"'.$currency->alias.'"}';
                 }  catch (Exception $exc){ 
                    print_r($exc);
					// echo '{"success":false,"title":"Error:","msg":"Ocurrio un error en el servidor, porfavor comuniquese con el Administrador del Sistema!!!"}';
                    
                 }
                break;

            }
        }
    }
      $xaction=$_POST['xaction'];
     $iduser=isset($_SESSION['ERP']['iduser'])?$_SESSION['ERP']['iduser']:0;
     $identerprise=isset($_SESSION['ERP']['identerprise'])?$_SESSION['ERP']['identerprise']:0;
     
    $tools=new sis_tools($iduser,$identerprise);
    $tools->$xaction($_POST);
?>
