<?php

/*
 * @Autor: Max marcelo jimenez T,Cristhian Valencia, Pablo Garcia G.
 * @Email: maxmjt@gmail.com, ,garcia_guaman_pablo@hotmail.com
 */
session_start();

require_once '../include.php';
    class sis_erp_account_plan 
    {
        public $_iduser;
        public $_tablename;
        public $_identerprise;

        public function __construct($usuario,$enterprise) {
            $this->_iduser=$usuario;
            $this->_identerprise=$enterprise;
            $this->_tablename= erp_account_plan::table_name();

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
        public function getNumberNext($num,$type){
            $tam=strlen($num);
            $Num1=(int)$num;
            $NumString=(string)$Num1;
            $tamNum=strlen($NumString);
            if($tam==$tamNum){
                if($type==1){
                    $valor=$Num1+1;
                }else{
                    $valor=$Num1;
                }
                
            }else{
                if($type==1){//valores de type 1 o 0
                    $Num2=$Num1+1;
                    $NumString2=(string)$Num2;
                    $tamAct=strlen($NumString2);
                    while($tamAct<$tam){
                        $NumString2='0'.$NumString2;
                        $tamAct++;
                     }
                    $valor=$NumString2;
                }else{
                    $Num2=$Num1; 
                    $NumString2=(string)$Num2;
                    $tamAct=strlen($NumString2);
                    //echo $Num2."   ".$tamAct."   ".$tam;
                    while($tamAct<$tam){
                        $NumString2='0'.$NumString2;
                        $tamAct++;
                     }
                    $valor=$NumString2;
                }
                
            }
            return $valor;
        }


        public function getnewcode($nivel,$relleno='1',$padre){
            //relleno se refiere a si el codigo sera completo no importa el nivel
            if($padre!=0){
                $sqladd=' and accountfather='.$padre;
                $sqltamP="SELECT accountcode as accountcode FROM erp_account_plan  WHERE idaccountplan=".$padre;
                    //$sql="SELECT * FROM $this->_tablename WHERE level=1 ORDER BY accountcode DESC";
                    //echo $sql;
                    $codeactualmaxtamP=  erp_account_plan::find_by_sql($sqltamP);
            }else{
                $sqladd='';
            }
            $sql="SELECT * FROM erp_configuration  WHERE module='finanzas' and type='nomenclatura'";
                    //$sql="SELECT * FROM $this->_tablename WHERE level=1 ORDER BY accountcode DESC";
                    //echo $sql;
                    $nomenclatura=  erp_configuration::find_by_sql($sql);
                    //$total=count($nomenclatura);
                    //print_r($nomenclatura);
                        if($nomenclatura[0]->default==true){
                            $array=explode('/',$nomenclatura[0]->format);
                            $code=$array[0];

                            $nivelesCode=explode('.',$code);
                            
                            $incremento=(int)$array[1];
                            $formato=$array[2];
                            //return ;
                            //echo $nivelesCode;
                        }else{
                            $array=explode('/',$nomenclatura[0]->custom);
                            $code=$array[0];
                            $nivelesCode=explode('.',$code);
                            $incremento=(int)$array[1];
                            $formato=$array[2];
                            //echo $code;
                        } 
                        
                    $sqltam="SELECT accountcode as accountcode FROM erp_account_plan  WHERE level=".$nivel."".$sqladd;
                    //$sql="SELECT * FROM $this->_tablename WHERE level=1 ORDER BY accountcode DESC";
                    //echo $sqltam;
                    $codeactualmaxtam=  erp_account_plan::find_by_sql($sqltam);
                    $total1=count($codeactualmaxtam);    
                        
                        
                    $sql="SELECT max(accountcode) as accountcode FROM erp_account_plan  WHERE level=".$nivel."".$sqladd;
                    //$sql="SELECT * FROM $this->_tablename WHERE level=1 ORDER BY accountcode DESC";
                    //echo $sql;
                    $codeactualmax=  erp_account_plan::find_by_sql($sql);
                    $total=count($codeactualmax);
                    //echo $total1;
                    //print_r($codeactualmax);
                    if($total1>=1){
                        $nivelesCode=explode('.',$codeactualmax[0]->accountcode);
                        $tam=count($nivelesCode);
                        //$valorincrementado=(int)$nivelesCode[$nivel-1];
                        //$nivelesCode[$nivel-1]=$valorincrementado+$incremento;
                        //echo $this->getNumberNext($nivelesCode[$nivel-1],1);
                        $nivelesCode[$nivel-1]=$this->getNumberNext($nivelesCode[$nivel-1],1);
                        $newArray=array();
                        
                        if($relleno=='1'){
                            //echo $tam;
                            for($i=0;$i<$tam;$i++){
                                if($i<$nivel){
                                    $newArray[$i]=$nivelesCode[$i];
                                }else{
                                  $cantidad=strlen($nivelesCode[$i]);
                                  $newnum='';
                                  for($e=0;$e<$cantidad;$e++){
                                    $newnum.='0';
                                    }; 
                                  $newArray[$i]=$newnum;  
                                }
                            
                            };
                        }else{
                            
                           for($i=0;$i<$nivel;$i++){
                            $newArray[$i]=$nivelesCode[$i];
                            }; 
                        }
                        
                        $newcode=implode($formato, $newArray);
                        return $newcode;
                    }else{
                        if($padre!=0){
                            //echo $codeactualmaxtamP[0]->accountcode;
                            $nivelesCode=explode('.',$codeactualmaxtamP[0]->accountcode);
                            $nivelesCodeModelo=explode('.',$code);
                        }else{
                            $nivelesCodeModelo=explode('.',$code);//code nuevo
                        }
                        //$nivelesCode=explode('.',$code);//code nuevo
                        //echo $code->accountcode;
                        $tam=count($nivelesCode);
                        //$valorincrementado=(int)$nivelesCodeModelo[$nivel-1];
                        //$nivelesCode[$nivel-1]=$valorincrementado;
                        //echo $nivelesCodeModelo[$nivel-1];
                        //echo $this->getNumberNext($nivelesCodeModelo[$nivel-1],0);
                        $nivelesCode[$nivel-1]=$this->getNumberNext($nivelesCodeModelo[$nivel-1],0);
                        $newArray=array();
                        if($relleno=='1'){
                            //echo $tam;
                            for($i=0;$i<$tam;$i++){
                                if($i<$nivel){
                                    $newArray[$i]=$nivelesCode[$i];
                                }else{
                                  $cantidad=strlen($nivelesCode[$i]);
                                  $newnum='';
                                  for($e=0;$e<$cantidad;$e++){
                                    $newnum.='0';
                                    }; 
                                  $newArray[$i]=$newnum;  
                                }
                            
                            };
                        }else{
                            
                           for($i=0;$i<$nivel;$i++){
                            $newArray[$i]=$nivelesCode[$i];
                            }; 
                        }
                        $newcode=implode($formato, $newArray);
                        return $newcode;
                    }
            
            
            
        }
        public function getAccountCode($level){
            
        }
        public function __call($option,$att) {
            $datos=$att[0];
            $yaction=$datos['yaction'];
            //echo $datos['xaction'];
            switch ($option)
            {
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
				
                case 'readFirstLevelAccount':
                    
                    $sql="SELECT idaccountplan,accountcode,accountname FROM $this->_tablename WHERE accountfather=0 AND active=true AND identerprise=$this->_identerprise ORDER BY idaccountplan ASC";
                    
                    $cuentasPrimerNivel=  erp_account_plan::find_by_sql($sql);
                    $total=count($cuentasPrimerNivel);
                   
                    $json='';
                    foreach ($cuentasPrimerNivel as $cuenta) {
                       $json.= $cuenta->to_json().',';
                    }
                    $json=substr($json, 0,  strlen($json)-1);
                    
                    echo '{"total":"'.$total.'","results":['.$json.']}';
                break;
                
                case 'readraiz':
                    
                    $sql="SELECT * FROM $this->_tablename WHERE level=1 ORDER BY accountcode DESC";
                    //echo $sql;
                    $cuentasPrimerNivel=  erp_account_plan::find_by_sql($sql);
                    $total=count($cuentasPrimerNivel);
                   
                    $json='';
                    foreach ($cuentasPrimerNivel as $cuenta) {
                       $json.= $cuenta->to_json().',';
                    }
                    $json=substr($json, 0,  strlen($json)-1);
                    
                    echo '{"total":"'.$total.'","results":['.$json.']}';
                break;
                
                case 'createraiz':
                    //$json1 = file_get_contents('php://input');
                    //$dataJson1=json_decode($json1);
                    //$dataJson1=array();
                    $dataJson1=json_decode($datos['valoresraiz']);
                    //print_r($dataJson1);
                    //echo $dataJson1->accountname.'   '.$this->getnewcode(1,false);
                    $padre=0;
                    $data=array();
                    $data['accountcode']= $this->getnewcode(1,'1',$padre);//$dataJson1->accountcode;
                    $data['accountname']=$dataJson1->accountname;
                    $data['level']=1;
                    $data['associated']='false';
                    $data['accountfather']=0;
                    $data['active']='true';
                    $data['datecreated']=  $this->getActualDate('N');
                    $data['debit']=0;
                    $data['credit']=0;
                    $data['iduser']=  $this->_iduser;
                    $data['transactional']='false';
                    $data['identerprise']=$this->_identerprise;
                    $data['currency']=1;
                                      
                    
                    
                    $result=erp_account_plan::create($data);
                            if ($result) {
                                echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!"}';
                                
                            }else{
                                echo '{"success":false,"title":"Error:","msg":"No se pudo guardar!!"}';
                            }
                    
                break;
                
                case 'updateraiz':
                    //$json1 = file_get_contents('php://input');
                    //$dataJson1=json_decode($json1);
                     $dataJson1=json_decode($datos['valoresraiz']);
                    $data=array();
                    //$data['accountcode']=$dataJson1->accountcode;
                    $data['accountname']=$dataJson1->accountname;
                    //$data['level']=1;
                   // $data['associated']='false';
                    //$data['accountfather']=0;
                    //$data['active']='true';
                    //$data['datecreated']=  $this->getActualDate('N');
                    //$data['debit']=0;
                    //$data['credit']=0;
                    $data['iduser']=  $this->_iduser;
                    //$data['transactional']='false';
                    $data['identerprise']=$this->_identerprise;
                    //$data['currency']=1;
                                      
                    
                    
                    //$result=erp_account_plan::create($data);
                    
                    
                    $data['dateupdated']=  $this->getActualDate('E');
                            $options['idaccountplan']=(int)$dataJson1->idaccountplan;
                            $result=erp_account_plan::update_all(array('set'=>$data,'conditions'=>$options));
                            if ($result) {
                                echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!"}';
                                
                            }else{
                                echo '{"success":false,"title":"Error:","msg":"No se pudo guardar!!"}';
                            }
                    
                break;
                
                case 'deleteraiz':
                    
                    $id=(int)$datos['idaccountplan'];
                    
                   $post = erp_account_plan::find($id);
                   
                           $result=$post->delete();
                            if ($result) {
                                echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!"}';
                                
                            }else{
                                echo '{"success":false,"title":"Error:","msg":"No se pudo guardar!!"}';
                            }
                    
                break;
                
                case 'readmaxcodetree':
                    
                    $id=(int)$datos['idaccountplan'];
                    
                   $post = erp_account_plan::find($id);
                   
                           $result=$post->delete();
                            if ($result) {
                                echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!"}';
                                
                            }else{
                                echo '{"success":false,"title":"Error:","msg":"No se pudo guardar!!"}';
                            }
                    
                break;
                
                case 'readcbocomposition':
                             //echo 'hola';
                             if(isset ($datos['accountcode'])&&$datos['accountcode']!=''){
                                $conditions=array('conditions'=>"(accountcode ilike '%".$datos['accountcode']."%') and transactional='true'");
                                $items=  erp_account_plan::all(array('select'=>'idaccountplan,accountcode,accountname'),$conditions);
                                $json='';
                                foreach ($items as $datas) {
                                    $json.= $datas->to_json().',';
                                }
                                $json=substr($json, 0,  strlen($json)-1);

                                echo '{"total":"0","results":['.$json.']}';
                             }else{
                                 if (isset($datos['query'])) {
                                $conditions=array('conditions'=>"(accountcode ilike '%".$datos['query']."%' OR accountname ilike '%".$datos['query']."%') and transactional='true'");
                                $items=  erp_account_plan::all(array('select'=>'idaccountplan,accountcode,accountname'),$conditions);
                                $json='';
                                foreach ($items as $datas) {
                                    $json.= $datas->to_json().',';
                                }
                                $json=substr($json, 0,  strlen($json)-1);

                                echo '{"total":"0","results":['.$json.']}';
                            }else{
                                $json='';
                                echo '{"total":"0","results":['.$json.']}';
                            }
                             }
                            


                break;
                case 'readcbocentrocostos':
                    $costcenters= erp_account_plan::find_by_sql("SELECT idaccountplan, accountcode,accountname FROM erp_account_plan WHERE active=true AND identerprise=$this->_identerprise AND transactional='true' AND accountfather<>0 ORDER BY accountcode,level ASC");
                    $total=count($costcenters);
                    $json='';
                    foreach ($costcenters as $datas) {
                    $json.= $datas->to_json().',';
                    }
                    $json=substr($json, 0,  strlen($json)-1);

                    echo '{"total":"'.$total.'","results":['.$json.']}';
                break;
                
                case 'save':
                    switch ($yaction) {
                        case 'insert':
                            $datos['accountcode']=$this->getnewcode($datos['level'],'1',$datos['accountfather']);
                            $data=array();
                            if (!isset($datos['associated'])) $datos['associated']='false'; 
                            else $datos['associated']='true';
                            if (!isset($datos['transactional'])) $datos['transactional']='false'; 
                            else $datos['transactional']='true';
                            if (!isset($datos['active'])) $datos['active']='false'; 
                            else $datos['active']='true';
                            
                            foreach ($datos as $key=>$value) {
                                if ($key!='xaction' && $key!='yaction' && $key!='idaccountplan' && $key!='fathername' ) {
                                    $data[$key]=$value;
                                }
                            }
                            $data['datecreated']=  $this->getActualDate('N');
                            $data['iduser']=  $this->_iduser;
                            $data['identerprise']=$this->_identerprise;
                            $result=erp_account_plan::create($data);
                            if ($result) {
                                echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!","idaccountplan":'.$result->idaccountplan.',"accountcode":"'.$result->accountcode.'"}';
                                
                            }else{
                                echo '{"success":false,"title":"Error:","msg":"No se pudo guardar!!"}';
                            }
                        break;
                        
                        case 'update':
                            $data=array();
                            if (!isset($datos['associated'])) $datos['associated']='false'; 
                            else $datos['associated']='true';
                            if (!isset($datos['transactional'])) $datos['transactional']='false'; 
                            else $datos['transactional']='true';
                            if (!isset($datos['active'])) $datos['active']='false'; 
                            else $datos['active']='true';
                            
                            foreach ($datos as $key=>$value) {
                                if ($key!='xaction' && $key!='yaction' && $key!='idaccountplan' && $key!='fathername' && $key!='accountfather') {
                                    $data[$key]=$value;
                                }
                            }
                            $data['dateupdated']=  $this->getActualDate('E');
                            $data['iduser']=  $this->_iduser;
                            $data['identerprise']=$this->_identerprise;
                            $options['idaccountplan']=$datos['idaccountplan'];
                            $result=erp_account_plan::update_all(array('set'=>$data,'conditions'=>$options));
                            if ($result) {
                                echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!"}';
                                
                            }else{
                                echo '{"success":false,"title":"Error:","msg":"No se pudo guardar!!"}';
                            }
                        break;
                        
                         

                        default:
                        break;
                    }
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
     
    $accountplan=new sis_erp_account_plan($iduser,$identerprise);
    $accountplan->$xaction($_POST);
?>
