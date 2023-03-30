<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    // Création de la méthode list
    public function list()
    {
        // Utilisation de la méthode all() grâce à l'héritage
        $categories = Category::all();
        // Retour automatique au format JSON 👌

        if ($categories) {
            return $categories;
        } else {
            return response(null, 404);
        }
    }

    // Création de la méthode show
    public function show($id)
    {
        // Utilisation de la méthode findOrFail() grâce à l'héritage
        $category = Category::findOrFail($id);
        // Retour automatique au format JSON 👌
        return $category;
    }

    // Création de la méthode create
    public function create(Request $request)
    {
        // var_dump($request); die;
        // Extraction des valeurs passées de la body de la requête
        $name = $request->input('name');

        // On crée une nouvelle instance, puis on lui définit la propriété name
        $category = new Category();
        $category->name = $name;

        // On sauvegarde, puis on gère la réponse avec le code HTTP qui convient
        // 201 : Created
        // 500 : Internal Server Error
        $category->saveOrFail();
        return $category;
    }

    // Méthode pour modifier les propriétés correspondant à 1 id dans la bdd
    public function update(Request $request, $id)
    {
        // recherche objet à modifier
        $category = Category::findOrFail($id);

        // Extraction des valeurs passées de la body à la requête
        $name = $request->input('name');

        // set de la valeur de la propriété $title
        $category->name = $name;

        $category->updateOrFail();
        return $category;
    }

    // Création méthode delete
    public function delete($id)
    {
        // recherche objet à modifier
        $category = Category::findOrFail($id);

        // suppression dans la BDD
        // réponse HTTP : 200 -> Delete
        // réponse HTTP : 500 -> Internal Server Error
        $category->deleteOrFail();
        return $category;
    }
}
