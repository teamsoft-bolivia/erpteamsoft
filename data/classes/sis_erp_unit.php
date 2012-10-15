<?php session_start(); ?>
<?php

/*
 * @Autor: Max marcelo jimenez T, Pablo Garcia Guaman,Cristhian Valencia
 * @Email: maxmjt@gmail.com, garcia_guama_pablo@hotmail.com, fox_tian@hotmail.com
 */

require_once '../include.php';
    class sis_erp_unit
    {
        public $_iduser;
        public $_tablename;
        public $_identerprise;

        public function __construct($usuario,$enterprise) {
            $this->_iduser=$usuario;
            $this->_identerprise=$enterprise;
            $this->_tablename= erp_unit::table_name();

        }
        
        public function getActualDate($mode){
            $sql="SELECT CURRENT_TIMESTAMP as fecha";
            $result=erp_unit::find_by_sql($sql);
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
            switch ($option)
            {
                case 'readunit':
                   
                            $sql="SELECT u.* FROM erp_unit u WHERE u.identerprise=$this->_identerprise ORDER BY u.idunit ASC";
                            $itemunits=erp_unit::find_by_sql($sql);
                            $total=count($itemunits);
                            
                            $json='';
                            foreach ($itemunits as $datas) {
                            $json.= $datas->to_json().',';
                            }
                            $json=substr($json, 0,  strlen($json)-1);

                            echo '{"total":"'.$total.'","results":['.$json.']}';
                            
                   
                break;
                case 'deleteunit':
                    
                    $iditemlistprice=(int)$datos['id'];
                    $id= erp_unit::find_by_sql("SELECT * FROM erp_item_unit where idunit=$iditemlistprice");
                    
                    $total=count($id);
                    if($total>0){
                        echo '{"success":false,"title":"Advertencia:","msg":"Existe asignada esta unidad a un item!!"}';
                    }else{
                           $post = erp_unit::find($iditemlistprice);
                   
                           $result=$post->delete();
                            if ($result) {
                                echo '{"success":true,"title":"Correcto:","msg":"Se elimino correctamente!!"}';
                                
                            }else{
                                echo '{"success":false,"title":"Error:","msg":"No se pudo guardar!!"}';
                            }
                    }
                   
                    
                break;
                case 'createunit':
                    $data=array();
                    //echo 'entro';
                    $data['unitname']=$datos['unitname'];
                    $data['description']=$datos['desccription'];
                    $data['alias']=(float)$datos['alias'];
                    $data['active']='true';
                    $data['identerprise']=$this->_identerprise;
                    //print_r($data);
                   $result=erp_unit::create($data);
                            if ($result) {
                                echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!"}';
                                
                            }else{
                                echo '{"success":false,"title":"Error:","msg":"No se pudo guardar!!"}';
                            } 
                break;
                case 'updateunit':
                    
                    $dataJson1=json_decode($datos['litaprecio']);
                    $data=array();
                    
                    if($dataJson1->idunit!=0){
                         if($dataJson1->active==true){
                            $bool='true';
                        }else{
                            $bool='false';
                        };
                        $data['unitname']=$dataJson1->unitname;
                        $data['description']=$dataJson1->description;                    
                        $data['alias']=$dataJson1->alias;
                        $data['active']=$bool;                    
                        $options['idunit']=(int)$dataJson1->idunit;

                        $result=erp_unit::update_all(array('set'=>$data,'conditions'=>$options));
                        if ($result) {
                            echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!"}';

                        }else{
                            echo '{"success":false,"title":"Error:","msg":"No se pudo guardar!!"}';
                        }  
                    }else{
                        $data['unitname']=$dataJson1->unitname;
                        $data['description']=$dataJson1->description;
                        $data['alias']=$dataJson1->alias;
                        $data['active']='true';
                        $data['identerprise']=$this->_identerprise;
                        //print_r($data);
                        $result=erp_unit::create($data);
                            if ($result) {
                                echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!"}';
                                
                            }else{
                                echo '{"success":false,"title":"Error:","msg":"No se pudo guardar!!"}';
                            }
                                       
                    }
                    
                    
                break;
				
               
                
                 
            }
        }
    }

    $xaction=$_POST['xaction'];
    
    $iduser=isset($_SESSION['ERP']['iduser'])?$_SESSION['ERP']['iduser']:0;
    $identerprise=isset($_SESSION['ERP']['identerprise'])?$_SESSION['ERP']['identerprise']:0;

    $itemunit=new sis_erp_unit($iduser,$identerprise);
    $itemunit->$xaction($_POST);
?>
