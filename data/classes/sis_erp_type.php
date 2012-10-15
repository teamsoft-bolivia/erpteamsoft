<?php
/*
 * @Autor: Pablo Garcia guaman
 * @Email: garcia_guaman_pablo@hotmail.com
 */
session_start();
    require_once '../include.php';
    class sis_erp_type 
    {
        public $_iduser;
        public $_tablename;
        public $_identerprise;


        public function __construct($usuario,$enterprise) {
            $this->_iduser=$usuario;
            $this->_identerprise=$enterprise;
            $this->_tablename=  erp_type::table_name();
            $this->_identerprise=$enterprise;
        }
        public function __call($option,$att) {
            $datos=$att[0];
            $yaction=$datos['yaction'];
            switch ($option)
            {
                case 'readbytype':
                    
                    $types=  erp_type::find_by_sql("SELECT * FROM ".$this->_tablename." WHERE option=? ORDER BY idtype ASC", array($datos['type']));
                    //$types=  erp_type::find('all',array('conditions'=>array('option=?','tipo_moneda')));
                    $json='';
                    foreach ($types as $type) {
                       $json.= $type->to_json().',';
                    }
                    $json=substr($json, 0,  strlen($json)-1);
                    //echo '['.$json.']';
                    echo '{"total":"3","results":['.$json.']}';
                break;
                case 'readbytypefather':
                    
                    $types=  erp_type::find_by_sql("SELECT * FROM ".$this->_tablename." WHERE option=? AND father=? ORDER BY idtype ASC", array($datos['type'],$datos['father']));
                    //$types=  erp_type::find('all',array('conditions'=>array('option=?','tipo_moneda')));
                    $json='';
                    foreach ($types as $type) {
                       $json.= $type->to_json().',';
                    }
                    $json=substr($json, 0,  strlen($json)-1);
                    //echo '['.$json.']';
                    echo '{"total":"3","results":['.$json.']}';
                break;
                
                case 'readtypebyenterprise':
                    
                    $types=  erp_type::find_by_sql("SELECT * FROM ".$this->_tablename." WHERE option=? AND identerprise=? ORDER BY idtype ASC", array($datos['type'],$this->_identerprise));
                    //$types=  erp_type::find('all',array('conditions'=>array('option=?','tipo_moneda')));
                    $json='';
                    foreach ($types as $type) {
                       $json.= $type->to_json().',';
                    }
                    $json=substr($json, 0,  strlen($json)-1);
                    //echo '['.$json.']';
                    echo '{"total":"3","results":['.$json.']}';
                break;

                case 'readnomenclatura':
                    
                    $types=  erp_type::find_by_sql("SELECT *,(CASE WHEN value='11' THEN 'true' ELSE 'false' END) as primaria,(CASE WHEN value='12' THEN 'true' ELSE 'false' END) as secundaria FROM ".$this->_tablename." WHERE option=?", array('tipo_moneda'));
                    //$types=  erp_type::find('all',array('conditions'=>array('option=?','tipo_moneda')));
                    
                    $json='';
                    foreach ($types as $type) {
                       $json.= $type->to_json().',';
                    }
                    $json=substr($json, 0,  strlen($json)-1);
                    //echo '['.$json.']';
                    echo '{"total":"3","results":['.$json.']}';
                break;
                
                case 'readcurrency':
                    $total=0;
                    $types=  erp_type::find_by_sql("SELECT * FROM ".$this->_tablename." WHERE option=? AND identerprise=?", array('tipo_moneda',$this->_identerprise));
                    if(count($types)>0){
                        $total=count($types);
                    }
                    $json='';
                    foreach ($types as $type) {
                       $json.= $type->to_json().',';
                    }
                    $json=substr($json, 0,  strlen($json)-1);
                   
                    echo '{"total":'.$total.',"results":['.$json.']}';
                break;
                
               
                case 'readActivoAsientos':
                    /*Este requiere del campo en la tabla erp_type
                      type=Activo,option=configuracion_model_asiento,alias=activoconfigurarasientos,value=true o false, identerprise=2
                      true para que se habiliten los asientos automaticos
                    */
                    
                    $types=  erp_type::find_by_sql("SELECT *,(CASE WHEN value='true' THEN 'true' ELSE 'false' END) as active FROM ".$this->_tablename." WHERE option='configuracion_model_asiento' and identerprice=".$this->_identerprise);
                    //$types=  erp_type::find('all',array('conditions'=>array('option=?','tipo_moneda')));
                    
                    $json='';
                    foreach ($types as $type) {
                       $json.= $type->to_json().',';
                    }
                    $json=substr($json, 0,  strlen($json)-1);
                    //echo '['.$json.']';
                    echo '{"total":"3","data":'.$json.'}';
                break;
                case 'readTiposAsientos':
                    $fiscal=(string)$datos['fiscal'];
                    
                    $types=  erp_type::find_by_sql("SELECT e.idtype,et.idtypeenterprise,e.type,e.option,e.value as alias,e.father,et.value,et.identerprise FROM ".$this->_tablename." e INNER JOIN erp_type_enterprise et on e.idtype=et.idtype WHERE e.option='concepto_almacenes' and et.identerprise=".$this->_identerprise);
                    //$types=  erp_type::find_by_sql("SELECT e.idtype,e.type,e.option,e.value as alias,e.father FROM ".$this->_tablename." e  WHERE e.option='concepto_almacenes'");
                    //$types=  erp_type::find('all',array('conditions'=>array('option=?','tipo_moneda')));
                    $total=count($types);
                    if($total==0){
                        $data=array();
                        $types1=  erp_type::find_by_sql("SELECT e.idtype FROM ".$this->_tablename." e WHERE e.option='concepto_almacenes'");  
                        foreach ($types1 as $type) {
                            $data['idtype']=$type->idtype;
                            $data['value']='false';
                            $data['identerprise']=$this->_identerprise;
                            $result=  erp_type_enterprise::create($data);
                        }
                        $types=  erp_type::find_by_sql("SELECT e.idtype,et.idtypeenterprise,e.type,e.option,e.value as alias,e.father,et.value,et.identerprise FROM ".$this->_tablename." e INNER JOIN erp_type_enterprise et on e.idtype=et.idtype WHERE e.option='concepto_almacenes' and et.identerprise=".$this->_identerprise);
                    }
                    $json='';
                    foreach ($types as $type) {
                       $json.= $type->to_json().',';
                    }
                    $json=substr($json, 0,  strlen($json)-1);
                    //echo '['.$json.']';
                    echo '{"total":"3","results":['.$json.']}';
                break;
                case 'createmoneda':
                    //$json1 = file_get_contents('php://input');
                    //$dataJson1=json_decode($json1);
                    //$dataJson1=array();
                    $dataJson1=json_decode($datos['valoresraiz']);
                    //print_r($dataJson1);
                    $data=array();
                    //$data['idtype']= $this->getnewcode(1,false);//$dataJson1->accountcode;
                    $data['type']=$dataJson1->type;
                    $data['alias']=$dataJson1->alias;
                    
                    $data['option']='tipo_moneda';
                    $data['identerprise']=$this->_identerprise;
                    //$data['value']=0;
                    $validador=0;
                    if(($dataJson1->primaria=='true') && ($dataJson1->secundaria=='true')){
                        echo '{"success":true,"title":"Correcto:","msg":"No puede ser ambos primaria y secundaria!!"}';
                        $validador=1;
                    } 
                    if(($dataJson1->primaria=='true') && ($dataJson1->secundaria=='false')){
                        $types=  erp_type::find_by_sql("SELECT * FROM ".$this->_tablename." WHERE option='tipo_moneda' and value='11' and identerprise=".$this->_identerprise);
                        $total=count($types);
                        //echo 'hola';
                        if($total>0){
                            echo '{"success":true,"title":"Correcto:","msg":"No puede haber mas de una moneda principal!!"}';
                            $data['value']='0';
                            $validador=1;
                        }else{
                        $data['value']='11';
                        }
                    } 
                        
                    if(($dataJson1->primaria=='false') && ($dataJson1->secundaria=='true')){
                       $types=  erp_type::find_by_sql("SELECT * FROM ".$this->_tablename." WHERE option='tipo_moneda' and value='12' and identerprise=".$this->_identerprise);
                        $total=count($types);
                        if($total>0){
                            echo '{"success":true,"title":"Correcto:","msg":"No puede haber mas de una moneda secundaria!!"}';
                            $data['value']='0';
                            $validador=1;
                        }else{
                        $data['value']='12';
                        }
                    } 
                    if($dataJson1->primaria=='false' && $dataJson1->secundaria=='false'){
                        $data['value']='0';
                    } 
                                      
                    
                    if($validador==0){
                    $result=erp_type::create($data);
                            if ($result) {
                                echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!"}';
                                
                            }else{
                                echo '{"success":false,"title":"Error:","msg":"No se pudo guardar!!"}';
                            }
                    }
                    
                break;

                
                 case 'readtypeentidad':
                    
                    $types=  erp_type::find_by_sql("SELECT * FROM ".$this->_tablename." WHERE option='tipo_entidad' ORDER BY idtype ASC");
                    $total=count($types);
                    //$types=  erp_type::find('all',array('conditions'=>array('option=?','tipo_entidad')));
                    $json='';
                    foreach ($types as $type) {
                       $json.= $type->to_json().',';
                    }
                    $json=substr($json, 0,  strlen($json)-1);
                    //echo '['.$json.']';
                    echo '{"total":'.$total.',"results":['.$json.']}';
                break;
                case 'updatemoneda':
                    $dataJson1=json_decode($datos['valoresraiz']);
                    //print_r($dataJson1);
                    $data=array();
                    //$data['idtype']= $this->getnewcode(1,false);//$dataJson1->accountcode;
                    $data['type']=$dataJson1->type;
                    $data['alias']=$dataJson1->alias;
                    $validador=0;
                    if(($dataJson1->primaria=='true') && ($dataJson1->secundaria=='true')){
                        echo '{"success":true,"title":"Correcto:","msg":"No puede ser ambos primaria y secundaria!!"}';
                        $validador=1;
                    } 
                    if(($dataJson1->primaria=='true') && ($dataJson1->secundaria=='false')){
                        $types=  erp_type::find_by_sql("SELECT * FROM ".$this->_tablename." WHERE option='tipo_moneda' and value='11' and identerprise=".$this->_identerprise);
                        $total=count($types);
                        //echo 'hola';
                        if($total>0){
                            echo '{"success":true,"title":"Correcto:","msg":"No puede haber mas de una moneda principal!!"}';
                            $data['value']='0';
                            $validador=1;
                        }else{
                        $data['value']='11';
                        }
                    } 
                        
                    if(($dataJson1->primaria=='false') && ($dataJson1->secundaria=='true')){
                       $types=  erp_type::find_by_sql("SELECT * FROM ".$this->_tablename." WHERE option='tipo_moneda' and value='12' and identerprise=".$this->_identerprise);
                        $total=count($types);
                        if($total>0){
                            echo '{"success":true,"title":"Correcto:","msg":"No puede haber mas de una moneda secundaria!!"}';
                            $data['value']='0';
                            $validador=1;
                        }else{
                        $data['value']='12';
                        }
                    } 
                    if($dataJson1->primaria=='false' && $dataJson1->secundaria=='false'){
                        $data['value']='0';
                    } 
                    if($validador==0){
                    $data['option']='tipo_moneda';
                                        
                            $options['idtype']=(int)$dataJson1->idtype;
                            $result=erp_type::update_all(array('set'=>$data,'conditions'=>$options));
                            if ($result) {
                                echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!"}';
                                
                            }else{
                                echo '{"success":false,"title":"Error:","msg":"No se pudo guardar!!"}';
                            }
                    }
                break;
                case 'updateActivoAsientos':
                    //$dataJson1=json_decode($datos['valoresraiz']);
                    $data=array();
                    $data['value']=$datos['value'];
                    //print_r($data);
                    $options['option']=$datos['option'];
                    
                            //$options['idtype']=(int)$dataJson1->idtype;
                            $result=erp_type::update_all(array('set'=>$data,'conditions'=>$options));
                            if ($result) {
                                echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!"}';
                                
                            }else{
                                echo '{"success":false,"title":"Error:","msg":"No se pudo guardar!!"}';
                            }
                    //}
                break;
                
                case 'updateListaAsientos':
                    $dataJson1=json_decode($datos['valorestipoasiento']);
                    //print_r($dataJson1);
                    $data=array();
                    
                        if($dataJson1->value==true){
                            //echo $dataJson1->value;
                            $newvalue='true';
                        }else{
                            $newvalue='false';
                        }
                        $data['value']=$newvalue;
                        $options['idtypeenterprise']=(int)$dataJson1->idtypeenterprise;
                    
                            //$options['idtype']=(int)$dataJson1->idtype;
                            $result=  erp_type_enterprise::update_all(array('set'=>$data,'conditions'=>$options));
                            if ($result) {
                                echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!"}';
                                
                            }else{
                                echo '{"success":false,"title":"Error:","msg":"No se pudo guardar!!"}';
                            }
                    
                    
                break;
                
                case 'deletemoneda':
                    
                    $id=(int)$datos['idtype'];
                    
                   $post = erp_type::find($id);
                   
                           $result=$post->delete();
                            if ($result) {
                                echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!"}';
                                
                            }else{
                                echo '{"success":false,"title":"Error:","msg":"No se pudo guardar!!"}';
                            }
                    
                break;
                
                case 'readagrupacioncategorica':
                    
                    $types=  erp_type::find_by_sql("SELECT * FROM ".$this->_tablename." WHERE option='agrupacion_categorica' ORDER BY idtype ASC");
                    $total=count($types);
                    //$types=  erp_type::find('all',array('conditions'=>array('option=?','tipo_entidad')));
                    $json='';
                    foreach ($types as $type) {
                       $json.= $type->to_json().',';
                    }
                    $json=substr($json, 0,  strlen($json)-1);
                    //echo '['.$json.']';
                    echo '{"total":'.$total.',"results":['.$json.']}';
                break;
                
                case 'readfathercategory':
                    
                    $types=  erp_type::find_by_sql("SELECT * FROM ".$this->_tablename." WHERE option='agrupacion_categorica' AND (alias='familia' OR alias='categoria') ORDER BY idtype ASC");
                    $total=count($types);
                    //$types=  erp_type::find('all',array('conditions'=>array('option=?','tipo_entidad')));
                    $json='';
                    foreach ($types as $type) {
                       $json.= $type->to_json().',';
                    }
                    $json=substr($json, 0,  strlen($json)-1);
                    echo '['.$json.']';
                    echo '{"total":'.$total.',"results":['.$json.']}';
                break;
                
                case 'readcbostoretype':
                    $start=$datos['start'];
                    $limit=$datos['limit'];
                   
                    $total=0;
                    $storetypes= erp_type::find_by_sql("SELECT idtype, type FROM $this->_tablename WHERE option='tipo_almacen' ORDER BY type ASC LIMIT $limit OFFSET $start");
                    $total=count(erp_type::find_by_sql("SELECT idtype, type FROM $this->_tablename WHERE option='tipo_almacen'"));
                    $json='';
                    foreach ($storetypes as $datas) {
                    $json.= $datas->to_json().',';
                    }
                    $json=substr($json, 0,  strlen($json)-1);

                    echo '{"total":"'.$total.'","results":['.$json.']}';
                   
                    
                break;
                
                 case 'readtxnentradaconcept':
                    
                    $types=  erp_type::find_by_sql("SELECT t1.idtype,t1.type
                                                    FROM ".$this->_tablename." AS t1
                                                    INNER JOIN erp_type t ON t.idtype=t1.father
                                                    WHERE t1.option='concepto_almacenes' AND t1.alias not in ('compra_almacen','transferencia_almacen_i','importacion_almacen') AND t.alias<>'salida_almacen'");
                    $total= count($types);
                    $json='';
                    
                    foreach ($types as $type) {
                       $json.= $type->to_json().',';
                    }
                    $json=substr($json, 0,  strlen($json)-1);
                    
                    echo '{"total":"'.$total.'","results":['.$json.']}';
                break;
                
                case 'readtxnsalidaconcept':
                    
                    $types=  erp_type::find_by_sql("SELECT t1.idtype,t1.type
                                                    FROM ".$this->_tablename." AS t1
                                                    INNER JOIN erp_type t ON t.idtype=t1.father
                                                    WHERE t1.option='concepto_almacenes' AND t1.alias not in ('transferencia_almacen_s') AND t.alias<>'ingreso_almacen'");
                    $total= count($types);
                    $json='';
                    
                    foreach ($types as $type) {
                       $json.= $type->to_json().',';
                    }
                    $json=substr($json, 0,  strlen($json)-1);
                    
                    echo '{"total":"'.$total.'","results":['.$json.']}';
                break;
                
                case 'insert':
                     switch ($yaction){
                        case 'tipoalmacen':
                            $dataJson=json_decode($datos['valoresType']);
                            $data=  array();
                            $data['type']=$dataJson->type;
                            $data['option']='tipo_almacen';
                            $data['identerprise']= $this->_identerprise;
                            
                            $type=  erp_type::create($data);
                                                       
                            if ($type) {

                                    echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente el tipo de almacen!!"}';

                            }else{
                                    echo '{"success":false,"title":"Error:","msg":"No se pudo guardar!!"}';
                            }
                            
                        break;
                     }
                break;
                
                case 'update':
                    switch ($yaction){
                        case 'tipoalmacen':
                            $dataJson=json_decode($datos['valoresType']);
                            $idtype=(int)$dataJson->idtype;
                            
                            $data=  array();
                            $data['type']=$dataJson->type;
                           
                            
                            $type=  erp_type::find($idtype);
                            $type->update_attributes($data);
                            $type->save();
                            if ($type) {

                                echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!"}';

                            }else{
                                echo '{"success":false,"title":"Error:","msg":"No se pudo guardar!!"}';
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
    $xaction=$_POST['xaction'];

    
     $iduser=isset($_SESSION['ERP']['iduser'])?$_SESSION['ERP']['iduser']:0;
     $identerprise=isset($_SESSION['ERP']['identerprise'])?$_SESSION['ERP']['identerprise']:0;
     
    $tipo=new sis_erp_type($iduser,$identerprise);

    $tipo->$xaction($_POST);
?>
