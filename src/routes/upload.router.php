<?php
require_once "../src/controllers/upload.controller.php";
require_once "../src/guards/admin.guard.php";

$app->group('/api/upload', function(){
    // Upload one file
    $this->post('/file',\UploadController::class.":uploadFile");
});
// ->add(new AdminGuardMiddleware());