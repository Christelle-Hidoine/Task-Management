<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TaskController extends Controller
{
    // Création de la méthode list
    public function list()
    {
        // Utilisation de la méthode all() grâce à l'héritage
        $tasks = Task::all()->load('category', 'tags'); // Récupérer la liste des tasks avec le nom de leur catégorie + tags
        // Retour automatique au format JSON 👌

        if ($tasks) {
            return $tasks;
        } else {
            return response(null, 404);
        }
    }

    // Création de la méthode show($id)
    public function show($id)
    {
        // Utilisation de la méthode find($id) grâce à l'héritage
        $task = Task::findOrFail($id)->load('category', 'tags'); // Récupérer la liste des tasks avec le nom de leur catégorie + tags
        // Retour auto au format JSON
        // $tag = Tag::findOrFail($id);
        // foreach ($tag->tasks as $task) {
        //     return $task->tag;
        // }
        return $task;

        // return $task;
        // return $task->category->name; renvoie le nom de la catégorie liée à cette tâche
    }

    // Création de la méthode create
    public function create(Request $request)
    {
        // Dans la variable $validator, je mets le résultat d'une vérification de l'input title
        // avec l'outil Facade Validator on vérifie :
            // existence de $title : 'required'
            // not empty : 'filled'
        $validator = Validator::make($request->input(), [
            'title' => ['required', 'filled']
        ]);

            // Si validation ko
        if ($validator->fails()) {
            // si ko = code HTTP 422 avec un message d'erreur
            return response()->json($validator->errors(), 422);
        }

        // Extraction des valeurs passées de la body de la requête
        $title = $request->input('title');

        // On crée une nouvelle instance, puis on lui définit la propriété title
        $task = new Task();
        $task->title = $title;

        // On sauvegarde, puis on gère la réponse avec le code HTTP qui convient
        // 201 : Created
        // 500 : Internal Server Error
        $task->saveOrFail();
        return $task;
    }

    // Méthode pour modifier les propriétés correspondant à 1 id dans la bdd
    public function update(Request $request, $id)
    {
        // recherche objet à modifier
        $task = Task::findOrFail($id);

        // Dans la variable $validator, je mets le résultat d'une vérification de l'input title
        // avec l'outil Facade Validator on vérifie :
            // existence de $title : 'required'
            // not empty : 'filled'
            $validator = Validator::make($request->input(), [
                'title' => ['required', 'filled']
            ]);

            if ($validator->fails()) {
                return response()->json($validator->errors(), 422);
            }

        // Extraction des valeurs passées de la body à la requête
        $title = $request->input('title');

        // set de la valeur de la propriété $title
        $task->title = $title;

        $task->updateOrFail();
        return $task;
    }

    // Création méthode delete
    public function delete($id)
    {
        // recherche objet à modifier
        $task = Task::findOrFail($id);
        // suppression dans la BDD
        // réponse HTTP : 200 -> Delete
        // réponse HTTP : 500 -> Internal Server Error
        $task->deleteOrFail();
        return $task;
    }
}
