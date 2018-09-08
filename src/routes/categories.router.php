<?php
require_once "../../src/controllers/categories.controller.php";
require_once "../../src/guards/admin.guard.php";

$app->group('/admin/categorias', function(){
    // Get All Categories
    $this->get('',\CategoriesController::class.":getAll");
    // Get Single Category
    $this->get('/{id}', \CategoriesController::class.":getOneById");
    // Add Category
    $this->post('',\CategoriesController::class.":add");
    // Update Category
    $this->put('/{id}',\CategoriesController::class.":update");
    // Delete Category
    $this->delete('/{id}',\CategoriesController::class.":delete");
})->add(new AdminGuardMiddleware());