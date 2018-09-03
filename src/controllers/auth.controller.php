<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use \Firebase\JWT\JWT;

class AuthController {

  public static function login(Request $request, Response $response) {
    // Assign body params 
    $email = $request->getParam('email');
    $password = $request->getParam('password');
    if($email && $password){
      // SQL query string
      $sql = "SELECT * FROM users WHERE email = :email";
      
      try{
        // Get DB Object
        $db = new DB();
        // Connect
        $db = $db->connect();
        // Prepare statement
        $stmt = $db->prepare($sql);
        // Bind params
        $stmt->bindParam(':email', $email);
        // Execute prepared statement
        $stmt->execute();
        // Fetch next row result as object
        $user = $stmt->fetch(PDO::FETCH_OBJ);

        if(password_verify($password, $user->password_hash)) {
          // echo json_encode($users);
          $user = array(
            "name" => $user->first_name . ' ' . $user->last_name,
            "email" => $email,
            "phone" => $user->phone,
            "id_role" => $user->id_role
          );
          // Generate JWT 
          $token = JWT::encode($user, getenv('JWT-SECRET'));

          $data = array(
            "data" => $user,
            "token" => $token
          );
          return $response->withJson($data, 200);
        }
        $data = array(
          "error" => "Email/password is incorrect"
        );
        return $response->withJson($data, 400);
      } catch(PDOException $e){
        // Create response with error message
        $data = array(
            "code" => $e->getCode(),
            "error" => $e->getMessage()
        );        
        // Return error with 400 code
        return $response->withJson($data, 500);
      }
    } else {
      // Create response with error message
      $data = array(
        "error" => "Missing fields"
      );    
      // Return response as JSON with 400 code   
      return $response->withJson($data, 400);
    }
  }

  public static function register(Request $request, Response $response) {
    // Assign body params 
    $first_name = $request->getParam('first_name');
    $last_name = $request->getParam('last_name');
    $phone = $request->getParam('phone');
    $email = $request->getParam('email');
    $password = $request->getParam('password');
    // Check body params
    if($first_name && $last_name && $phone && $email && $password){
      // SQL query string
      $sql = "INSERT INTO users 
      (first_name, last_name, email, password_hash, phone) 
      VALUES
      (:first_name, :last_name, :email, :password_hash, :phone)";

      try{
        // Get DB Object
        $db = new DB();
        // Connect
        $db = $db->connect();
        // Prepare SQL statement.
        $stmt = $db->prepare($sql);
        // Bind params
        $stmt->bindParam(':first_name', $first_name);
        $stmt->bindParam(':last_name',  $last_name);
        $stmt->bindParam(':phone',      $phone);
        $stmt->bindParam(':email',      $email);
        // Hash password
        $password_hash = password_hash($password, PASSWORD_DEFAULT);
        $stmt->bindParam(':password_hash', $password_hash);
        // Execute prepared statement
        $stmt->execute();
        // Create response array 
        $data = array(
            "data" => (int)$db->lastInsertId()
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

  public static function getOneByUsername($request, $response) {

  }

}