<?php session_start(); ?>
<?php

/*
 * @Autor: Pablo Garcia guaman
 * @Email: garciaguamanpablo@gmail.com
 */

require_once '../include.php';
    class sis_erp_employee_academic_training 
    {
        public $_iduser;
        public $_tablename;
        public $_identerprise;

        public function __construct($usuario,$enterprise) {
            $this->_iduser=$usuario;
            $this->_identerprise=$enterprise;
            $this->_tablename= erp_employee_academic_training::table_name();

        }
        

        
        public function saveImage($item){
            sleep(1);
            $archivo = $_FILES["image"]['name'];
            if ($archivo!='') {
                $destino="../dataimages/items/".$item->identerprise.'-'.$item->iditem.".png";  
                if (file_exists($destino)==1) {
                    unlink($destino); 
                }
                if (copy($_FILES['image']['tmp_name'],$destino)) {
                   return true;
                } else {
                   return false;
                }
                
            }else{
                
            }
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
                                if ($key!='xaction' && $key!='yaction' && $key!='idacademictraining' && $key!='null') {
                                    $data[$key]=$value;
                                }
                            }
                            try {
                                $newacadtrai=  new erp_employee_academic_training($data);
                                $newacadtrai->save();
                                 echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!","document":"'.$newacadtrai->document.'"}';
                            } catch (Exception $e) {
                                echo '{"success":false,"title":"Error:","msg":"No se pudo guardar!!","error":"'.addslashes($exc->getMessage()).'"}';
                            }
                        break;
                                
                        case 'update':
                            $idemployee=$datos['idemployee'];
                            $idacademictraining=$datos['idacademictraining'];
                            $data=array();
                            
                            foreach ($datos as $key => $value) {
                                if ($key!='xaction' && $key!='yaction' && $key!='idacademictraining' && $key!='idemployee' && $key!='null') {
                                    $data[$key]=$value;
                                }
                            }
                            try {
                                $academic=erp_employee_academic_training::find($idacademictraining);
                                $academic->update_attributes($data);
                                $academic->save();
                                echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!","document":"'.$academic->document.'"}';
                            } catch (Exception $exc) {
                                echo '{"success":false,"title":"Error:","msg":"No se pudo guardar!!","error":"'.addslashes($exc->getMessage()).'"}';
                            }
                            
                        break;
                    }
                break;
                case 'read':
                    $idemployee=$datos['idemployee'];
                        $conditions=array('conditions'=>"idemployee=$idemployee");
                        $formation=  erp_employee_academic_training::all($conditions);
                        $json='';
                        foreach ($formation as $datas) {
                            $json.= $datas->to_json().',';
                        }
                        $json=substr($json, 0,  strlen($json)-1);

                        echo '{"total":"0","results":['.$json.']}';
                    
                    
                break;   
                case 'delete':
                    $idacademictraining=$datos['idacademictraining'];
                    $formacad=erp_employee_academic_training::find($idacademictraining);
                    try {
                        $formacad->delete();
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
     
    $formation=new sis_erp_employee_academic_training($iduser,$identerprise);
    $formation->$xaction($_POST);
?>
