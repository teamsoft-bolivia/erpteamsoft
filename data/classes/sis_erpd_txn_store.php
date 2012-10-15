<?php session_start(); ?>
<?php

/*
 * @Autor: Pablo Garcia Guaman
 * @Email: garciaguamanpablo@gmail.com
 */

require_once '../include.php';
    class sis_erpd_txn_store 
    {
        public $_iduser;
        public $_tablename;
        public $_identerprise;

        public function __construct($usuario,$enterprise) {
            $this->_iduser=$usuario;
            $this->_identerprise=$enterprise;
            $this->_tablename= erpd_txn_store::table_name();

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
        public function AnularTransferencia($idtxnstore,$estado){
            /*obtiene el detalle de la transaccion*/
            $sql="SELECT * from erpdd_txn_store dd WHERE dd.idtxnstore=$idtxnstore";
            $detalle=erpdd_txn_store::find_by_sql($sql);
            //print_r($detalle);
            foreach ($detalle as $del){
                $valoracion=$this->verTipoValoracion($del->iditem);
                $iddtxnstore=$del->iddtxnstore;
                if($valoracion=='Ponderado'){
                     
                         
                }
                if($valoracion=='Peps'){
                    $idorigin_iddtxnstore=$del->idorigin_iddtxnstore;
                    
                    $idDetalle=$del->iddtxnstore;
                    $Cantidad=$del->quantity;
                    $origensalida="SELECT (CASE WHEN dd.saldo>0 THEN dd.saldo ELSE 0 END) as saldo
                                    from erpdd_txn_store dd                                     
                                    WHERE dd.iddtxnstore=$idorigin_iddtxnstore
                                    ";
                        $origenresult=erpdd_txn_store::find_by_sql($origensalida);
                        $valorAnterior=$origenresult[0]->saldo;
                    $cantidadAmodificar=$valorAnterior + $Cantidad;
                    
                    $dataform1['saldo']=$cantidadAmodificar;
                    $options1['iddtxnstore']=$idorigin_iddtxnstore;                       

                    $result1=  erpdd_txn_store::update_all(array('set'=>$dataform1,'conditions'=>$options1));
                    
                    
                    
                }
                if($valoracion=='Ueps'){
                        $idorigin_iddtxnstore=$del->idorigin_iddtxnstore;
                    
                    $idDetalle=$del->iddtxnstore;
                    $Cantidad=$del->quantity;
                    $origensalida="SELECT (CASE WHEN dd.saldo>0 THEN dd.saldo ELSE 0 END) as saldo
                                    from erpdd_txn_store dd                                     
                                    WHERE dd.iddtxnstore=$idorigin_iddtxnstore
                                    ";
                        $origenresult=erpdd_txn_store::find_by_sql($origensalida);
                        $valorAnterior=$origenresult[0]->saldo;
                    $cantidadAmodificar=$valorAnterior + $Cantidad;
                    
                    $dataform1['saldo']=$cantidadAmodificar;
                    $options1['iddtxnstore']=$idorigin_iddtxnstore;                       

                    $result1=  erpdd_txn_store::update_all(array('set'=>$dataform1,'conditions'=>$options1));
                }
            }
            
                $idcabecera=$idtxnstore;                           
                $dataform['state']=$estado;
                $options['idtxnstore']=$idcabecera;                       

                $result=  erpd_txn_store::update_all(array('set'=>$dataform,'conditions'=>$options));
                if ($result) {
                echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!"}';

                }else{
                    echo '{"success":false,"title":"Error:","msg":"No se pudo guardar!!"}';
                }
        }
         public function verTipoValoracion($iditem){
            $sql="SELECT * FROM erp_type t where t.idtype=(SELECT i.valuation FROM erp_item i WHERE i.iditem=$iditem)";
            $item= erp_type::find_by_sql($sql);
            $valoracionName=$item[0]->type;
            return $valoracionName;
            
        }
        public function dateFormat($date,$char='/'){
            $chars=explode($char,$date);
            $newdate=$chars[2].$char.$chars[1].$char.$chars[0];
            return $newdate;
        }
        
        public function getPrimaryCurrency(){
             $currency=  erp_type::first(array('select'=>'*','from'=>'erp_type','conditions'=>array('value=? AND option=? AND identerprise=?',11,'tipo_moneda',  $this->_identerprise)));
             return $currency->idtype;       
                   
        }
        
        public function __call($option,$att) {
            $datos=$att[0];
            $yaction=$datos['yaction'];
            //echo $datos['xaction'];
            switch ($option)
            {
                case 'read':
                    switch ($yaction)
                    {
                        case 'readlist':
                            $select="(SELECT COUNT(*) total
                                      FROM $this->_tablename 
                                      INNER JOIN erp_type txntype ON (txntype.idtype=erpd_txn_store.txntype) 
                                      INNER JOIN erp_type concepto ON (concepto.idtype=erpd_txn_store.concept)
                                      WHERE txntype.alias='ingreso_almacen' AND concepto.alias='compra_almacen' ) as total,
                                     erpd_txn_store.*,txntype.type as nombretxntype,concepto.type as nombreconcept,
                                     estado.type as nombrestate,
                                     responsible.person_last_name|| ' ' || person_first_name as nombreresponsible,
                                     txndetail.destinationstore,deststore.storename as destinationstorename ";
                            $conditions=array("txntype.alias=? AND concepto.alias=?",'ingreso_almacen','compra_almacen');
                            
                            $join="INNER JOIN erp_type txntype ON (txntype.idtype=erpd_txn_store.txntype) ";
                            $join.="INNER JOIN erp_type concepto ON (concepto.idtype=erpd_txn_store.concept) ";
                            $join.="INNER JOIN erp_type estado ON (estado.idtype=erpd_txn_store.state) ";
                            $join.="INNER JOIN person responsible ON (responsible.id_person=erpd_txn_store.responsible) ";
                            $join.="LEFT OUTER JOIN (SELECT DISTINCT tds.idtxnstore,tds.destinationstore FROM erpdd_txn_store tds) txndetail ON txndetail.idtxnstore=erpd_txn_store.idtxnstore AND txndetail.idtxnstore=erpd_txn_store.idtxnstore ";
                            $join.="LEFT OUTER JOIN erp_store deststore ON (deststore.idstore=txndetail.destinationstore) ";
                            $order="erpd_txn_store.correlative DESC";
                            try {
                                $txns=  erpd_txn_store::find('all',array('select'=>$select,'joins'=>$join,
                                        'conditions'=>$conditions,'order'=>$order));
                            } catch (Exception $exc) {
                                print_r($exc);
                            }

                                                    $json='';
                            foreach ($txns as $cuenta) {
                                
                                $json.= $cuenta->to_json().',';
                            }
                            $json=substr($json, 0,  strlen($json)-1);
                           ($json=='')?$total=0:$total=$txns[0]->total;
                             
                            echo '{"total":"'.$total.'","results":['.$json.']}';
                            
                        break;
                        
                        case 'readlistentradas':
                            $start=$datos['start'];
                            $limit=$datos['limit'];
                            $s="COUNT(*) AS total";
                            $j="INNER JOIN erp_type txntype ON (txntype.idtype=erpd_txn_store.txntype) ";
                            $j.="INNER JOIN erp_type concepto ON (concepto.idtype=erpd_txn_store.concept) ";
                            $c=array("txntype.alias=? AND concepto.alias not in (?)",'ingreso_almacen',array('compra_almacen','transferencia_almacen_i'));
                           
                            
                                                       
                            $select="erpd_txn_store.*,txntype.type as nombretxntype,concepto.type as nombreconcept,
                                     estado.type as nombrestate,
                                     responsible.person_last_name|| ' ' || person_first_name as nombreresponsible,
                                     txndetail.originstore,orgstore.storename as originstorename,txndetail.destinationstore,deststore.storename as destinationstorename ";
                            $conditions=array("txntype.alias=? AND concepto.alias not in (?)",'ingreso_almacen',array('compra_almacen','transferencia_almacen_i'));
                            
                            $join="INNER JOIN erp_type txntype ON (txntype.idtype=erpd_txn_store.txntype) ";
                            $join.="INNER JOIN erp_type concepto ON (concepto.idtype=erpd_txn_store.concept) ";
                            $join.="INNER JOIN erp_type estado ON (estado.idtype=erpd_txn_store.state) ";
                            $join.="INNER JOIN person responsible ON (responsible.id_person=erpd_txn_store.responsible) ";
                            $join.="LEFT OUTER JOIN (SELECT tds.idtxnstore,tds.originstore,tds.destinationstore FROM erpdd_txn_store tds  GROUP BY tds.idtxnstore,tds.originstore,tds.destinationstore ) txndetail ON txndetail.idtxnstore=erpd_txn_store.idtxnstore AND txndetail.idtxnstore=erpd_txn_store.idtxnstore ";
                            $join.="LEFT OUTER JOIN erp_store orgstore ON (orgstore.idstore=txndetail.originstore) ";
                            $join.="LEFT OUTER JOIN erp_store deststore ON (deststore.idstore=txndetail.destinationstore) ";
                            
                            
                            try {
                                $total=erpd_txn_store::find(array('select'=>$s,'joins'=>$j,'conditions'=>$c));
                                $txns=  erpd_txn_store::find('all',array('select'=>$select,'joins'=>$join,'conditions'=>$conditions,'limit'=>$limit, 'offset'=>$start,'order'=>'erpd_txn_store.correlative desc'));
                            } catch (Exception $exc) {
                                print_r($exc);
                            }

                            $json='';
                            foreach ($txns as $cuenta) {
                                
                                $json.= $cuenta->to_json().',';
                            }
                            $json=substr($json, 0,  strlen($json)-1);
                            
                            echo '{"total":"'.$total->total.'","results":['.$json.']}';
                            
                        break;
                        
                        case 'readlistsalidas':
                            
                            $s="COUNT(*) AS total";
                            $j="INNER JOIN erp_type txntype ON (txntype.idtype=erpd_txn_store.txntype) ";
                            $j.="INNER JOIN erp_type concepto ON (concepto.idtype=erpd_txn_store.concept) ";
                            $c=array("txntype.alias=?",'salida_almacen');
                           
                            
                                                       
                            $select="erpd_txn_store.*,txntype.type as nombretxntype,concepto.type as nombreconcept,
                                     estado.type as nombrestate,
                                     responsible.person_last_name|| ' ' || person_first_name as nombreresponsible,
                                     txndetail.originstore,orgstore.storename as originstorename,txndetail.destinationstore,deststore.storename as destinationstorename ";
                            $conditions=array("txntype.alias=? AND concepto.alias<>?",'salida_almacen','transferencia_almacen_s');
                            
                            $join="INNER JOIN erp_type txntype ON (txntype.idtype=erpd_txn_store.txntype) ";
                            $join.="INNER JOIN erp_type concepto ON (concepto.idtype=erpd_txn_store.concept) ";
                            $join.="INNER JOIN erp_type estado ON (estado.idtype=erpd_txn_store.state) ";
                            $join.="INNER JOIN person responsible ON (responsible.id_person=erpd_txn_store.responsible) ";
                            $join.="LEFT OUTER JOIN (SELECT tds.idtxnstore,tds.originstore,tds.destinationstore FROM erpdd_txn_store tds  GROUP BY tds.idtxnstore,tds.originstore,tds.destinationstore) txndetail ON txndetail.idtxnstore=erpd_txn_store.idtxnstore AND txndetail.idtxnstore=erpd_txn_store.idtxnstore ";
                            $join.="LEFT OUTER JOIN erp_store orgstore ON (orgstore.idstore=txndetail.originstore) ";
                            $join.="LEFT OUTER JOIN erp_store deststore ON (deststore.idstore=txndetail.destinationstore) ";
                            
                            try {
                                $total=erpd_txn_store::first(array('select'=>$s,'joins'=>$j,'conditions'=>$c));
                                $txns=  erpd_txn_store::find('all',array('select'=>$select,'joins'=>$join,'conditions'=>$conditions));
                            } catch (Exception $exc) {
                                print_r($exc);
                            }

                            $json='';
                            foreach ($txns as $cuenta) {
                                
                                $json.= $cuenta->to_json().',';
                            }
                            $json=substr($json, 0,  strlen($json)-1);
                            
                            echo '{"total":"'.$total->total.'","results":['.$json.']}';
                            
                        break;
                        case 'readlisttransferencias':
                            
                            $s="COUNT(*) AS total";
                            $j="INNER JOIN erp_type txntype ON (txntype.idtype=erpd_txn_store.txntype) ";
                            $j.="INNER JOIN erp_type concepto ON (concepto.idtype=erpd_txn_store.concept) ";
                            $c=array("txntype.alias=? AND concepto.alias=?",'salida_almacen','transferencia_almacen_s');
                           
                            
                                                       
                            $select="erpd_txn_store.*,txntype.type as nombretxntype,concepto.type as nombreconcept,
                                     estado.type as nombrestate,
                                     responsible.person_last_name|| ' ' || person_first_name as nombreresponsible,
                                     txndetail.originstore, orgstore.storename as originstorename, txndetail.destinationstore, deststore.storename as destinationstorename";
                            $conditions=array("txntype.alias=? AND concepto.alias=? and erpd_txn_store.identerprise=? order by erpd_txn_store.correlative desc",'salida_almacen','transferencia_almacen_s',$this->_identerprise);
                            
                            $join="INNER JOIN erp_type txntype ON (txntype.idtype=erpd_txn_store.txntype) ";
                            $join.="INNER JOIN erp_type concepto ON (concepto.idtype=erpd_txn_store.concept) ";
                            $join.="INNER JOIN erp_type estado ON (estado.idtype=erpd_txn_store.state) ";
                            $join.="INNER JOIN person responsible ON (responsible.id_person=erpd_txn_store.responsible) ";
                            $join.="LEFT OUTER JOIN (SELECT tds.idtxnstore,tds.originstore,tds.destinationstore FROM erpdd_txn_store tds  GROUP BY tds.idtxnstore,tds.originstore,tds.destinationstore) txndetail ON txndetail.idtxnstore=erpd_txn_store.idtxnstore AND txndetail.idtxnstore=erpd_txn_store.idtxnstore ";
                            $join.="LEFT OUTER JOIN erp_store orgstore ON (orgstore.idstore=txndetail.originstore) ";
                            $join.="LEFT OUTER JOIN erp_store deststore ON (deststore.idstore=txndetail.destinationstore) ";
                            
                            try {
                                $total=erpd_txn_store::first(array('select'=>$s,'joins'=>$j,'conditions'=>$c));
                                $txns=  erpd_txn_store::find('all',array('select'=>$select,'joins'=>$join,'conditions'=>$conditions));
                            } catch (Exception $exc) {
                                print_r($exc);
                            }

                            $json='';
                            foreach ($txns as $cuenta) {
                                
                                $json.= $cuenta->to_json().',';
                            }
                            $json=substr($json, 0,  strlen($json)-1);
                            
                            echo '{"total":"'.$total->total.'","results":['.$json.']}';
                            
                        break;
                        
                        case 'readlistrecepciontransferencias':
                            
                            $s="COUNT(*) AS total";
                            $j="INNER JOIN erp_type txntype ON (txntype.idtype=erpd_txn_store.txntype) ";
                            $j.="INNER JOIN erp_type concepto ON (concepto.idtype=erpd_txn_store.concept) ";
                            $c=array("txntype.alias=? AND concepto.alias=?",'salida_almacen','transferencia_almacen_s');
                           // $c=array("txntype.alias=? AND concepto.alias=? AND erpd_txn_store.state=? ",'salida_almacen','transferencia_almacen_s',86);
                           
                            
                                                       
                            $select="erpd_txn_store.*,txntype.type as nombretxntype,concepto.type as nombreconcept,
                                     estado.type as nombrestate,
                                     responsible.person_last_name|| ' ' || person_first_name as nombreresponsible,
                                     txndetail.originstore as destinationstore,orgstore.storename as destinationstorename";
                            $conditions=array("txntype.alias=? AND concepto.alias=? order by erpd_txn_store.correlative desc",'salida_almacen','transferencia_almacen_s');
                           // $conditions=array("txntype.alias=? AND concepto.alias=? AND erpd_txn_store.state=86 order by erpd_txn_store.correlative desc",'salida_almacen','transferencia_almacen_s');
                            
                            $join="INNER JOIN erp_type txntype ON (txntype.idtype=erpd_txn_store.txntype) ";
                            $join.="INNER JOIN erp_type concepto ON (concepto.idtype=erpd_txn_store.concept) ";
                            $join.="INNER JOIN erp_type estado ON (estado.idtype=erpd_txn_store.state) ";
                            $join.="INNER JOIN person responsible ON (responsible.id_person=erpd_txn_store.responsible) ";
                            $join.="LEFT OUTER JOIN (SELECT tds.idtxnstore,tds.originstore FROM erpdd_txn_store tds  GROUP BY tds.idtxnstore,tds.originstore) txndetail ON txndetail.idtxnstore=erpd_txn_store.idtxnstore AND txndetail.idtxnstore=erpd_txn_store.idtxnstore ";
                            $join.="LEFT OUTER JOIN erp_store orgstore ON (orgstore.idstore=txndetail.originstore) ";
                            //$join.="LEFT OUTER JOIN erp_store deststore ON (deststore.idstore=txndetail.destinationstore) ";
                            
                            try {
                                $total=erpd_txn_store::first(array('select'=>$s,'joins'=>$j,'conditions'=>$c));
                                $txns=  erpd_txn_store::find('all',array('select'=>$select,'joins'=>$join,'conditions'=>$conditions));
                            } catch (Exception $exc) {
                                print_r($exc);
                            }

                            $json='';
                            foreach ($txns as $cuenta) {
                                
                                $json.= $cuenta->to_json().',';
                            }
                            $json=substr($json, 0,  strlen($json)-1);
                            
                            echo '{"total":"'.$total->total.'","results":['.$json.']}';
                            
                        break;
                    }
                break;
                case 'save':
                    switch ($yaction) {
                        case 'insert':
                            $documents=  json_decode($datos['documents']);
                            $details=  json_decode($datos['detail']);
                            $docs=array();
                            $dets=array();
                            
                            $datos['date']=  $this->dateFormat($datos['date']);
                            $dataform=array();
                            $dataform['identerprise']=  $this->_identerprise;
                            $dataform['iduser']=  $this->_iduser;
                            foreach ($datos as $key => $value) {
                                if ($key!='xaction' && $key!='yaction' && $key!='idtxnstore' && $key!='destinationstore' && $key!='detail' && $key!='documents' && $key!='norecep' && $key!='recep') {
                                      $dataform[$key]=$value; 
                                }
                            }
                            try {
                                $newtxn=new erpd_txn_store($dataform);
                                $newtxn->save();
                                $txn= erpd_txn_store::find($newtxn->idtxnstore);
                                
                                foreach ($documents as $document) {
                                    
                                    foreach ($document as $key => $value) {
                                        if ($key!='providername' && $key!='contactname' && $key!='typedocname' && $key!='methodpayname' && $key!='conditionpayname' && $key!='iddocument' && $key!='conditiontype' && $key!='conditionquantity' && $key!='conditioninterest' && $key!='interestlate' && $key!='lapsebeforeinterest' && $key!='datefirstpayment' && $key!='norecep' && $key!='recep') 
                                        {
                                            $docs[$key]=$value;    
                                        }
                                    }
                                    $docs['idtxnstore']=$txn->idtxnstore;
                                    $docs['image']='no.png';
                                    $newdoc=new erpd_txn_document($docs);
                                    $newdoc->save();
                                    foreach ($details as $detail) {

                                        if ($document->iddocument==$detail->iddocument) {
                                           foreach ($detail as $k => $v) {
                                               if ($k!='iddtxnstore' && $k!='idtxnstore' && $k!='iddocument' && $k!='code' && $k!='description' && $k!='unitname' && $k!='originname' && $k!='destinationname' && $k!='state' && $k!='norecep' && $k!='recep' && $k!='currency' && $k!='simbolo') 
                                               {
                                                   $dets[$k]=$v;
                                               }
                                           }
                                           $dets['destinationstore']=$datos['destinationstore'];
                                           $dets['iddocument']=$newdoc->iddocument;
                                           $dets['idtxnstore']=$newdoc->idtxnstore;
                                           $dets['saldo']=$dets['quantity'];
                                           $dets['currency']=$this->getPrimaryCurrency();
                                           $newdetail=new erpdd_txn_store($dets);
                                           $newdetail->save();
                                        }
                                        
                                    }
                                }
                                 echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!","idtxnstore":'.$txn->idtxnstore.',"correlative":'.$txn->correlative.'}';
                            } catch (Exception $exc) {
                                print_r($exc);
                            }

                        break;
                        
                        case 'insertCabeceraTransferencia':
                            
                            //$documents=  json_decode($datos['documents']);
                            //$details=  json_decode($datos['detail']);
                            $docs=array();
                            $dets=array();
                            
                            $datos['date']=  $this->dateFormat($datos['date']);
                            $dataform=array();
                            $dataform['identerprise']=  $this->_identerprise;
                            $dataform['iduser']=  $this->_iduser;
                            $dataform['txntype']=36;
                            $dataform['concept']=41;
                            foreach ($datos as $key => $value) {
                                if ($key!='xaction' && $key!='yaction' && $key!='idtxnstore' && $key!='destinationstore' && $key!='detail' && $key!='documents' && $key!='originstore') {
                                      $dataform[$key]=$value; 
                                }
                            }
                            try {
                        
                                $newtxn=new erpd_txn_store($dataform);
                                $newtxn->save();
                                $txn= erpd_txn_store::find($newtxn->idtxnstore);
                                
                                 echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!","iditem":'.$txn->idtxnstore.',"correlative":'.$txn->correlative.'}';
                            } catch (Exception $exc) {
                                print_r($exc);
                            }

                        break;  
                            
                        case 'updateCabeceraTransferencia':
                            
                                
                                $datos['date']=  $this->dateFormat($datos['date']);
                                
                                foreach ($datos as $key => $value) {
                                    if ($key!='xaction' && $key!='yaction' && $key!='idtxnstore' && $key!='destinationstore' && $key!='detail' && $key!='documents' && $key!='originstore') {
                                          $dataform[$key]=$value; 
                                    }
                                }
                                try {

                               //$dataform['cost']=$precio;
                               $options['idtxnstore']=$datos['idtxnstore'];
                               $result=  erpd_txn_store::update_all(array('set'=>$dataform,'conditions'=>$options));

                                     echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!","iditem":'.$datos['idtxnstore'].',"correlative":'.$datos['correlative'].'}';
                                } catch (Exception $exc) {
                                    print_r($exc);
                                }
                        break;
                        
                        case 'insertCabeceraSalidas':
                            
                            //$documents=  json_decode($datos['documents']);
                            //$details=  json_decode($datos['detail']);
                            $docs=array();
                            $dets=array();
                            
                            $datos['date']=  $this->dateFormat($datos['date']);
                            $dataform=array();
                            $dataform['identerprise']=  $this->_identerprise;
                            $dataform['iduser']=  $this->_iduser;
                            $dataform['txntype']=36;
                            //$dataform['concept']=41;
                            foreach ($datos as $key => $value) {
                                if ($key!='xaction' && $key!='yaction' && $key!='idtxnstore' && $key!='detail' && $key!='documents' && $key!='originstore') {
                                      $dataform[$key]=$value; 
                                }
                            }
                            try {
                        
                                $newtxn=new erpd_txn_store($dataform);
                                $newtxn->save();
                                $txn= erpd_txn_store::find($newtxn->idtxnstore);
                                
                                 echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!","iditem":'.$txn->idtxnstore.',"correlative":'.$txn->correlative.'}';
                            } catch (Exception $exc) {
                                print_r($exc);
                            }

                        break;  
                            
                        case 'updateCabeceraSalidas':
                            
                                
                                $datos['date']=  $this->dateFormat($datos['date']);
                                
                                foreach ($datos as $key => $value) {
                                    if ($key!='xaction' && $key!='yaction' && $key!='idtxnstore' && $key!='detail' && $key!='documents' && $key!='originstore') {
                                          $dataform[$key]=$value; 
                                    }
                                }
                                try {

                               //$dataform['cost']=$precio;
                               $options['idtxnstore']=$datos['idtxnstore'];
                               $result=  erpd_txn_store::update_all(array('set'=>$dataform,'conditions'=>$options));

                                     echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!","iditem":'.$datos['idtxnstore'].',"correlative":'.$datos['correlative'].'}';
                                } catch (Exception $exc) {
                                    print_r($exc);
                                }
                        break;
                           
                        case 'update':
                            $datosform=array();
                            
                            foreach ($datos as $key => $value) {
                                if ($key!='xaction' && $key!='yaction' && $key!='idtxnstore' && $key!='destinationstore') {
                                      $datosform[$key]=$value; 
                                }
                            }
                            
                            try {
                                $txnstore=  erpd_txn_store::find($datos['idtxnstore']);
                                erpd_txn_store::update_all(array('set'=>$datosform,'conditions'=>array('idtxnstore'=>$datos['idtxnstore'])));
                                
                                $set=array();
                                $condit=array();
                                $set['destinationstore']=$datos['destinationstore'];
                                $condit['idtxnstore']=$datos['idtxnstore'];
                                erpdd_txn_store::update_all(array('set'=>$set,'conditions'=>$condit));
                                
                            echo '{"success":true,"title":"Correcto:","msg":"Se guardaron los cambios correctamente!!","idtxnstore":'.$txnstore->idtxnstore.',"correlative":'.$txnstore->correlative.'}';
                            } catch (Exception $exc) {
                                print_r($exc);
                            }

                            
                        break;
                    }
                break;
                case 'insert':
                    switch ($yaction) {
                        case 'entradamercaderia':
                           try{
                                $txntype=erp_type::find_by_option_and_alias('txn_almacenes','ingreso_almacen');
                                $dataform=array();
                                $destinationstore=$datos['destinationstore'];
                                
                                $dataform['identerprise']=$this->_identerprise;
                                $dataform['iduser']=  $this->_iduser;
                                $dataform['date']=$this->dateFormat($datos['date']);
                                $dataform['txntype']=$txntype->idtype;
                                $currency=$this->getPrimaryCurrency();
                               
                                
                                //Formulario
                                foreach ($datos as $key => $value) {
                                    if ($key!='xaction' && $key!='yaction' && $key!='idtxnstore' && $key!='insertdetalle' && $key!='updatedetalle' && $key!='date'&& $key!='correlative' && $key!='destinationstore' && $key!='norecep') {
                                        $dataform[$key]=$value; 

                                    }
                                }
                                //print_r($dataform);
                               try{
                                    $newtxn=new erpd_txn_store($dataform);
                                    $newtxn->save();
                                    
                                    if($newtxn){
                                            
                                            $txn= erpd_txn_store::find($newtxn->idtxnstore);
                                            $idtxnstore=$newtxn->idtxnstore;
                                            $correlative=$newtxn->correlative;
                                            //Grid Detalle
                                            foreach ($datos as $key => $value) {
                                                if($key=='insertdetalle'){
                                                    $insertdatagridJSON=json_decode($value);
                                                }
                                            }
                                            
                                            
                                            for ($i=0;$i<count($insertdatagridJSON);$i++){
                                                $datagrid=array();
                                                $datagrid['idtxnstore']=$idtxnstore;
                                                $datagrid['destinationstore']=$destinationstore;

                                                foreach ($insertdatagridJSON[$i] as $key => $value) {
                                                if($key!='iddtxnstore' && $key!='idtxnstore' && $key!='originstore' && $key!='iddocument' && $key!='code' && $key!='description'&& $key!='destinationstore' && $key!='unitname' && $key!='originname' && $key!='destinationname' && $key!='state' && $key!='recep' && $key!='norecep' && $key!='simbolo')
                                                    $datagrid[$key]=$value;
                                                }
                                                $datagrid['currency']=$currency;
                                                $datagrid['saldo']=$datagrid['quantity'];
                                                //print_r($datagrid);
                                                try {
                                                    $newdetalletxn=new erpdd_txn_store($datagrid);
                                                    $newdetalletxn->save();

                                                }  catch (Exception $e){
                                                    throw $e;
                                                }

                                            }
                                            if($newdetalletxn){
                                               echo '{"success":true,"title":"Correcto:","msg":"La entrada se guardo correctamente","id":'.$txn->idtxnstore.',"correlative":'.$txn->correlative.'}'; 
                                            }else{
                                               echo '{"success":false,"title":"Error:","msg":"Ocurrio un error mientras se guardaban los registros"}'; 
                                            }
                                            
                                        
                                    }else{
                                       echo '{"success":false,"title":"Error:","msg":"Ocurrio un error mientras se guardaba la cabecera"}'; 
                                       
                                    }
                                }catch (Exception $ex) {
                                    throw ($ex);
                                }
                                
                           }catch(Exception $e){
                                throw ($e);
                           }
                             
                    }
                    
                break;
                case 'update':
                    switch ($yaction){
                    case 'entradamercaderia':
                        $options=Array();
                        $dataform=array();
                        $destinationstore=$datos['destinationstore'];
                        $idtxnstore=$datos['idtxnstore'];
                        $dataform['date']=$this->dateFormat($datos['date']);
                        $currency=$this->getPrimaryCurrency();
                      
                        
                        foreach ($datos as $key => $value) {
                                if ($key!='xaction' && $key!='yaction' && $key!='idtxnstore' && $key!='insertdetalle' && $key!='updatedetalle' && $key!='date'&& $key!='correlative' && $key!='destinationstore' && $key!='recep' && $key!='norecep' && $key!='simbolo') {
                                    $dataform[$key]=$value; 

                                }
                        }
                        $options['idtxnstore']=$idtxnstore;
                        try{
                            $result=  erpd_txn_store::update_all(array('set'=>$dataform,'conditions'=>$options));
                            
                            if ($result) {
                                 $count=count(erpdd_txn_store::find_all_by_idtxnstore($idtxnstore));
                                 if($count>0){
                                    $datadestinationstore= array();
                                    $datadestinationstore['destinationstore']=$destinationstore;
                                    
                                    try{
                                       
                                        $res= erpdd_txn_store::update_all(array('set'=>$datadestinationstore,'conditions'=>$options));

                                        if(!$res)
                                            //echo '{"success":true,"title":"Correcto:","msg":"Se actualizo correctamente!!"}';
                                        //else
                                            echo '{"success":false,"title":"Error:","msg":"No se pudo guardar!!"}';


                                    }catch (Exception $e){
                                        throw ($e);
                                    }        
                                 }
                                 foreach ($datos as $key => $value) {
                                        if($key=='insertdetalle'){
                                            $insertdatagridJSON=json_decode($value);
                                        }
                                        if($key=='updatedetalle'){
                                            $updatedatagridJSON=json_decode($value);
                                        }
                                }

                                //Insert nuevo detalle
                                for ($i=0;$i<count($insertdatagridJSON);$i++){
                                    $datagrid=array();
                                    $datagrid['idtxnstore']=$idtxnstore;
                                    $datagrid['destinationstore']=$destinationstore;
                                    

                                    foreach ($insertdatagridJSON[$i] as $key => $value) {
                                       
                                    if($key!='iddtxnstore' && $key!='idtxnstore' && $key!='originstore' && $key!='iddocument' && $key!='code' && $key!='description'&& $key!='destinationstore' && $key!='unitname' && $key!='originname' && $key!='destinationname' && $key!='state' && $key!='recep' && $key!='norecep' && $key!='simbolo')
                                        $datagrid[$key]=$value;
                                    }
                                    $datagrid['saldo']=$datagrid['quantity'];
                                    $datagrid['currency']=$currency;

                                    try {
                                        $newdetalletxn=new erpdd_txn_store($datagrid);
                                        $newdetalletxn->save();

                                    }  catch (Exception $e){
                                        throw $e;
                                    }

                                }
                                //update Detalle
                                $options=Array(); 
                                for ($i=0;$i<count($updatedatagridJSON);$i++){
                                    $datagrid=array();
                                    
                                    $datagrid['destinationstore']=$destinationstore;

                                    foreach ($updatedatagridJSON[$i] as $key => $value) {
                                       // echo $key.':'.$value.' || ';
                                        if($key!='iddtxnstore' && $key!='idtxnstore' && $key!='originstore' && $key!='iddocument' && $key!='code' && $key!='description'&& $key!='destinationstore' && $key!='unitname' && $key!='originname' && $key!='destinationname' && $key!='state'&& $key!='recep' && $key!='norecep' && $key!='simbolo')
                                            $datagrid[$key]=$value;
                                        if($key=='iddtxnstore'){
                                            $options['iddtxnstore']=$value;
                                        }
                                    
                                    }
                                    //print_r($datagrid);
                                  
                                    try {
                                        
                                        $result=  erpdd_txn_store::update_all(array('set'=>$datagrid,'conditions'=>$options));
                                        

                                    }  catch (Exception $e){
                                        throw $e;
                                    }

                                }
                                
                                echo '{"success":true,"title":"Correcto:","msg":"Se actualizo correctamente!!"}';
                                
                                
                            }else{
                                echo '{"success":false,"title":"Error:","msg":"No se pudo guardar!!"}';
                            }
                        }catch (Exception $e){
                            throw ($e);
                        }
                    break;
                    
                    case 'aprobarentrada':
                    
                        $idtxnstore=$datos['idtxnstore'];
                        $options=Array();
                        $set=Array();
                         $options['idtxnstore']=$datos['idtxnstore'];
                         $set['state']=44;
                        try{
                            $res= erpd_txn_store::update_all(array('set'=>$set,'conditions'=>$options));

                            if($res)
                                echo '{"success":true,"title":"Correcto:","msg":"Se actualizo correctamente!!"}';
                            else
                                echo '{"success":false,"title":"Error:","msg":"No se pudo guardar!!"}';


                        }catch (Exception $e){
                            throw ($e);
                        }    
                        
                        
                    break;
                    
                    case 'recepcionartransferencia':
                    
                        $idtxnstore=$datos['idtxnstore'];
                        $options=Array();
                        $set=Array();
                        $options['idtxnstore']=$datos['idtxnstore'];
                        $set['state']=87;
                        try{
                             $res= erpd_txn_store::update_all(array('set'=>$set,'conditions'=>$options));
                             
                             foreach ($datos as $key => $value) {
                                        if($key=='updatedatadetail'){
                                            $updatedatagridJSON=json_decode($value);
                                        }
                                       
                             }
                             if(count($updatedatagridJSON)>0){
                                for ($i=0;$i<count($updatedatagridJSON);$i++){
                                    $options=Array();
                                    $idorigin_iddtxnstore=Array(); 
                                    $datagrid=array();
                                    $set='';
                                    
                                    foreach ($updatedatagridJSON[$i] as $key => $value) {

                                        if($key=='quantity'){
                                            $datagrid[$key]=$value;
                                            
                                            $quantity=$value;
                                        }
                                        if($key=='transferquantity'){
                                        $transferquantity=$value;
                                        }
                                        if($key=='iddtxnstore'){
                                            $options['iddtxnstore']=$value;
                                        }
                                        if($key=='idorigin_iddtxnstore'){
                                            $idorigin_iddtxnstore['iddtxnstores']=$value;
                                        }

                                    }
                                    $faltante=($transferquantity-$quantity); 
                                    $set.="saldo=saldo + ".$faltante."";
                                    
                                    $result1=erpdd_txn_store::update_all(array('set'=>$datagrid,'conditions'=>$options));
                                    $result2= erpdd_txn_store::update_all(array('set'=>$set,'conditions'=>$idorigin_iddtxnstore));

                                }
                               
                              }
                             $saldo=erpdd_txn_store::update_all(array('set'=>'saldo=quantity','conditions'=>array('idtxnstore=?',$datos['idtxnstore'])));
                              
                            echo '{"success":true,"title":"Correcto:","msg":"Se actualizo correctamente!!"}';
                        }catch (Exception $e){
                            echo '{"success":false,"title":"Error:","msg":"No se pudo guardar!!"}';
                            //print_r ($e);
                        }    
                        
                        
                    break;
                    
                    case 'rechazartransferencia':
                    
                        $idtxnstore=$datos['idtxnstore'];
                        $estado=88;//anulado
                                          
                        try{
                             $this->AnularTransferencia($idtxnstore,$estado);

                        }catch (Exception $exc){
                            print_r ($exc);
                        }    
                        
                        
                    break;
                    
                    }
                    
                break;
                
                
            }
        }
    }

    $xaction=$_POST['xaction'];
    $iduser=isset($_SESSION['ERP']['iduser'])?$_SESSION['ERP']['iduser']:0;
    $identerprise=isset($_SESSION['ERP']['identerprise'])?$_SESSION['ERP']['identerprise']:0;

    $item=new sis_erpd_txn_store($iduser,$identerprise);
    $item->$xaction($_POST);
?>
