<?php
// Import vendor library
require_once '../vendor/autoload.php';

$configuration = [
  'settings' => [
      'displayErrorDetails' => true,
  ],
];
$c = new \Slim\Container($configuration);

// Init SLIM APP
$app = new \Slim\App($c);

// Import configuration
require_once "../src/config/config.php";

// Import router
require_once '../src/routes/router.php';

// Run SLIM APP
$app->run();