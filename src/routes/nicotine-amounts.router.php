<?php
require_once "../src/controllers/nicotine-amounts.controller.php";
require_once "../src/guards/admin.guard.php";

$app->group('/api/admin/cantidades-nicotina', function(){
    // Get All NicotineAmounts
    $this->get('',\NicotineAmountsController::class.":getAll");
    // Get Single NicotineAmount
    $this->get('/{id}', \NicotineAmountsController::class.":getOneById");
    // Add NicotineAmount
    $this->post('',\NicotineAmountsController::class.":add");
    // Update NicotineAmount
    $this->put('/{id}',\NicotineAmountsController::class.":update");
    // Delete NicotineAmount
    $this->delete('/{id}',\NicotineAmountsController::class.":delete");
})->add(new AdminGuardMiddleware());