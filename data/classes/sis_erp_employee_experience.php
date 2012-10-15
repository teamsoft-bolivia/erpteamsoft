<?php session_start(); ?>
<?php

/*
 * @Autor: Pablo Garcia guaman
 * @Email: garciaguamanpablo@gmail.com
 */

require_once '../include.php';
    class sis_erp_employee_experience 
    {
        public $_iduser;
        public $_tablename;
        public $_identerprise;

        public function __construct($usuario,$enterprise) {
            $this->_iduser=$usuario;
            $this->_identerprise=$enterprise;
            $this->_tablename= erp_employee_experience ::table_name();

        }
        
        public function __call($option,$att) {
            $datos=$att[0];
            $yaction=$datos['yaction'];
            //echo $datos['xaction'];
            switch ($option)
            {
                case 'save':
                    switch ($yaction) {
                        case 'insert':
                            
                            $data=array();
                            foreach ($datos as $key => $value) {
                                if ($key!='xaction' && $key!='yaction' && $key!='idexperience' && $key!='null') {
                                    $data[$key]=$value;
                                }
                            }
                            try {
                                $experience=  new erp_employee_experience ($data);
                                $experience->save();
                                 echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!"}';
                            } catch (Exception $exc) {
                                echo '{"success":false,"title":"Error:","msg":"No se pudo guardar!!","error":"'.addslashes($exc->getMessage()).'"}';
                            }
                        break;
                                
                        case 'update':
                            $experience=$datos['idemployee'];
                            $experience=$datos['idexperience'];
                            $data=array();
                            
                            foreach ($datos as $key => $value) {
                                if ($key!='xaction' && $key!='yaction' && $key!='idexperience' && $key!='idemployee' && $key!='null') {
                                    $data[$key]=$value;
                                }
                            }
                            try {
                                $language=erp_employee_experience ::find($experience);
                                $language->update_attributes($data);
                                $language->save();
                                echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!"}';
                            } catch (Exception $exc) {
                                echo '{"success":false,"title":"Error:","msg":"No se pudo guardar!!","error":"'.addslashes($exc->getMessage()).'"}';
                            }
                            
                        break;
                    }
                break;
                case 'read':
                    $idemployee=$datos['idemployee'];
                        $select='erp_employee_experience.*';
                        $conditions=array("erp_employee_experience.idemployee=?",$idemployee);
                        //$join='INNER JOIN erp_type read ON (read.idtype=erp_employee_language.read) ';
                        //$join.='INNER JOIN erp_type write ON (write.idtype=erp_employee_language.write) ';
                        //$join.='INNER JOIN erp_type speaking ON (speaking.idtype=erp_employee_language.speaking) ';
                        $order='erp_employee_experience.idexperience DESC';
                        try {
                            $experience=  erp_employee_experience ::find('all',array('select'=>$select,'conditions'=>$conditions,'order'=>$order));
                        } catch (Exception $e) {
                            print_r($e);
                        }
                        
                        $json='';
                        foreach ($experience as $datas) {
                            $json.= $datas->to_json().',';
                        }
                        $json=substr($json, 0,  strlen($json)-1);

                        echo '{"total":"0","results":['.$json.']}';
                    
                    
                break;
                case 'delete':
                    $idexperience=$datos['idexperience'];
                    $experience=erp_employee_experience ::find($idexperience);
                    try {
                        $experience->delete();
                        echo '{"success":true,"title":"Correcto:","msg":"Se el registro se elimin&oacute; correctamente!!"}';
                    } catch (Exception $exc) {
                        echo '{"success":false,"title":"Error:","msg":"No se pudo guardar!!","error":"'.addslashes($exc->getMessage()).'"}';
                    }
                    
                break;       
                
            }
        }
    }

    $xaction=$_POST['xaction'];
    
     $iduser=isset($_SESSION['ERP']['iduser'])?$_SESSION['ERP']['iduser']:0;
     $identerprise=isset($_SESSION['ERP']['identerprise'])?$_SESSION['ERP']['identerprise']:0;
     
    $experience=new sis_erp_employee_experience ($iduser,$identerprise);
    $experience->$xaction($_POST);
?>
