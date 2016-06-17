<?php
$page='tests';
$path = $_SERVER['DOCUMENT_ROOT'].'/paper/';


$contents = scandir( $path.'content/' );
array_splice($contents, 0, 2 );

foreach ($contents as $key => $value) {
    if  (strpos($value , '.') == true) {

        $value = explode('.' , $value  );
        ($page==$value[0]) ? $status = 'class="active"' : $status=" ";

        echo '<li><a href="/paper/pages/'.$value[0] .'.php" '.$status.'>'. $value[0]. '</a></li> ';
    }  else {
        $dircontents = scandir( $path.'content/'.$value );
        array_splice($dircontents, 0, 2 );

        echo '<li><a href="#" class="dir">'.$value.'</a><ul>';
            foreach ($dircontents as $key => $value) {
                get_dir_links($page, $dircontents, $key, $value);
            }
        echo '</ul></li>';
    }
}

function get_dir_links($page, $array, $key , $value) {
    if  (strpos($value , '.') == true) {
        $value = explode('.' , $value  );
        ($page==$value[0]) ? $status = 'class="active"' : $status=" ";

        echo '<li><a href="/paper/pages/'.$value[0] .'.php" '.$status.'>'. $value[0]. '</a></li> ';
    }
}

<li>
    <a <?php if ($page=='flex') echo 'class="active"'; ?> href="/paper/pages/flex.php">Flex</a>
</li>
<li><a <?php if ($page=='sass') echo 'class="active"'; ?> href="/paper/pages/sass.php">SASS</a></li>
<li><a <?php if ($page=='grunt') echo 'class="active"'; ?> href="/paper/pages/grunt.php"> Grunt </a></li>
<li><a <?php if ($page=='angular') echo 'class="active"'; ?> href="/paper/pages/angular.php"> Angular </a></li>
<li><a <?php if ($page=='test') echo 'class="active"'; ?> class="dir" href="#"> paper </a>
    <ul class="dropdown">
        <li><a href="#">Link 1</a></li>
        <li><a href="#">Link 2</a></li>
        <li><a href="#">Link 3</a></li>
    </ul>
</li>
?>
