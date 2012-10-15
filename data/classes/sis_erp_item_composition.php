<?php session_start(); ?>
<?php

/*
 * @Autor: Pablo Garcia Guaman
 * @Email: garcia_guaman_pablo@hotmail.com
 */

require_once '../include.php';
    class sis_erp_item_composition 
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
                            foreach ($datos as $key => $value) {
                                if ($key!='xaction' && $key!='yaction' && $key!='description' && $key!='iditemcomposition' && $key!='null') {
                                    $data[$key]=$value;
                                }
                            }
                            $newitemcom=  new erp_item_composition($data);
                            $newitemcom->save();
                            if ($newitemcom) {
                                $newitemcom->save();
                                echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!"}';
                                
                            }else{
                                echo '{"success":false,"title":"Error:","msg":"No se pudo guardar!!"}';
                            }
                        break;
                                
                        case 'update':
                            $iditemcomp=$datos['iditemcomposition'];
                            $active;
                            if (!isset($datos['active'])) $active='false';
                            else $active='true';
                            $data=array();
                            foreach ($datos as $key => $value) {
                                if ($key!='xaction' && $key!='yaction' && $key!='iditem' && $key!='null' && $key!='description' && $key!='iditemcomposition') {
                                    $data[$key]=$value;
                                }
                            }
                           $newitemcom= erp_item_composition::find($iditemcomp);
                            $newitemcom->update_attributes($data);
                            $newitemcom->save();
                            if ($newitemcom) {
                                $newitemcom->active=$active;
                                $newitemcom->save();
                                echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!"}';
                                
                            }else{
                                echo '{"success":false,"title":"Error:","msg":"No se pudo guardar!!"}';
                            }
                        break;
                    }
                break;
                
                
                case 'readcomposition':
                    $iditem=$datos['iditem'];
                    $join='LEFT OUTER JOIN erp_item ei ON(ei.iditem=erp_item_composition.iditemchild)
                           LEFT OUTER JOIN erp_unit eu ON(eu.idunit=erp_item_composition.idunitcomposition)';
                    $items=  erp_item_composition::find('all',
                               array('select'=>'erp_item_composition.*,ei.code,ei.description,eu.unitname',
                                     'conditions'=>array('erp_item_composition.iditem=?',$iditem),'joins'=>$join,'order'=>'erp_item_composition.iditemcomposition asc'));

                    $json='';
                    foreach ($items as $datas) {
                    $json.= $datas->to_json().',';
                    }
                    $json=substr($json, 0,  strlen($json)-1);

                    echo '{"total":"0","results":['.$json.']}';
                break;
                
                 case 'delete':
                    $itemcomp=  erp_item_composition::find($datos['iditemcomposition']);
                    $itemcomp->delete();
                    if ($itemcomp) {
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
     
    $itemcom=new sis_erp_item_composition($iduser,$identerprise);
    $itemcom->$xaction($_POST);
?>
