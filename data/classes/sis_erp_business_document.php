<?php

/*
 * @Autor: Max marcelo jimenez T,Cristhian Valencia, Pablo Garcia G.
 * @Email: maxmjt@gmail.com, ,garcia_guaman_pablo@hotmail.com
 */
session_start();

require_once '../include.php';
    class sis_erp_business_document
    {
        public $_iduser;
        public $_tablename;
        public $_identerprise;

        public function __construct($usuario,$enterprise) {
            $this->_iduser=$usuario;
            $this->_identerprise=$enterprise;
            $this->_tablename= erp_business_document::$table_name;

        }
        
        public function getActualDate($mode){
            $sql="SELECT CURRENT_TIMESTAMP as fecha";
            $result=  erp_business_document::find_by_sql($sql);
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
            switch ($option) {
                case 'save':
                    switch ($yaction) {
                        case 'insertemployeecontract':
                            $data=array();
                            foreach ($datos as $key => $value) {
                                if ($key!='xaction' && $key!='yaction') {
                                    $data[$key]=$value;
                                }
                            }
                            
                            try {
                                $newcont=  new erp_employee_contract($data);
                                $newcont->save();
                                
                                //echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!","idperson":'.$newperson->idperson.',"idemployee":'.$newemployee->idemployee.',"identerprise":'.$newperson->identerprise.',"photo":"'.$newperson->photo.'","code":"'.$newemployee->code.'"}';
                            } catch (Exception $exc) {
                                //echo $exc->getTraceAsString();
                                echo '{"success":false,"title":"Error:","msg":"No se pudo guardar datos de Contrto!!","error":"'.addslashes($exc->getMessage()).'"}';
                            }
                        break;

                        case 'updateemployeecontract':
                            $idemployee=$datos['idemployee'];
                            $data=array();
                            $data2=array();
                            foreach ($datos as $key => $value) {
                                if ($key!='xaction' && $key!='yaction' && $key!='idemployee') {
                                    $data[$key]=$value;
                                }
                            }
                            
                            try {
                                
                                $employeecon=  erp_employee_contract::find(array('idemployee'=>$idemployee));
                                $employeecon->update_attributes($data);
                                $employeecon->save();
                               // echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!","idperson":'.$person->idperson.',"idemployee":'.$newemployee->idemployee.',"identerprise":'.$person->identerprise.',"photo":"'.$person->photo.'","code":"'.$newemployee->code.'"}';
                            } catch (Exception $exc) {
                               echo '{"success":false,"title":"Error:","msg":"No se pudo guardar!!","error":"'.addslashes($exc->getMessage()).'"}';
                            }
                        break;
                    }
                break;
                
                case 'read':
                    switch ($yaction){
                        case 'readbusinessdocuments':
                            (isset($datos['idemployee'])?$idemployee=$datos['idemployee']:$idemployee=-1);
                            $sql = "SELECT di.iddocumentissued,di.idemployee,di.issuedate,bd.*
                                    FROM erp_document_issued AS di 
                                    INNER JOIN erp_business_document AS bd ON di.inbusinessdocument=bd.idbusinessdocument
                                    INNER JOIN erp_employee e ON e.idemployee=di.idemployee
                                    where di.idemployee=".$idemployee."";
                            
                             try {
                                $businessdocs=  erp_business_document::find_by_sql($sql);
                            
                            } catch (Exception $exc) {
                                print_r($exc);
                            }

                            (count($businessdocs)>0?$total=count($businessdocs):$total=0);
                            $json='';
                            foreach ($businessdocs as $datas) {
                            $json.= $datas->to_json().',';
                            }
                            $json=substr($json, 0,  strlen($json)-1);

                            echo '{"total":"'.$total.'","results":['.$json.']}';

                            
                            
                        break;
                    
                    }
                    
                break;
            }



            switch ($option)
            {   
                
                case 'readcboemployee':
                    $select="e.*,p.photo,COALESCE(p.lastname,'')|| ' '|| COALESCE(p.name,'') as employeename";
                    $from="erp_employee e";
                    $join="INNER JOIN erp_person p ON (p.idperson=e.idperson)";
                    $order="p.lastname ASC";
                    
                    
                    if (isset($datos['query']) && $datos['query']!='' ) {
                        $conditions=array("( p.lastname ilike '%".$datos['query']."%' OR p.name ilike '%".$datos['query']."%')");
                    }else{
                        if (isset($datos['responsible'])) {
                            $conditions=array("e.idperson=".$datos['responsible']);
                        }else if(isset($datos['idperson'])){
                            $conditions=array("e.idperson=".$datos['id_person']);
                        }else{
                            $conditions=array("e.idperson=-1");
                        }
                        
                    }
                    try {
                        $employes= erp_employee::find('all',array('select'=>$select,'from'=>$from,'joins'=>$join,'conditions'=>$conditions,'order'=>$order));
                    } catch (Exception $exc) {
                        print_r($exc);
                    }

                    $total=count($employes);
                    $json='';
                    foreach ($employes as $datas) {
                    $json.= $datas->to_json().',';
                    }
                    $json=substr($json, 0,  strlen($json)-1);

                    echo '{"total":"'.$total.'","results":['.$json.']}';
                   
                    
                break;
                
                 case 'readcbostoredependent':
                    (isset($datos['idstore'])?$idstore=$datos['idstore']:$idstore=-1);
                    
                    $select="p.id_person,
				COALESCE(p.person_last_name,'') || ' ' || COALESCE(p.person_middle_name,'') || ' ' || COALESCE(p.person_first_name,'') as employeename" ;
                    
                    $join=" INNER JOIN employee AS em ON em.id_person=sd.idperson";
                    $join.=" INNER JOIN branch_employee AS be ON be.id_person= em.id_person";
                    $join.=" INNER JOIN person p ON p.id_person=be.id_person";
                    
                   
                        if (isset($datos['query']) && $datos['query']!='' ) {
                            $conditions=array("sd.idstore=? AND sd.identerprise=? AND ( p.person_first_name ilike '%".$datos['query']."%' OR p.person_middle_name ilike '%".$datos['query']."%' OR p.person_last_name ilike '%".$datos['query']."%')",$idstore,$this->_identerprise);
                        }else{
                            if (isset($datos['responsible'])) {
                                $conditions=array("sd.idstore=? AND sd.identerprise=?  AND sd.idperson=".$datos['responsible'],$idstore,$this->_identerprise);
                            }else if(isset($datos['id_person'])){
                                $conditions=array("sd.idstore=? AND sd.identerprise=? AND sd.idperson=".$datos['id_person'], $idstore,$this->_identerprise);

                            }else{

                                $conditions=array("sd.idstore=? AND branch.id_enterprise=? AND sd.idperson=-1", $idstore, $this->_identerprise);
                            }

                        }
                   
                    
                    try {
                        $storedependent= erp_store_dependent::find('all',array('select'=>$select,'from'=>'erp_store_dependent AS sd','joins'=>$join,'conditions'=>$conditions));
                        $total=count($storedependent);
                        
                        $json='';
                        foreach ($storedependent as $datas) {
                        $json.= $datas->to_json().',';
                    }
                    $json=substr($json, 0,  strlen($json)-1);

                    echo '{"total":'.$total.',"results":['.$json.']}';
                    } catch (Exception $exc) {
                        print_r($exc);
                    }

                   
                   
                    
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
     
    $businessdocument=new sis_erp_business_document($iduser,$identerprise);
    $businessdocument->$xaction($_POST); 
?>
