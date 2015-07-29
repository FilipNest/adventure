<div id="map"></div>
<div id="content">
  <section id="page-main">
<?php

    print "<img class='front-logo' src='/".drupal_get_path('theme', 'adventure')."/images/logo.png' />";

?>
      <article>
        <?php print "<h1>".$title."</h1>"; ?>
        <?php print render($content['body']); ?>
      </article>
  </section>
</div>
