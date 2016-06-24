<?php
$dir = $_SERVER['DOCUMENT_ROOT']. '/paper/content/';

//read the menu.JSON File and get the titles
$menu_order = file_get_contents($_SERVER['DOCUMENT_ROOT'].'/paper/menu.json');
$menu_order = json_decode($menu_order);
$contentfiles= scandir($dir);
array_splice($contentfiles, 0, 2 );
$i=1;
//get names of papers from Content Folder
foreach ($contentfiles as $key => $value) {
	$value = explode('.' , $value  );
	$contents[$i]['title'] = ($value[0]);
	$contents[$i]['id'] = "1_".$key;
	$i++;
}

// $menu_order is type stdClass and we want to check if it's empty
if ( $menu_order == new stdClass() )
{
  /*
	*echo "$menu_order is empty"; // JSON: {}
	*/
	$menuJsonIsEmpty = '1';
	// print_r ($contentfiles);
	// write to titles Array
	foreach ($contents  as $value){
	    $titles[] = $value['title'];
	}




} else {
	//menu is filled
	$menuJsonIsEmpty = '0';
	foreach ($menu_order  as $value){
		$titles[] = $value->title;
	}

}
?>
<script type="text/javascript">
	var menuJsonIsEmpty = <?php echo $menuJsonIsEmpty; ?>;
	var contentfiles = <?php echo json_encode($contents); ?>;
	</script>
<?php

foreach ($titles as $key => $value) {
    echo '<div id="'. $value .'" class="slide" data-anchor="'. $value .'">';
		// echo '<div class="content_wrapper">';

		echo '<h1 class="text-center">'.$value.'</h1>';
		echo '<div class="formtarget"></div>';
		echo '<article class="scrollable">';
		 include ($dir.$value.'.html');
    echo "</article></div>";

}



?>
