<?php

class FAQ {
  public $id;
  public $question;
  public $answer;
      
  public function __construct() {
    $this->id = intval($this->id);
  }
}