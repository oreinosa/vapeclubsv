<?php

class Category {
  public $id;
  public $name;
  public $description;
      
  public function __construct() {
    $this->id = intval($this->id);
  }
}