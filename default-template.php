<?php
$path = $_SERVER['DOCUMENT_ROOT'].'/paper/';
?>

<!DOCTYPE html>
<html lang="de">
  <head>
    <?php include_once ($path.'/partials/head.php'); ?>
  </head>
  <body>
      <div id="fullpage" class="site-wrapper">
        <div class="section" class="content-wrapper">
            <?php include_once 'controller/load-content.php'; ?>
        </div>
      </div>
			<?php include_once 'partials/nav.html'; ?>
  </body>
</html>
