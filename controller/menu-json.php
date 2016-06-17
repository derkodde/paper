<?php
$path = $_SERVER['DOCUMENT_ROOT'].'/paper/';

   $menu_data= $_POST['json'];
   echo "POST:";
   print_r($_POST);

   /* sanity check */
   if (json_decode($menu_data) != null)
   {
     $menu_file = $path . 'menu.json';

     $write_menu = fopen($menu_file,'w');
     fwrite($write_menu, $menu_data);
     fclose($write_menu);
   }
   else
   {
     echo "invalid JSON";// user has posted invalid JSON, handle the error
   }
?>
