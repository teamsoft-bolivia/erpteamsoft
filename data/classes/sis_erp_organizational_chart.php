<?php

/*
 * @Autor: Max marcelo jimenez T,Cristhian Valencia, Pablo Garcia G.
 * @Email: maxmjt@gmail.com, ,garcia_guaman_pablo@hotmail.com
 */
session_start();

require_once '../include.php';
    class sis_erp_organizational_chart 
    {
        public $_iduser;
        public $_tablename;
        public $_identerprise;

        public function __construct($usuario,$enterprise) {
            $this->_iduser=$usuario;
            $this->_identerprise=$enterprise;
            $this->_tablename='erp_organizational_chart';

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

        public function __call($option,$att) {
            $datos=$att[0];
            $yaction=$datos['yaction'];
            //echo $datos['xaction'];
            switch ($option)
            {
                case 'readdepartaments':
                
                   $id =$_POST['node'];
                   $idpadre=$_POST['id'];
                    if($id=='root'){
                        $id1=$idpadre;
                        $sql="  SELECT a.*, 
                                (SELECT count(b.idorganizationalchart) FROM erp_organizational_chart b WHERE b.father=a.idorganizationalchart) as hijo
                                FROM erp_organizational_chart a
                    
                                 WHERE a.idorganizationalchart=".$id1." and a.identerprise=".$this->_identerprise." ORDER by a.idorganizationalchart ASC";
                    }else{
                        $id1=$id;
                        $sql="  SELECT a.*,
                                (SELECT count(b.idorganizationalchart) FROM erp_organizational_chart b WHERE b.father=a.idorganizationalchart and b.type=143) as hijo
                                FROM erp_organizational_chart a 
                    
                                WHERE a.father=".$id1." and a.identerprise=".$this->_identerprise." and a.type=143 ORDER by a.idorganizationalchart ASC";
                        //echo $sql;
                    }
                    
                    //echo $sql;
                    $types= erp_organizational_chart::find_by_sql($sql);
                     
                    
                    //print_r($types);
                    $json='';
                    $children1 = array();
                    $children1['root'] = array(); // Root folder
                    $i= 0;
                    foreach ($types as $type) {
                        //echo $type->idaccountplan;
                       //$children[]= $type->to_array();
                      
                      //print_r($children);
                        if($type->hijo>0 && $type->father==0){
                            $icon='empresa';
                        }else{
                            $icon='departamento';
                        }
                       $children1[$id][] = array(
                            'idorganizationalchart' => $type->idorganizationalchart,  // Data values
                            'jobtitle'  => $type->jobtitle,         //   "    "
                            'father'  => $type->father,         //   "    "
                            'type'  => $type->type, 
                            'vacancies'  => $type->vacancies, 
                            'active'  => $type->active,
                            'iconCls'  => $icon,//$type->hijo>0?'task-folder':'task', // Style
                            'expanded' =>true,         // Expanded
                            'loaded' => false,
                            'leaf'     => $type->hijo>0?false:true,         // Leaf
                            'id'       => $type->idorganizationalchart       // Unique ID
                        );
                      
                    }
                    //$json=substr($json, 0,  strlen($json)-1);
                    //echo '['.$json.']';
                    //echo '{"total":"3","results":['.$json.']}';
                    
                    
                    $data = array(
                        'text' => '.',
                        'children' => $children1[$id]);
                    echo json_encode($data);
                break;
                case 'readdepartaments1':
                    
                   $ideo =$_POST['node'];
                   $idpadreeo=$_POST['id'];
                    if($ideo=='root'){
                        $id1eo=$idpadreeo;
                        $sqleo="  SELECT a.*, 
                                (SELECT count(b.idorganizationalchart) FROM erp_organizational_chart b WHERE b.father=a.idorganizationalchart and (a.type=144 or a.type=145)) as hijo
                                FROM erp_organizational_chart a
                    
                                 WHERE a.father=".$id1eo." and a.identerprise=".$this->_identerprise." and (a.type=144 or a.type=145) ORDER by a.idorganizationalchart ASC";
                    }else{
                        $id1eo=$ideo;
                        $sqleo="  SELECT a.*,
                                (SELECT count(b.idorganizationalchart) FROM erp_organizational_chart b WHERE b.father=a.idorganizationalchart and (b.type=144 or b.type=145)) as hijo
                                FROM erp_organizational_chart a 
                    
                                WHERE a.father=".$id1eo." and a.identerprise=".$this->_identerprise." and (a.type=144 or a.type=145) ORDER by a.idorganizationalchart ASC";
                        //echo $sqleo;
                    }
                    
                    //echo $sql;
                    $typeseo= erp_organizational_chart::find_by_sql($sqleo);
                     
                    
                    //print_r($types);
                    $jsoneo='';
                    $children1eo = array();
                    $children1eo['root'] = array(); // Root folder
                    $i= 0;
                    foreach ($typeseo as $typeeo) {
                        //echo $type->idaccountplan;
                       //$children[]= $type->to_array();
                      
                      //print_r($children);
                        if($typeeo->hijo>0){
                            $icon='jefe';
                        }else{
                            if($typeeo->vacancies > 1){
                                $icon='grupo';
                            }else{
                                $icon='task1';
                            }
                        }
                        

                       $children1eo[$ideo][] = array(
                            'idorganizationalchart' => $typeeo->idorganizationalchart,  // Data values
                            'jobtitle'  => $typeeo->jobtitle,         //   "    "
                            'father'  => $typeeo->father,         //   "    "
                            'type'  => $typeeo->type, 
                            'vacancies'  => $typeeo->vacancies,
                            'salary'  => $typeeo->salary,  
                            'active'  => $typeeo->active,
                            'iconCls'  => $icon,//$typeeo->hijo>0?'task1':$icon, // Style
                            'expanded' =>false,         // Expanded
                            'loaded' => false,
                            'leaf'     => $typeeo->hijo>0?false:true,         // Leaf
                            'id'       => $typeeo->idorganizationalchart       // Unique ID
                        );
                      
                    }
                    //$json=substr($json, 0,  strlen($json)-1);
                    //echo '['.$json.']';
                    //echo '{"total":"3","results":['.$json.']}';
                    
                    
                    $dataeo = array(
                        'text' => '.',
                        'children' => $children1eo[$ideo]);
                    echo json_encode($dataeo);
                break;


                case 'readpositions':
                    if (isset($datos['id'])){
                        $conditions=array("idorganizationalchart=".$datos['id']);
                    }else{
                        $conditions=array("och.identerprise=$this->_identerprise AND och.type=145 AND och.jobtitle ilike '%".$datos['query']."%'");
                    }
                    $select="och.*";
                    $from="erp_organizational_chart och ";
                    $join="";
                    $order="och.idorganizationalchart ASC";
                    
                    $positions= erp_organizational_chart::find('all',array('select'=>$select,'from'=>$from,'joins'=>$join,'conditions'=>$conditions,'order'=>$order));
                    $total=count($positions);
                    $json='';
                    foreach ($positions as $datas) {
                    $json.= $datas->to_json().',';
                    }
                    $json=substr($json, 0,  strlen($json)-1);

                    echo '{"total":"'.$total.'","results":['.$json.']}';
                break;


                case 'readbytype':
                    $id = $_POST['node'];
                     $idpadre=$_POST['id'];
                    if($id=='root'){
                        $id1=$idpadre;
                        $sql="SELECT b.idaccountplan, b.accountcode, b.accountfather,bf.accountname as fathername, b.accountname, b.level, 
                                b.associated, b.accountfather, b.active, b.datecreated, b.dateupdated, b.debit, 
                                b.credit, b.iduser, b.transactional, 
                                (SELECT count(a.idaccountplan) FROM ".$this->_tablename." a WHERE a.accountfather=b.idaccountplan) as hijo,b.currency,
                                bf.accountname as fathername
                    FROM ".$this->_tablename." b
                    LEFT OUTER JOIN ".$this->_tablename." bf ON bf.idaccountplan=b.accountfather 
                    WHERE b.idaccountplan=".$id1;
                    }else{
                        $id1=$id;
                        $sql="SELECT b.idaccountplan, b.accountcode, b.accountfather,bf.accountname as fathername, b.accountname, 
                              b.level, b.associated, b.accountfather, b.active, b.datecreated, b.dateupdated, b.debit, b.credit, b.iduser, b.transactional,  
                              (SELECT count(a.idaccountplan) FROM ".$this->_tablename." a WHERE a.accountfather=b.idaccountplan) as hijo,b.currency,
                                bf.accountname as fathername
                    FROM ".$this->_tablename." b 
                    LEFT OUTER JOIN ".$this->_tablename." bf ON bf.idaccountplan=b.accountfather 
                    WHERE b.accountfather=".$id1;
                    }
                    
                    //echo $sql;
                    $types= erp_account_plan::find_by_sql($sql);
                     
                    
                    //print_r($types);
                    $json='';
                    $children1 = array();
                    $children1['root'] = array(); // Root folder
                    $i= 0;
                    foreach ($types as $type) {
                        //echo $type->idaccountplan;
                       //$children[]= $type->to_array();
                      
                      //print_r($children);
                       $children1[$id][] = array(
                            'idaccountplan' => $type->idaccountplan,  // Data values
                            'accountcode'  => $type->accountcode,         //   "    "
                            'accountfather'  => $type->accountfather,         //   "    "
                            'accountname'  => $type->accountname, 
                            'level'  => $type->level, 
                            'associated'  => $type->associated,
                            'accountfather'  => $type->accountfather,
                            'active'  => $type->active,
                            'debit' => $type->debit,
                            'credit' => $type->credit,
                            'iduser' => $type->iduser,
                            'transactional' => $type->transactional,
                            'fathername'    => $type->fathername,
                            'currency' => $type->currency,
                            'iconCls'  => $type->hijo>0?'task-folder':'task', // Style
                            'expanded' => $type->level<=1?true:false,         // Expanded
                            'loaded' => false,
                            'leaf'     => $type->hijo>0?false:true,         // Leaf
                            'id'       => $type->idaccountplan       // Unique ID
                        );
                      
                    }
                    //$json=substr($json, 0,  strlen($json)-1);
                    //echo '['.$json.']';
                    //echo '{"total":"3","results":['.$json.']}';
                    
                    
                    $data = array(
                        'text' => '.',
                        'children' => $children1[$id]);
                    echo json_encode($data);
                    
                break;

                case 'savecargo':
                            //print_r($datos);
                            //$documents=  json_decode($datos['documents']);
                            //$details=  json_decode($datos['detail']);
                            $docs=array();
                            $dets=array();
                            if($datos['idorganizationalchart']==0){
                              //$datos['date']=  $this->dateFormat($datos['date']);
                            $dataform=array();
                            $dataform['identerprise']=  $this->_identerprise;
                            //$dataform['iduser']=  $this->_iduser;
                            $dataform['type']=145;
                            $dataform['active']='true';
                            foreach ($datos as $key => $value) {
                                if ($key!='xaction' && $key!='yaction' && $key!='idorganizationalchart' && $key!='destinationstore' && $key!='namedpto' && $key!='cargosuperior' && $key!='originstore') {
                                      $dataform[$key]=$value; 
                                }
                            }
                            try {
                        
                                $newtxn=new erp_organizational_chart($dataform);
                                $newtxn->save();
                                $txn= erp_organizational_chart::find($newtxn->idorganizationalchart);
                                
                                 echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!","iditem":'.$txn->idorganizationalchart.'}';
                            } catch (Exception $exc) {
                                print_r($exc);
                            }  
                        }else{
                            foreach ($datos as $key => $value) {
                                    if ($key!='xaction' && $key!='yaction' && $key!='idorganizationalchart' && $key!='destinationstore' && $key!='namedpto' && $key!='cargosuperior' && $key!='originstore' && $key!='father') {
                                          $dataform[$key]=$value; 
                                    }
                                }
                                try {

                               //$dataform['cost']=$precio;
                               $options['idorganizationalchart']=$datos['idorganizationalchart'];
                               $result=  erp_organizational_chart::update_all(array('set'=>$dataform,'conditions'=>$options));

                                     echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!","iditem":'.$datos['idorganizationalchart'].'}';
                                } catch (Exception $exc) {
                                    print_r($exc);
                                }
                        }
                            

                        break;  
                            
                        case 'updateCargos':
                            
                                
                                //$datos['date']=  $this->dateFormat($datos['date']);
                                
                                foreach ($datos as $key => $value) {
                                    if ($key!='xaction' && $key!='yaction' && $key!='idorganizationalchart' && $key!='destinationstore' && $key!='namedpto' && $key!='cargosuperior' && $key!='originstore' && $key!='father') {
                                          $dataform[$key]=$value; 
                                    }
                                }
                                try {

                               //$dataform['cost']=$precio;
                               $options['idorganizationalchart']=$datos['idorganizationalchart'];
                               $result=  erp_organizational_chart::update_all(array('set'=>$dataform,'conditions'=>$options));

                                     echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!","iditem":'.$datos['idorganizationalchart'].'}';
                                } catch (Exception $exc) {
                                    print_r($exc);
                                }
                        break;

                case 'saveDpto':
                            //print_r($datos);
                            //$documents=  json_decode($datos['documents']);
                            //$details=  json_decode($datos['detail']);
                            $docs=array();
                            $dets=array();
                            
                            //$datos['date']=  $this->dateFormat($datos['date']);
                            $dataform=array();
                            $dataform['identerprise']=  $this->_identerprise;
                            //$dataform['iduser']=  $this->_iduser;
                            $dataform['type']=143;
                            $dataform['active']='true';
                            foreach ($datos as $key => $value) {
                                if ($key!='xaction' && $key!='yaction' && $key!='idorganizationalchart' && $key!='destinationstore' && $key!='dptosuperior' && $key!='cargosuperior' && $key!='originstore') {
                                      $dataform[$key]=$value; 
                                }
                            }
                            try {
                        
                                $newtxn=new erp_organizational_chart($dataform);
                                $newtxn->save();
                                $txn= erp_organizational_chart::find($newtxn->idorganizationalchart);
                                
                                 echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!","iditem":'.$txn->idorganizationalchart.'}';
                            } catch (Exception $exc) {
                                print_r($exc);
                            }

                        break; 

                    case 'updateDpto':
                            
                                
                                //$datos['date']=  $this->dateFormat($datos['date']);
                                
                                foreach ($datos as $key => $value) {
                                    if ($key!='xaction' && $key!='yaction' && $key!='idorganizationalchart' && $key!='destinationstore' && $key!='dptosuperior' && $key!='cargosuperior' && $key!='originstore' && $key!='father') {
                                          $dataform[$key]=$value; 
                                    }
                                }
                                try {

                               //$dataform['cost']=$precio;
                               $options['idorganizationalchart']=$datos['idorganizationalchart'];
                               $result=  erp_organizational_chart::update_all(array('set'=>$dataform,'conditions'=>$options));

                                     echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!","iditem":'.$datos['idorganizationalchart'].'}';
                                } catch (Exception $exc) {
                                    print_r($exc);
                                }
                        break;


                 case 'readcbodepartaments':
                
                   
                        $sql="  SELECT o.* 
                                FROM erp_organizational_chart o
                                INNER JOIN erp_type t ON o.type=t.idtype
                                WHERE o.type=(select idtype from erp_type where option='tipo_organigrama' AND alias='departamentos') AND o.active=TRUE AND o.identerprise=".$this->_identerprise."
                                ORDER BY o.jobtitle ASC";
                  
                     try {
                         //echo $sql;
                    $departaments= erp_organizational_chart::find_by_sql($sql);
                     
                    } catch (Exception $exc) {
                        print_r($exc);
                    }

                    $total=count($departaments);
                    $json='';
                    foreach ($departaments as $datas) {
                    $json.= $datas->to_json().',';
                    }
                    $json=substr($json, 0,  strlen($json)-1);

                    echo '{"total":"'.$total.'","results":['.$json.']}';
                    
                break;
		

                default:


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
     
    $organizationalchart=new sis_erp_organizational_chart($iduser,$identerprise);
    $organizationalchart->$xaction($_POST);
?>
