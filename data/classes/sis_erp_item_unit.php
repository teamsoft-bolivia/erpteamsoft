<?php session_start(); ?>
<?php

/*
 * @Autor: Max marcelo jimenez T, Pablo Garcia Guaman,Cristhian Valencia
 * @Email: maxmjt@gmail.com, garcia_guama_pablo@hotmail.com, fox_tian@hotmail.com
 */

require_once '../include.php';
    class sis_erp_item_unit
    {
        public $_iduser;
        public $_tablename;
        public $_identerprise;

        public function __construct($usuario,$enterprise) {
            $this->_iduser=$usuario;
            $this->_identerprise=$enterprise;
            $this->_tablename= erp_item_datasheet::table_name();

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
           
            //echo $datos['xaction'];
            switch ($option)
            {
                case 'read':
                   
                            $iditem=$datos['iditem'];
							$sql="SELECT 
							  iu.iditemunit, 
							  iu.iditem, 
							  iu.idunit, 
							  u.unitname,
							  iu.idunitcontent,
							  u2.unitname as unitnamecontent,
							  iu.quantity
							FROM 
							  erp_item_unit AS iu
							  INNER JOIN erp_unit AS u ON u.idunit=iu.idunit
							  INNER JOIN erp_unit AS u2 ON u2.idunit=iu.idunitcontent
							WHERE
							  iu.iditem=$iditem AND
							  u.identerprise=$this->_identerprise

							ORDER BY iu.iditemunit ASC";
							
                            $itemunits=erp_unit::find_by_sql($sql);
							$total=count($itemunits);
                            
                            $json='';
                            foreach ($itemunits as $datas) {
                            $json.= $datas->to_json().',';
                            }
                            $json=substr($json, 0,  strlen($json)-1);

                            echo '{"total":"'.$total.'","results":['.$json.']}';
                            
                   
                break;
                
                case 'readunitquantity':
                   
                            $iditem=$datos['iditem'];
                            $idorigenalmacen=$datos['idstore'];
                            $sql="SELECT ingSal.idunit,(ingSal.unitname||'-> '||sum(ingSal.quantity) ) as unitname FROM ((SELECT i.idunit,u.unitname,sum(CASE WHEN t.alias='salida_almacen' and d.state=87 THEN dd.quantity WHEN t.alias='ingreso_almacen' AND d.state=44 THEN dd.quantity else 0 END) as quantity
                                    from erpd_txn_store d
                                    INNER JOIN erpdd_txn_store dd ON d.idtxnstore=dd.idtxnstore
                                    INNER JOIN erp_type t ON t.idtype=d.txntype
                                    INNER JOIN erp_item_unit i ON i.idunit=dd.idunit
                                    INNER JOIN erp_unit u ON u.idunit=i.idunit
                                    WHERE
                                    (t.alias='ingreso_almacen' or t.alias='salida_almacen') and dd.iditem=$iditem and i.iditem=$iditem AND dd.destinationstore=$idorigenalmacen AND (d.state=44 or d.state=87)
                                    GROUP BY i.idunit,u.unitname)
                                    UNION
                                    (SELECT i.idunit,u.unitname,sum(dd.quantity)*(-1) as quantity  
                                    from erpd_txn_store d
                                    INNER JOIN erpdd_txn_store dd ON d.idtxnstore=dd.idtxnstore
                                    INNER JOIN erp_type t ON t.idtype=d.txntype
                                    INNER JOIN erp_item_unit i ON i.idunit=dd.idunit
                                    INNER JOIN erp_unit u ON u.idunit=i.idunit
                                    WHERE
                                    t.alias='salida_almacen' and dd.iditem=$iditem and i.iditem=$iditem AND dd.originstore=$idorigenalmacen AND (d.state=44 or d.state=86  or d.state=87)
                                    GROUP BY i.idunit,u.unitname)) as ingSal
                                    GROUP BY ingSal.idunit, ingSal.unitname";
                            //echo $sql;
							
                            $itemunits=erp_unit::find_by_sql($sql);
                            $total=count($itemunits);
                            
                            $json='';
                            foreach ($itemunits as $datas) {
                            $json.= $datas->to_json().',';
                            }
                            $json=substr($json, 0,  strlen($json)-1);

                            echo '{"total":"'.$total.'","results":['.$json.']}';
                            
                   
                break;
                
                case 'readcbo':
                   
                            $iditem=$datos['iditem'];
							$sql="SELECT 
							  iu.iditemunit, 
							  iu.iditem, 
							  iu.idunit, 
							  u.unitname
							FROM 
							  erp_item_unit AS iu
							  INNER JOIN erp_unit AS u ON u.idunit=iu.idunit
							WHERE
							  iu.iditem=$iditem AND
							  u.identerprise=$this->_identerprise

							ORDER BY iu.iditemunit ASC";
							
                            $itemunits=erp_unit::find_by_sql($sql);
                            $total=count($itemunits);
                            
                            $json='';
                            foreach ($itemunits as $datas) {
                            $json.= $datas->to_json().',';
                            }
                            $json=substr($json, 0,  strlen($json)-1);

                            echo '{"total":"'.$total.'","results":['.$json.']}';
                            
                   
                break;
                
                case 'readunitname':


                    $sql="SELECT  
                                u.idunit, 
                                u.unitname

                            FROM 
                                erp_unit AS u

                            WHERE

                                u.identerprise=2 
                            GROUP BY u.idunit,u.unitname
                            ORDER BY u.idunit ASC";

                $itemunits=erp_unit::find_by_sql($sql);
                                            $total=count($itemunits);

                $json='';
                foreach ($itemunits as $datas) {
                $json.= $datas->to_json().',';
                }
                $json=substr($json, 0,  strlen($json)-1);

                echo '{"total":"'.$total.'","results":['.$json.']}';
                            
                   
                break;
				
                case 'readunitnamecontent':


                    $sql="SELECT  
                                u.idunit AS idunitcontent, 
                                u.unitname AS unitnamecontent

                            FROM 
                                erp_unit AS u

                            WHERE

                                u.identerprise=2 
                            GROUP BY u.idunit,u.unitname
                            ORDER BY u.idunit ASC";

                    $itemunits=erp_unit::find_by_sql($sql);
                                                $total=count($itemunits);

                    $json='';
                    foreach ($itemunits as $datas) {
                    $json.= $datas->to_json().',';
                    }
                    $json=substr($json, 0,  strlen($json)-1);

                    echo '{"total":"'.$total.'","results":['.$json.']}';
                            
                   
                break;
                case 'update':
                            $dataJson=json_decode($datos['nuevosvalores']);
                            
                            $data=array();

                            $data['iditemunit']=$dataJson->iditemunit;
                            $data['iditem']=$dataJson->iditem;
                            $data['idunit']=$dataJson->idunit;
                            $data['idunitcontent']=$dataJson->idunitcontent;
                            $data['quantity']=$dataJson->quantity;
                                                      
                            $itemunit= erp_item_unit::find($data['iditemunit']);
                            $itemunit->update_attributes($data);
                            $itemunit->save();
                            if ($itemunit) {

                                echo '{"success":true,"title":"Correcto:","msg":"Se actualizo correctamente!!"}';

                            }else{
                                echo '{"success":false,"title":"Error:","msg":"No se pudo actualizar!!"}';
                            }  
                   break; 
                   
                   case 'insert':
                    $dataJson=json_decode($datos['nuevosvalores']);
                    
                    $data=array();
                   
                    
                    $data['iditem']=$dataJson->iditem;
                    $data['idunit']=$dataJson->idunit;
                    $data['idunitcontent']=$dataJson->idunitcontent;
                    $data['quantity']=$dataJson->quantity;
                    
                    
                    $itemunit=  erp_item_unit::create($data);
                    
                    
                    if ($itemunit) {
                         
                        echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!"}';

                    }else{
                        echo '{"success":false,"title":"Error:","msg":"No se pudo guardar!!"}';
                    }
                    break;
                    
                    case 'delete':
                    
                        $id=(int)$datos['iditemunit'];

                        $post = erp_item_unit::find($id);

                        $result=$post->delete();
                       
                        if ($result) {
                            echo '{"success":true,"title":"Correcto:","msg":"Se elimino correctamente!!"}';

                        }else{
                            echo '{"success":false,"title":"Error:","msg":"No se pudo eliminar!!"}';
                        }
                    break;
                 
            }
        }
    }

    $xaction=$_POST['xaction'];
    
    $iduser=isset($_SESSION['ERP']['iduser'])?$_SESSION['ERP']['iduser']:0;
    $identerprise=isset($_SESSION['ERP']['identerprise'])?$_SESSION['ERP']['identerprise']:0;

    $itemunit=new sis_erp_item_unit($iduser,$identerprise);
    $itemunit->$xaction($_POST);
?>
