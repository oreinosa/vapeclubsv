<?php
require_once "../../src/controllers/flavors.controller.php";
require_once "../../src/guards/admin.guard.php";

$app->group('/admin/sabores', function(){
    // Get All Flavors
    $this->get('',\FlavorsController::class.":getAll");
    // Get Single Flavor
    $this->get('/{id}', \FlavorsController::class.":getOneById");
    // Add Flavor
    $this->post('',\FlavorsController::class.":add");
    // Update Flavor
    $this->put('/{id}',\FlavorsController::class.":update");
    // Delete Flavor
    $this->delete('/{id}',\FlavorsController::class.":delete");
})->add(new AdminGuardMiddleware());