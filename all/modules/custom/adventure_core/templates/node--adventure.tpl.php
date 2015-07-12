<?php

global $base_url;

drupal_add_js('var A = {};', array('type' => 'inline'));

drupal_add_js(drupal_get_path('module', 'adventure_core') . "/js/things.js");
drupal_add_js(drupal_get_path('module', 'adventure_core') . "/js/requirements.js");
drupal_add_js(drupal_get_path('module', 'adventure_core') . "/js/choices.js");
drupal_add_js(drupal_get_path('module', 'adventure_core') . "/js/actions.js");

$options = array(
    'method' => 'GET',
    'timeout' => 15,
  );

  //Get a request back, validate it and set two cookies on the client to make JavaScript communication simpler.

  $result = drupal_http_request($base_url . "/fetch/game/".arg(1), $options);
  $result = $result->data;

drupal_add_js('A.data ='.$result.';', array('type' => 'inline'));

drupal_add_js(drupal_get_path('module', 'adventure_core') . "/js/front.js");