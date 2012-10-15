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
        public function VerificarCantidad($iditem,$idorigenalmacen,$idunit){
                            
                            //echo $iditem.'-'.$idorigenalmacen.'-'.$idunit;
                            $iditem=$iditem;
                            $idorigenalmacen=$idorigenalmacen;
                            $idunit=$idunit;
                            $sql="SELECT ingSal.idunit,(ingSal.unitname||'-> '||sum(ingSal.quantity) ) as unitname1,sum(ingSal.quantity) as unitname FROM ((SELECT i.idunit,u.unitname,sum(CASE WHEN t.alias='salida_almacen' and d.state=87 THEN dd.quantity WHEN t.alias='ingreso_almacen' AND d.state=44 THEN dd.quantity else 0 END) as quantity
                                    from erpd_txn_store d
                                    INNER JOIN erpdd_txn_store dd ON d.idtxnstore=dd.idtxnstore
                                    INNER JOIN erp_type t ON t.idtype=d.txntype
                                    INNER JOIN erp_item_unit i ON i.idunit=dd.idunit
                                    INNER JOIN erp_unit u ON u.idunit=i.idunit
                                    WHERE
                                    (t.alias='ingreso_almacen' or t.alias='salida_almacen') and dd.iditem=$iditem and i.iditem=$iditem AND dd.destinationstore=$idorigenalmacen AND (d.state=44 or d.state=87) AND dd.idunit=$idunit
                                    GROUP BY i.idunit,u.unitname)
                                    UNION
                                    (SELECT i.idunit,u.unitname,sum(dd.quantity)*(-1) as quantity  
                                    from erpd_txn_store d
                                    INNER JOIN erpdd_txn_store dd ON d.idtxnstore=dd.idtxnstore
                                    INNER JOIN erp_type t ON t.idtype=d.txntype
                                    INNER JOIN erp_item_unit i ON i.idunit=dd.idunit
                                    INNER JOIN erp_unit u ON u.idunit=i.idunit
                                    WHERE
                                    t.alias='salida_almacen' and dd.iditem=$iditem and i.iditem=$iditem AND dd.originstore=$idorigenalmacen AND (d.state=44 or d.state=86  or d.state=87) AND dd.idunit=$idunit
                                    GROUP BY i.idunit,u.unitname)) as ingSal
                                    GROUP BY ingSal.idunit, ingSal.unitname";
                    
				//echo $sql;			
                            $itemunits=erp_unit::find_by_sql($sql);
                            $total=count($itemunits);
                            //print_r($itemunits);
                            if($total>0){
                                $stock=$itemunits[0]->unitname;
                               if($stock>0){
                                return $stock;
                                }else{
                                 $stock=0;   
                                return $stock;

                                }
                            }else{
                                $stock=0;
                                return $stock;
                            }
                            
                            
            
        }
        public function verTipoValoracion($iditem){
            $sql="SELECT * FROM erp_type t where t.idtype=(SELECT i.valuation FROM erp_item i WHERE i.iditem=$iditem)";
            $item= erp_type::find_by_sql($sql);
            $valoracionName=$item[0]->type;
            return $valoracionName;
            
        }
        public function validadCantidad($detalle){
            $total=count($detalle);
            $i=0;
            $vali=true;
            foreach ($detalle as $del) {
                
                //while($vali==true){
                //$valoracion=  $this->verTipoValoracion($del->iditem);
                $cantidad=$this->VerificarCantidad($del->iditem,$del->originstore,$del->idunit);
                //echo $cantidad.'----'.$del->quantity;
                if($cantidad>=$del->quantity){
                    //echo 'si--';
                }else{
                    $vali=false;
                    return $vali;
                    //echo '{"success":false,"title":"Error:","msg":"No existe suficiente cantidad para relizar la salida!!"}';
                }
                
                //$json.= $del->to_json().',';
            //}
            
            
           }
           return $vali;
        }
        
        public function insertar($idtxnstore,$iditem,$idunit,$quantity,$cost,$originstore,$destinationstore,$idorigin_iddtxnstore,$discount){
                $data=array();
                $data['idtxnstore']=$idtxnstore;
                $data['iditem']=$iditem;
                $data['idunit']=$idunit;
                $data['quantity']=$quantity;
                $data['cost']=$cost;
                $data['originstore']=$originstore;
                $data['destinationstore']=$destinationstore;
                $data['idorigin_iddtxnstore']=$idorigin_iddtxnstore;
                $data['transferquantity']=$quantity;
                $data['discount']=$discount;
                //print_r($data);
                $newdetalletxn=new erpdd_txn_store($data);
                $newdetalletxn->save();
                //return true;
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
        
        public function TerminarTransferencia($idtxnstore,$estado){
            /*obtiene el detalle de la transaccion*/
            $sql="SELECT * from erpdd_txn_store dd WHERE dd.idtxnstore=$idtxnstore";
            $detalle=erpdd_txn_store::find_by_sql($sql);
            //print_r($detalle);
            foreach ($detalle as $del){
                $valoracion=$this->verTipoValoracion($del->iditem);
                $iddtxnstore=$del->iddtxnstore;
                if($valoracion=='Ponderado'){
                     $precio=$this->calcularPrecio($del->iditem, $del->idunit, $del->originstore);
                     if($precio==$del->cost){
                        //Se supone que esta bien no se hace nada 
                     }else{
                         //Se modifico el costo porque hubo una salida y compra antes de este
                        $iddetalle=$del->iddtxnstore;                           
                        $dataform22['cost']=$precio;
                        $options22['iddtxnstore']=$iddetalle;
                        $result=  erpdd_txn_store::update_all(array('set'=>$dataform22,'conditions'=>$options22));
                     }
                         
                }
                if($valoracion=='Peps'){
                    $idDetalle=$del->iddtxnstore;
                    $Cantidad=$del->quantity;
                    $idunit=$del->idunit;
                    $iditem=$del->iditem;
                    $almacenOrigen=$del->originstore;
                    $almacenDestino=$del->destinationstore;
                    $discount=$del->discount;
                    while($Cantidad>0){
                        $Primeraentrada="SELECT *
                                    from erpd_txn_store d 
                                    INNER JOIN erpdd_txn_store dd ON d.idtxnstore=dd.idtxnstore 
                                    WHERE (d.txntype=35 or d.txntype=36) and dd.destinationstore=$almacenOrigen and dd.idunit=$idunit and (d.state=44 or d.state=87) and dd.iditem=$iditem and dd.saldo<>0
                                    ORDER BY d.date asc, d.idtxnstore asc 
                                    LIMIT 1
                                    ";
                        $Primeraentradaresult=erpdd_txn_store::find_by_sql($Primeraentrada);
                        
                        $cantidadprimeracompra=$Primeraentradaresult[0]->saldo;
                        //if($Cantidad>$cantidadprimeracompra){
                            $cantidadAnt=$Cantidad;
                            $Cantidad=$Cantidad-$cantidadprimeracompra;
                        //}
                        
                        
                        $idtxnstore=$idtxnstore;
                        $iditem=$iditem;
                        $idunit=$idunit;
                        
                        $cost=$Primeraentradaresult[0]->cost;
                        $originstore=$almacenOrigen;
                        $destinationstore=$almacenDestino;
                        $idorigin_iddtxnstore=$Primeraentradaresult[0]->iddtxnstore;
                        
                        
                        $options123['iddtxnstore']=$Primeraentradaresult[0]->iddtxnstore;                       

                        if($Cantidad<0){
                            $dataform11['saldo']=$Cantidad*(-1);
                            $result=  erpdd_txn_store::update_all(array('set'=>$dataform11,'conditions'=>$options123));
                            $quantity=$cantidadAnt;
                            $this->insertar($idtxnstore,$iditem,$idunit,$quantity,$cost,$originstore,$destinationstore,$idorigin_iddtxnstore,$discount);
                            //hacer update a la compra en el saldo donde el valor es la diferencia
                            $Cantidad=0;
                        }else{
                            $dataform22['saldo']=0;
                            $result=  erpdd_txn_store::update_all(array('set'=>$dataform22,'conditions'=>$options123));
                            $quantity=$cantidadprimeracompra;
                            $this->insertar($idtxnstore,$iditem,$idunit,$quantity,$cost,$originstore,$destinationstore,$idorigin_iddtxnstore,$discount);
                            //hacer update a la compra de donde se esta sacando con valor de 0
                        }
                        
                    }
                    //se elimina el registro porque ya se crearon varios del mismo
                    $iddtxnstore1=$iddtxnstore;
                    $detalletxn=  erpdd_txn_store::find($iddtxnstore1);
                    $detalletxn->delete();
                    
                }
                if($valoracion=='Ueps'){
                        $idDetalle=$del->iddtxnstore;
                        $Cantidad=$del->quantity;
                        $idunit=$del->idunit;
                        $iditem=$del->iditem;
                        $almacenOrigen=$del->originstore;
                        $almacenDestino=$del->destinationstore;
                        $discount=$del->discount;
                        while($Cantidad>0){
                        $Primeraentrada="SELECT *
                                    from erpd_txn_store d 
                                    INNER JOIN erpdd_txn_store dd ON d.idtxnstore=dd.idtxnstore 
                                    WHERE (d.txntype=35 or d.txntype=36) and dd.destinationstore=$almacenOrigen and dd.idunit=$idunit and (d.state=44 or d.state=87) and dd.iditem=$iditem and dd.saldo<>0
                                    ORDER BY d.date desc, d.idtxnstore desc 
                                    LIMIT 1
                                    ";
                        $Primeraentradaresult=erpdd_txn_store::find_by_sql($Primeraentrada);;
                        $cantidadprimeracompra=$Primeraentradaresult[0]->saldo;
                        //if($Cantidad>$cantidadprimeracompra){
                            $cantidadAnt=$Cantidad;
                            $Cantidad=$Cantidad-$cantidadprimeracompra;
                        //}
                        
                        
                        $idtxnstore=$idtxnstore;
                        $iditem=$iditem;
                        $idunit=$idunit;
                        
                        $cost=$Primeraentradaresult[0]->cost;
                        $originstore=$almacenOrigen;
                        $destinationstore=$almacenDestino;
                        $idorigin_iddtxnstore=$Primeraentradaresult[0]->iddtxnstore;
                        $options123['iddtxnstore']=$Primeraentradaresult[0]->iddtxnstore;  
                        if($Cantidad<0){
                            $dataform11['saldo']=$Cantidad*(-1);
                            $result=  erpdd_txn_store::update_all(array('set'=>$dataform11,'conditions'=>$options123));
                            $quantity=$cantidadAnt;
                            $this->insertar($idtxnstore,$iditem,$idunit,$quantity,$cost,$originstore,$destinationstore,$idorigin_iddtxnstore,$discount);
                            //hacer update a la compra en el saldo donde el valor es la diferencia
                            $Cantidad=0;
                        }else{
                            $dataform11['saldo']=0;
                            $result=  erpdd_txn_store::update_all(array('set'=>$dataform11,'conditions'=>$options123));
                            $quantity=$cantidadprimeracompra;
                            $this->insertar($idtxnstore,$iditem,$idunit,$quantity,$cost,$originstore,$destinationstore,$idorigin_iddtxnstore,$discount);
                            //hacer update a la compra de donde se esta sacando con valor de 0
                        }
                        
                    }
                    //se elimina el registro porque ya se crearon varios del mismo
                    $iddtxnstore1=$iddtxnstore;
                    $detalletxn=  erpdd_txn_store::find($iddtxnstore1);
                    $detalletxn->delete();
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
        
        public function calcularPrecio($iditem,$idunit,$destinationstore){
            $sql="SELECT (ing.cost/ing.quantity) as cost FROM (SELECT ingSal.idunit,(ingSal.unitname||'-> '||sum(ingSal.quantity) ) as unitname1, sum(ingSal.quantity) as quantity, SUM(ingSal.cost2) as cost
                        FROM (
                        (SELECT i.idunit,u.unitname,sum(dd.quantity) as quantity, sum(dd.quantity*dd.cost) as cost2
                                        from erpd_txn_store d
                                        INNER JOIN erpdd_txn_store dd ON d.idtxnstore=dd.idtxnstore
                                        INNER JOIN erp_type t ON t.idtype=d.txntype
                                        INNER JOIN erp_item_unit i ON i.idunit=dd.idunit
                                        INNER JOIN erp_unit u ON u.idunit=i.idunit
                                        WHERE
                                        t.alias='ingreso_almacen' and dd.iditem=$iditem and i.iditem=$iditem AND dd.destinationstore=$destinationstore AND d.state=44 AND dd.idunit=$idunit
                                        GROUP BY i.idunit,u.unitname)
                        UNION
                        (SELECT i.idunit,u.unitname,sum(dd.quantity)*(-1) as quantity, sum(dd.quantity*dd.cost)*(-1) as cost2 
                                        from erpd_txn_store d
                                        INNER JOIN erpdd_txn_store dd ON d.idtxnstore=dd.idtxnstore
                                        INNER JOIN erp_type t ON t.idtype=d.txntype
                                        INNER JOIN erp_item_unit i ON i.idunit=dd.idunit
                                        INNER JOIN erp_unit u ON u.idunit=i.idunit
                                        WHERE
                                        t.alias='salida_almacen' and dd.iditem=$iditem and i.iditem=$iditem AND dd.originstore=$destinationstore AND d.state=44 AND dd.idunit=$idunit
                                        GROUP BY i.idunit,u.unitname)
                        ) as ingSal
                        GROUP BY ingSal.idunit, ingSal.unitname) ing";
            //echo $sql;
            $cost=erpdd_txn_store::find_by_sql($sql);
            $precio=$cost[0]->cost;
            return $precio;
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
                        case 'readdetail':
                            $start=$datos['start'];
                            $limit=$datos['limit'];
                            (isset($datos['idtxnstore']))?$idtxnstore=$datos['idtxnstore']:$idtxnstore=-1;
                            $select="erpdd_txn_store.*,erp_item.code,erp_item.description,erp_unit.unitname,
                                     origin.storename as originname,destination.storename as destinationname";
                            $conditions=array("idtxnstore=?",$idtxnstore);
                            $join="INNER JOIN erp_item ON (erp_item.iditem=erpdd_txn_store.iditem)";
                            $join.="INNER JOIN erp_unit ON (erp_unit.idunit=erpdd_txn_store.idunit)";
                            $join.="LEFT OUTER JOIN erp_store origin ON (origin.idstore=erpdd_txn_store.originstore)";
                            $join.="LEFT OUTER JOIN erp_store destination ON (destination.idstore=erpdd_txn_store.destinationstore)";
                            
                            try {
                                $txndetail=  erpdd_txn_store::find('all',array('select'=>$select,'joins'=>$join,
                                        'conditions'=>$conditions,'limit'=>$limit,'offset'=>$start));
                                $totaltxndetail=  erpdd_txn_store::find('all',array('select'=>$select,'joins'=>$join,
                                        'conditions'=>$conditions));
                                $total=count($totaltxndetail);
                            } catch (Exception $exc) {
                                print_r($exc);
                            }

                            $json='';
                            foreach ($txndetail as $cuenta) {
                                
                                $json.= $cuenta->to_json().',';
                            }
                            $json=substr($json, 0,  strlen($json)-1);

                            echo '{"total":'.$total.',"results":['.$json.']}';
                        break;

                        case 'readdetailrecepciontransferencias':
                            $start=$datos['start'];
                            $limit=$datos['limit'];
                            (isset($datos['idtxnstore']))?$idtxnstore=$datos['idtxnstore']:$idtxnstore=-1;
                            $select="erpdd_txn_store.*,erp_item.code,erp_item.description,erp_unit.unitname,
                                     origin.storename as originname,destination.storename as destinationname, currency.alias as simbolo, 'old' AS state";
                            $conditions=array("idtxnstore=?",$idtxnstore);
                            $join="INNER JOIN erp_item ON (erp_item.iditem=erpdd_txn_store.iditem)";
                            $join.="INNER JOIN erp_unit ON (erp_unit.idunit=erpdd_txn_store.idunit)";
                            $join.="LEFT OUTER JOIN erp_store origin ON (origin.idstore=erpdd_txn_store.originstore)";
                            $join.="LEFT OUTER JOIN erp_store destination ON (destination.idstore=erpdd_txn_store.destinationstore)";
                            $join.="LEFT OUTER JOIN erp_type currency ON (currency.idtype=erpdd_txn_store.currency)";
                            try {
                                $txndetail=  erpdd_txn_store::find('all',array('select'=>$select,'joins'=>$join,
                                        'conditions'=>$conditions,'limit'=>$limit,'offset'=>$start));
                                $totaltxndetail=  erpdd_txn_store::find('all',array('select'=>$select,'joins'=>$join,
                                        'conditions'=>$conditions));
                                $total=count($totaltxndetail);
                            } catch (Exception $exc) {
                                print_r($exc);
                            }

                            $json='';
                            foreach ($txndetail as $cuenta) {
                                
                                $json.= $cuenta->to_json().',';
                            }
                            $json=substr($json, 0,  strlen($json)-1);

                            echo '{"total":'.$total.',"results":['.$json.']}';
                        break;

                        
                        case 'readdetailentradas':
                            $start=$datos['start'];
                            $limit=$datos['limit'];
                            (isset($datos['idtxnstore']))?$idtxnstore=$datos['idtxnstore']:$idtxnstore=-1;
                            $select="erpdd_txn_store.*,erp_item.code,erp_item.description,erp_unit.unitname,
                                     origin.storename as originname,destination.storename as destinationname,currency.alias as simbolo, 'old' as state";
                            $conditions=array("idtxnstore=?",$idtxnstore);
                            $join="INNER JOIN erp_item ON (erp_item.iditem=erpdd_txn_store.iditem)";
                            $join.="INNER JOIN erp_unit ON (erp_unit.idunit=erpdd_txn_store.idunit)";
                            $join.="LEFT OUTER JOIN erp_store origin ON (origin.idstore=erpdd_txn_store.originstore)";
                            $join.="LEFT OUTER JOIN erp_store destination ON (destination.idstore=erpdd_txn_store.destinationstore)";
                            $join.="LEFT OUTER JOIN erp_type currency ON (currency.idtype=erpdd_txn_store.currency)";
                            
                            try {
                                $txndetail=  erpdd_txn_store::find('all',array('select'=>$select,'joins'=>$join,
                                        'conditions'=>$conditions,'limit'=>$limit,'offset'=>$start));
                                $totaltxndetail=  erpdd_txn_store::find('all',array('select'=>$select,'joins'=>$join,
                                        'conditions'=>$conditions));
                                $total=count($totaltxndetail);
                            } catch (Exception $exc) {
                                print_r($exc);
                            }

                            $json='';
                            foreach ($txndetail as $cuenta) {
                                
                                $json.= $cuenta->to_json().',';
                            }
                            $json=substr($json, 0,  strlen($json)-1);

                            echo '{"total":'.$total.',"results":['.$json.']}';
                        break;
                        
                        case 'readdetailkardex':
                            $start=$datos['start'];
                            $limit=$datos['limit'];
                            (isset($datos['iditem']))?$iditem=$datos['iditem']:$iditem=-1;
                            $idstore=$datos['idstore'];
                            $idunit=$datos['idunit'];
                            $fechainicial=$datos['fechainicial'];
                            $fechafinal=$datos['fechafinal'];
                            $json='';
                            $total=0;
                            $saldo=$datos['saldo']; 
                            $saldovalorado=$datos['saldovalorado'];
                            //echo $saldovalorado.' || ';
                            $sqldetail='SELECT * 
                                        FROM f_kardex_item('.$this->_identerprise.','."'".$fechainicial."'".','."'".$fechafinal."'".','.$iditem.','.$idunit.','.$idstore.','.$idstore.') AS ("iddtxnstore" bigint,"originstore" bigint,"destinationstore" bigint,
                                        "correlative" bigint,"date" date,"concept" bigint,"conceptname" character varying(100),"responsable" bigint,
                                        "responsablename" character varying(255),"txntype" bigint,"Ingreso" float,"Salida" float,"cost" float,"Ingresos" float,"Egresos" float,"quantity" float)';
                                                
                            
                            
                            try {
                                    $txndetail=  erpdd_txn_store::find_by_sql($sqldetail);
                                    $total=count($txndetail);
                                    $res=array();
                                    $operador=1;
                                    
                                    foreach ($txndetail as $datos) {
                                       
                                        array_push($res, $datos->to_array());
                                        //$json.= $datos->to_json().',';
                                        
                                    }
                                    $i=0;
                                    $fields='{';
                                    for($i=0;$i<count($res);$i++){
                                        $discount=0;
                                        $quantity=0;
                                        $cost=0;
                                        $operador=1;
                                        foreach ($res[$i] as $key=>$value){
                                            
                                            if($key=='ingreso' && $value>0){
                                                //echo $key.'-'.$res[$i][$key].'-';
                                                $operador=1;
                                            }else if ($key=='salida' && $value>0){
                                                //echo $key.'-'.$res[$i][$key].'+';
                                                $operador=-1;
                                            }
                                            
                                            if($key=='quantity'){
                                                $saldo=$saldo+($operador*$value);
                                                $quantity=$value;
                                            }elseif($key=='discount'){
                                                $discount=$value;
                                                
                                            }elseif($key=='cost'){
                                                $cost=$value;
                                                
                                            }
                                                
                                        $fields.='"'.$key.'":';
                                        $fields.='"'.$value.'",';
                                       
                                        }
                                        $saldovalorado=$saldovalorado+($operador*(($quantity*$cost)-$discount));
                                        //echo $saldovalorado.' $$ ';
                                        $fields.='"saldo":'.$saldo.',"saldovalorado":'.$saldovalorado.'},{';
                                        
                                        
                                    }
                                    $fields=  substr($fields,0,  strlen($fields)-2);
                                    echo '{"total":'.$total.',"results":['.$fields.'],"saldo":'.$saldo.'}';

                              } catch (Exception $exc) {
                                    print_r($exc);
                              }

                                                    
                        break;
                        
                        case 'readsaldoanterior':
                            (isset($datos['iditem']))?$iditem=$datos['iditem']:$iditem=-1;
                            $idstore=$datos['idstore'];
                            $idunit=$datos['idunit'];
                            
                            $fechafinal=$datos['fechafinal'];
                            $json='';
                            $total=0;
                           
                            $sqldetail=" SELECT 
                                COALESCE (SUM(dtxn.quantity),0) AS saldoanterior,
				COALESCE(SUM((dtxn.cost * dtxn.quantity)),0) as saldovaloradoanterior
                                 
                            FROM erpdd_txn_store dtxn 
                            INNER JOIN erpd_txn_store txn ON txn.idtxnstore=dtxn.idtxnstore 
                            INNER JOIN erp_type tconcept ON tconcept.idtype=txn.concept
                            INNER JOIN person p ON p.id_person=txn.responsible 
                            WHERE   iditem=".$iditem."  AND
                                    txn.state IN (86,87,44) AND
                                    (dtxn.originstore=".$idstore." OR dtxn.destinationstore=".$idstore.") AND
                                    (txn.date < '".$fechafinal."') AND
                                     dtxn.idunit=".$idunit."";
                            try {
                                $res=erpdd_txn_store::find_by_sql($sqldetail);
                              
                                echo '{"success":true,"saldoanterior":'.$res[0]->saldoanterior.', "saldovaloradoanterior":'.$res[0]->saldovaloradoanterior.'}';
                                
                            }catch (Exception $exc){
                                 print_r($exc);
                            }
                              
                            
                       break;
                    

                    }
                break;
                case 'save':
                    switch ($yaction) {
                        case 'insert':
                            
                            $data=array();
                            foreach ($datos as $key => $value) {
                                if ($key!='xaction' && $key!='yaction' && $key!='description' && $key!='iddtxnstore' && $key!='null' && $key!='norecep' && $key!='recep') {
                                    $data[$key]=$value;
                                }
                            }
                            $new=  new erpdd_txn_store($data);
                            $new->save();
                            if ($new) {
                                $new->save();
                                echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!"}';
                                
                            }else{
                                echo '{"success":false,"title":"Error:","msg":"No se pudo guardar!!"}';
                            }
                        break;
                                
                        case 'update':

                            $data=array();
                            foreach ($datos as $key => $value) {
                                if ($key!='xaction' && $key!='yaction' && $key!='description' && $key!='null' && $key!='iddocument' && $key!='idtxnstore' && $key!='iddtxnstore') {
                                    $data[$key]=$value;
                                }
                            }
                            $data['saldo']=$datos['quantity'];
                           $new= erpdd_txn_store::find($datos['iddtxnstore']);
                            $new->update_attributes($data);
                            $new->save();
                            if ($new) {
                                echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!"}';
                                
                            }else{
                                echo '{"success":false,"title":"Error:","msg":"No se pudo guardar!!"}';
                            }
                        break;
                    }
                break;
                case 'update':
                    switch ($yaction) {
                        case 'detalleentrada':
                           
                            $dataJson=json_decode($datos['valoresDetalleEntrada']);
                           // $destinationstore=erpdd_txn_store::find_first_by_idtxnstore($datos['idtxnstore']);
                            $data=array();
                                
                                
                                $data['iditem']=$dataJson->iditem;
                                $data['idunit']=$dataJson->idunit;
                                $data['quantity']=$dataJson->quantity;
                                $data['cost']=$dataJson->cost;
                                
                                $options['iddtxnstore']=$dataJson->iddtxnstore;
                                $options['idtxnstore']=$dataJson->idtxnstore;
                                
                                    
                                    $result=  erpdd_txn_store::update_all(array('set'=>$data,'conditions'=>$options));
                                    if ($result) {
                                        echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!"}';

                                    }else{
                                        echo '{"success":false,"title":"Error:","msg":"No se pudo guardar!!"}';
                                    }
                    
                            
                        break;
                        case 'updateCabeceraTransferenciaAprobado':
                            //echo 'hola';
                                $idtxnstore=$datos['idtxnstore'];
                                $estado=86;
                                $sql1="SELECT dd.iditem,dd.idunit,dd.originstore,sum(dd.quantity) as quantity
                                        from erpdd_txn_store dd 
                                        WHERE dd.idtxnstore=$idtxnstore
                                        GROUP BY dd.iditem,dd.idunit,dd.originstore";
                                //echo $sql1;
                                $detalle= erpdd_txn_store::find_by_sql($sql1);
                                $respuestaOK=$this->validadCantidad($detalle);
                                if($respuestaOK){
                                    $this->TerminarTransferencia($idtxnstore,$estado);
                                    //echo '{"success":true,"title":"Correcto:","msg":"Se guardara correctamente!!"}';
                                }else{
                                    
                                    echo '{"success":false,"title":"Error:","msg":"No existe suficiente cantidad para relizar la salida!!"}';
                                }
                                
                        break;
                        
                        case 'updateCabeceraTransferenciaAnulado':
                            //echo 'hola';
                                $idtxnstore=$datos['idtxnstore'];
                                $estado=45;//anulado
                                $this->AnularTransferencia($idtxnstore,$estado);
                                 
                                
                        break;
                        
                        case 'updateCabeceraSalidaAprobado':
                            //echo 'hola';
                                $idtxnstore=$datos['idtxnstore'];
                                $estado=44;
                                $sql1="SELECT dd.iditem,dd.idunit,dd.originstore,sum(dd.quantity) as quantity
                                        from erpdd_txn_store dd 
                                        WHERE dd.idtxnstore=$idtxnstore
                                        GROUP BY dd.iditem,dd.idunit,dd.originstore";
                                //echo $sql1;
                                $detalle= erpdd_txn_store::find_by_sql($sql1);
                                $respuestaOK=$this->validadCantidad($detalle);
                                if($respuestaOK){
                                    $this->TerminarTransferencia($idtxnstore,$estado);
                                    //echo '{"success":true,"title":"Correcto:","msg":"Se guardara correctamente!!"}';
                                }else{
                                    
                                    echo '{"success":false,"title":"Error:","msg":"No existe suficiente cantidad para relizar la salida!!"}';
                                }
                                
                        break;
                        
                      
                    }
                break;
            
                case 'insert':
                    switch ($yaction) {
                        case 'detalleentrada':
                            $dataJson=json_decode($datos['valoresDetalleEntrada']);
                           // $destinationstore=erpdd_txn_store::find_first_by_idtxnstore($datos['idtxnstore']);
                                $data=array();
                                
                                $data['idtxnstore']=$datos['idtxnstore'];
                                $data['iditem']=$dataJson->iditem;
                                $data['idunit']=$dataJson->idunit;
                                $data['quantity']=$dataJson->quantity;
                                $data['saldo']=$dataJson->quantity;
                                $data['cost']=$dataJson->cost;
                                $data['destinationstore']=$datos['destinationstore'];
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

    $item=new sis_erpd_txn_store($iduser,$identerprise);
    $item->$xaction($_POST);
?>
