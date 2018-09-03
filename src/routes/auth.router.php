<?php
require_once "../src/controllers/auth.controller.php";

$app->group('/api/auth', function(){
    // Login
    $this->post('/login',\AuthController::class.":login");
    // Register
    $this->post('/register', \AuthController::class.":register");
});