<?php

class User {
  public $id;
  public $name;
  public $email;
  private $password;
  public $phone;
  public $reg_date;
  public $id_role;
      
  public function __construct() {
    $this->id = intval($this->id);
    $this->phone = intval($this->phone);
    $this->id_role = intval($this->id_role);
    $this->reg_date = strtotime($this->reg_date);
  }
}