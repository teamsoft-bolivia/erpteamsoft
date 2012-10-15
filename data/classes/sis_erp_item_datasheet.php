<?php session_start(); ?>
<?php

/*
 * @Autor: Max marcelo jimenez T, Pablo Garcia Guaman
 * @Email: maxmjt@gmail.com, garcia_guama_pablo@hotmail.com
 */

require_once '../include.php';
    class sis_erp_item_datasheet
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
            $yaction=$datos['yaction'];
            //echo $datos['xaction'];
            switch ($option)
            {
                case 'read':
                    switch ($yaction) {
                        case 'readdatasheet':
                            $iditem=$datos['iditem'];
                            $datasheets=erp_item_datasheet::find('all',array('conditions'=>array('iditem=?',$iditem),
                                                                             'order'=>'iditemdatasheet desc'));
                            
                            $json='';
                            foreach ($datasheets as $datas) {
                                $json.= $datas->to_json().',';
                            }
                            $json=substr($json, 0,  strlen($json)-1);

                            echo '{"total":"0","results":['.$json.']}';
                            
                        break;

                        default:
                            break;
                    }
                case 'save':
                    switch ($yaction) {
                        case 'insert':
                            
                            
                            $data=array();
                            foreach ($datos as $key => $value) {
                                if ($key!='xaction' && $key!='yaction' && $key!='iditemdatasheet' && $key!='null') {
                                    $data[$key]=$value;
                                }
                            }
                            $newitemdatasheet=  new erp_item_datasheet($data);
                            $newitemdatasheet->save();
                            if ($newitemdatasheet) {
                                echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!"}';
                                
                            }else{
                                echo '{"success":false,"title":"Error:","msg":"No se pudo guardar!!"}';
                            }
                        break;
                                
                        case 'update':
                            $iditemdatasheet=$datos['iditemdatasheet'];
                            
                            $data=array();
                            foreach ($datos as $key => $value) {
                                if ($key!='xaction' && $key!='yaction' && $key!='iditemdatasheet' && $key!='item' && $key!='null') {
                                    $data[$key]=$value;
                                }
                            }   
                            $newitemdatasheet=  erp_item_datasheet::find($iditemdatasheet);
                            $newitemdatasheet->update_attributes($data);
                            $newitemdatasheet->save();
                            if ($newitemdatasheet) {
                                echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!"}';
                                
                            }else{
                                echo '{"success":false,"title":"Error:","msg":"No se pudo guradar!!"}';
                            }
                        break;
                    }
                break;
                
                case 'delete':
                    $itemdatasheet=erp_item_datasheet::find($datos['iditemdatasheet']);
                    $itemdatasheet->delete();
                    if ($itemdatasheet) {
                        echo '{"success":true,"title":"Correcto:","msg":"Se elimino correctamente!!"}';
                    }else{
                        echo '{"success":true,"title":"Correcto:","msg":"No se pudo eliminar!!"}';
                    }
                break;
                
            }
        }
    }

    $xaction=$_POST['xaction'];
    
    $iduser=isset($_SESSION['ERP']['iduser'])?$_SESSION['ERP']['iduser']:0;
    $identerprise=isset($_SESSION['ERP']['identerprise'])?$_SESSION['ERP']['identerprise']:0;

    $item=new sis_erp_item_datasheet($iduser,$identerprise);
    $item->$xaction($_POST);
?>
