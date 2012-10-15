<?php

/*
 * @Autor: Max marcelo jimenez T,Cristhian Valencia, Pablo Garcia G.
 * @Email: maxmjt@gmail.com,fox_tian@hotmail.com ,garcia_guaman_pablo@hotmail.com
 */
session_start();

require_once '../include.php';
    class sis_erp_category
    {
        public $_iduser;
        public $_tablename;
        public $_identerprise;

        public function __construct($usuario,$enterprise) {
            $this->_iduser=$usuario;
            $this->_identerprise=$enterprise;
            $this->_tablename= erp_provider::table_name();

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
                
                case 'read':
                    $start=$datos['start'];
                    $limit=$datos['limit'];
                    $arreglo= array();
                    $total=0;
                    $filter='';
                    if (isset($datos['filter']) && $datos['filter']!='') {
                                $filter="AND (categoryname  ILIKE '%".$datos['filter']."%')" ;
                    }
                    $sql ="SELECT
                            c.idcategory,
                            c.categoryname,
                            c.description,
                            c.datecreated,
                            c.idcategoricalgrouping,
                            t2.type AS agrupacion_categorica,
                            t2.alias,
                    	    c.idfather,
			    (SELECT c2.categoryname FROM erp_category c2 WHERE c.idfather=c2.idcategory) AS fathercategory,
                            c.active
                            FROM
                            erp.erp_category AS c

                            INNER JOIN erp.erp_type AS t2 ON t2.idtype = c.idcategoricalgrouping
                            WHERE
                            c.identerprise=$this->_identerprise $filter
                            GROUP BY
                            c.idcategory,
                            c.categoryname,
                            t2.type,
                            t2.alias
                            ORDER BY c.idcategoricalgrouping asc
                            LIMIT $limit OFFSET $start
                            ";
                     $sql2 ="SELECT
                            c.idcategory,
                            c.categoryname,
                            c.description,
                            c.datecreated,
                            c.idcategoricalgrouping,
                            t2.type AS agrupacion_categorica,
                            t2.alias,
                            c.idfather,
			   (SELECT c2.categoryname FROM erp_category c2 WHERE c.idfather=c2.idcategory) AS fathercategory,
                            c.active
                            FROM
                            erp.erp_category AS c

                            INNER JOIN erp.erp_type AS t2 ON t2.idtype = c.idcategoricalgrouping
                            WHERE
                            c.identerprise=$this->_identerprise $filter
                            GROUP BY
                            c.idcategory,
                            c.categoryname,
                            t2.type,
                            t2.alias
                            ORDER BY c.idcategoricalgrouping asc
                            ";
                    //echo $sql;
                    $categorias= erp_category::find_by_sql($sql);
                    $total=count(erp_category::find_by_sql($sql2));
                  
                  
                   $json='';
                    foreach ($categorias as $categoria) {
                       $json.= $categoria->to_json().',';
                    }
                    $json=substr($json, 0,  strlen($json)-1);
                    
                    echo '{"success":"true","total":'.$total.',"results":['.$json.']}';
                    
               
                    
                break;
                
                case 'update':
                    
                    $dataJson=json_decode($datos['valoresCategoria']);
                    
                    $c=erp_category::all(array('conditions' => array('categoryname = ?', $dataJson->categoryname)));
                    $totales=count($c);
                                      
                   if($totales>0){
                       echo '{"success":false,"title":"Error:","msg":"Ya existe una categoria con ese nombre, No se modifico ningun registro!!"}';
                       
                   }else{
                    
                    $data=array();
                    
                     if($dataJson->idfather!='')
                       $data['idfather']=$dataJson->idfather;
                     
                    $active='false';
                    if($dataJson->active!='')
                        $active='true';
                                    
                    $data['idcategory']=$dataJson->idcategory;
                    $data['categoryname']=$dataJson->categoryname;
                    $data['description']=$dataJson->description;
                    $data['idcategoricalgrouping']=$dataJson->idcategoricalgrouping;
                    $data['active']=$active;
                    
                   
                    $categoria= erp_category::find($data['idcategory']);
                    $categoria->update_attributes($data);
                    $categoria->save();
                    if ($categoria) {
                         
                        echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!"}';

                    }else{
                        echo '{"success":false,"title":"Error:","msg":"No se pudo guardar!!"}';
                    }
                   }
                
                break;
                
                 case 'insert':
                    
                    $dataJson=json_decode($datos['valoresCategoria']);
                   
                   
                   $c=erp_category::all(array('conditions' => array('categoryname = ?', $dataJson->categoryname)));
                   $totales=count($c);
                                      
                   if($totales>0){
			echo '{"success":false,"title":"Error:","msg":"Ya existe una categoria con ese nombre, No se inserto ningun registro!!"}';
                    }else{
                         
                        $data=array();

                        if($dataJson->idfather!='')
                            $data['idfather']=$dataJson->idfather;

                        $active='false';
                        if($dataJson->active!='')
                            $active='true';
						
                            $data['categoryname']=$dataJson->categoryname;
                            $data['description']=$dataJson->description;
                            $data['datecreated']=  $this->getActualDate('N');
                            $data['dateupdated']=  $this->getActualDate('N');
                            $data['active']=$active;
                            $data['iduser']=  $this->_iduser;
                            $data['identerprise']=  $this->_identerprise;
                            $data['idcategoricalgrouping']=$dataJson->idcategoricalgrouping;


                            $categoria=erp_category::create($data);

                            if ($categoria) {

                                    echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!"}';

                            }else{
                                    echo '{"success":false,"title":"Error:","msg":"No se pudo guardar!!"}';
                            }
                                              
                        }
                        
                break;
                
                case 'deletecategory': 
                    $idcategory=(int)$datos['idcategory'];
                   
                    $itemcategory= erp_item_category::find('all',array('conditions'=>array('idcategory=?',$idcategory)));
                    $categoryprovider=  erp_category_provider::find('all',array('conditions'=>array('idcategory=?',$idcategory)));
                    $fathercategory=  erp_category::find('all',array('conditions'=>array('idfather=?',$idcategory)));
                    if(count($itemcategory)>0){
                        echo '{"success":false,"title":"Atencion:","msg":"La categoria se encuentra asignada a ciertos items y no puede ser eliminada!!"}';
                        
                    }else if(count($categoryprovider)>0){
                        echo '{"success":false,"title":"Atencion:","msg":"La categoria se encuentra asignada a ciertos proveedores y no puede ser eliminada!!"}';
                        
                    }else if(count($fathercategory)>0){
                          echo '{"success":false,"title":"Atencion:","msg":"La categoria es padre de ciertas categorias y no puede ser eliminada!!"}';
                    }else{
                            $category = erp_category::find($idcategory);
                            $result=$category->delete();
                            if ($result) {
                                echo '{"success":true,"title":"Correcto:","msg":"Se elimino correctamente!!"}';

                            }else{
                                echo '{"success":false,"title":"Error:","msg":"No se pudo eliminar!!"}';
                            }
                    }
                    /*
                    
                    */
                break;
                
                case 'readmarca';
                 //$arreglo[]=array();
                 $total=0;
                 $sql="SELECT
                        c.idcategory,
                        c.categoryname,
                        t2.type AS agrupacion_categorica
                        FROM
                        erp.erp_category AS c
                        INNER JOIN erp.erp_type AS t2 ON t2.idtype = c.idcategoricalgrouping
                        WHERE
                        c.identerprise=$this->_identerprise AND
                        t2.alias='marca' 

                        GROUP BY
                        c.idcategory,
                        c.categoryname,
                        t2.type
                        ";
                    //echo $sql;
                    $categorias= erp_category::find_by_sql($sql);
                    $total=count($categorias);
                    
                    
                    if($total>0){
                        foreach ($categorias as $categoria) {

                            $arreglo[]=array(

                            "idcategory"=>$categoria->idcategory,
                            "categoryname"=>$categoria->categoryname,
                            "agrupacion_categorica"=>$categoria->agrupacion_categorica


                            );

                        }
                    }
                    else{
                        $arreglo[]=array();
                    }
                        
                  
                     $o = array(
                        "success"=>true
                        ,"total"=>$total
                        ,"results"=>$arreglo
                    );
                     echo json_encode($o);
                    
                break;
                
                case 'readmodelo';
                 
                 $total=0;
                 $sql="SELECT
                        c.idcategory,
                        c.categoryname,
                        t2.type AS agrupacion_categorica
                        FROM
                        erp.erp_category AS c
                        INNER JOIN erp.erp_type AS t2 ON t2.idtype = c.idcategoricalgrouping
                        WHERE
                        c.identerprise=$this->_identerprise AND
                        t2.alias='modelo' 

                        GROUP BY
                        c.idcategory,
                        c.categoryname,
                        t2.type
                        ";
                 
                    $categorias= erp_category::find_by_sql($sql);
                    $total=count($categorias);
                    $json='';
                        foreach ($categorias as $categoria) {
                        $json.= $categoria->to_json().',';
                        }
                        $json=substr($json, 0,  strlen($json)-1);
                        
                        echo '{"total":'.$total.',"results":['.$json.']}';
                    
                 
                break;
                
                case 'readrubro';
                 $arreglo[]=array();
                 $total=0;
                 $sql="SELECT
                        c.idcategory,
                        c.categoryname,
                        t2.type AS agrupacion_categorica
                        FROM
                        erp.erp_category AS c
                        INNER JOIN erp.erp_type AS t2 ON t2.idtype = c.idcategoricalgrouping
                        WHERE
                        c.identerprise=$this->_identerprise AND
                        t2.alias='rubro' 

                        GROUP BY
                        c.idcategory,
                        c.categoryname,
                        t2.type
                        ";
                 
                    $categorias= erp_category::find_by_sql($sql);
                    $total=count($categorias);
                     $json='';
                        foreach ($categorias as $categoria) {
                        $json.= $categoria->to_json().',';
                        }
                        $json=substr($json, 0,  strlen($json)-1);
                        
                        echo '{"total":'.$total.',"results":['.$json.']}';
                break;
                
                case 'readfamilia';
                 $arreglo[]=array();
                 $total=0;
                 $sql="SELECT
                        c.idcategory,
                        c.categoryname,
                        t2.type AS agrupacion_categorica
                        FROM
                        erp.erp_category AS c
                        INNER JOIN erp.erp_type AS t2 ON t2.idtype = c.idcategoricalgrouping
                        WHERE
                        c.identerprise=$this->_identerprise AND
                        t2.alias='familia' 

                        GROUP BY
                        c.idcategory,
                        c.categoryname,
                        t2.type
                        ";
                 
                    $categorias= erp_category::find_by_sql($sql);
                    $total=count($categorias);
                     $json='';
                        foreach ($categorias as $categoria) {
                        $json.= $categoria->to_json().',';
                        }
                        $json=substr($json, 0,  strlen($json)-1);
                        
                        echo '{"total":'.$total.',"results":['.$json.']}';
                break;
                
                case 'readcategoria';
                 $arreglo[]=array();
                 $total=0;
                 if($datos['idfather']!='' || $datos['idfather']!=null){
                    $idfather=$datos ['idfather'];
                }else{
                    $idfather="-1";
                }
                
                 
                 $sql="SELECT
                        c.idcategory,
                        c.categoryname,
                        t2.type AS agrupacion_categorica
                        FROM
                        erp.erp_category AS c
                        INNER JOIN erp.erp_type AS t2 ON t2.idtype = c.idcategoricalgrouping
                        WHERE
                        c.identerprise=$this->_identerprise AND
                        t2.alias='categoria'
                        AND c.idfather=$idfather 

                        GROUP BY
                        c.idcategory,
                        c.categoryname,
                        t2.type
                        ";
                   
                    $categorias= erp_category::find_by_sql($sql);
                    $total=count($categorias);
                     $json='';
                        foreach ($categorias as $categoria) {
                        $json.= $categoria->to_json().',';
                        }
                        $json=substr($json, 0,  strlen($json)-1);
                        
                        echo '{"total":'.$total.',"results":['.$json.']}';
                break;
                
                case 'readcategoriaeditor';
                 $arreglo[]=array();
                 $total=0;
                
                
                 
                 $sql="SELECT
                        c.idcategory,
                        c.categoryname,
                        t2.type AS agrupacion_categorica
                        FROM
                        erp.erp_category AS c
                        INNER JOIN erp.erp_type AS t2 ON t2.idtype = c.idcategoricalgrouping
                        WHERE
                        c.identerprise=$this->_identerprise AND
                        t2.alias='categoria'
                       
                        GROUP BY
                        c.idcategory,
                        c.categoryname,
                        t2.type
                        ";
                   
                    $categorias= erp_category::find_by_sql($sql);
                    $total=count($categorias);
                     $json='';
                        foreach ($categorias as $categoria) {
                        $json.= $categoria->to_json().',';
                        }
                        $json=substr($json, 0,  strlen($json)-1);
                        
                        echo '{"total":'.$total.',"results":['.$json.']}';
                break;
                
                case 'readsubcategoria';
                 $arreglo[]=array();
                 $total=0;
                if($datos['idfather']!='' || $datos['idfather']!=null){
                    $idfather=$datos ['idfather'];
                }else{
                    $idfather="-1";
                }
                
                
               $sql="SELECT
                        c.idcategory,
                        c.categoryname,
                        t2.type AS agrupacion_categorica
                        FROM
                        erp_category AS c
                        INNER JOIN erp.erp_type AS t2 ON t2.idtype = c.idcategoricalgrouping
                        WHERE
                        c.identerprise=$this->_identerprise AND
                        t2.alias='subcategoria' 
                        AND c.idfather=$idfather 
                        GROUP BY
                        c.idcategory,
                        c.categoryname,
                        t2.type
                        ";
                   
                    $categorias= erp_category::find_by_sql($sql);
                    $total=count($categorias);
                     $json='';
                        foreach ($categorias as $categoria) {
                        $json.= $categoria->to_json().',';
                        }
                        $json=substr($json, 0,  strlen($json)-1);
                        
                        echo '{"total":'.$total.',"results":['.$json.']}';
                break;
                
                 case 'readsubcategoriaeditor';
                 $arreglo[]=array();
                 $total=0;
                
                
                  $sql="SELECT
                        c.idcategory,
                        c.categoryname,
                        t2.type AS agrupacion_categorica
                        FROM
                        erp.erp_category AS c
                        INNER JOIN erp.erp_type AS t2 ON t2.idtype = c.idcategoricalgrouping
                        WHERE
                        c.identerprise=$this->_identerprise AND
                        t2.alias='subcategoria' 
                        
                        GROUP BY
                        c.idcategory,
                        c.categoryname,
                        t2.type
                        ";
                   
                    $categorias= erp_category::find_by_sql($sql);
                    $total=count($categorias);
                     $json='';
                        foreach ($categorias as $categoria) {
                        $json.= $categoria->to_json().',';
                        }
                        $json=substr($json, 0,  strlen($json)-1);
                        
                        echo '{"total":'.$total.',"results":['.$json.']}';
                break;
                case 'readnuevacategoria';
                        echo '{"total":0,"results":[{}]}';
                break;
                
                case 'loadrecordcategory':
                $iditem=$datos['iditem'];
                $marca='';
                $modelo='';
                $rubro='';
                
                $sql ="SELECT
                c.idcategory,
                c.categoryname,
                t2.alias

                FROM
                erp_category AS c
                INNER JOIN erp_item_category ic ON ic.idcategory=c.idcategory
                INNER JOIN erp_item i ON i.iditem=ic.iditem
                INNER JOIN erp_type AS t2 ON t2.idtype = c.idcategoricalgrouping

                WHERE
                c.identerprise=$this->_identerprise AND 
                i.iditem=$iditem

                GROUP BY
                c.idcategory,
                c.categoryname,
                t2.type,
                t2.alias";
                //echo $sql;
                $categorias= erp_category::find_by_sql($sql);
                $total=count($categorias);
                $data= 'iditem:'.$iditem.',';
                if($total>0){
                
                   
                    foreach ($categorias as $categoria) {
                        $data.=$categoria->alias.':'.$categoria->idcategory.',';
                       
                    
                    }
                     $data=substr($data, 0,  strlen($data)-1);
                } 
              
                     echo '{"success":true,"total":'.$total.',"data":{'.$data.'}}';
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
     
    $category=new sis_erp_category($iduser,$identerprise);
    $category->$xaction($_POST);
?>
