<?php

namespace App\Http\Controllers;

use App\Models\Category;

class CategoryController extends Controller
{
    // Création de la méthode list
    public function list ()
    {
        // Utilisation de la méthode all() grâce à l'héritage
        $categories = Category::all();
        // Retour automatique au format JSON 👌
        return $categories;
    }

    // Création de la méthode show
    public function show($id)
    {
        // Utilisation de la méthode find() grâce à l'héritage
        $category = Category::find($id);
        // Retour automatique au format JSON 👌
        return $category;
    }

}
