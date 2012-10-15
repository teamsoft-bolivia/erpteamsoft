<?php session_start(); ?>
<?php

/*
 * @Autor: Pablo Garcia Guaman, Cristhian Valencia, Max Jimenez
 * @Email: garciaguamanpablo@gmail.com, fox_tian@hotmail.com, maxmjt@gmail.com
 */

require_once '../include.php';
    class sis_erpd_salary_discount 
    {
        public $_iduser;
        public $_tablename;
        public $_identerprise;

        public function __construct($usuario,$enterprise) {
            $this->_iduser=$usuario;
            $this->_identerprise=$enterprise;
            $this->_tablename= erpd_salary_discount::table_name();

        }
        
        public function getActualDate($mode){
            $sql="SELECT CURRENT_TIMESTAMP as fecha";
            $result=erpd_txn_document::find_by_sql($sql);
            $res=$result[0]->fecha;
            $res= explode($res, '.');
           
            if ($mode=='N') {
                return $res[0];
            }else{
                return $result[0]->fecha;
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
                        case 'readpayrol':
                            $conditions='';
                            if(isset($datos['idemployee']) && $datos['idemployee']<>''){
                                    $idemployee=$datos['idemployee'];
                                    if($conditions<>''){
                                        $conditions.=" AND sd.idemployee=".$idemployee;
                                        
                                    }else{
                                        $conditions.=" sd.idemployee=".$idemployee;
                                    }
                            }
                            if(isset($datos['iddepartaments']) && $datos['iddepartaments']<>''){
                                    $iddepartaments=$datos['iddepartaments'];
                                    if($conditions<>''){
                                         $conditions.=" AND iddepartaments=".$iddepartaments;
                                    }else{
                                        $conditions.=" iddepartaments=".$iddepartaments;
                                    }
                            }
                            if(isset($datos['idperiod']) && $datos['idperiod']<>''){
                                    $idperiod=$datos['idperiod'];
                                     if($conditions<>''){
                                        $conditions.=" AND sd.period='".$idperiod."'";
                                     }else{
                                         $conditions.=" sd.period='".$idperiod."'";
                                     }
                                   
                            }
                                                     
                            
                            $select="e.idemployee,p.dni||' '||p.dnilocation as dni,p.lastname || ' ' || p.name as name, p.country,p.birthdate,(CASE WHEN sexo.type='Masculino' THEN 'M' ELSE 'F' END) as gender,
                            (SELECT sd.debit FROM erpd_salary_discount sd WHERE sd.idemployee=e.idemployee AND sd.active=true AND sd.typetxn=(SELECT idtype from erp_type where option='tipo_remuneracion' AND alias='sueldo')) AS haberbasico,
                            (SELECT sd.debit FROM erpd_salary_discount sd WHERE sd.idemployee=e.idemployee AND sd.active=true AND sd.typetxn=(SELECT idtype from erp_type where option='tipo_remuneracion' AND alias='bono_antiguedad')) AS bonoantiguedad,
                            (SELECT sd.debit FROM erpd_salary_discount sd WHERE sd.idemployee=e.idemployee AND sd.active=true AND sd.typetxn=(SELECT idtype from erp_type where option='tipo_remuneracion' AND alias='horas_extras')) AS horasextras,
                            (SELECT sd.debit FROM erpd_salary_discount sd WHERE sd.idemployee=e.idemployee AND sd.active=true AND sd.typetxn=(SELECT idtype from erp_type where option='tipo_remuneracion' AND alias='bono_produccion')) AS bonoproduccion,
                            (SELECT SUM(sd.debit) FROM erpd_salary_discount sd WHERE sd.idemployee=e.idemployee AND sd.active=true AND sd.typecompensacion=(SELECT idtype from erp_type where option='tipo_remuneracion' AND alias='otros_bonos')) AS otrosbonos,
                            (SELECT sd.debit FROM erpd_salary_discount sd WHERE sd.idemployee=e.idemployee AND sd.active=true AND sd.typetxn=(SELECT idtype from erp_type where option='tipo_remuneracion' AND alias='dominical')) AS dominical,
                            ((SELECT sd.debit FROM erpd_salary_discount sd WHERE sd.idemployee=e.idemployee AND sd.active=true AND sd.typetxn=(SELECT idtype from erp_type where option='tipo_remuneracion' AND alias='sueldo'))*0.1271) AS afp,
                            ((SELECT sd.debit FROM erpd_salary_discount sd WHERE sd.idemployee=e.idemployee AND sd.active=true AND sd.typetxn=(SELECT idtype from erp_type where option='tipo_remuneracion' AND alias='sueldo'))*0.13) AS rciva,
                            (SELECT SUM(sd.credit) FROM erpd_salary_discount sd WHERE sd.idemployee=e.idemployee AND sd.active=true AND sd.typecompensacion=(SELECT idtype from erp_type where option='tipo_compensacion' AND alias='descuento')) AS otrosdescuentos
                            ";
                            $from="erp_employee AS e";
                            $join="INNER JOIN erp_person p ON p.idperson=e.idperson ";
                            $join.=" INNER JOIN erp_type sexo  ON sexo.idtype=p.gender";
                            $join.=" LEFT OUTER JOIN erpd_salary_discount sd ON sd.idemployee=e.idemployee";
                            $group="p.lastname || ' ' || p.name, p.country,p.birthdate, p.gender,e.idemployee,p.dni||' '||p.dnilocation,sexo.type";
                            $order="p.lastname || ' ' || p.name ASC";
                        
                            
                            try {
                                if($conditions<>''){
                                $payrols= erp_employee::find('all',array('select'=>$select, 'from'=>$from,'joins'=>$join,'conditions'=>$conditions,'group'=>$group,'order'=>$order));
                                }else{
                                $payrols= erp_employee::find('all',array('select'=>$select, 'from'=>$from,'joins'=>$join,'group'=>$group,'order'=>$order));
                                }

                            } catch (Exception $exc) {
                                print_r($exc);
                            }

                            $json='';
                            foreach ($payrols as $payrol) {
                                $json.= $payrol->to_json().',';
                            }
                            $json=substr($json, 0,  strlen($json)-1);

                            echo '{"total":"2","results":['.$json.']}';
                            
                        break;
                    }
                break;
                case 'save':
                    switch ($yaction) {
                        case 'insert':
                           
                        break;
                                
                        case 'update':
                           
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

    $salarydiscount=new sis_erpd_salary_discount($iduser,$identerprise);
    $salarydiscount->$xaction($_POST);

?>
