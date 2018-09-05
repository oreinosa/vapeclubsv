<?php
require_once "../src/controllers/auth.controller.php";

$app->group('/api/auth', function(){
    // Login
    $this->post('/ingresar',\AuthController::class.":login");
    // Register
    $this->post('/registrarse', \AuthController::class.":register");
});