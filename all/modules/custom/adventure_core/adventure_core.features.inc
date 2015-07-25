<?php
/**
 * @file
 * adventure_core.features.inc
 */

/**
 * Implements hook_views_api().
 */
function adventure_core_views_api($module = NULL, $api = NULL) {
  return array("api" => "3.0");
}

/**
 * Implements hook_flag_default_flags().
 */
function adventure_core_flag_default_flags() {
  $flags = array();
  // Exported flag: "Current adventure".
  $flags['current_adventure'] = array(
    'entity_type' => 'node',
    'title' => 'Current adventure',
    'global' => 0,
    'types' => array(
      0 => 'adventure',
    ),
    'flag_short' => 'Flag this item',
    'flag_long' => '',
    'flag_message' => '',
    'unflag_short' => 'Unflag this item',
    'unflag_long' => '',
    'unflag_message' => '',
    'unflag_denied_text' => '',
    'link_type' => 'normal',
    'weight' => 0,
    'show_in_links' => array(
      'full' => 0,
      'teaser' => 0,
      'rss' => 0,
      'token' => 0,
    ),
    'show_as_field' => 0,
    'show_on_form' => 0,
    'access_author' => '',
    'show_contextual_link' => FALSE,
    'i18n' => 0,
    'api_version' => 3,
    'module' => 'adventure_core',
    'locked' => array(
      0 => 'name',
    ),
  );
  return $flags;

}

/**
 * Implements hook_node_info().
 */
function adventure_core_node_info() {
  $items = array(
    'adventure' => array(
      'name' => t('Adventure'),
      'base' => 'node_content',
      'description' => t('An adventure.'),
      'has_title' => '1',
      'title_label' => t('Name of the adventure'),
      'help' => '',
    ),
    'thing' => array(
      'name' => t('Thing'),
      'base' => 'node_content',
      'description' => '',
      'has_title' => '1',
      'title_label' => t('Name of thing'),
      'help' => '',
    ),
  );
  drupal_alter('node_info', $items);
  return $items;
}
