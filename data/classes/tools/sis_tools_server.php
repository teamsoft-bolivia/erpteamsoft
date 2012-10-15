<?php

/*
 * @Autor: Pablo Garcia G.
 * @Email: garcia_guaman_pablo@hotmail.com
 */

    class sis_tools_server
    {
        public $_iduser;
        public $_identerprise;

        public function __construct($usuario,$enterprise) {
            $this->_iduser=$usuario;
            $this->_identerprise=$enterprise;

        }
        public static function getActualDate($mode){
            
            $sql="SELECT CURRENT_TIMESTAMP as fecha";
            $result=erp_type::find_by_sql($sql);
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
      
    }
?>
