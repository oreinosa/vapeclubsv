<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
require_once "../src/helpers/upload.php";

class UploadController {

  public static function uploadFile(Request $request, Response $response) {
    @ $file = $_FILES["uploadedFile"];
    $route = basename($request->getParam("route"));
    $upload = Upload::uploadFile($route, $file);
    if($upload["flag"]){
      // Create response with file URL
      $data = array(
          "data" => $upload["data"]
      );    
      // Return response as JSON with 400 code   
      return $response->withJson($data, 200);
    }
    // Return response as JSON with 400 code   
    $data = "Missing fields";
    $response = $response->write($upload["data"]);
    $response = $response->withStatus(400);
    return $response;
  }
}