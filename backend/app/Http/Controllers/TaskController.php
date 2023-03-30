<?php

namespace App\Http\Controllers;

use App\Models\Task;

class TaskController extends Controller
{
    // Création de la méthode list
    public function list()
    {
        // Utilisation de la méthode all() grâce à l'héritage
        $tasks = Task::all();
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
        $task = Task::find($id);
        // Retour auto au format JSON

        if ($task) {
            return $task;
        } else {
            return response(null, 404);
        }
    }
}
