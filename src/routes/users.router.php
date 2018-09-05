<?php
require_once "../src/controllers/users.controller.php";
require_once "../src/guards/admin.guard.php";

$app->group('/api/admin/usuarios', function(){
    // Get All Users
    $this->get('',\UsersController::class.":getAll");
    // Get Single User
    $this->get('/{id}', \UsersController::class.":getOneById");
    // Add User
    $this->post('',\UsersController::class.":add");
    // Update User
    $this->put('/{id}',\UsersController::class.":update");
    // Delete User
    $this->delete('/{id}',\UsersController::class.":delete");
})->add(new AdminGuardMiddleware());