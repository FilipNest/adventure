<?php
/**
 * @file
 * adventure_core.features.inc
 */

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
