<?php
require_once "../../src/controllers/roles.controller.php";
require_once "../../src/guards/admin.guard.php";

$app->group('/admin/roles', function(){
    // Get All Roles
    $this->get('',\RolesController::class.":getAll");
    // Get Single Role
    $this->get('/{id}', \RolesController::class.":getOneById");
    // Add Role
    $this->post('',\RolesController::class.":add");
    // Update Role
    $this->put('/{id}',\RolesController::class.":update");
    // Delete Role
    $this->delete('/{id}',\RolesController::class.":delete");
})->add(new AdminGuardMiddleware());