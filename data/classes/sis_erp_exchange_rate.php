<?php session_start(); ?>
<?php

/*
 * @Autor: Pablo Garcia Guaman
 * @Email: garciaguamanpablo@gmail.com
 */

require_once '../include.php';
    class sis_erp_exchange_rate 
    {
        public $_iduser;
        public $_tablename;
        public $_identerprise;

        public function __construct($usuario,$enterprise) {
            $this->_iduser=$usuario;
            $this->_identerprise=$enterprise;
            $this->_tablename= erp_exchange_rate::table_name();

        }
        
        public function getActualDate($mode){
            $sql="SELECT CURRENT_TIMESTAMP as fecha";
            $result=erp_exchange_rate::find_by_sql($sql);
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
                            $join="INNER JOIN erp_type mon ON (mon.idtype=erp_exchange_rate.currency AND mon.identerprise=$this->_identerprise) ";
                            $order='dateexchange Desc';
                            $conditions=array('currency=?',$datos['currency']);
                            $TC= erp_exchange_rate::find('all',array('conditions'=>$conditions,'joins'=>$join,'order'=>$order));
                            //$types=  erp_type::find('all',array('conditions'=>array('option=?','tipo_moneda')));
                            $json='';
                            foreach ($TC as $type) {
                            $json.= $type->to_json().',';
                            }
                            $json=substr($json, 0,  strlen($json)-1);
                            //echo '['.$json.']';
                            echo '{"total":"0","results":['.$json.']}';
                      break;
                    }
                break;
                case 'save':
                    switch ($yaction) {
                       case 'insert':
                           $cond=array("identerprise=? AND option='tipo_moneda' AND idtype<>".$datos['currency'],$this->_identerprise);
                           $currencys=  erp_type::find('all',array('conditions'=>$cond));
                           
                           $conditions=array("currency=? AND dateexchange='".$datos['dateexchange']."'",$datos['currency']);
                           $tc=erp_exchange_rate::find('all',array('conditions'=>$conditions));
                           if (count($tc)==0) {
                                $data=array();
                                foreach ($datos as $key => $value) {
                                    if ($key!='xaction' && $key!='yaction' && $key!='idexchangerate') {
                                        $data[$key]=$value;
                                    }
                                }
                                
                                try {
                                    $new=  new erp_exchange_rate($data);
                                    $new->save();
                                    if (count($currencys)>0) {
                                        foreach ($currencys as $curr) {
                                            $data['currency']=$curr->idtype;
                                            $data['amount']=1;
                                            $n=new erp_exchange_rate($data);
                                            $n->save();
                                        }
                                    }
                                    echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!"}';
                                } catch (Exception $exc) {
                                    print_r($exc);
                                    echo '{"success":false,"title":"Error:","msg":"No se pudo guardar!!"}';
                                }
                           }else{
                               echo '{"success":false,"title":"Error:","msg":"Ya existe el tipo de cambio para esta Moneda y Fecha!!"}';
                           }
                           

                       break;
                       
                       case 'update':
                           $data=array();
                            foreach ($datos as $key => $value) {
                               if ($key!='xaction' && $key!='yaction' && $key!='idexchangerate') {
                                    $data[$key]=$value;
                                }
                            }
                            
                            try {
                                $new= erp_exchange_rate::find($datos['idexchangerate']);
                                $new->update_attributes($data);
                                $new->save();
                                echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!"}';
                            } catch (Exception $exc) {
                                echo '{"success":false,"title":"Error:","msg":"No se pudo guardar!!"}';
                            }

                       break;
                    }
                break;
                case 'delete':

                break;
 
            }
        }
    }

    $xaction=$_POST['xaction'];
    $iduser=isset($_SESSION['ERP']['iduser'])?$_SESSION['ERP']['iduser']:0;
    $identerprise=isset($_SESSION['ERP']['identerprise'])?$_SESSION['ERP']['identerprise']:0;

    $item=new sis_erp_exchange_rate($iduser,$identerprise);
    $item->$xaction($_POST);

?>
