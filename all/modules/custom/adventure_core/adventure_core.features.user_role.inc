<?php
/**
 * @file
 * adventure_core.features.user_role.inc
 */

/**
 * Implements hook_user_default_roles().
 */
function adventure_core_user_default_roles() {
  $roles = array();

  // Exported role: super administrator.
  $roles['super administrator'] = array(
    'name' => 'super administrator',
    'weight' => 2,
  );

  return $roles;
}
