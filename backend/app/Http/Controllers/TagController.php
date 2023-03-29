<?php

namespace App\Http\Controllers;

use App\Models\Tag;

class TagController extends Controller
{
    // Création de la méthode list
    public function list ()
    {
        // Utilisation de la méthode all() grâce à l'héritage
        $tags = Tag::all();
        // Retour automatique au format JSON 👌
        return $tags;
    }

    // Création de la méthode show($id)
    public function show($id)
    {
        // Utilisation de la méthode find($id) grâce à l'héritage
        $tag = Tag::find($id);
        // Retour auto au format JSON
        return $tag;
    }
}
