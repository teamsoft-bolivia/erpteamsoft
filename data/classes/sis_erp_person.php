<?php session_start(); ?>
<?php

/*
 * @Autor: Max marcelo jimenez T
 * @Email: maxmjt@gmail.com
 */

require_once '../include.php';
require_once '../classes/tools/sis_tools_server.php';

    class sis_erp_person 
    {
        public $_iduser;
        public $_tablename;
        public $_identerprise;

        public function __construct($usuario,$enterprise) {
            $this->_iduser=$usuario;
            $this->_identerprise=$enterprise;
            $this->_tablename= erp_person::table_name();

        }
        
        public function saveImage($person){
            sleep(1);
            $archivo = $_FILES["upphoto"]['name'];
            if ($archivo!='') {
                $destino="../dataimages/personal/".$person->identerprise.'-'.$person->idperson.".png";  
                if (file_exists($destino)==1) {
                    unlink($destino); 
                }
                if (copy($_FILES['upphoto']['tmp_name'],$destino)) {
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
                case 'read':
                    switch ($yaction) {
                        case 'reademployee':
                           $query="SELECT eep.*,epp.*,econ.*,dnit.type as dnitypename,gend.type as gendername,marital.type as maritalstatusname,
                                            stat.type as statename,epp.lastname || ' ' || epp.name as employeename 
                                    FROM erp_employee eep
                                    LEFT OUTER JOIN erp_employee_contract econ ON econ.idemployee=eep.idemployee  
                                    INNER JOIN erp_person epp ON eep.idperson=epp.idperson
                                    INNER JOIN erp_type dnit ON dnit.idtype=epp.dnitype
                                    INNER JOIN erp_type gend ON gend.idtype=epp.gender
                                    INNER JOIN erp_type marital ON marital.idtype=epp.maritalstatus
                                    INNER JOIN erp_type stat ON stat.idtype=eep.state
                                    WHERE epp.identerprise=2 ";
                           $employee= erp_employee::find_by_sql($query);
                            $total=count($employee);
                            $json='';
                            foreach ($employee as $empl) {
                                $json.= $empl->to_json().',';
                            }
                            $json=substr($json, 0,  strlen($json)-1);
                            echo '{"total":"'.$total.'","results":['.$json.']}';
                        break;
                    }
                break;
                case 'save':
                    switch ($yaction) {
                        case 'insertemployee':
                            
                            $data=array();
                            $data['identerprise']=$this->_identerprise;
                            $data['iduser']=  $this->_iduser;
                            $data['datecreated']=sis_tools_server::getActualDate('N');
                            foreach ($datos as $key => $value) {
                                if ($key!='xaction' && $key!='yaction' && $key!='idperson' && $key!='idemployee' && $key!='photo' && $key!='state' && $key!='code' && $key!='upphoto') {
                                    $data[$key]=$value;
                                }
                            }
                            
                            try {
                                $newperson=  new erp_person($data);
                                $newperson->save();
                                if ($_FILES["upphoto"]['name']!='') {
                                    $newperson->photo=$newperson->identerprise.'-'.$newperson->idperson.'.png';
                                    
                                }else{
                                    $newperson->photo='no.png';
                                }
                                $newperson->save();
                                $this->saveImage($newperson);
                                $data2=array();
                                $data2['idperson']=$newperson->idperson;
                                $data2['code']='P-000'.$newperson->idperson;//crear funcion para generar codigo de personal
                                $data2['state']=$datos['state'];
                                $newemployee=new erp_employee($data2);
                                $newemployee->save();
                                
                                echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!","idperson":'.$newperson->idperson.',"idemployee":'.$newemployee->idemployee.',"identerprise":'.$newperson->identerprise.',"photo":"'.$newperson->photo.'","code":"'.$newemployee->code.'"}';
                            } catch (Exception $exc) {
                                //echo $exc->getTraceAsString();
                                echo '{"success":false,"title":"Error:","msg":"No se pudo guardar!!","error":"'.addslashes($exc->getMessage()).'"}';
                            }
                        break;
                                
                        case 'updateemployee':
                            $idperson=$datos['idperson'];
                            $idemployee=$datos['idemployee'];
                            $data=array();
                            $data2=array();
                            foreach ($datos as $key => $value) {
                                if ($key!='xaction' && $key!='yaction' && $key!='idperson' && $key!='idemployee' && $key!='photo' && $key!='code' && $key!='state') {
                                    $data[$key]=$value;
                                }
                                if($key=='state'){
                                    $data2[$key]=$value;
                                }
                            }
                            
                            try {
                                
                                $person=  erp_person::find($idperson);
                                if (isset($datos['photo'])) {
                                    $data['photo']=$person->identerprise.'-'.$person->idperson.'.png';
                                    $this->saveImage($person);
                                    
                                }
                                $person->update_attributes($data);
                                $person->save();
                                ;
                                $data2['dateupdated']= sis_tools_server::getActualDate('E');
                                $newemployee=erp_employee::find($idemployee);
                                $newemployee->save();
                                echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!","idperson":'.$person->idperson.',"idemployee":'.$newemployee->idemployee.',"identerprise":'.$person->identerprise.',"photo":"'.$person->photo.'","code":"'.$newemployee->code.'"}';
                            } catch (Exception $exc) {
                               echo '{"success":false,"title":"Error:","msg":"No se pudo guardar!!","error":"'.addslashes($exc->getMessage()).'"}';
                            }
                        break;

                        
                    }
                break;
                
            }
        }
    }

    $xaction=$_POST['xaction'];
    
     $iduser=isset($_SESSION['ERP']['iduser'])?$_SESSION['ERP']['iduser']:0;
     $identerprise=isset($_SESSION['ERP']['identerprise'])?$_SESSION['ERP']['identerprise']:0;
     
    $person=new sis_erp_person($iduser,$identerprise);
    $person->$xaction($_POST);
?>
