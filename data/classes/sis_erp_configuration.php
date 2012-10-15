<?php

/*
 * @Autor: Max marcelo jimenez T,Cristhian Valencia, Pablo Garcia G.
 * @Email: maxmjt@gmail.com, ,garcia_guaman_pablo@hotmail.com
 */
session_start();
require_once '../include.php';
    class sis_erp_configuration 
    {
        public $_iduser;
        public $_tablename;
        public $_identerprise;

        public function __construct($usuario,$enterprise) {
            $this->_iduser=$usuario;
            $this->_identerprise=$enterprise;
            $this->_tablename= erp_configuration::table_name();

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
                case 'readnomenclatura':
                    //echo $this->_tablename;
                    $sql="SELECT * FROM $this->_tablename  WHERE module='finanzas' and type='nomenclatura'";
                    //$sql="SELECT * FROM $this->_tablename WHERE level=1 ORDER BY accountcode DESC";
                    //echo $sql;
                    $nomenclatura=  erp_configuration::find_by_sql($sql);
                    $total=count($nomenclatura);
                    if($nomenclatura[0]->default==true){
                        $array=explode('/',$nomenclatura[0]->format);
                        $code=$array[0];
                        $incremento=(int)$array[1];
                        $formato=$array[2];
                        
                    }else{
                        $array=explode('/',$nomenclatura[0]->custom);
                        $code=$array[0];
                        $incremento=(int)$array[1];
                        $formato=$array[2];
                    }
                    
                    echo '{"total":"'.$total.'","results":[{"idnomenclatura":"'.$nomenclatura[0]->idconfiguration.'","code":"'.$code.'","incremento":'.$incremento.',"formato":"'.$formato.'"}]}';
                    //$json='';
                    //foreach ($nomenclatura as $cuenta) {
                     //  $json.= $cuenta->to_json().',';
                   // }
                    //$json=substr($json, 0,  strlen($json)-1);
                    
                   // echo '{"total":"'.$total.'","results":['.$json.']}';
                break;
                case 'readActivoAsientos':
                    //echo 'hola';
                    /*Este requiere del campo en la tabla erp_configuration
                      format=activo,type=configuracion_model_asiento,default=true o false,custom=activoconfigurarasientos
                      true para que se habiliten los asientos automaticos
                    */
                    $types=  erp_configuration::find_by_sql("SELECT c.*,(CASE WHEN c.default='true' THEN 'true' ELSE 'false' END) as active, (SELECT (CASE WHEN e.default='true' THEN 'true' ELSE 'false' END) as active FROM ".$this->_tablename." e 
WHERE e.type='configuracion_model_asiento' and e.format='Activotodos' and e.module='almacenes' and e.identerprise=".$this->_identerprise.") as activotodos FROM ".$this->_tablename." c WHERE c.type='configuracion_model_asiento' and c.format='Activo' and c.module='almacenes' and c.identerprise=".$this->_identerprise."");
                    //$types=  erp_type::find('all',array('conditions'=>array('option=?','tipo_moneda')));
                    $total=count($types);
                    if($total==0){
                        $data=array();
                        //$data['idtype']= $this->getnewcode(1,false);//$dataJson1->accountcode;
                        $data['format']='Activo';
                        $data['custom']='activoconfigurarasientos';

                        $data['type']='configuracion_model_asiento';
                        $data['default']='true';
                        $data['module']='almacenes';
                        $data['identerprise']=$this->_identerprise;
                        $result=erp_configuration::create($data);
                        $types=  erp_configuration::find_by_sql("SELECT c.*,(CASE WHEN c.default='true' THEN 'true' ELSE 'false' END) as active, (SELECT (CASE WHEN e.default='true' THEN 'true' ELSE 'false' END) as active FROM ".$this->_tablename." e 
WHERE e.type='configuracion_model_asiento' and e.format='Activotodos' and e.module='almacenes' and e.identerprise=".$this->_identerprise.") as activotodos FROM ".$this->_tablename." c WHERE c.type='configuracion_model_asiento' and c.format='Activo' and c.module='almacenes' and c.identerprise=".$this->_identerprise."");
                    }
                    $json='';
                    foreach ($types as $type) {
                       $json.= $type->to_json().',';
                    }
                    $json=substr($json, 0,  strlen($json)-1);
                    //echo '['.$json.']';
                    echo '{"total":"3","data":'.$json.'}';
                break;
                case 'updateActivoAsientos':
                    //$dataJson1=json_decode($datos['valoresraiz']);
                    $data=array();
                    $data['default']=$datos['value'];
                    //print_r($data);
                    $options['type']=$datos['option'];
                    $options['identerprise']=$this->_identerprise;
                    
                            //$options['idtype']=(int)$dataJson1->idtype;
                            $result=erp_configuration::update_all(array('set'=>$data,'conditions'=>$options));
                            if ($result) {
                                echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!"}';
                                
                            }else{
                                echo '{"success":false,"title":"Error:","msg":"No se pudo guardar!!"}';
                            }
                    //}
                break;
                case 'updatenomenclatura':
                    
                    //echo $datos['code'];
                    //echo $datos['incremento'];
                    //echo $datos['formato'];
                    $data=array();
                    $options['idconfiguration']=(int)$datos['idconfiguration'];
                    $data['custom']=$datos['code']."/".$datos['incremento']."/".$datos['formato'];
                    $data['default']='false';
                    
                            $result=erp_configuration::update_all(array('set'=>$data,'conditions'=>$options));
                            if ($result) {
                                echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!"}';
                                
                            }else{
                                echo '{"success":false,"title":"Error:","msg":"No se pudo guardar!!"}';
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
    $accountplan=new sis_erp_configuration($iduser,$identerprise);
    $accountplan->$xaction($_POST);
?>
