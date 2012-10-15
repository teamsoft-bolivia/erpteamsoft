<?php

/*
 * @Autor: Max marcelo jimenez T,Cristhian Valencia, Pablo Garcia G.
 * @Email: maxmjt@gmail.com, ,garcia_guaman_pablo@hotmail.com
 */
session_start();
require_once '../include.php';
    class sis_erp_accounting_type 
    {
        public $_iduser;
        public $_tablename;
        public $_identerprise;

        public function __construct($usuario,$enterprise) {
            $this->_iduser=$usuario;
            $this->_identerprise=$enterprise;
            $this->_tablename= erp_accounting_type::table_name();

        }
        
        public function getActualDate($mode){
            $sql="SELECT CURRENT_TIMESTAMP as fecha";
            $result=erp_accounting_type::find_by_sql($sql);
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
                
                case 'readaccountingtype':
                    $id=(string)$datos['idtipo'];
                    $fiscal=(string)$datos['validarfiscal'];
                    $tax='true';
                    if($fiscal=='fiscal'){
                        $tax=$tax;
                    }else{
                        $tax='false';
                    }
                    $types=  erp_type::find_by_sql("SELECT a.*, ea.accountname, ea.accountcode  FROM ".$this->_tablename." a INNER JOIN erp_account_plan ea ON ea.idaccountplan=a.idaccountplan WHERE a.idtypeenterprise='".$id."' and a.tax=".$tax." order by a.order asc");
                    //$types=  erp_type::find('all',array('conditions'=>array('option=?','tipo_moneda')));
                    $json='';
                    foreach ($types as $type) {
                       $json.= $type->to_json().',';
                    }
                    $json=substr($json, 0,  strlen($json)-1);
                    //echo '['.$json.']';
                    echo '{"total":"3","results":['.$json.']}';
                break;
                case 'updateaccountingtype':
                    $dataJson1=json_decode($datos['valores']);
                    $fiscal=(string)$datos['validarfiscal'];
                    $tax='true';
                    if($fiscal=='fiscal'){
                        $tax=$tax;
                    }else{
                        $tax='false';
                    }
                    $data=array();
                    if($datos['id']!=0){
                       
                        $data['percentage']=$dataJson1->percentage;
                        $data['idaccountplan']=$dataJson1->idaccountplan;
                        $data['order']=$dataJson1->order;
                        if($dataJson1->debit_credit==true){
                                //echo $dataJson1->value;
                                $newvalue='true';
                            }else{
                                $newvalue='false';
                            }
                        $data['debit_credit']=$newvalue;
                        //print_r($data);
                        $options['idaccountingtype']=$datos['id'];
                        $options['identerprise']=$this->_identerprise;
                    
                            //$options['idtype']=(int)$dataJson1->idtype;
                            $result=erp_accounting_type::update_all(array('set'=>$data,'conditions'=>$options));
                            if ($result) {
                                echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!"}';
                                
                            }else{
                                echo '{"success":false,"title":"Error:","msg":"No se pudo guardar!!"}';
                            } 
                    }else{
                        $data['percentage']=$dataJson1->percentage;
                        $data['idaccountplan']=$dataJson1->idaccountplan;
                        $data['order']=$dataJson1->order;
                        if($dataJson1->debit_credit==true){
                                //echo $dataJson1->value;
                                $newvalue='true';
                            }else{
                                $newvalue='false';
                            }
                        $data['debit_credit']=$newvalue;
                        $data['identerprise']=$this->_identerprise;
                        $data['idtypeenterprise']=$datos['idtipo'];
                        $data['tax']=$tax;
                        //print_r($data);
                       $result=erp_accounting_type::create($data);
                            if ($result) {
                                echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!"}';
                                
                            }else{
                                echo '{"success":false,"title":"Error:","msg":"No se pudo guardar!!"}';
                            }   
                    }
                    
                    //}
                break;
                case 'deleteTransaction':
                    
                    $iditemlistprice=(int)$datos['id'];
                    //$id= erp_category_provider::find_by_sql("SELECT * FROM erp_category_provider where idprovider=$iditemlistprice");
                    
                    //$total=count($id);
                   // if($total>0){
                      //  echo '{"success":false,"title":"Advertencia:","msg":"Existe asignado este proveedor!!"}';
                   // }else{
                           $post = erp_accounting_type::find($iditemlistprice);
                   
                           $result=$post->delete();
                            if ($result) {
                                echo '{"success":true,"title":"Correcto:","msg":"Se elimino correctamente!!"}';
                                
                            }else{
                                echo '{"success":false,"title":"Error:","msg":"No se pudo guardar!!"}';
                            }
                   // }
                   
                    
                break;
                
                
                
                
                
            }
        }
    }
    $json = file_get_contents('php://input');
    $dataJson=json_decode($json);
    //print_r($data);
    if (!isset($_POST['yaction'])) {
        $_POST['yaction']='';
    }
    if(isset($dataJson->xaction)){
        $xaction=$dataJson->xaction;
    }else{
    $xaction=$_POST['xaction'];
    }//print_r($_POST) ;
     $iduser=isset($_SESSION['ERP']['iduser'])?$_SESSION['ERP']['iduser']:0;
     $identerprise=isset($_SESSION['ERP']['identerprise'])?$_SESSION['ERP']['identerprise']:0;
    $accountplan=new sis_erp_accounting_type($iduser,$identerprise);
    $accountplan->$xaction($_POST);
?>
