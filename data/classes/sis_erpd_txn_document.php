<?php session_start(); ?>
<?php

/*
 * @Autor: Pablo Garcia Guaman
 * @Email: garciaguamanpablo@gmail.com
 */

require_once '../include.php';
    class sis_erpd_txn_document 
    {
        public $_iduser;
        public $_tablename;
        public $_identerprise;

        public function __construct($usuario,$enterprise) {
            $this->_iduser=$usuario;
            $this->_identerprise=$enterprise;
            $this->_tablename= erpd_txn_document::table_name();

        }
        
        public function getActualDate($mode){
            $sql="SELECT CURRENT_TIMESTAMP as fecha";
            $result=erpd_txn_document::find_by_sql($sql);
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
        public function dateFormat($date,$char='/'){
            $chars=explode($char,$date);
            $newdate=$chars[2].$char.$chars[1].$char.$chars[0];
            return $newdate;
        }
        public function saveImage($doc){
            sleep(1);
            $archivo = $_FILES["image"]['name'];
            if ($archivo!='') {
                $destino="../dataimages/transacciones/almacenes/compras/".$this->_identerprise.'-'.$doc->iddocument.".png";  
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
                case 'read':
                    switch ($yaction)
                    {
                        case 'readdocs':
                            $select="erpd_txn_document.*,pro.providername,pcont.contactname,typedoc.type as typedocname,
                                     methodpay.type methodpayname,conditionpay.type conditionpayname";
                            $order="erpd_txn_document.iddocument DESC";
                            $conditions=array("idtxnstore=?",$datos['idtxnstore']);
                            
                            $join="INNER JOIN erp_provider pro ON (pro.idprovider=erpd_txn_document.idprovider) ";
                            $join.="LEFT OUTER JOIN erp_provider_contact pcont ON (pcont.idprovidercontact=erpd_txn_document.idprovidercontact) ";
                            $join.="INNER JOIN erp_type typedoc ON (typedoc.idtype=erpd_txn_document.typedocument) ";
                            $join.="INNER JOIN erp_type methodpay ON (methodpay.idtype=erpd_txn_document.methodpayment) ";
                            $join.="INNER JOIN erp_type conditionpay ON (conditionpay.idtype=erpd_txn_document.conditionpayment) ";
                            
                            
                            try {
                                
                                $txns=  erpd_txn_document::find('all',array('select'=>$select,'joins'=>$join,
                                        'conditions'=>$conditions,'order'=>$order));
                                

                            } catch (Exception $exc) {
                                print_r($exc);
                            }

                            $json='';
                            foreach ($txns as $cuenta) {
                                $json.= $cuenta->to_json().',';
                            }
                            $json=substr($json, 0,  strlen($json)-1);

                            echo '{"total":"0","results":['.$json.']}';
                            
                        break;
                    }
                break;
                case 'save':
                    switch ($yaction) {
                        case 'insert':
                            $data=array();
                            foreach ($datos as $key => $value) {
                                if ($key!='xaction' && $key!='yaction' && $key!='null' && $key!='iddocument' && $key!='providername') {
                                    $data[$key]=$value;
                                }
                            }
                            
                            try {
                                $new=  new erpd_txn_document($data);
                                $new->save();
                                echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!"}';
                            } catch (Exception $exc) {
                                print_r($exc);
                                echo '{"success":false,"title":"Error:","msg":"No se pudo guardar!!"}';
                            }

                            
                        break;
                                
                        case 'update':
                            $data=array();
                            foreach ($datos as $key => $value) {
                                if ($key!='xaction' && $key!='yaction' && $key!='description' && $key!='null' && $key!='iddocument' && $key!='idtxnstore' && $key!='iddtxnstore' && $key!='providername') {
                                    $data[$key]=$value;
                                }
                            }
                           $new= erpd_txn_document::find($datos['iddocument']);
                            $new->update_attributes($data);
                            $new->save();
                            if ($new) {
                                echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!"}';
                                
                            }else{
                                echo '{"success":false,"title":"Error:","msg":"No se pudo guardar!!"}';
                            }
                        break;
                        case 'updateimage':
                            $doc= erpd_txn_document::find($datos['iddocument']);
                            if ($_FILES["image"]['name']!='') {
                                    $doc->image=$this->_identerprise.'-'.$doc->iddocument.'.png';
                                    
                                }else{
                                    $doc->image='no.png';
                                }
                                $doc->save();
                                $this->saveImage($doc);
                                echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!","image":"'.$doc->image.'"}';
                        break;
                        case 'updatecondition':
                            $datos['datefirstpayment']=$this->dateFormat($datos['datefirstpayment']);
                            if (isset($datos['interestbalance'])) {
                                $datos['interestbalance']="true";
                            }else{
                                $datos['interestbalance']="false";
                            }
                            $data=array();
                            foreach ($datos as $key => $value) {
                                if ($key!='xaction' && $key!='yaction' && $key!='iddocument' && $key!='providername' && $key!='amount') {
                                    $data[$key]=$value;
                                }
                            }
                            try {
                                
                                $new= erpd_txn_document::find($datos['iddocument']);
                                $new->update_attributes($data);
                                $new->save();
                                if ($datos['conditiontype']=='dia') {
                                    $nrocuotas=1;
                                }else if($datos['conditiontype']=='mes'){
                                    $nrocuotas=$datos['conditionquantity'];
                                }else{
                                    $nrocuotas=$datos['conditionquantity']*12;
                                }
                                $montocuota=$datos['amount']/$nrocuotas;
                                $fechacuota=$datos['datefirstpayment'];
                                //$fechacuota= date("Y-m-d", strtotime("$fecha + 30 days"));
                                $detail= erpdd_payment_plan::delete_all(array('conditions'=>array('iddocument'=>$datos['iddocument'])));
                                for ($index = 0; $index <$nrocuotas; $index++) {
                                    $newplan=new erpdd_payment_plan();
                                    $newplan->numberfee=$index+1;
                                    $newplan->datefee=$fechacuota;
                                    $newplan->amountfee=$montocuota;
                                    $newplan->iddocument=$datos['iddocument'];
                                    $newplan->save();
                                    $fechacuota=  date("Y/m/d", strtotime("$fechacuota + 30 days"));
                                }
                                
                                echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!"}';
                            } catch (Exception $exc) {
                                print_r($exc);
                                echo '{"success":false,"title":"Error:","msg":"No se pudo guardar!!","error:":"'.$exc->getMessage().'"}';
                            }
                        break;
                    }
                break;
                case 'delete':
                    try {
                        $docs = erpd_txn_document::find($datos['iddocument']);
                        $docs->delete();
                        $detail=  erpdd_txn_store::delete_all(array('conditions'=>array('iddocument'=>$datos['iddocument'])));
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

    $item=new sis_erpd_txn_document($iduser,$identerprise);
    $item->$xaction($_POST);

?>
