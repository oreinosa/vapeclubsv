<?php
require_once "../src/controllers/faqs.controller.php";
require_once "../src/guards/admin.guard.php";

$app->group('/api/admin/faqs', function(){
    // Get All FAQs
    $this->get('',\FAQsController::class.":getAll");
    // Get Single FAQ
    $this->get('/{id}', \FAQsController::class.":getOneById");
    // Add FAQ
    $this->post('',\FAQsController::class.":add");
    // Update FAQ
    $this->put('/{id}',\FAQsController::class.":update");
    // Delete FAQ
    $this->delete('/{id}',\FAQsController::class.":delete");
})->add(new AdminGuardMiddleware());