<?php
$path = $_SERVER['DOCUMENT_ROOT'].'/paper/';
$page = 'home';

?>
<!DOCTYPE html>
<html>
  <head>
    <?php include_once ($path.'/partials/head.php'); ?>
  </head>
    <body>
      <div id="fullpage" class="site-wrapper">
        <div class="section" class="content-wrapper">
          <section  class="main-content">
            <section class="main-content">
              <article>
                <h1 class="text-center">Was ist "paper"?&nbsp;</h1>
                  <p>"paper" ist einfach wie ein gutes, altes, wei&szlig;es St&uuml;ck Papier!</p>
                  <p><a href=""><img src="media/rame-de-papier-pro-massicot.gif" alt="paper" width="500" height="375" /></a></p>
                  <p>&nbsp;</p>
            </article>
          </section>
        </div>
      </div>
    <?php include_once 'partials/nav.html'; ?>
  </body>
</html>
