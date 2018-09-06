<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

class RolesController {
  private static $collection = "roles";

  public static function getAll(Request $request, Response $response) {
    // SQL query string
    @ $properties = $request->getQueryParams()["properties"];
    // return var_dump($properties);
    if($properties){
      $sql = "SELECT $properties FROM ". self::$collection;
    }else{
      $sql = "SELECT * FROM ". self::$collection;
    }
    
    try{
      // Get DB Object
      $db = new DB();
      // Connect
      $db = $db->connect();
      // Submit query to get ALL
      $stmt = $db->query($sql);
      // Fetch array of rows
      $roles = $stmt->fetchAll(PDO::FETCH_OBJ);
      // echo json_encode($roles);
      $data = array(
          "data" => $roles
      );
      return $response->withJson($data);
    } catch(PDOException $e){
      // Create response with error message
      $response = $response->write($e->getMessage());
      $response = $response->withStatus(400);
      return $response;
    }
  }

  public static function getOneById(Request $request, Response $response) {
    // Assign ID attribute
    $id = $request->getAttribute('id');
    // SQL query string
    $sql = "SELECT * FROM ".self::$collection." WHERE id = :id";

    if($id){
      try{
        // Get DB Object
        $db = new DB();
        // Connect
        $db = $db->connect();
        // Prepare statement
        $stmt = $db->prepare($sql);
        // Bind params 
        $stmt->bindParam(':id', $id);
        // Execute prepared statement
        $stmt->execute();
        // Fetch next row result as object
        $role = $stmt->fetch(PDO::FETCH_OBJ);
        // If object was found
        if($role){
          $data = array(
            "data" => $role
          );
          return $response->withJson($data);
        }
        // If no object was found, return 404 code
        $data = "Not found";
        $response = $response->write($data);
        $response = $response->withStatus(404);
        return $response;
      } catch(PDOException $e){
        $response = $response->write($e->getMessage());
        $response = $response->withStatus(500);
        return $response;
      }
    }else{
      // Create response with error message
      $data = "Missing fields";
      $response = $response->write($data);
      $response = $response->withStatus(400);
      return $response;
    }
  }

  public static function add(Request $request, Response $response) {
    // Assign body params 
    $name = $request->getParam('name');
    $description = $request->getParam('description');
    // Check body params
    if($name && $description){
      // SQL query string
      $sql = "INSERT INTO ".self::$collection." 
      (name, description) 
      VALUES
      (:name, :description)";

      try{
        // Get DB Object
        $db = new DB();
        // Connect
        $db = $db->connect();
        // Prepare SQL statement.
        $stmt = $db->prepare($sql);
        // Bind params
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':description',      $description);
        // Execute prepared statement
        $stmt->execute();
        // Create response array 
        $data = array(
            "data" => array(
              "id" => (int)$db->lastInsertId()
            )
        );       
        // Return response as JSON with 200 code
        return $response->withJson($data, 200);
      } catch(PDOException $e){
        // Create response with error code and message 
        $response = $response->write($e->getMessage());
        $response = $response->withStatus(500);
        return $response;
      } catch(Exception $e){
        // Create response with error code and message 
        $response = $response->write($e->getMessage());
        $response = $response->withStatus(500);
        return $response;
      }
    }else{
      // Create response with error message
      $data = "Missing fields";
      $response = $response->write($data);
      $response = $response->withStatus(400);
      return $response;
    }
  }
  
  public static function update(Request $request, Response $response) {
    // Assign attribute {id}
    $id = $request->getAttribute('id');
    // Assign body params
    $name = $request->getParam('name');
    $description = $request->getParam('description');
    // Check ID and body params
    if($id && $name && $description){
      // SQL query string
      $sql = "UPDATE ".self::$collection." SET
              name 	= :name,
              description		= :description
              WHERE id = :id";

      try{
        // Get DB Object
        $db = new DB();
        // Connect
        $db = $db->connect();
        // Prepare SQL statement.
        $stmt = $db->prepare($sql);
        // Bind params
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':description',      $description);
        $stmt->bindParam(':id',    $id);
        // Execute prepared statement
        $stmt->execute();
        $data = array("flag" => $stmt->rowCount() > 0);
        // If no objects modified, return 200 code
        return $response->withJSON($data,200);
      } catch(PDOException $e){
        // Create response with error code and message 
        $response = $response->write($e->getMessage());
        $response = $response->withStatus(500);
        return $response;
      }
    }else{
      // Create response with error message
      $data = "Missing fields";
      $response = $response->write($data);
      $response = $response->withStatus(400);
      return $response;
    }
  }

  public static function delete(Request $request, Response $response) {
    // Assign attribute {id}
    $id = $request->getAttribute('id');
    // SQL query string
    $sql = "DELETE FROM ".self::$collection." WHERE id = :id";
    if($id){
      try{
        // Get DB Object
        $db = new DB();
        // Connect
        $db = $db->connect();
        // Prepare SQL statement
        $stmt = $db->prepare($sql);
        // Bind param ID
        $stmt->bindParam(':id', $id);
        // Execute prepared statement
        $stmt->execute();
        // Check if a row was modified (thus it was successfully deleted)
        if($stmt->rowCount() > 0){
          // Return response with 204 code (NO CONTENT)
          return $response->withStatus(204);
        }
        // If no objects modified, return 404 code
        $data = "Not found";
        $response = $response->write($data);
        $response = $response->withStatus(404);
        return $response;
      } catch(PDOException $e){
        // Create response with error code and message 
        $response = $response->write($e->getMessage());
        $response = $response->withStatus(500);
        return $response;
      }
    }else{
      // Create response with error message
      $data = "Missing fields";
      $response = $response->write($data);
      $response = $response->withStatus(400);
      return $response;
    }
  }

}