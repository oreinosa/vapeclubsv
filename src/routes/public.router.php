<?php
require_once "../src/controllers/faqs.controller.php";
require_once "../src/controllers/categories.controller.php";
require_once "../src/controllers/flavors.controller.php";
require_once "../src/controllers/nicotine-amounts.controller.php";
require_once "../src/controllers/presentations.controller.php";

$app->group('/api/public', function(){
    // Get All FAQs
    $this->get('/faqs',\FAQsController::class.":getAll");
    // Get All Categories
    $this->get('/categorias',\CategoriesController::class.":getAll");
    // Get All Presentations
    $this->get('/presentaciones',\PresentationsController::class.":getAll");
    // Get All Flavors
    $this->get('/sabores',\FlavorsController::class.":getAll");    
    // Get All NicotineAmounts
    $this->get('/cantidades-nicotina',\NicotineAmountsController::class.":getAll");
});