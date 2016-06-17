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
        <div class="site-wrapper">
            <!-- <?php //include_once $path.'/partials/menu.php'; ?> -->

            <div class="content-wrapper">
                <nav id="page-settings" >
                    <?php include_once 'partials/page-settings.php'; ?>
                </nav>
                <section class="main-content">
                    <article>
                        <h1>Was ist "paper"?&nbsp;</h1>
                        <p>"paper" ist einfach wie ein gutes, altes, wei&szlig;es St&uuml;ck Papier!</p>
                        <p>&nbsp;<img src="media/rame-de-papier-pro-massicot.gif" alt="paper" width="500" height="375" /></p>
                        <p>&nbsp;</p>

                    </article>
                </section>
            </div>
            <footer><?php include_once $path.'/partials/footer.php'; ?> </footer>
        </div>
    </body>
</html>
