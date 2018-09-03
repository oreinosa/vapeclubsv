<?php

class User {
  public $id;
  public $first_name;
  public $last_name;
  public $email;
  private $password;
  public $phone;
  public $role_id;
  public $created_by;
      
  public function __construct() {
    $this->id = intval($this->id);
    $this->phone = intval($this->phone);
    $this->role_id = intval($this->role_id);
  }
}