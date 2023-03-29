<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route de récupération des tasks
// Type : get
// Chemin : http://127.0.0.1:8000/api/tasks
// Controller : TaskController
// Méthode : list
Route::get('/tasks', [TaskController::class, 'list']);

// Route d'une task selon son id
// Type : get
// Chemin : http://127.0.0.1:8000/api/tasks/{id}
// Controller : TaskController
// Méthode : show
Route::get('/tasks/{id}', [TaskController::class, 'show'])->where('id', '[0-9]+');

// Route de récupération des categories
// Type : get
// Chemin : http://127.0.0.1:8000/api/categories
// Controller : CategoryController
// Méthode : list
Route::get('/categories', [CategoryController::class, 'list']);

// Route d'une categorie selon son id
// Type : get
// Chemin : http://127.0.0.1:8000/api/categories/{id}
// Controller : CategoryController
// Méthode : show
Route::get('/categories/{id}', [CategoryController::class, 'show'])->where('id', '[0-9]+');

// Route de récupération des tags
// Type : get
// Chemin : http://127.0.0.1:8000/api/tags
// Controller : TagController
// Méthode : list
Route::get('/tags', [TagController::class, 'list']);

// Route d'un tag selon son id
// Type : get
// Chemin : http://127.0.0.1:8000/api/tags/{id}
// Controller : CategoryController
// Méthode : show
Route::get('/tags/{id}', [TagController::class, 'show'])->where('id', '[0-9]+');

