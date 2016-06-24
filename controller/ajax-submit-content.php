<?php

$postdata = ($_POST);
$content = $postdata['content'];
$page = $postdata['currPage'];
$path = $_SERVER['DOCUMENT_ROOT'].$page ;
$write_file = fopen( $path , 'w');
fwrite($write_file, $content);
fclose($write_file);

?>
