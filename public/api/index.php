<?php
// Import vendor library
require '../../vendor/autoload.php';

$configuration = [
  'settings' => [
      'displayErrorDetails' => true,
  ],
];
$c = new \Slim\Container($configuration);

// Init SLIM APP
$app = new \Slim\App($c);

// Import configuration
require "../../src/config/config.php";

// Import router
require '../../src/routes/router.php';

$app->get('/hello/{name}', function ($request, $response, $args) {
  return $response->write("Hello " . $args['name']);
});

// Run SLIM APP
$app->run();