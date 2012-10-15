<?php

/*
 * @Autor: Max marcelo jimenez T,Cristhian Valencia, Pablo Garcia G.
 * @Email: maxmjt@gmail.com, ,garcia_guaman_pablo@hotmail.com
 */
session_start();

require_once '../include.php';
    class sis_erp_provider_contact 
    {
        public $_iduser;
        public $_tablename;
        public $_identerprise;

        public function __construct($usuario,$enterprise) {
            $this->_iduser=$usuario;
            $this->_identerprise=$enterprise;
            $this->_tablename= erp_provider_contact::table_name();

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
                    $start=$datos['start'];
                    $limit=$datos['limit'];
                    if(isset($datos['categoria'])){
                        $categoria=$datos['categoria'];
                    }else{
                        $categoria=-1;
                    }
                    
                    $idItem=$datos['iditem'];
                    $arreglo= array();
                    $total=0;
                   
                    $sql ="SELECT 
                         
                            p.idprovider
                            , p.providername
                            , t.type as country
                            
                           
                            FROM erp_provider p
                            INNER JOIN erp_category_provider cp ON p.idprovider=cp.idprovider
                            INNER JOIN erp_category c ON c.idcategory=cp.idcategory
                            INNER JOIN erp_item_category ic ON ic.idcategory=c.idcategory
                            INNER JOIN erp_item i ON i.iditem=ic.iditem
                            INNER JOIN erp_type t ON t.idtype=p.idcountry
                            INNER JOIN erp_type t2 ON t2.idtype=c.idcategoricalgrouping

                            WHERE i.iditem=$idItem and p.identerprise=$this->_identerprise and c.idcategoricalgrouping=$categoria
                            GROUP BY 
                           
                            p.idprovider
                            ,p.providername
                                                 
                            ,t.type";
                    
                    $provedores= erp_provider::find_by_sql($sql);
                    $total=count($provedores);
                  
                  
                    foreach ($provedores as $provedor) {

                        $arreglo[]=array(
                       
                        "idprovider"=>$provedor->idprovider,
                        "providername"=>$provedor->providername,
                        "country"=>$provedor->country
                       
                        );

                    }
                  
                     $o = array(
                        "success"=>true
                        ,"total"=>$total
                        ,"results"=>$arreglo
                       

                    );
                    
                  echo json_encode($o);
                    
                break;
                case 'readContactos':
                     $idprovider=$datos['idprovider'];  
                   if ($idprovider!='') {
                    $sql ="SELECT * FROM $this->_tablename WHERE idprovider=$idprovider ORDER BY idprovider ASC";
                    
                    $provedores= erp_provider::find_by_sql($sql);
                    $total=count($provedores);
                    $json='';
                    foreach ($provedores as $datas) {
                    $json.= $datas->to_json().',';
                    }
                    $json=substr($json, 0,  strlen($json)-1);

                    echo '{"total":"'.$total.'","results":['.$json.']}';
                   }else{
                        echo '{"total":"","results":[]}';
                    }
                    
                break;
                
                case 'readcbocontactos':
                    $idprovider=$datos['idprovider']; 
                    if ($idprovider!='') {
                        $sql ="SELECT * FROM $this->_tablename WHERE idprovider=$idprovider ORDER BY idprovider ASC";
                        $conditions=array("idprovider=?",$datos['idprovider']);
                        $provedores= erp_provider_contact::all(array('conditions'=>$conditions));
                        $total=count($provedores);
                        $json='';
                        foreach ($provedores as $datas) {
                        $json.= $datas->to_json().',';
                        }
                        $json=substr($json, 0,  strlen($json)-1);

                        echo '{"total":"'.$total.'","results":['.$json.']}';
                    }else{
                        echo '{"total":"","results":[]}';
                    }
                    
                break;
                
                case 'updateCreateContactos':
                    
                    $data=array();
                    //echo 'entro';
                    //$data['idprovider']=$datos['idprovider'];
                    $dataJson1=json_decode($datos['valores']);
                    
                    
                    if($datos['idprovidercontact']==0){
                        if($dataJson1->active==true){
                            $bool='true';
                        }else{
                            $bool='false';
                        };
                        $data['contactname']=$dataJson1->contactname;
                        $data['position']=$dataJson1->position;
                        $data['phones']=$dataJson1->phones;
                        $data['movilephone']=$dataJson1->movilephone;
                        $data['active']=$bool;
                        $data['idprovider']=$datos['idprovider'];
                                               
                        //print_r($data);
                       $result=erp_provider_contact::create($data);
                            if ($result) {
                                echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!"}';
                                
                            }else{
                                echo '{"success":false,"title":"Error:","msg":"No se pudo guardar!!"}';
                            }  
                    }else{
                        if($dataJson1->active==true){
                            $bool='true';
                        }else{
                            $bool='false';
                        };
                        $data['contactname']=$dataJson1->contactname;
                        $data['position']=$dataJson1->position;
                        $data['phones']=$dataJson1->phones;
                        $data['movilephone']=$dataJson1->movilephone;
                        $data['active']=$bool;                   
                        $options['idprovidercontact']=(int)$datos['idprovidercontact'];

                        $result=erp_provider_contact::update_all(array('set'=>$data,'conditions'=>$options));
                        if ($result) {
                            echo '{"success":true,"title":"Correcto:","msg":"Se guardo correctamente!!"}';

                        }else{
                            echo '{"success":false,"title":"Error:","msg":"No se pudo guardar!!"}';
                        }
                    }
                    
                    
                break;
                case 'deleteTransaction':
                    
                    $iditemlistprice=(int)$datos['id'];
                    //$id= erp_category_provider::find_by_sql("SELECT * FROM erp_category_provider where idprovider=$iditemlistprice");
                    
                    //$total=count($id);
                   // if($total>0){
                      //  echo '{"success":false,"title":"Advertencia:","msg":"Existe asignado este proveedor!!"}';
                   // }else{
                           $post = erp_provider_contact::find($iditemlistprice);
                   
                           $result=$post->delete();
                            if ($result) {
                                echo '{"success":true,"title":"Correcto:","msg":"Se elimino correctamente!!"}';
                                
                            }else{
                                echo '{"success":false,"title":"Error:","msg":"No se pudo guardar!!"}';
                            }
                   // }
                   
                    
                break;
                
               
            }
        }
    }
   
    
    if (!isset($_POST['yaction'])) {
        $_POST['yaction']='';
    }
    
    if (!isset($_POST['xaction'])) {
        $_POST['xaction']='update';
    }
      $xaction=$_POST['xaction'];
    
     $iduser=isset($_SESSION['ERP']['iduser'])?$_SESSION['ERP']['iduser']:0;
     $identerprise=isset($_SESSION['ERP']['identerprise'])?$_SESSION['ERP']['identerprise']:0;
     
    $provider=new sis_erp_provider_contact($iduser,$identerprise);
    $provider->$xaction($_POST);
?>
