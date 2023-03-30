<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;

class TagController extends Controller
{
    // Création de la méthode list
    public function list ()
    {
        // Utilisation de la méthode all() grâce à l'héritage
        $tags = Tag::all();
        // Retour automatique au format JSON 👌

        if ($tags) {
            return $tags;
        } else {
            return response(null, 404);
        }
    }

    // Création de la méthode show($id)
    public function show($id)
    {
        // Utilisation de la méthode find($id) grâce à l'héritage
        $tag = Tag::findOrFail($id);
        // Retour auto au format JSON
        return $tag;
    }

    // Création de la méthode create
    public function create(Request $request)
    {
        // var_dump($request); die;
        // Extraction des valeurs passées de la body de la requête
        $label = $request->input('label');

        // On crée une nouvelle instance, puis on lui définit la propriété name
        $tag = new Tag();
        $tag->label = $label;

        // On sauvegarde, puis on gère la réponse avec le code HTTP qui convient
        // 201 : Created
        // 500 : Internal Server Error
        $tag = $tag->saveOrFail();
        return $tag;
    }

    // Méthode pour modifier les propriétés correspondant à 1 id dans la bdd
    public function update(Request $request, $id)
    {
        // recherche objet à modifier
        $tag = Tag::findOrFail($id);

        // Extraction des valeurs passées de la body à la requête
        $label = $request->input('label');

        // set de la valeur de la propriété $name
        $tag->label = $label;

        $tag->updateOrFail();
        return $tag;
    }

    // Création méthode delete
    public function delete($id)
    {
        // recherche objet à modifier
        $tag = Tag::findOrFail($id);

        // suppression dans la BDD
        // réponse HTTP : 200 -> Delete
        // réponse HTTP : 500 -> Internal Server Error
        $tag->deleteOrFail();
        return $tag;
    }
}
