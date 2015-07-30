<?php

//Check if current user is the owner of the Adventure. This is also available as a A.data.owner paramater on the clientside.
global $user;

//Check if current adventure set

$flags = flag_get_user_flags('node', $entity_id = NULL, $user->uid, $sid = NULL);

$owner = false;

if($flags){

  $flags = $flags['current_adventure'];
  $flags = array_values($flags);
  $flags = array_shift($flags);
  $flag = (string)$flags->entity_id;

  if($flag === $node->nid && $user->uid === $node->uid){

    $owner = true;

  }

} 

?>

  <section ng-controller="main">

    <header>

      <button ng-show="admin === 1" ng-class="{selected: section == 'edit'}" ng-click="section = 'edit'">Edit</button>
     
    <?php
      if ($user->uid === $node->uid) {
   
    print flag_create_link('current_adventure', $node->nid);

  }
?>
      
      <button id="map-button" ng-class="{selected: section == 'mapView'}" ng-click="section = 'mapView'">Map</button>
      <button id="messages-button" ng-class="{selected: section == 'messages'}" ng-click="section = 'messages'">Messages</button>
      <button id="self-button" ng-class="{selected: section == 'things'}" ng-click="section = 'things'">Self</button>

      <div id="home">
        <a href="/"></a>
      </div>
      <span id="home-divider"></span>

    </header>

    <section id="edit" ng-show="section == 'edit'">

      <?php if ($owner): ?>

        <?php print views_embed_view('editable_things', 'block'); ?>

          <?php endif; ?>

            <div id="thing-form"></div>

    </section>

    <section id="choices" ng-show="section == 'choices'">

      <h1>{{currentThing.name}}</h1>
      <p>
        <i>{{currentThing.description}}</i>
      </p>
      <p>
        Current state:
        <br /> {{currentThing.value}}
      </p>

      <h2>Choices</h2>
      <ul>
        <li class="choice" ng-if="choice.visibility" ng-repeat="choice in currentThing.choices" ng-click="choice.trigger()" ;>{{choice.text}}</li>
      </ul>

    </section>

    <section id="messages" ng-show="section == 'messages'">

      <article class="message" ng-repeat="item in messages | orderBy:'-timestamp'">

        <h1>{{item.title}}</h1>
        <p>{{item.message}}</p>
        <br />
        <small>{{item.timestamp | date:'yyyy-MM-dd HH:mm:ss'}}</small>


      </article>
    </section>

    <section id="things" ng-show="section == 'things'">

      <li ng-repeat="thing in things" ng-if="thing.visibility && thing.location == 'home'">
        <b>{{thing.name}}</b>
        <br />
        <span>{{thing.description}}</span>
        <br />
        <span>{{thing.location}}</span>
        <br />
        <span>{{thing.value}}</span>
        <button ng-click=selectThing(thing)>Open</button>
      </li>

    </section>

    <section id="mapview" ng-show="section == 'mapView'">

      <div id="map"></div>

    </section>

    <?php

global $base_url;

drupal_add_js('var A = {};', array('type' => 'inline'));

drupal_add_js(drupal_get_path('module', 'adventure_core') . "/js/things.js");
drupal_add_js(drupal_get_path('module', 'adventure_core') . "/js/requirements.js");
drupal_add_js(drupal_get_path('module', 'adventure_core') . "/js/choices.js");
drupal_add_js(drupal_get_path('module', 'adventure_core') . "/js/actions.js");
  drupal_add_js('https://ajax.googleapis.com/ajax/libs/angularjs/1.4.3/angular.js', 'external');

drupal_add_js('https://api.tiles.mapbox.com/mapbox.js/v2.2.1/mapbox.js', 'external');

drupal_add_css('https://api.tiles.mapbox.com/mapbox.js/v2.2.1/mapbox.css', 'external');


$options = array(
    'method' => 'GET',
    'timeout' => 15,
  );

  //Get a request back, validate it and set two cookies on the client to make JavaScript communication simpler.

  $result = drupal_http_request($base_url . "/fetch/game/".arg(1), $options);
  $result = $result->data;

drupal_add_js('A.data ='.$result.';', array('type' => 'inline'));

global $user;

drupal_add_js('A.data.owner ='.$owner.';', array('type' => 'inline'));

drupal_add_js(drupal_get_path('module', 'adventure_core') . "/js/front.js");

?>
