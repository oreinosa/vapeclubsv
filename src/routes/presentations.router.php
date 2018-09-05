<?php
require_once "../src/controllers/presentations.controller.php";
require_once "../src/guards/admin.guard.php";

$app->group('/api/admin/presentaciones', function(){
    // Get All Presentations
    $this->get('',\PresentationsController::class.":getAll");
    // Get Single Presentation
    $this->get('/{id}', \PresentationsController::class.":getOneById");
    // Add Presentation
    $this->post('',\PresentationsController::class.":add");
    // Update Presentation
    $this->put('/{id}',\PresentationsController::class.":update");
    // Delete Presentation
    $this->delete('/{id}',\PresentationsController::class.":delete");
})->add(new AdminGuardMiddleware());