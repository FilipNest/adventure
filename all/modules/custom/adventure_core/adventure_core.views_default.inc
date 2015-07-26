<?php
/**
 * @file
 * adventure_core.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function adventure_core_views_default_views() {
  $export = array();

  $view = new view();
  $view->name = 'thing_picker';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'Thing picker';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'full';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['row_plugin'] = 'fields';
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  /* Sort criterion: Content: Post date */
  $handler->display->display_options['sorts']['created']['id'] = 'created';
  $handler->display->display_options['sorts']['created']['table'] = 'node';
  $handler->display->display_options['sorts']['created']['field'] = 'created';
  /* Contextual filter: Content: Adventure reference (field_adventure_reference) */
  $handler->display->display_options['arguments']['field_adventure_reference_target_id']['id'] = 'field_adventure_reference_target_id';
  $handler->display->display_options['arguments']['field_adventure_reference_target_id']['table'] = 'field_data_field_adventure_reference';
  $handler->display->display_options['arguments']['field_adventure_reference_target_id']['field'] = 'field_adventure_reference_target_id';
  $handler->display->display_options['arguments']['field_adventure_reference_target_id']['default_action'] = 'default';
  $handler->display->display_options['arguments']['field_adventure_reference_target_id']['default_argument_type'] = 'php';
  $handler->display->display_options['arguments']['field_adventure_reference_target_id']['default_argument_options']['code'] = 'global $user;
$flags = flag_get_user_flags(\'node\', $entity_id = NULL, $user->uid, $sid = NULL);
$flags = $flags[\'current_adventure\'];
$flags = array_values($flags);
$flags = array_shift($flags);
$flag = (string)$flags->entity_id . "+" . "1";
return $flag;';
  $handler->display->display_options['arguments']['field_adventure_reference_target_id']['summary']['number_of_records'] = '0';
  $handler->display->display_options['arguments']['field_adventure_reference_target_id']['summary']['format'] = 'default_summary';
  $handler->display->display_options['arguments']['field_adventure_reference_target_id']['summary_options']['items_per_page'] = '25';
  $handler->display->display_options['arguments']['field_adventure_reference_target_id']['break_phrase'] = TRUE;
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'thing' => 'thing',
  );

  /* Display: Entity Reference */
  $handler = $view->new_display('entityreference', 'Entity Reference', 'entityreference_1');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '0';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'entityreference_style';
  $handler->display->display_options['style_options']['search_fields'] = array(
    'title' => 'title',
  );
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'entityreference_fields';
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $export['thing_picker'] = $view;

  return $export;
}
