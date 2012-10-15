<?php session_start(); ?>
<?php
/*
 * @Autor: Pablo Garcia guaman
 * @Email: garcia_guaman_pablo@hotmail.com
 */

require_once '../include.php';
    class sis_erp_user 
    {
        public $_iduser;
        public $_tablename;

        public function __construct($iduser) {
            $this->_iduser=$iduser;
            $this->_tablename=  erp_user::table_name();
        }
        public function __call($option,$att) {
            $datos=$att[0];
            switch ($option)
            {
                case 'isLoged':
                    if ($this->_iduser!=0) {
                       $users=  erp_user::find('first',array('conditions'=>array('iduser=?',  $this->_iduser)));
                       $enterprise=  crm_enterprise::find('first',array('conditions'=>array('id_enterprise=?',$users->identerprise)));
                       $result=array("success"=>true,"login"=>$users->login,"enterprise"=>$enterprise->bussiness_name);
                       echo json_encode($result);
                    }else{
                       $result=array("success"=>false);
                       echo json_encode($result);
                    }
                break;
                case 'login':
                    
                    //$types=  erp_type::find_by_sql("SELECT * FROM ".$this->_tablename." WHERE login=? AND password=? AND active=true", array($datos['login'],$datos['password']));
                    $user= erp_user::find('first',array('conditions'=>array('login=? AND password=? AND active=?',$datos['login'],$datos['password'],true)));
                    
                    if ($user) {
                        $enterprise=  crm_enterprise::find('first',array('conditions'=>array('id_enterprise=?',$user->identerprise)));
                        $_SESSION['ERP']['iduser']=$user->iduser;
                        $_SESSION['ERP']['identerprise']=$user->identerprise;
                        $message="Usuario: ".$user->login."<br/>Empresa:".$enterprise->bussiness_name;
                       echo '{"success":true,"title":"Bienvenido!!","msg":"'.$message.'","login":"'.$user->login.'","enterprise":"'.$enterprise->bussiness_name.'"}'; 
                    }else{
                       echo '{"success":false,"title":"Error!!","msg":"Usuario o Password Incorrecto!!"}'; 
                    }
                    
                    
                break;
                case 'logout':
                    unset($_SESSION['ERP']);
                    echo '{"success":true,"title":"Gracias:","msg":"Gracias por usar nuestro Sistema!!"}'; 
                break;
            }
        }
    }
    
    $iduser=isset($_SESSION['ERP']['iduser'])?$_SESSION['ERP']['iduser']:0;
    $xaction=$_POST['xaction'];
    $tipo=new sis_erp_user($iduser);
    $tipo->$xaction($_POST);
?>
