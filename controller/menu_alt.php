<div class="menu-container">
    <div class="label">
        <a <?php if ($page=='home') echo 'class="active"'; ?> href="/paper/index.php"> paper </a>
    </div>

    <nav class="menu">
        <ul>

            <?php

            $contents = scandir( $path.'pages/' );
            array_splice($contents, 0, 2 );

            foreach ($contents as $key => $value) {
                // get html elements
                if  (strpos($value , '.') == true) {

                    $value = explode('.' , $value  );
                    ($page==$value[0]) ? $status = 'class="active"' : $status=" ";

                    echo '<li><a href="/paper/pages/'.$value[0] .'.php" '.$status.'>'. $value[0]. '</a></li> ';

                    // get directories
                }  else {
                    echo '<li><a href="#" class="dir">'.$value.'</a><ul class="dropdown">';

                    $dircontents = scandir( $path.'pages/'.$value);
                    $dir = $value;
                    array_splice($dircontents, 0, 2 );

                        foreach ($dircontents as $key => $value) {
                            get_dir_links($page, $dir,  $dircontents, $key, $value);
                        }
                    echo '</ul></li>';
                }
            }

            function get_dir_links($page, $dir, $array, $key , $value) {
                if  (strpos($value , '.') == true) {
                    $value = explode('.' , $value  );
                    ($page==$value[0]) ? $status = 'class="active"' : $status=" ";
                    echo '<li><a href="/paper/pages/'.$dir.'/'.$value[0].'.php" '.$status.'>'. $value[0]. '</a></li> ';
                }
            } ?>
        </ul>
    </nav>
</div>
