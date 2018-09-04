<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require_once '../src/environment.php';

// Config OPTIONS method for Angular HTTP requests
$app->options('/{routes:.+}', function (Request $request, Response $response, $args) {
  return $response;
});

// Config CORS
$app->add(function (Request $req, Response $res, $next) {
  $response = $next($req, $res);
  return $response
          ->withHeader('Access-Control-Allow-Origin', '*')
          ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
          ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

// JWT middleware
$app->add(new Slim\Middleware\JwtAuthentication([
  "secret" => getenv('JWT-SECRET'),
  // "secret" => "dasecret",
  "path" => "/api/admin",
  "error" => function ($request, $response, $arguments) {
    return $response->write('Not Authorized')->withStatus(401);
  }
]));

// Require DB class
require_once '../src/config/db.php';