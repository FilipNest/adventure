<div id="content">
  <section id="page-main">
<?php

    print "<a href='/'><img class='front-logo' src='/".drupal_get_path('theme', 'adventure')."/images/logo.png' /></a>";

?>

      <article>
        <?php print "<h1>".$title."</h1>"; ?>
        
        <?php
$menu = menu_tree('main-menu');
 print drupal_render($menu); 

        ?>
        
        <?php print render($content['body']); ?>
      </article>
  </section>
</div>
