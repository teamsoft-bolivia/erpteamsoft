<?php

/*
 * @Autor: Max marcelo jimenez T,Cristhian Valencia, Pablo Garcia G.
 * @Email: maxmjt@gmail.com, ,garcia_guaman_pablo@hotmail.com
 */
session_start();

require_once '../include.php';
    class sis_crm_employee
    {
        public $_iduser;
        public $_tablename;
        public $_identerprise;

        public function __construct($usuario,$enterprise) {
            $this->_iduser=$usuario;
            $this->_identerprise=$enterprise;
            $this->_tablename= crm_employee::table_name();

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
                
                case 'readcboemployee':
                    $select="employee.*,person.person_first_name,person.person_middle_name,person.person_last_name,
                             branch.id_enterprise,COALESCE(person.person_last_name,'') || ' ' || COALESCE(person.person_middle_name,'') || ' ' || COALESCE(person.person_first_name,'') as employeename" ;
                    
                    $join="INNER JOIN person ON (employee.id_person=person.id_person)";
                    $join.="INNER JOIN branch_employee ON (branch_employee.id_person=employee.id_person)";
                    $join.="INNER JOIN branch ON (branch.id_branch=branch_employee.id_branch)";
                    
                    if (isset($datos['query']) && $datos['query']!='' ) {
                        $conditions=array("branch.id_enterprise=? AND ( person.person_first_name ilike '%".$datos['query']."%' OR person.person_middle_name ilike '%".$datos['query']."%' OR person.person_last_name ilike '%".$datos['query']."%')",  $this->_identerprise);
                    }else{
                        if (isset($datos['responsible'])) {
                            $conditions=array("branch.id_enterprise=? AND employee.id_person=".$datos['responsible'],  $this->_identerprise);
                        }else if(isset($datos['id_person'])){
                            $conditions=array("branch.id_enterprise=? AND employee.id_person=".$datos['id_person'],  $this->_identerprise);
                        }else{
                            $conditions=array("branch.id_enterprise=? AND employee.id_person=-1",  $this->_identerprise);
                        }
                        
                    }
                    try {
                        $employes= crm_employee::find('all',array('select'=>$select,'joins'=>$join,'conditions'=>$conditions));
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
     
    $store=new sis_crm_employee($iduser,$identerprise);
    $store->$xaction($_POST);
?>
