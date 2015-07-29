<header>
  <div id="home">
    <a href="/"></a>
  </div>
  <span id="home-divider"></span>
  <div style="clear:both;"></div>
</header>
<div id="map"></div>
<div id="content">
  <section id="page-main">
    <h1><?php print $title; ?></h1>
    <article>
      <?php print render($content['body']); ?>
    </article>
  </section>
</div>