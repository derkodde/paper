<?php

$menu_order = file_get_contents($path.'menu.json');
$menu_order = json_decode($menu_order);

foreach ($menu_order  as $value){
    $titles[] = $value->title;
}
// print_r($titles);

$dir = $path. 'content/';

foreach ($titles as $key => $value) {
    echo '<div id="'. $value .'" class="slide" data-anchor="'. $value .'">';
		
		echo '<h1 class="text-center">'.$value.'</h1>';

		echo '<article class="scrollable">';
		 include ($dir.$value.'.html');
    echo "</article></div>";
}



?>
