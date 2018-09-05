<?php
require '../vendor/autoload.php';

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use \Firebase\JWT\JWT;
require_once "../src/models/user.model.php";
require_once '../src/environment.php';

class AuthController {

  public static function login(Request $request, Response $response) {
    // Assign body params 
    $email = $request->getParam('email');
    $password = $request->getParam('password');
    if($email && $password){
      // SQL query string
      $sql = "SELECT u.id, u.name, u.phone, u.password_hash, u.reg_date, r.id as 'role_id', r.name as 'role_name' 
              FROM users as u
              INNER JOIN roles as r ON u.id_role = r.id
              WHERE u.email = :email";
      
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
        // $user = $stmt->fetch(PDO::FETCH_CLASS, PDO::FETCH_PROPS_LATE, "User");
        $user = $stmt->fetch(PDO::FETCH_OBJ);
        if(password_verify($password, $user->password_hash)) {
          // echo json_encode($users);
          $iat = new DateTime('now');
          $exp = new DateTime('tomorrow');
          $user = array(
            "id" => (int)$user->id,
            "name" => $user->name,
            "email" => $email,
            "phone" => (int)$user->phone,
            "reg_date" => $user->reg_date,
            "role" => array(
              "id" => (int)$user->role_id,
              "name" => $user->role_name
            ),
            "iat" => $iat->getTimestamp(),
            "exp" => $exp->getTimestamp()
          );
          $token = JWT::encode($user, getenv("JWT_SECRET"));
          // Generate JWT 
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
    $name = $request->getParam('name');
    $phone = $request->getParam('phone');
    $email = $request->getParam('email');
    $password = $request->getParam('password');
    // Check body params
    if($name && $phone && $email && $password){
      // SQL query string
      $sql = "INSERT INTO users 
      (name, email, password_hash, phone) 
      VALUES
      (:name, :email, :password_hash, :phone)";

      try{
        // Get DB Object
        $db = new DB();
        // Connect
        $db = $db->connect();
        // Prepare SQL statement.
        $stmt = $db->prepare($sql);
        // Bind params
        $stmt->bindParam(':name', $name);
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