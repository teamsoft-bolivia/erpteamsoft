<?php
/*
 * @Autor: Pablo Garcia guaman
 * @Email: garcia_guaman_pablo@hotmail.com
 */

    
    session_start();
    require_once '../include.php';
    class sis_erp_item_list_price 
    {
        public $_iduser;
        public $_tablename;
        public $_identerprise;

        public function __construct($usuario,$enterprise) {
            $this->_iduser=$usuario;
            $this->_identerprise=$enterprise;
            $this->_tablename= erp_item_list_price::table_name();

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
        public function __call($option,$att) {
            $datos=$att[0];
            switch ($option)
            {
               
                
                 case 'readtypeentidad':
                    
                    $types= erp_item_list_price::find_by_sql("SELECT e.iditemlistprice, e.namelist, e.active, e.factorlist, e.baselist, e.identerprise FROM ".$this->_tablename." e ORDER BY iditemlistprice ASC");
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
                case 'readlistaprecios':
                    
                    $types1= erp_item_list_price::find_by_sql("SELECT e.iditemlistprice, e.namelist, e.active, e.factorlist, e.baselist, e.identerprise FROM ".$this->_tablename." e where e.active=true and e.baselist=true and e.identerprise=$this->_identerprise ORDER BY iditemlistprice ASC");
                    $total1=count($types1);
                    if($total1==0){
                        /*
                    Para los precios se creara un campo por defecto para el precio base:
                    iditemlist:1,namelist:Precio base,active:true,factorlist:1,baselist:true
                    */
                    $data=array();
                    $data['namelist']='Precio base';
                    $data['active']='true';
                    $data['factorlist']=1;
                    $data['baselist']='true';
                    $data['identerprise']=$this->_identerprise;
                    //print_r($data);
                    $result=erp_item_list_price::create($data);
                    
                    $types= erp_item_list_price::find_by_sql("SELECT e.iditemlistprice, e.namelist, e.active, e.factorlist, e.baselist, e.identerprise FROM ".$this->_tablename." e where e.active=true and e.identerprise=$this->_identerprise ORDER BY iditemlistprice ASC");
                    $total=count($types);
                    }else{
                     $types= erp_item_list_price::find_by_sql("SELECT e.iditemlistprice, e.namelist, e.active, e.factorlist, e.baselist, e.identerprise FROM ".$this->_tablename." e where e.active=true and e.identerprise=$this->_identerprise ORDER BY iditemlistprice ASC");
                    $total=count($types);   
                    }
                    //$types=  erp_type::find('all',array('conditions'=>array('option=?','tipo_entidad')));
                    $json='';
                    foreach ($types as $type) {
                       $json.= $type->to_json().',';
                    }
                    $json=substr($json, 0,  strlen($json)-1);
                    //echo '['.$json.']';
                    echo '{"total":'.$total.',"results":['.$json.']}';
                break;
                case 'readitemAsignados':
                    /*
                    Para los precios se creara un campo por defecto para el precio base:
                    iditemlist:1,namelist:Precio base,active:true,factorlist:1,baselist:true
                    */
                    $iditemlist=$datos['idselectcategoria'];
                    //falta multiplicar el costo con su utilidad para sacar el precio base
                    $listaPrecios= erp_item_list_price::find_by_sql("SELECT * FROM ".$this->_tablename." where identerprise=$this->_identerprise and iditemlistprice=$iditemlist ORDER BY iditemlistprice ASC");
                    if($listaPrecios[0]->baselist==1){
                        
                    $filter='';
                    $start=$datos['start'];
                    $limit=$datos['limit'];
                    if (isset($datos['filter']) && $datos['filter']!='') {
                                $filter="and (code  ILIKE '%".$datos['filter']."%' OR description ILIKE '%".$datos['filter']."%')" ;
                            }
                    $sql="SELECT * FROM erp_item where identerprise=$this->_identerprise $filter ORDER BY iditem asc limit $limit offset $start";
                    //echo $sql;
                    $cuentasPrimerNivel= erp_item::find_by_sql($sql);
                    //$total=count($cuentasPrimerNivel);
                   
                    $sql1="SELECT * FROM erp_item where identerprise=$this->_identerprise $filter ORDER BY iditem asc ";
                    //echo $sql;
                    $cuentasPrimerNivel1= erp_item::find_by_sql($sql1);
                    $total=count($cuentasPrimerNivel1);
                    $json='';
                    foreach ($cuentasPrimerNivel as $cuenta) {
                       $json.= $cuenta->to_json().',';
                    }
                    $json=substr($json, 0,  strlen($json)-1);
                    
                    echo '{"total":"'.$total.'","results":['.$json.']}';
                    
                    
                    
                    }else{
                        $filter='';
                    $start=$datos['start'];
                    $limit=$datos['limit'];
                    if (isset($datos['filter']) && $datos['filter']!='') {
                                $filter="and (code  ILIKE '%".$datos['filter']."%' OR description ILIKE '%".$datos['filter']."%')" ;
                            }
                    $sql="SELECT
                            ei.iditem,
                            ei.code,
                            ei.factorycode,
                            ei.description,
                            ei.classitem,
                            ei.image,
                            ei.stockmin,
                            ei.stockmax,
                            ei.stockideal,
                            (ei.cost - (ei.cost*eilp.factorlist)) as cost,
                            ei.active,
                            ei.identerprise,
                            ei.datecreated,
                            ei.dateupdated,
                            ei.iduser,
                            ei.barcode,
                            ei.utilityfactor,
                            ei.currency
                            FROM erp_item ei
                            LEFT OUTER JOIN erp_item_list eil ON ei.iditem=eil.iditem
                            LEFT OUTER JOIN erp_item_list_price eilp ON eil.iditemlistprice=eilp.iditemlistprice 
                            where eilp.iditemlistprice=".$listaPrecios[0]->iditemlistprice." and ei.identerprise=$this->_identerprise  $filter ORDER BY iditem asc limit $limit offset $start";
                    //echo $sql;
                    $cuentasPrimerNivel= erp_item::find_by_sql($sql);
                    //$total=count($cuentasPrimerNivel);
                   
                    $sql1="SELECT
                    ei.iditem,
                    ei.code,
                    ei.factorycode,
                    ei.description,
                    ei.classitem,
                    ei.image,
                    ei.stockmin,
                    ei.stockmax,
                    ei.stockideal,
                    (ei.cost - (ei.cost*eilp.factorlist)) as cost,
                    ei.active,
                    ei.identerprise,
                    ei.datecreated,
                    ei.dateupdated,
                    ei.iduser,
                    ei.barcode,
                    ei.utilityfactor,
                    ei.currency
                    FROM erp_item ei
                    LEFT OUTER JOIN erp_item_list eil ON ei.iditem=eil.iditem
                    LEFT OUTER JOIN erp_item_list_price eilp ON eil.iditemlistprice=eilp.iditemlistprice 
                    where eilp.iditemlistprice=".$listaPrecios[0]->iditemlistprice." and ei.identerprise=$this->_identerprise $filter ORDER BY iditem asc ";
                    //echo $sql;
                    $cuentasPrimerNivel1= erp_item::find_by_sql($sql1);
                    $total=count($cuentasPrimerNivel1);
                    $json='';
                    foreach ($cuentasPrimerNivel as $cuenta) {
                       $json.= $cuenta->to_json().',';
                    }
                    $json=substr($json, 0,  strlen($json)-1);
                    echo '{"total":"'.$total.'","results":['.$json.']}';
                    }
                break;
                case 'readitemAsignar':
                    /*
                    Para los precios se creara un campo por defecto para el precio base:
                    iditemlist:1,namelist:Precio base,active:true,factorlist:1,baselist:true
                    */
                    $idselectcategoria=$datos['idselectcategoria'];//$iditemlist
                    $iditemlist=$datos['iditemlist'];
                    
                    //falta multiplicar el costo con su utilidad para sacar el precio base
                    $listaPrecios= erp_item_list_price::find_by_sql("SELECT * FROM ".$this->_tablename." where iditemlistprice=$iditemlist ORDER BY iditemlistprice ASC");
                    if($listaPrecios[0]->baselist!=1){
                    $filter='';
                    $filtercategoria='';
                    $start=$datos['start'];
                    $limit=$datos['limit'];
                    if (isset($datos['filter']) && $datos['filter']!='') {
                                $filter="and (eio.code  ILIKE '%".$datos['filter']."%' OR eio.description ILIKE '%".$datos['filter']."%')" ;
                            }
                    if (isset($idselectcategoria) && $idselectcategoria!='') {
                                $filtercategoria=" and eilpo.idcategoricalgrouping=".$idselectcategoria." and" ;
                            }
                    $sql="SELECT eio.* 
                            FROM erp_item eio
                            LEFT OUTER JOIN erp_item_category eilo ON eio.iditem=eilo.iditem
                            LEFT OUTER JOIN erp_category eilpo ON eilpo.idcategory=eilo.idcategory 
                            where eio.identerprise=$this->_identerprise $filtercategoria eio.iditem not in(
                    SELECT
                    ei.iditem
                    
                    FROM erp_item ei
                    LEFT OUTER JOIN erp_item_list eil ON ei.iditem=eil.iditem
                    LEFT OUTER JOIN erp_item_list_price eilp ON eil.iditemlistprice=eilp.iditemlistprice 
                    where eilp.iditemlistprice=".$listaPrecios[0]->iditemlistprice." and ei.identerprise=$this->_identerprise)  $filter ORDER BY eio.iditem asc limit $limit offset $start";
                    //echo $sql;
                    $cuentasPrimerNivel= erp_item::find_by_sql($sql);
                    //$total=count($cuentasPrimerNivel);
                   
                    $sql1="SELECT eio.* 
                            FROM erp_item eio
                            LEFT OUTER JOIN erp_item_category eilo ON eio.iditem=eilo.iditem
                            LEFT OUTER JOIN erp_category eilpo ON eilpo.idcategory=eilo.idcategory 
                            where eio.identerprise=$this->_identerprise $filtercategoria eio.iditem not in(
                    SELECT
                    ei.iditem
                    
                    FROM erp_item ei
                    LEFT OUTER JOIN erp_item_list eil ON ei.iditem=eil.iditem
                    LEFT OUTER JOIN erp_item_list_price eilp ON eil.iditemlistprice=eilp.iditemlistprice 
                    where eilp.iditemlistprice=".$listaPrecios[0]->iditemlistprice." and ei.identerprise=$this->_identerprise) $filter ORDER BY eio.iditem asc ";
                    //echo $sql;
                    $cuentasPrimerNivel1= erp_item::find_by_sql($sql1);
                    $total=count($cuentasPrimerNivel1);
                    $json='';
                    foreach ($cuentasPrimerNivel as $cuenta) {
                       $json.= $cuenta->to_json().',';
                    }
                    $json=substr($json, 0,  strlen($json)-1);
                    echo '{"total":"'.$total.'","results":['.$json.']}';
                    }
                break;
                case 'readitemPrecio':
                    /*
                    Para los precios se creara un campo por defecto para el precio base:
                    iditemlist:1,namelist:Precio base,active:true,factorlist:1,baselist:true
                    */
                    $iditemlist=$datos['iditemlist'];
                    //falta multiplicar el costo con su utilidad para sacar el precio base
                    $listaPrecios= erp_item_list_price::find_by_sql("SELECT * FROM ".$this->_tablename." where iditemlistprice=$iditemlist ORDER BY iditemlistprice ASC");
                    if($listaPrecios[0]->baselist==1){
                        
                    $filter='';
                    $start=$datos['start'];
                    $limit=$datos['limit'];
                    if (isset($datos['filter']) && $datos['filter']!='') {
                                $filter="and (code  ILIKE '%".$datos['filter']."%' OR description ILIKE '%".$datos['filter']."%')" ;
                            }
                    $sql="SELECT * FROM erp_item where identerprise=$this->_identerprise $filter ORDER BY iditem asc limit $limit offset $start";
                    $sql;
                    $cuentasPrimerNivel= erp_item::find_by_sql($sql);
                    //$total=count($cuentasPrimerNivel);
                   
                    $sql1="SELECT * FROM erp_item where identerprise=$this->_identerprise $filter ORDER BY iditem asc ";
                    //echo $sql;
                    $cuentasPrimerNivel1= erp_item::find_by_sql($sql1);
                    $total=count($cuentasPrimerNivel1);
                    $json='';
                    foreach ($cuentasPrimerNivel as $cuenta) {
                       $json.= $cuenta->to_json().',';
                    }
                    $json=substr($json, 0,  strlen($json)-1);
                    
                    echo '{"total":"'.$total.'","results":['.$json.']}';
                    
                    
                    
                    }else{
                        $filter='';
                    $start=$datos['start'];
                    $limit=$datos['limit'];
                    if (isset($datos['filter']) && $datos['filter']!='') {
                                $filter="where (code  ILIKE '%".$datos['filter']."%' OR description ILIKE '%".$datos['filter']."%')" ;
                            }
                    $sql="SELECT
                            ei.iditem,
                            ei.code,
                            ei.factorycode,
                            ei.description,
                            ei.classitem,
                            ei.image,
                            ei.stockmin,
                            ei.stockmax,
                            ei.stockideal,
                            (ei.cost - (ei.cost*(eilp.factorlist/100))) as cost,
                            ei.active,
                            ei.identerprise,
                            ei.datecreated,
                            ei.dateupdated,
                            ei.iduser,
                            ei.barcode,
                            ei.utilityfactor,
                            ei.currency
                            FROM erp_item ei
                            LEFT OUTER JOIN erp_item_list eil ON ei.iditem=eil.iditem
                            LEFT OUTER JOIN erp_item_list_price eilp ON eil.iditemlistprice=eilp.iditemlistprice 
                            where eilp.iditemlistprice=".$listaPrecios[0]->iditemlistprice."  $filter ORDER BY iditem asc limit $limit offset $start";
                    //echo $sql;
                    $cuentasPrimerNivel= erp_item::find_by_sql($sql);
                    //$total=count($cuentasPrimerNivel);
                   
                    $sql1="SELECT
                    ei.iditem,
                    ei.code,
                    ei.factorycode,
                    ei.description,
                    ei.classitem,
                    ei.image,
                    ei.stockmin,
                    ei.stockmax,
                    ei.stockideal,
                    (ei.cost - (ei.cost*(eilp.factorlist/100))) as cost,
                    ei.active,
                    ei.identerprise,
                    ei.datecreated,
                    ei.dateupdated,
                    ei.iduser,
                    ei.barcode,
                    ei.utilityfactor,
                    ei.currency
                    FROM erp_item ei
                    LEFT OUTER JOIN erp_item_list eil ON ei.iditem=eil.iditem
                    LEFT OUTER JOIN erp_item_list_price eilp ON eil.iditemlistprice=eilp.iditemlistprice 
                    where eilp.iditemlistprice=".$listaPrecios[0]->iditemlistprice." $filter ORDER BY iditem asc ";
                    //echo $sql;
                    $cuentasPrimerNivel1= erp_item::find_by_sql($sql1);
                    $total=count($cuentasPrimerNivel1);
                    $json='';
                    foreach ($cuentasPrimerNivel as $cuenta) {
                       $json.= $cuenta->to_json().',';
                    }
                    $json=substr($json, 0,  strlen($json)-1);
                    echo '{"total":"'.$total.'","results":['.$json.']}';
                    }
                break;
                case 'createlistaprecio':
                    $data=array();
                    //echo 'entro';
                    $data['namelist']=$datos['nombre'];
                    $data['active']='true';
                    $data['factorlist']=(float)$datos['porcentaje'];
                    $data['baselist']='false';
                    $data['identerprise']=$this->_identerprise;
                    //print_r($data);
                   $result=erp_item_list_price::create($data);
                            if ($result) {
                                echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!"}';
                                
                            }else{
                                echo '{"success":false,"title":"Error:","msg":"No se pudo guardar!!"}';
                            } 
                break;
                case 'asignarprecioitem':
                    $data1=array();
                    $iditemlistprice=$datos['iditemlistprice'];
                    $data=$datos['ids'];
                    $tam=strlen($data);
                    $rest = substr($data, 1, -1);
                    $array=explode(",", $rest);
                    foreach ($array as & $valor) {
                        $data1['iditem']=(int)$valor;
                        $data1['iditemlistprice']=(int)$iditemlistprice;
                        $data1['datecreated']=$this->getActualDate('N');
                        $data1['iduser']=$this->_iduser;
                        $result=erp_item_list::create($data1);
                    }
                            if ($result) {
                                echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!"}';
                                
                            }else{
                                echo '{"success":false,"title":"Error:","msg":"No se pudo guardar!!"}';
                            } 
                break;
                case 'EliminarAsignados':
                    
                    $iditem=(int)$datos['iditem'];
                    $iditemlistprice=(int)$datos['iditemlistprice'];
                    $id= erp_item_list::find_by_sql("SELECT * FROM erp_item_list where iditemlistprice=$iditemlistprice and iditem=$iditem ORDER BY iditemlistprice ASC");
                    $ideliminar=$id[0]->iditemlist;
                    
                   $post = erp_item_list::find($ideliminar);
                   
                           $result=$post->delete();
                            if ($result) {
                                echo '{"success":true,"title":"Correcto:","msg":"Se elimino correctamente!!"}';
                                
                            }else{
                                echo '{"success":false,"title":"Error:","msg":"No se pudo guardar!!"}';
                            }
                    
                break;
                case 'deletelistaprecio':
                    
                    $iditemlistprice=(int)$datos['iditemlistprice'];
                    $id= erp_item_list::find_by_sql("SELECT * FROM erp_item_list where iditemlistprice=$iditemlistprice");
                    
                    $total=count($id);
                    if($total>0){
                        echo '{"success":false,"title":"Advertencia:","msg":"Existen items asignados a este precio!!"}';
                    }else{
                           $post = erp_item_list_price::find($iditemlistprice);
                   
                           $result=$post->delete();
                            if ($result) {
                                echo '{"success":true,"title":"Correcto:","msg":"Se elimino correctamente!!"}';
                                
                            }else{
                                echo '{"success":false,"title":"Error:","msg":"No se pudo guardar!!"}';
                            }
                    }
                   
                    
                break;
                case 'updatelistaprecios':
                    
                    $dataJson1=json_decode($datos['litaprecio']);
                    $data=array();
                    if($dataJson1->active==true){
                        $bool='true';
                    }else{
                        $bool='false';
                    };
                    $data['namelist']=$dataJson1->namelist;
                    $data['active']=$bool;                    
                    $data['factorlist']=$dataJson1->factorlist;
                    $data['baselist']='false';                    
                    $options['iditemlistprice']=(int)$dataJson1->iditemlistprice;
                    
                    $result=erp_item_list_price::update_all(array('set'=>$data,'conditions'=>$options));
                    if ($result) {
                        echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!"}';

                    }else{
                        echo '{"success":false,"title":"Error:","msg":"No se pudo guardar!!"}';
                    }
                    
                break;
                

            }
        }
    }
    $iduser=isset($_SESSION['ERP']['iduser'])?$_SESSION['ERP']['iduser']:0;
    $identerprise=isset($_SESSION['ERP']['identerprise'])?$_SESSION['ERP']['identerprise']:0;
    $xaction=$_POST['xaction'];
    $tipo=new sis_erp_item_list_price($iduser,$identerprise);
    $tipo->$xaction($_POST);
?>
