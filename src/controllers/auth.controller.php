<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use \Firebase\JWT\JWT;
require_once '../../src/environment.php';

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
        if(isset($user) && isset($user->password_hash) && password_verify($password, $user->password_hash)) {
          // echo json_encode($users);
          $iat = new DateTime();
          $exp = new DateTime("tomorrow");
          // echo $iat->format('Y-m-d H:i:s');
          // echo '   ';
          // echo $exp->format('Y-m-d H:i:s');
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
            // "iat" => $iat->format('Y-m-d H:i:s'),
            // "exp" => $exp->format('Y-m-d H:i:s')
          );
          $secret = getenv("JWT_SECRET");
          $token = JWT::encode($user, $secret);
          // unset($user["exp"], $user["iat"]);
          // Generate JWT 
          $data = array(
            "data" => $user,
            "token" => $token
          );
          return $response->withJson($data, 200);
        }
        $data = "Correo o contraseña incorrectos";
        $response = $response->write($data);
        $response = $response->withStatus(400);
        return $response;
      } catch(PDOException $e){
        // Create response with error message
        $response = $response->write($e->getMessage());
        $response = $response->withStatus(500);
        return $response;
      }
    } else {
      // Create response with error message
      $data = "Petición incompleta";
      $response = $response->write($data);
      $response = $response->withStatus(400);
      return $response;
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
            "data" => "Bienvenido!"
        );       
        // Return response as JSON with 200 code
        return $response->withJson($data, 200);
      } catch(PDOException $e){
        // Create response with error code and message 
        $response = $response->write('PDOException '.$e->getMessage());
        $response = $response->withStatus(500);
        return $response;
      } catch(Exception $e){
        // Create response with error code and message 
        $response = $response->write('Exception '.$e->getMessage());
        $response = $response->withStatus(500);
        return $response;
      }
    }else{
      // Create response with error message
      $data = "Petición incompleta";
      $response = $response->write($data);
      $response = $response->withStatus(400);
      return $response;
    }
  }

  public static function getOneByUsername($request, $response) {

  }

  public static function checkDuplicateEmail(Request $request, Response $response, $next) {
    // Assign email attribute
    $email = $request->getParam('email');
    // SQL query string
    $sql = "SELECT count(email) as total FROM users WHERE email = :email";

    if($email){
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
        $rs = $stmt->fetch(PDO::FETCH_OBJ);
        // If object was found
        if($rs->total > 0){
          $data = "Correo electrónico ya está en uso";
          $response = $response->write($data);
          $response = $response->withStatus(400);
          return $response->withJson($data);
        }
        // If no object was found, pass next function
        $response = $next($request, $response);
        return $response;
      } catch(PDOException $e){
        $response = $response->write($e->getMessage());
        $response = $response->withStatus(500);
        return $response;
      }
    }else{
      // Create response with error message
      $data = "Petición incompleta";
      $response = $response->write($data);
      $response = $response->withStatus(400);
      return $response;
    }
  }

}