<?php session_start(); ?>
<?php

/*
 * @Autor: Pablo Garcia Guaman
 * @Email: garciaguamanpablo@gmail.com
 */

require_once '../include.php';
    class sis_erp_features_position 
    {
        public $_iduser;
        public $_tablename;
        public $_identerprise;

        public function __construct($usuario,$enterprise) {
            $this->_iduser=$usuario;
            $this->_identerprise=$enterprise;
            $this->_tablename= erp_features_position::table_name();

        }
        
        public function getActualDate($mode){
            $sql="SELECT CURRENT_TIMESTAMP as fecha";
            $result=erpd_txn_store::find_by_sql($sql);
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
                    switch ($yaction) {
                        case 'readRol':
                        $filter='';
                        $filter2='';
                        $start=$datos['start'];
                        $limit=$datos['limit'];
                        $idcargo=$datos['idcargo'];
                        if (isset($datos['filter']) && $datos['filter']!='') {
                                    $filter=" AND (ei.code  ILIKE '%".$datos['filter']."%' OR ei.description ILIKE '%".$datos['filter']."%')" ;
                                    $filter2=" WHERE (ei.code  ILIKE '%".$datos['filter']."%' OR ei.description ILIKE '%".$datos['filter']."%')" ;
                                }
                        $sql="SELECT erol.* FROM erp_features_position erol WHERE erol.type=161
                               and erol.identerprise=$this->_identerprise and erol.idorganizationalchart=$idcargo $filter ORDER BY erol.idfeaturesposition asc limit $limit offset $start";
                        //echo $sql;
                        $cuentasPrimerNivel= erp_features_position::find_by_sql($sql);
                        //$total=count($cuentasPrimerNivel);
                       
                        $sql1="SELECT erol.* FROM $this->_tablename erol WHERE erol.type=161 and erol.idorganizationalchart=$idcargo $filter2 ORDER BY erol.idfeaturesposition asc ";
                        //echo $sql1;
                        $cuentasPrimerNivel1= erp_features_position::find_by_sql($sql1);
                        $total=count($cuentasPrimerNivel1);
                        $json='';
                        foreach ($cuentasPrimerNivel as $cuenta) {
                           $json.= $cuenta->to_json().',';
                        }
                        $json=substr($json, 0,  strlen($json)-1);
                        
                        echo '{"total":"'.$total.'","results":['.$json.']}';
                            break;
                        }
                break;
                case 'insert':
                    switch ($yaction) {
                        case 'insertcargo':
                        $idcargo=$datos['idcargo'];
                        //echo $idcargo;
                        //echo 'hola';
                            $dataJson=json_decode($datos['valores']);
                           // $destinationstore=erpdd_txn_store::find_first_by_idtxnstore($datos['idtxnstore']);
                                $data=array();
                                
                                $data['idorganizationalchart']=$idcargo;
                                $data['name']=$dataJson->name;
                                $data['description']=$dataJson->description;
                                $data['type']=161;
                                $data['identerprise']=$this->_identerprise;
                                //print_r($data);
                                try{ 
                                    $newdetalletxn=new erp_features_position($data);
                                    $newdetalletxn->save();
                                    
                                    if ($newdetalletxn) {
                                        echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!"}';

                                    }else{
                                        echo '{"success":false,"title":"Error:","msg":"No se pudo guardar!!"}';
                                    }
                                    
                                }  catch (Exception $e){
                                    throw $e;
                                }
                                    
                            
                        break;

                        case 'insertdetalleTransferencia':
                           $dataJson=json_decode($datos['valores']);
                           $idtxnstore=$datos['idtxnstore'];
                           $idstoreorg=$datos['idstoreorg'];
                           $idstoredest=$datos['idstoredest'];
                           $valoracion=$this->verTipoValoracion($dataJson->iditem);
                           
                           if($dataJson->iddtxnstore!=''){
                               
                               if($valoracion=='Ponderado'){
                                    $data=array();
                                    $precio=$this->calcularPrecio($dataJson->iditem, $dataJson->idunit, $idstoreorg);
                                    //$data['idtxnstore']=$idtxnstore;
                                    $data['iditem']=$dataJson->iditem;
                                    $data['idunit']=$dataJson->idunit;
                                    $data['quantity']=$dataJson->quantity;
                                    $data['cost']=$precio;
                                    $data['originstore']=$idstoreorg;
                                    $data['destinationstore']=$idstoredest;
                                    $data['transferquantity']=$dataJson->quantity;
                                    $data['discount']=$dataJson->discount;
                                    $options['iddtxnstore']=$dataJson->iddtxnstore;  
                                    try{ 
                                        
                                        $result=  erpdd_txn_store::update_all(array('set'=>$data,'conditions'=>$options));
                                        
                                        if ($result) {
                                            echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!"}';

                                        }else{
                                            echo '{"success":false,"title":"Error:","msg":"No se pudo guardar!!"}';
                                        }

                                    }  catch (Exception $e){
                                        throw $e;
                                    }
                             }
                            /*se valuara el costo por el metodo UEPS*/
                            if($valoracion=='Ueps'){
                                    $data=array();
                                    //$data['idtxnstore']=$idtxnstore;
                                    $data['iditem']=$dataJson->iditem;
                                    $data['idunit']=$dataJson->idunit;
                                    $data['quantity']=$dataJson->quantity;
                                    $data['cost']=0;
                                    $data['originstore']=$idstoreorg;
                                    $data['destinationstore']=$idstoredest;
                                    $data['transferquantity']=$dataJson->quantity;
                                    $data['discount']=$dataJson->discount;
                                    //print_r($data);
                                    $options['iddtxnstore']=$dataJson->iddtxnstore;
                                    try{ 
                                         $result=  erpdd_txn_store::update_all(array('set'=>$data,'conditions'=>$options));
                                        
                                        if ($result) {
                                            echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!"}';

                                        }else{
                                            echo '{"success":false,"title":"Error:","msg":"No se pudo guardar!!"}';
                                        }

                                    }  catch (Exception $e){
                                        throw $e;
                                    }
                            }
                            if($valoracion=='Peps'){
                                    $data=array();
                                    //$data['idtxnstore']=$idtxnstore;
                                    $data['iditem']=$dataJson->iditem;
                                    $data['idunit']=$dataJson->idunit;
                                    $data['quantity']=$dataJson->quantity;
                                    $data['cost']=0;
                                    $data['originstore']=$idstoreorg;
                                    $data['destinationstore']=$idstoredest;
                                    $data['transferquantity']=$dataJson->quantity;
                                    $data['discount']=$dataJson->discount;
                                    //print_r($data);
                                    $options['iddtxnstore']=$dataJson->iddtxnstore;
                                    try{ 
                                         $result=  erpdd_txn_store::update_all(array('set'=>$data,'conditions'=>$options));
                                        
                                        if ($result) {
                                            echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!"}';

                                        }else{
                                            echo '{"success":false,"title":"Error:","msg":"No se pudo guardar!!"}';
                                        }

                                    }  catch (Exception $e){
                                        throw $e;
                                    }
                            }
                            
                           }else{
                               
                            if($valoracion=='Ponderado'){
                                    $data=array();
                                    $precio=$this->calcularPrecio($dataJson->iditem, $dataJson->idunit, $idstoreorg);
                                    $data['idtxnstore']=$idtxnstore;
                                    $data['iditem']=$dataJson->iditem;
                                    $data['idunit']=$dataJson->idunit;
                                    $data['quantity']=$dataJson->quantity;
                                    $data['cost']=$precio;
                                    $data['originstore']=$idstoreorg;
                                    $data['destinationstore']=$idstoredest;
                                    $data['transferquantity']=$dataJson->quantity;
                                    $data['discount']=$dataJson->discount;
                                    try{ 
                                        $newdetalletxn=new erpdd_txn_store($data);
                                        $newdetalletxn->save();

                                        if ($newdetalletxn) {
                                            echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!"}';

                                        }else{
                                            echo '{"success":false,"title":"Error:","msg":"No se pudo guardar!!"}';
                                        }

                                    }  catch (Exception $e){
                                        throw $e;
                                    }
                             }
                            /*se valuara el costo por el metodo UEPS*/
                            if($valoracion=='Ueps'){
                                    $data=array();
                                    $data['idtxnstore']=$idtxnstore;
                                    $data['iditem']=$dataJson->iditem;
                                    $data['idunit']=$dataJson->idunit;
                                    $data['quantity']=$dataJson->quantity;
                                    $data['cost']=0;
                                    $data['originstore']=$idstoreorg;
                                    $data['destinationstore']=$idstoredest;
                                    $data['transferquantity']=$dataJson->quantity;
                                    $data['discount']=$dataJson->discount;
                                    //print_r($data);
                                    try{ 
                                        $newdetalletxn=new erpdd_txn_store($data);
                                        $newdetalletxn->save();

                                        if ($newdetalletxn) {
                                            echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!"}';

                                        }else{
                                            echo '{"success":false,"title":"Error:","msg":"No se pudo guardar!!"}';
                                        }

                                    }  catch (Exception $e){
                                        throw $e;
                                    }
                            }
                            if($valoracion=='Peps'){
                                    $data=array();
                                    $data['idtxnstore']=$idtxnstore;
                                    $data['iditem']=$dataJson->iditem;
                                    $data['idunit']=$dataJson->idunit;
                                    $data['quantity']=$dataJson->quantity;
                                    $data['cost']=0;
                                    $data['originstore']=$idstoreorg;
                                    $data['destinationstore']=$idstoredest;
                                    $data['transferquantity']=$dataJson->quantity;
                                    $data['discount']=$dataJson->discount;
                                    //print_r($data);
                                    try{ 
                                        $newdetalletxn=new erpdd_txn_store($data);
                                        $newdetalletxn->save();

                                        if ($newdetalletxn) {
                                            echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!"}';

                                        }else{
                                            echo '{"success":false,"title":"Error:","msg":"No se pudo guardar!!"}';
                                        }

                                    }  catch (Exception $e){
                                        throw $e;
                                    }
                            }
                        }   
                                    
                            
                        break;

                      
                    }
                    
                break;
                
                case 'delete':
                    try {
                        $post = erpdd_txn_store::find($datos['iddtxnstore']);
                        $post->delete();
                        echo '{"success":true,"title":"Correcto:","msg":"Se elimino correctamente!!"}';
                    } catch (Exception $exc) {
                        echo '{"success":false,"title":"Error:","msg":"No se pudo eliminar!!"}';
                    }

                    
                break;
                
                
 
            }
        }
    }

    $xaction=$_POST['xaction'];
    $iduser=isset($_SESSION['ERP']['iduser'])?$_SESSION['ERP']['iduser']:0;
    $identerprise=isset($_SESSION['ERP']['identerprise'])?$_SESSION['ERP']['identerprise']:0;

    $item=new sis_erp_features_position($iduser,$identerprise);
    $item->$xaction($_POST);
?>
