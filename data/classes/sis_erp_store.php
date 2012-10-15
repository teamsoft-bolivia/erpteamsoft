<?php

/*
 * @Autor: Max marcelo jimenez T,Cristhian Valencia, Pablo Garcia G.
 * @Email: maxmjt@gmail.com,fox_tian@hotmail.com ,garcia_guaman_pablo@hotmail.com
 */
session_start();

require_once '../include.php';
    class sis_erp_store
    {
        public $_iduser;
        public $_tablename;
        public $_identerprise;

        public function __construct($usuario,$enterprise) {
            $this->_iduser=$usuario;
            $this->_identerprise=$enterprise;
            $this->_tablename= erp_store::table_name();

        }
        
        public function getActualDate($mode){
            $sql="SELECT CURRENT_TIMESTAMP as fecha";
            $result=erp_account_plan::find_by_sql($sql);
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
        public function verificarStoreDependentTxn($idstoredependent){
            $res=true;
            $storedependents=erpd_txn_store::all(array('conditions'=>array("responsible=?",$idstoredependent)));
            if(count($storedependents)>0){
                $res=false;
                
            }
            return $res;
        }
      
        public function __call($option,$att) {
            $datos=$att[0];
            $yaction=$datos['yaction'];
            //echo $datos['xaction'];
            switch ($option)
            {   
                case 'readalmacenusuario':
                    
                    $select="erp_store.idstore,storename";
                    $join="INNER JOIN erp_store_dependent sd ON (sd.idstore=erp_store.idstore) ";
                    $join.="INNER JOIN erp_user us ON (sd.idperson=us.idperson AND us.iduser=$this->_iduser) ";
                    $conditions=array("erp_store.identerprise=? AND sd.active=true",  $this->_identerprise);
                    try{
                        $stores=erp_store::find('all',array('select'=>$select,'joins'=>$join,'conditions'=>$conditions));
                        $json='';
                        foreach ($stores as $datas) {
                        $json.= $datas->to_json().',';
                        }
                        $json=substr($json, 0,  strlen($json)-1);

                    echo '{"total":"0","results":['.$json.']}';
                    }  catch (Exception $exc){
                        print_r($exc);
                        
                    }
                break;
            
                case 'readlistaalmacenes':
                                
                  
                    $stores=  erp_store::find('all',array('conditions'=>array('identerprise=?',  $this->_identerprise),'order'=>'storename asc,idstore asc'));
                    $total=count($stores);
                    $json='';
                    foreach ($stores as $datas) {
                    $json.= $datas->to_json().',';
                    }
                    $json=substr($json, 0,  strlen($json)-1);

                    echo '{"total":"'.$total.'","results":['.$json.']}';
                   
                    
                break;
                               
                case 'readlistaencargados':
                    
                    (isset($datos['idstore'])?$idstore=$datos['idstore']:$idstore=-1);
                    (isset($datos['idbranch'])?$idbranch=$datos['idbranch']:$idbranch=-1);
                    try{
                        $total=0;
                        $json='';
                        if($idstore>0){
                            $encargados= erp_store_dependent::find_by_sql("SELECT sp.idstoredependent,sp.idperson as id_person,sp.idbranch,sp.idstore,p.person_first_name, 
                                    COALESCE(p.person_last_name,'') || ' ' || COALESCE(p.person_middle_name,'') || ' ' || COALESCE(p.person_first_name,'') as employeename,active AS active, 'old' AS state
                                    FROM erp_store_dependent AS sp
                                    INNER JOIN employee AS em ON em.id_person=sp.idperson
                                    INNER JOIN branch_employee AS be ON be.id_person= em.id_person
                                    INNER JOIN person p ON p.id_person=be.id_person
                                    WHERE sp.idstore=$idstore AND sp.idbranch=$idbranch");
                            $total=count($encargados);
                            foreach ($encargados as $datas) {
                            $json.= $datas->to_json().',';
                            }
                            $json=substr($json, 0,  strlen($json)-1);


                        }               


                        echo '{"total":"'.$total.'","results":['.$json.']}';
                    }  catch (Exception $exc){
                        print_r($exc);
                    }
                break;
                
                
                case 'insert':
                    switch ($yaction){
                     case 'maestroalmacen':
                        $data=array();
                        if(isset ($datos['active'])){
                                $bool='true';
                            }else{
                                $bool='false';
                        }
                     
                   
                       
                        $data['storename']=$datos['storename'];
                        $data['description']=$datos['description'];
                        $data['storetype']=$datos['storetype'];
                        $data['costcenter']=$datos['costcenter'];
                        $data['datecreated']=  $this->getActualDate('N');
                        $data['iduser']=  $this->_iduser;
                        $data['idbranch']=$datos['idbranch'];
                        $data['identerprise']=  $this->_identerprise;
                        $data['active']=$bool;
                        try{
                           $newstore=erp_store::create($data);

                            $dataEncargadosJson=json_decode($datos['insertencargados']);


                            if(count($dataEncargadosJson)>0){
                                    for($i=0;$i<count($dataEncargadosJson);$i++){
                                        $dataencargados=array();
                                        $dataencargados['idstore']=$newstore->idstore;
                                        $dataencargados['idbranch']=$datos['idbranch'];
                                        $dataencargados['identerprise']=  $this->_identerprise;
                                        foreach ($dataEncargadosJson[$i] as $key => $value) {
                                            if($key=='id_person'){
                                                $dataencargados['idperson']=$value;
                                            }
                                           

                                        }

                                        $verifstoredependent=  erp_store_dependent::all(array('conditions'=>array('idperson=? AND idstore=? AND idbranch=? AND identerprise=?',$dataencargados['idperson'],$dataencargados['idstore'],$dataencargados['idbranch'],$dataencargados['identerprise'])));
                                        if(count($verifstoredependent)>0){

                                        }else{
                                        $storedependent= erp_store_dependent::create($dataencargados);

                                        }
                                        
                                    }
                                                                      
                              }
                              echo '{"success":true,"title":"Correcto:","msg":"El almacen fue creado correctamente!!"}';
                                                          
                            }catch(Exception $exc){
                                print_r($exc);
                                //echo '{"success":false,"title":"Error:","msg":"No se pudo asignar el personal seleccionado al almacen!!"}';
                            }
                          
                     break;
                   
                    }
                break;
                
                case 'update':
                    switch ($yaction){
                    case 'maestroalmacen':
                        $data=array();
                        if(isset ($datos['active'])){
                                $bool='true';
                            }else{
                                $bool='false';
                        }
                     
                      try{
                       
                        $data['storename']=$datos['storename'];
                        $data['description']=$datos['description'];
                        $data['storetype']=$datos['storetype'];
                        $data['costcenter']=$datos['costcenter'];;
                        $data['idbranch']=$datos['idbranch'];
                        $data['active']=$bool;
                        
                        $options['idstore']=(int)$datos['idstore'];
                        $idstore=(int)$datos['idstore'];
                        $updatestore= erp_store::update_all(array('set'=>$data,'conditions'=>$options));
                        
                        //insertar nuevos dependientes a un almacen existente
                        $dataInsertEncargadosJson=json_decode($datos['insertencargados']);
                        if(count($dataInsertEncargadosJson)>0){
                            for($i=0;$i<count($dataInsertEncargadosJson);$i++){
                                $dataencargados=array();
                                $dataencargados['idstore']=$datos['idstore'];
                                $dataencargados['idbranch']=$datos['idbranch'];
                                $dataencargados['identerprise']=  $this->_identerprise;
                                foreach ($dataInsertEncargadosJson[$i] as $key => $value) {
                                    if($key=='id_person'){
                                        $dataencargados['idperson']=$value;
                                    }
                                    if($key=='active'){
                                        
                                        if($value==1){
                                            $dataencargados['active']='true';
                                        }else{
                                            $dataencargados['active']='false';
                                        }
                                    }


                                }

                                $verifstoredependent=  erp_store_dependent::all(array('conditions'=>array('idperson=? AND idstore=? AND idbranch=? AND identerprise=?',$dataencargados['idperson'],$dataencargados['idstore'],$dataencargados['idbranch'],$dataencargados['identerprise'])));
                                if(count($verifstoredependent)>0){

                                }else{
                                $storedependent= erp_store_dependent::create($dataencargados);

                                }

                            }
                                                                      
                        }
                        
                         //actualizar dependientes a un almacen existente
                        $dataUpdateEncargadosJson=json_decode($datos['updateencargados']);
                        if(count($dataUpdateEncargadosJson)>0){
                           
                            for($i=0;$i<count($dataUpdateEncargadosJson);$i++){
                                $active=array();
                                $conditions=array();
                                
                                foreach ($dataUpdateEncargadosJson[$i] as $key => $value) {
                                    if($key=='active'){
                                        
                                        if($value==1){
                                            $active['active']='true';
                                        }else{
                                            $active['active']='false';
                                        }
                                    }
                                    else if($key=='idstoredependent'){
                                        $conditions['idstoredependent']=$value;
                                    }
                                    
                                }
                              
                              $updatestoredependent=erp_store_dependent::update_all(array('set'=>$active,'conditions'=>$conditions));  
                            }
                        }
                        echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!"}';   
                        
                      }  catch (Exception $exc){
                          print_r($exc);
                      }
                        
                     break;
                    
                    }
                break;
                
                case 'delete':
                     switch ($yaction){
                     case 'encargadoalmacen':
                           try{
                            $idstoredependent=$datos['idstoredependent'];
                           
                                 $storedependent= erp_store_dependent::find($idstoredependent);
                                 $result=$storedependent->delete();
                                 
                                 echo '{"success":true,"title":"Correcto:","msg":"Se elimino del almacen la asignacion del personal correctamente!!"}';

                           }  catch (Exception $exc){
                               print_r($exc);
                           }
                           
                            
                     break;
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
     
    $store=new sis_erp_store($iduser,$identerprise);
    $store->$xaction($_POST);
?>
