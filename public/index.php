<?php
// Import vendor library
require_once '../vendor/autoload.php';

// Init SLIM APP
$app = new \Slim\App;

// Import configuration
require_once "../src/config/config.php";

// Import router
require_once '../src/routes/router.php';

// Run SLIM APP
$app->run();