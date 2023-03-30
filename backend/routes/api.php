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

//* Pour créer une nouvelle task dans la table task
// Chemin : /tasks
// Methode HTTP : POST
// Controller : TaskController
// Méthode : create
Route::post('/tasks', [TaskController::class, 'create'])->name('task-create');

//* Pour modifier une task dans la table task
// Chemin : /tasks/{id}
// Methode HTTP : PUT
// Controller : TaskController
// Méthode : update
Route::put('/tasks/{id}', [TaskController::class, 'update'])->where('id', '[0-9]+');

//* Pour supprimer une task dans la table task
// Chemin : /tasks/{id}
// Methode HTTP : DELETE
// Controller : TaskController
// Méthode : delete
Route::delete('/tasks/{id}', [TaskController::class, 'delete'])->where('id', '[0-9]+');

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

//* Pour créer une nouvelle category dans la table category
// Chemin : /categories
// Methode HTTP : POST
// Controller : CategoryController
// Méthode : create
Route::post('/categories', [CategoryController::class, 'create'])->name('category-create');

//* Pour modifier une category dans la table category
// Chemin : /categories/{id}
// Methode HTTP : PUT
// Controller : CategoryController
// Méthode : update
Route::put('/categories/{id}', [CategoryController::class, 'update'])->where('id', '[0-9]+');

//* Pour supprimer une category dans la table category
// Chemin : /categories/{id}
// Methode HTTP : DELETE
// Controller : CategoryController
// Méthode : delete
Route::delete('/categories/{id}', [CategoryController::class, 'delete'])->where('id', '[0-9]+');

// Route de récupération des tags
// Type : get
// Chemin : http://127.0.0.1:8000/api/tags
// Controller : TagController
// Méthode : list
Route::get('/tags', [TagController::class, 'list']);

// Route d'un tag selon son id
// Type : get
// Chemin : http://127.0.0.1:8000/api/tags/{id}
// Controller : TagController
// Méthode : show
Route::get('/tags/{id}', [TagController::class, 'show'])->where('id', '[0-9]+');

//* Pour créer un nouveau tag dans la table tag
// Chemin : /tags
// Methode HTTP : POST
// Controller : TagController
// Méthode : create
Route::post('/tags', [TagController::class, 'create'])->name('tag-create');

//* Pour modifier un tag dans la table tag
// Chemin : /tags/{id}
// Methode HTTP : PUT
// Controller : TagController
// Méthode : update
Route::put('/tags/{id}', [TagController::class, 'update'])->where('id', '[0-9]+');

//* Pour supprimer un tag dans la table tag
// Chemin : /tags/{id}
// Methode HTTP : DELETE
// Controller : TagController
// Méthode : delete
Route::delete('/tags/{id}', [TagController::class, 'delete'])->where('id', '[0-9]+');

