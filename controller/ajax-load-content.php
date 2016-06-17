<?php

$menu_order = file_get_contents($_SERVER['DOCUMENT_ROOT'].'/paper/menu.json');
$menu_order = json_decode($menu_order);

foreach ($menu_order  as $value){
    $titles[] = $value->title;
}
// print_r($titles);

$dir = $_SERVER['DOCUMENT_ROOT']. '/paper/content/';


foreach ($titles as $key => $value) {
    echo '<div id="'. $value .'" class="slide" data-anchor="'. $value .'">';

		echo '<h1 class="text-center">'.$value.'</h1>';
		echo '<div class="formtarget"></div>';
		echo '<article class="scrollable">';
		 include ($dir.$value.'.html');
    echo "</article></div>";
}



?>
