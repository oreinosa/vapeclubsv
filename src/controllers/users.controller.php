<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

class UsersController {
  private static $collection = "users";

  public static function getAll(Request $request, Response $response) {
    // SQL query string
    $sql = "SELECT u.id, u.name, u.email, u.phone, u.reg_date, r.id as 'role_id', r.name as 'role_name' 
    FROM users as u
    INNER JOIN roles as r ON u.id_role = r.id";

    try{
      // Get DB Object
      $db = new DB();
      // Connect
      $db = $db->connect();
      // Submit query to get ALL
      $stmt = $db->query($sql);
      // Fetch array of rows
      $rs = $stmt->fetchAll(PDO::FETCH_OBJ);
      $users = array();
      foreach($rs as $user){
        array_push($users, array(
          "id" => (int)$user->id,
          "name" => $user->name,
          "phone" => (int)$user->phone,
          "email" => $user->email,
          "reg_date" => $user->reg_date,
          "role" => array(
            "id" => (int)$user->role_id,
            "name" => $user->role_name
          ),
        ));
      }
      // echo json_encode($users);
      $data = array(
          "data" => $users
      );
      return $response->withJson($data);
    } catch(PDOException $e){
      // Create response with error message
      $response = $response->write($e->getMessage());
      $response = $response->withStatus(500);
      return $response;
    }
  }

  public static function getOneById(Request $request, Response $response) {
    // Assign ID attribute
    $id = $request->getAttribute('id');
    // SQL query string
    $sql = "SELECT u.id, u.name, u.email, u.phone, u.reg_date, r.id as 'role_id', r.name as 'role_name' 
    FROM users as u
    INNER JOIN roles as r ON u.id_role = r.id
    WHERE u.id = :id";

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
        $user = $stmt->fetch(PDO::FETCH_OBJ);
        // If object was found
        if($user){
          $user = array(
            "id" => (int)$user->id,
            "name" => $user->name,
            "phone" => (int)$user->phone,
            "email" => $user->email,
            "reg_date" => $user->reg_date,
            "role" => array(
              "id" => (int)$user->role_id,
              "name" => $user->role_name
            ),
          );
          $data = array(
            "data" => $user
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
        $response = $response->withStatus(400);
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

  public static function getOneByUsername(Request $request, Response $response) {

  }

  public static function add(Request $request, Response $response) {
    // Assign body params 
    $name = $request->getParam('name');
    $phone = $request->getParam('phone');
    $email = $request->getParam('email');
    $password = $request->getParam('password');
    $role = $request->getParam('role');
    // Check body params
    if($name && $phone && $email && $password && $role){
      // SQL query string
      $sql = "INSERT INTO ".self::$collection." 
      (name, email, password_hash, phone, id_role) 
      VALUES
      (:name, :email, :password_hash, :phone, :id_role)";

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
        $stmt->bindParam(':id_role',      $role['id']);
        // Hash password
        $password_hash = password_hash($password, PASSWORD_DEFAULT);
        $stmt->bindParam(':password_hash', $password_hash);
        // Execute prepared statement
        $stmt->execute();
        // Create response array      
        $now = new DateTime(); 
        $data = array(
          "data" => array(
            "id" => (int)$db->lastInsertId(),
            "reg_date" => $now->format('Y-m-d H:i:s'),
          ),
        );       
        // Return response as JSON with 200 code
        return $response->withJson($data, 200);
      } catch(PDOException $e){
        // Create response with error code and message 
        $response = $response->write($e->getMessage());
        $response = $response->withStatus(400);
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
    $phone = $request->getParam('phone');
    $email = $request->getParam('email');
    $role = $request->getParam("role");
    // Check ID and body params
    if($id && $name && $phone && $role){
      // SQL query string
      $sql = "UPDATE ".self::$collection." SET
              name 	= :name,
              phone		= :phone,
              id_role = :id_role
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
        $stmt->bindParam(':phone',      $phone);
        $stmt->bindParam(':id_role',    $role['id']);
        $stmt->bindParam(':id',    $id);
        // Execute prepared statement
        $stmt->execute();
        $data = array("flag" => $stmt->rowCount() > 0);
        // If no objects modified, return 200 code
        return $response->withJSON($data,200);
      } catch(PDOException $e){
        // Create response with error code and message 
        $response = $response->write($e->getMessage());
        $response = $response->withStatus(400);
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
        $response = $response->withStatus(400);
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