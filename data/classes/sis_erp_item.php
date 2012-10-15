<?php session_start(); ?>
<?php

/*
 * @Autor: Max marcelo jimenez T
 * @Email: maxmjt@gmail.com
 */

require_once '../include.php';
    class sis_erp_item 
    {
        public $_iduser;
        public $_tablename;
        public $_identerprise;

        public function __construct($usuario,$enterprise) {
            $this->_iduser=$usuario;
            $this->_identerprise=$enterprise;
            $this->_tablename= erp_item::table_name();

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
                            
                            if (!isset($datos['active'])) $datos['active']='false';
                            else $datos['active']='true';
                            
                            $data=array();
                            $data['identerprise']=$this->_identerprise;
                            $data['iduser']=  $this->_iduser;
                            foreach ($datos as $key => $value) {
                                if ($key!='xaction' && $key!='yaction' && $key!='iditem' && $key!='identerprise') {
                                    $data[$key]=$value;
                                }
                            }
                            $newitem=  new erp_item($data);
                            $newitem->save();
                            if ($newitem) {
                                if ($_FILES["image"]['name']!='') {
                                    $newitem->image=$newitem->identerprise.'-'.$newitem->iditem.'.png';
                                    
                                }else{
                                    $newitem->image='no.png';
                                }
                                $newitem->save();
                                $this->saveImage($newitem);
                                echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!","iditem":'.$newitem->iditem.',"identerprise":'.$newitem->identerprise.',"image":"'.$newitem->image.'"}';
                                
                            }else{
                                echo '{"success":false,"title":"Error:","msg":"No se pudo guardar!!"}';
                            }
                        break;
                                
                        case 'update':
                            $iditem=$datos['iditem'];
                            if (!isset($datos['active'])) $datos['active']='false';
                            else $datos['active']='true';
                            $datos['identerprise']=$this->_identerprise;
                            $datos['iduser']=  $this->_iduser;
                            
                            $data=array();
                            
                            foreach ($datos as $key => $value) {
                                if ($key!='xaction' && $key!='yaction' && $key!='iditem') {
                                    $data[$key]=$value;
                                }
                            }
                            if ($_FILES["image"]['name']!='') {
                                    $data['image']=$datos['identerprise'].'-'.$datos['iditem'].'.png'; 
                            }
                            
                            $uitem=erp_item::find($iditem);
                            $uitem->update_attributes($data);
                            $uitem->save();
                            if ($uitem) {
                                
                                $this->saveImage($uitem);
                                echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!","iditem":'.$uitem->iditem.',"identerprise":'.$uitem->identerprise.',"image":"'.$uitem->image.'"}';
                                
                            }else{
                                echo '{"success":false,"title":"Error:","msg":"No se pudo guardar!!"}';
                            }
                        break;
                        
                        case 'updateadicionales';
                            $iditem=$datos['iditem'];
                            
                            $data=array();
                            $data['identerprise']=$this->_identerprise;
                            $data['iduser']=  $this->_iduser;
                            foreach ($datos as $key => $value) {
                                if ($key!='xaction' && $key!='yaction' && $key!='iditem' && $key!='identerprise') {
                                    $data[$key]=$value;
                                }
                            }
                            
                            $newitem=  erp_item::find($iditem);
                            $newitem->update_attributes($data);
                            $newitem->save();
                            if ($newitem) {
                                echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!","iditem":'.$newitem->iditem.',"identerprise":'.$newitem->identerprise.',"image":"'.$newitem->image.'"}';
                                
                            }else{
                                echo '{"success":false,"title":"Error:","msg":"No se pudo guardar!!"}';
                            }
                        break;
                    }
                break;
                case 'readcbocomposition':
                    if (isset($datos['query'])) {
                        $conditions=array('conditions'=>"(code ilike '%".$datos['query']."%' OR description ilike '%".$datos['query']."%')");
                        $items=  erp_item::all(array('select'=>'iditem,code,description'),$conditions);
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
                    
                    
                break;
                
                case 'readcboitem':
                    if (isset($datos['query'])) {
                         $conditions=array("(code ilike '%".$datos['query']."%' OR description ilike '%".$datos['query']."%')");
                        $items=  erp_item::all(array('select'=>'iditem,code,description','conditions'=>$conditions));
                         $json='';
                        foreach ($items as $datas) {
                            $json.= $datas->to_json().',';
                        }
                        $json=substr($json, 0,  strlen($json)-1);

                        echo '{"total":"0","results":['.$json.']}';
                    }else if($datos['iditem']!=0){
                        $conditions=array("iditem=?",$datos['iditem']);
                        $items=  erp_item::all(array('select'=>'iditem,code,description','conditions'=>$conditions));
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
                    
                    
                break;
                
                case 'readcboitemkardex':
                    $total=0;
                    if (isset($datos['query'])) {
                         $conditions=array("(code ilike '%".$datos['query']."%' OR description ilike '%".$datos['query']."%')");
                        $items=  erp_item::all(array('select'=>'iditem,code,description,valuation','conditions'=>$conditions));
                        if(count($items)>0){
                            $total=  count($items);
                        } 
                        $json='';
                        foreach ($items as $datas) {
                            $json.= $datas->to_json().',';
                        }
                        $json=substr($json, 0,  strlen($json)-1);

                        echo '{"total":'.$total.',"results":['.$json.']}';
                    }else if($datos['iditem']!=0){
                        $conditions=array("iditem=?",$datos['iditem']);
                        $items=  erp_item::all(array('select'=>'iditem,code,description,valuation','conditions'=>$conditions));
                         $json='';
                         if(count($items)>0){
                            $total=  count($items);
                        } 
                        foreach ($items as $datas) {
                            $json.= $datas->to_json().',';
                        }
                        $json=substr($json, 0,  strlen($json)-1);

                        echo '{"total":'.$total.',"results":['.$json.']}';
                    }else{
                        $json='';
                        echo '{"total":"0","results":['.$json.']}';
                    }
                    
                    
                break;
                
                case 'readitem':
                    $filter='';
                    $filter2='';
                    $start=$datos['start'];
                    $limit=$datos['limit'];
                    if (isset($datos['filter']) && $datos['filter']!='') {
                                $filter=" AND (ei.code  ILIKE '%".$datos['filter']."%' OR ei.description ILIKE '%".$datos['filter']."%')" ;
                                $filter2=" WHERE (ei.code  ILIKE '%".$datos['filter']."%' OR ei.description ILIKE '%".$datos['filter']."%')" ;
                            }
                    $sql="SELECT ei.*,categorymarca.marca,categorymodelo.modelo,categoryrubro.rubro,
                                 categoryfamilia.familia,categorycategoria.categoria,categorysubcategoria.subcategoria,typevaluation.type as valuationname 
                          FROM erp_item  ei
                                LEFT OUTER JOIN 
                                (SELECT eic.iditem,ec.categoryname as marca FROM erp_category ec  
                                INNER JOIN erp_item_category eic ON eic.idcategory=ec.idcategory
                                INNER JOIN erp_type as typemarca ON typemarca.idtype=ec.idcategoricalgrouping AND typemarca.idtype=18) as categorymarca ON categorymarca.iditem=ei.iditem
                                LEFT OUTER JOIN
                                (SELECT eic.iditem,ec.categoryname as modelo FROM erp_category ec  
                                INNER JOIN erp_item_category eic ON eic.idcategory=ec.idcategory
                                INNER JOIN erp_type as typemodelo ON typemodelo.idtype=ec.idcategoricalgrouping AND typemodelo.idtype=19) as categorymodelo ON categorymodelo.iditem=ei.iditem
                                LEFT OUTER JOIN
                                (SELECT eic.iditem,ec.categoryname as rubro FROM erp_category ec  
                                INNER JOIN erp_item_category eic ON eic.idcategory=ec.idcategory
                                INNER JOIN erp_type as typerubro ON typerubro.idtype=ec.idcategoricalgrouping AND typerubro.idtype=21) as categoryrubro ON categoryrubro.iditem=ei.iditem
                                LEFT OUTER JOIN
                                (SELECT eic.iditem,ec.categoryname as familia FROM erp_category ec  
                                INNER JOIN erp_item_category eic ON eic.idcategory=ec.idcategory
                                INNER JOIN erp_type as typefamilia ON typefamilia.idtype=ec.idcategoricalgrouping AND typefamilia.idtype=22) as categoryfamilia ON categoryfamilia.iditem=ei.iditem
                                LEFT OUTER JOIN
                                (SELECT eic.iditem,ec.categoryname as categoria FROM erp_category ec  
                                INNER JOIN erp_item_category eic ON eic.idcategory=ec.idcategory
                                INNER JOIN erp_type as typecategoria ON typecategoria.idtype=ec.idcategoricalgrouping AND typecategoria.idtype=23) as categorycategoria ON categorycategoria.iditem=ei.iditem
                                LEFT OUTER JOIN
                                (SELECT eic.iditem,ec.categoryname as subcategoria FROM erp_category ec  
                                INNER JOIN erp_item_category eic ON eic.idcategory=ec.idcategory
                                INNER JOIN erp_type as typesubcategoria ON typesubcategoria.idtype=ec.idcategoricalgrouping AND typesubcategoria.idtype=24) as categorysubcategoria ON categorysubcategoria.iditem=ei.iditem
                                INNER JOIN erp_type as typevaluation ON typevaluation.idtype=ei.valuation 
                           WHERE ei.identerprise=$this->_identerprise $filter ORDER BY ei.iditem asc limit $limit offset $start";
                    //echo $sql;
                    $cuentasPrimerNivel= erp_item::find_by_sql($sql);
                    //$total=count($cuentasPrimerNivel);
                   
                    $sql1="SELECT ei.* FROM $this->_tablename ei $filter2 ORDER BY iditem asc ";
                    //echo $sql;
                    $cuentasPrimerNivel1= erp_item::find_by_sql($sql1);
                    $total=count($cuentasPrimerNivel1);
                    $json='';
                    foreach ($cuentasPrimerNivel as $cuenta) {
                       $json.= $cuenta->to_json().',';
                    }
                    $json=substr($json, 0,  strlen($json)-1);
                    
                    echo '{"total":"'.$total.'","results":['.$json.']}';
                break;
                
               
                
               
                
                
                
                
            }
        }
    }

    $xaction=$_POST['xaction'];
    
     $iduser=isset($_SESSION['ERP']['iduser'])?$_SESSION['ERP']['iduser']:0;
     $identerprise=isset($_SESSION['ERP']['identerprise'])?$_SESSION['ERP']['identerprise']:0;
     
    $item=new sis_erp_item($iduser,$identerprise);
    $item->$xaction($_POST);
?>
