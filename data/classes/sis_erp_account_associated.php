<?php

/*
 * @Autor: Max marcelo jimenez T, Cristhian Valencia, Pablo Garcia G.
 * @Email: maxmjt@gmail.com,fox_tian@hotmail.com ,garcia_guaman_pablo@hotmail.com
 */
session_start();
require_once '../include.php';


    class sis_erp_account_associated 
    {
        public $_iduser;
        public $_tablename;
        public $_identerprise;
       // public $_enterprisename;

        public function __construct($usuario,$identerprise) {
            $this->_iduser=$usuario;
            $this->_identerprise=$identerprise;
            $this->_tablename= erp_account_associated::table_name(); //ted 'erp_account_associated';
            
            
            
            
        }
        
        public function getActualDate($mode){
            $sql="SELECT CURRENT_TIMESTAMP as fecha";
            $result=  erp_account_associated::find_by_sql($sql);
            $res=$result[0]->fecha;
            $res= explode($res, '.');
            
            if ($mode=='N') {
                return $res[0];
            }else{
                return $result[0]->fecha;//2012-07-03 22:09:41.488-04:30
            }
            
        }
        
        public function getEnterpriseName (){
           
            //return $e; 
        }


        public function __call($option,$att) {
            $datos=$att[0];
            $yaction=$datos['yaction'];
            switch ($option)
            {	          
                case 'read':
                    $start=$datos['start'];
                    $limit=$datos['limit'];
                    $idaccountplan=$datos['idaccountplan'];
                    $tablename=$datos['tablename'];
                    
                    $filter='';
                    
                    $total=0;
                    $json='';
                    switch($tablename){
                        
                        case 'enterprise_client':
                            if (isset($datos['filter']) && $datos['filter']!='') {
                                $filter="AND (client_code  ILIKE '%".$datos['filter']."%' OR client_name ILIKE '%".$datos['filter']."%')" ;
                            }
                                                  
                            $sql="SELECT 
                                (SELECT aa.idaccountassociated from erp_account_associated aa  WHERE aa.idassociated=ec.id_client AND aa.idaccountplan=$idaccountplan AND aa.tablename='$tablename')as idaccountassociated,
                                ec.id_client as id,
                                ec.client_code as code,
                                ec.client_name as name,
                                (CASE  WHEN ((SELECT aa.idaccountassociated from erp_account_associated aa  WHERE aa.idassociated=ec.id_client AND aa.idaccountplan=$idaccountplan AND aa.tablename='$tablename')isnull) THEN false ELSE true END)as asociada
                                FROM $tablename ec
                                INNER JOIN branch b ON ec.id_branch=b.id_branch
								INNER JOIN enterprise e on e.id_enterprise=b.id_enterprise
								WHERE b.branch_active=true AND  ec.client_active=true AND ec.client_name <> '' AND e.id_enterprise=$this->_identerprise $filter
								GROUP BY ec.id_client, ec.client_code, ec.client_name
								ORDER BY asociada DESC
                                                                LIMIT $limit OFFSET $start";
								
                                //echo $sql;
                                $sql2="SELECT 
                                (SELECT aa.idaccountassociated from erp_account_associated aa  WHERE aa.idassociated=ec.id_client AND aa.idaccountplan=$idaccountplan AND aa.tablename='$tablename')as idaccountassociated,
                                ec.id_client,
                                ec.client_code,
                                ec.client_name,
                                (CASE  WHEN ((SELECT aa.idaccountassociated from erp_account_associated aa  WHERE aa.idassociated=ec.id_client AND aa.idaccountplan=$idaccountplan AND aa.tablename='$tablename')isnull) THEN false ELSE true END)as asociada
                                FROM $tablename ec
                                INNER JOIN branch b ON ec.id_branch=b.id_branch
								INNER JOIN enterprise e on e.id_enterprise=b.id_enterprise
								WHERE b.branch_active=true AND  ec.client_active=true AND ec.client_name <> '' AND e.id_enterprise=$this->_identerprise $filter
								GROUP BY ec.id_client, ec.client_code, ec.client_name
								ORDER BY asociada DESC
                                                               ";
                                $cuentasAsociadas= erp_account_associated::find_by_sql($sql);
                                $total=count(erp_account_associated::find_by_sql($sql2));

                               
                                
                       break;
                       
                       case 'employee':
                        
				if (isset($datos['filter']) && $datos['filter']!='') {
                                $filter="AND (em.employee_code  ILIKE '%".$datos['filter']."%' OR p.person_first_name ILIKE '%".$datos['filter']."%' OR p.person_last_name ILIKE '%".$datos['filter']."%')" ;
                            }
                            $sql="
							SELECT 
								(SELECT aa.idaccountassociated from erp.erp_account_associated aa  WHERE aa.idassociated=p.id_person AND aa.idaccountplan=3 AND aa.tablename='$tablename') AS idaccountassociated,
								p.id_person as id,
								em.employee_code as code,
								(p.person_first_name) as name,
                                                                --(p.person_last_name ||' - '|| p.person_first_name) as name,
								(CASE  WHEN ((SELECT aa.idaccountassociated from erp.erp_account_associated aa  WHERE aa.idassociated=p.id_person AND aa.idaccountplan=$idaccountplan AND aa.tablename='$tablename')isnull) THEN false ELSE true END)as asociada 
								
								FROM branch_employee  be 
								INNER JOIN person p ON be.id_person=p.id_person 
								INNER JOIN employee em ON be.id_person=em.id_person
								INNER JOIN branch b ON be.id_branch=be.id_branch
								INNER JOIN enterprise e ON b.id_enterprise=e.id_enterprise

								WHERE b.branch_active=true AND p.person_active=TRUE AND e.id_enterprise=$this->_identerprise $filter
								
								GROUP BY p.id_person,em.employee_code,p.person_first_name
								ORDER BY asociada DESC
                                                                LIMIT $limit OFFSET $start
							"; 
							 
                                $sql2="
							SELECT 
								(SELECT aa.idaccountassociated from erp.erp_account_associated aa  WHERE aa.idassociated=p.id_person AND aa.idaccountplan=3 AND aa.tablename='$tablename') AS idaccountassociated,
								p.id_person,
								em.employee_code,
								(p.person_first_name) as name,
                                                                --(p.person_last_name ||' - '|| p.person_first_name) as name,
								(CASE  WHEN ((SELECT aa.idaccountassociated from erp.erp_account_associated aa  WHERE aa.idassociated=p.id_person AND aa.idaccountplan=$idaccountplan AND aa.tablename='$tablename')isnull) THEN false ELSE true END)as asociada 
								
								FROM branch_employee  be 
								INNER JOIN person p ON be.id_person=p.id_person 
								INNER JOIN employee em ON be.id_person=em.id_person
								INNER JOIN branch b ON be.id_branch=be.id_branch
								INNER JOIN enterprise e ON b.id_enterprise=e.id_enterprise

								WHERE b.branch_active=true AND p.person_active=TRUE AND e.id_enterprise=$this->_identerprise $filter
								
								GROUP BY p.id_person,em.employee_code,p.person_first_name
								ORDER BY asociada DESC
                                                                
							"; 
                                //echo $sql;
                                $cuentasAsociadas= erp_account_associated::find_by_sql($sql);
                                $total=count(erp_account_associated::find_by_sql($sql2));

                       break;
                      
                    }
                    
                    foreach ($cuentasAsociadas as $cuenta) {
                         $json.= $cuenta->to_json().',';
                    }
                         $json=substr($json, 0,  strlen($json)-1);
                    echo '{"success":true,"total":'.$total.',"results":['.$json.']}';
                    
                break;
				
                case 'insert':
                        $idaccountplan =$datos['idaccountplan'];
                        $id =$datos['id'];
			$tablename=$datos['tablename'];

                        $cuentaAsociada=array();
                        $cuentaAsociada['idaccountplan']=$idaccountplan;
                        $cuentaAsociada['idassociated']=$id;
                        $cuentaAsociada['tablename']=$tablename;
                        $cuentaAsociada['dateassociated']=  $this->getActualDate('S');
                        $cuentaAsociada['iduser']=  $this->_iduser;
                        $cuentaAsociada['identerprise']=  $this->_identerprise;

                        $result=erp_account_associated::create($cuentaAsociada);

                        if ($result) {
                                    echo '{"success":true,"title":"Correcto:","msg":"La cuenta fue asociada correctamente!!"}';

                        }else{
                                    echo '{"success":false,"title":"Error:","msg":"No se pudo asociar!!"}';
                        }
                break;

                case 'delete':
                        $idaccountplan =$datos['idaccountplan'];
                        $id =$datos['id'];
                        $tablename=$datos['tablename'];
                        
                        $sql="SELECT  idaccountassociated FROM $this->_tablename WHERE idaccountplan=$idaccountplan AND idassociated=$id AND tablename='$tablename'";
                        //echo $sql;
                        $cuentasAsociadas= erp_account_associated::find_by_sql($sql);
                        
                        $total=count($cuentasAsociadas);
                        
                        $arreglo= array();
                           
                        foreach ($cuentasAsociadas as $cuenta) {
                                
                            $result=erp_account_associated::find($cuenta->idaccountassociated);


                            if($result->delete()){
                                echo '{"success":true,"title":"Correcto:","msg":"Se quito la asociacion correctamente!!"}';
                            }else{
                                echo '{"success":false,"title":"Error:","msg":"No se pudo desasociar $result->errors()!!"}';

                            }
                                
                         }

                       
//                       
                break;
				
				
                case 'update':
                            /*
                            $data= array();
                            
                            $json = file_get_contents('php://input');
                            $data=json_decode($json);
                            $idcliente =$data->id_client;
                            $asociada=$data->asociada;
                            
                            
                            if($asociada)
                             {   
                                
							  
                                $cuentaAsociada=array();
                                $cuentaAsociada['idaccountplan']=220000000;
                                $cuentaAsociada['idassociated']=$idcliente;
                                $cuentaAsociada['tablename']='enterprise_client';

                                $result=erp_account_associated::create($cuentaAsociada);

                                if ($result) {
                                    echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!"}';
                               
                               }else{
                                    echo '{"success":false,"title":"Error:","msg":"No se pudo guardar!!"}';
                               }
							  
                                
                            }else{
					
                            } 
                             
                             */
                break;
                
                case 'enterprisename':
                    $enterprise=crm_enterprise::find('first',array('conditions'=>array('id_enterprise=?',$this->_identerprise)));
                    $result=array("success"=>true,"enterpriseName"=>$enterprise->bussiness_name);
                    
                    echo json_encode($result); 
                     
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
      
      $accountassociated=new sis_erp_account_associated($iduser,$identerprise);
      $accountassociated->$xaction($_POST);
?>
