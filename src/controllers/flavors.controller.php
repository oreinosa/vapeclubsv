<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

class FlavorsController {
  private static $collection = "flavors";

  public static function getAll(Request $request, Response $response) {
    // SQL query string
    @ $properties = $request->getQueryParams()["properties"];
    // return var_dump($properties);
    if($properties){
      $sql = "SELECT $properties FROM ". self::$collection;
    }else{
      $sql = "SELECT f.id, f.name, f.description, f.imageURL, c.id as 'category_id', c.name as 'category_name'
              FROM flavors as f
              INNER JOIN categories as c ON f.id_category = c.id";
    }
    
    try{
      // Get DB Object
      $db = new DB();
      // Connect
      $db = $db->connect();
      // Submit query to get ALL
      $stmt = $db->query($sql);
      // Fetch array of rows
      if($properties){
        $flavors = $stmt->fetchAll(PDO::FETCH_OBJ);
      }else{
        $rs = $stmt->fetchAll(PDO::FETCH_OBJ);
        $flavors = array();
        foreach($rs as $flavor){
          array_push($flavors, array(
            "id" => $flavor->id,
            "name" => $flavor->name,
            "description" => $flavor->description,
            "imageURL" => $flavor->imageURL,
            "category" => array(
              "id" => $flavor->category_id,
              "name" => $flavor->category_name
            )
          ));
        }
   
      }
      $data = array(
        "data" => $flavors
      );
      return $response->withJson($data);
    } catch(PDOException $e){
      // Create response with error message
      $data = "Missing fields";
      $response = $response->write($e->getMessage());
      $response = $response->withStatus(500);
      return $response;
    }
  }

  public static function getOneById(Request $request, Response $response) {
    // Assign ID attribute
    $id = $request->getAttribute('id');
    // SQL query string
    $sql = "SELECT f.id, f.name, f.description, f.imageURL, c.id as 'category_id', c.name as 'category_name'
            FROM flavors as f
            INNER JOIN categories as c ON f.id_category = c.id
            WHERE f.id = :id";

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
        $flavor = $stmt->fetch(PDO::FETCH_OBJ);
        $flavor = array(
            "id" => $flavor->id,
            "name" => $flavor->name,
            "description" => $flavor->description,
            "imageURL" => $flavor->imageURL,
            "category" => array(
              "id" => $flavor->category_id,
              "name" => $flavor->category_name
            )
        );
        // If object was found
        if($flavor){
          $data = array(
            "data" => $flavor
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
    $category = $request->getParam('category');
    $imageURL = $request->getParam('imageURL');
    // Check body params
    if($name && $description && $imageURL && $category){
      // SQL query string
      $sql = "INSERT INTO ".self::$collection." 
      (name, description, imageURL, id_category) 
      VALUES
      (:name, :description, :imageURL, :id_category)";

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
        $stmt->bindParam(':imageURL',      $imageURL);
        $stmt->bindParam(':id_category',      $category['id']);
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
    $imageURL = $request->getParam('imageURL');
    // Check ID and body params
    if($id && $name && $description){
      // SQL query string
      $sql = "UPDATE ".self::$collection." SET
              name 	= :name,
              description		= :description";
      if($imageURL) { $sql .= ",imageURL		= :imageURL"; }
      $sql .= " WHERE id = :id";

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
        if($imageURL) { $stmt->bindParam(':imageURL',      $imageURL); }
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