<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

class FAQsController {
  private static $collection = "faqs";

  public static function getAll(Request $request, Response $response) {
    // SQL query string
    $sql = "SELECT * FROM ". self::$collection;
    
    try{
      // Get DB Object
      $db = new DB();
      // Connect
      $db = $db->connect();
      // Submit query to get ALL
      $stmt = $db->query($sql);
      // Fetch array of rows
      $faqs = $stmt->fetchAll(PDO::FETCH_OBJ);
      // echo json_encode($faqs);
      $data = array(
          "data" => $faqs
      );
      return $response->withJson($data);
    } catch(PDOException $e){
      // Create response with error message
      $data = array(
          "code" => $e->getCode(),
          "error" => $e->getMessage()
      );        
      // Return error with 500 code
      return $response->withJson($data, 500);
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
        $faq = $stmt->fetch(PDO::FETCH_OBJ);
        // If object was found
        if($faq){
          $data = array(
            "data" => $faq
          );
          return $response->withJson($data);
        }
        // If no object was found, return 404 code
        $data = array(
          "data" => null
        );
        return $response->withJSON($data, 404);
      } catch(PDOException $e){
        $data = array(
            "code" => $e->getCode(),
            "error" => $e->getMessage()
        );        
        return $response->withJson($data, 500);
      }
    }else{
      // Create response with error message
      $data = array(
          "error" => "Missing fields"
      );    
      // Return error with 400 code   
      return $response->withJson($data, 400);
    }
  }

  public static function add(Request $request, Response $response) {
    // Assign body params 
    $question = $request->getParam('question');
    $answer = $request->getParam('answer');
    // Check body params
    if($question && $answer){
      // SQL query string
      $sql = "INSERT INTO ".self::$collection." 
      (question, answer) 
      VALUES
      (:question, :answer)";

      try{
        // Get DB Object
        $db = new DB();
        // Connect
        $db = $db->connect();
        // Prepare SQL statement.
        $stmt = $db->prepare($sql);
        // Bind params
        $stmt->bindParam(':question', $question);
        $stmt->bindParam(':answer',      $answer);
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
        $data = array(
            "code" => $e->getCode(),
            "error" => $e->getMessage()
        );        
        // Return response as JSON with 500 code
        return $response->withJson($data, 500);
      } catch(Exception $e){
        // Create response with error code and message 
        $data = array(
            "code" => $e->getCode(),
            "error" => $e->getMessage()
        );        
        // Return response as JSON with 500 code
        return $response->withJson($data, 500);
      }
    }else{
      // Create response with error message
      $data = array(
          "error" => "Missing fields"
      );    
      // Return response as JSON with 400 code   
      return $response->withJson($data, 400);
    }
  }
  
  public static function update(Request $request, Response $response) {
    // Assign attribute {id}
    $id = $request->getAttribute('id');
    // Assign body params
    $question = $request->getParam('question');
    $answer = $request->getParam('answer');
    // Check ID and body params
    if($id && $question && $answer){
      // SQL query string
      $sql = "UPDATE ".self::$collection." SET
              question 	= :question,
              answer		= :answer
              WHERE id = :id";

      try{
        // Get DB Object
        $db = new DB();
        // Connect
        $db = $db->connect();
        // Prepare SQL statement.
        $stmt = $db->prepare($sql);
        // Bind params
        $stmt->bindParam(':question', $question);
        $stmt->bindParam(':answer',      $answer);
        $stmt->bindParam(':id',    $id);
        // Execute prepared statement
        $stmt->execute();
        $data = array("flag" => $stmt->rowCount() > 0);
        // If no objects modified, return 200 code
        return $response->withJSON($data,200);
      } catch(PDOException $e){
        // Create response with error code and message 
        $data = array(
            "code" => $e->getCode(),
            "error" => $e->getMessage()
        );        
        // Return response as JSON with 500 code
        return $response->withJson($data, 500);
      }
    }else{
      // Create response with error message
      $data = array(
          "error" => "Missing fields"
      );    
      // Return response as JSON with 400 code   
      return $response->withJson($data, 400);
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
        return $response->withStatus(404);
      } catch(PDOException $e){
        // Create response with error code and message 
        $data = array(
            "code" => $e->getCode(),
            "error" => $e->getMessage()
        );        
        // Return response as JSON with 500 code
        return $response->withJson($data, 500);
      }
    }else{
      // Create response with error message
      $data = array(
          "error" => "Missing fields"
      );    
      // Return response as JSON with 400 code   
      return $response->withJson($data, 400);
    }
  }

}