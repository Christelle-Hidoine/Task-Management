const app = {

apiConfiguration: {
    endpoint: 'http://127.0.0.1:8000/api', //adresse HTTP de l'API REST
    // on pourrait avoir besoin d'autres valeurs de config, du coup, on crée un objet qui les contiendra toutes
},

    init: async function() {

        // on va chercher la liste des tâches actuellement enregistrées en BDD
       await taskList.init();
       // sélection du form
       const form = document.querySelector('form');
       // Ecouteur d'événement submit sur le formulaire
       form.addEventListener('submit', app.handleTaskFormSubmit);

    },

    /**
     * Handler pour traiter le formulaire add/edit
     * 
     * @param {Event} event 
     */
    handleTaskFormSubmit: async function(event) {
    
        event.preventDefault();

        // on récupère l'élément cliqué
        const newTask = event.currentTarget;
        // on récupère la value de l'input avec FormData
        const dataTask = new FormData(newTask);
      
        // on crée le nouvel objet à convertir en json
        const newTaskJson = {
            "title": dataTask.get('title'),
            "category_id": dataTask.get('category_id'),
            "tags": dataTask.getAll('tags'),
        };

        // on récupère l'id : 
        const taskId = dataTask.get('id'); 

        if (taskId === '') {
            // ajout de la tâche en BDD
            await taskAdd.addTaskDB(newTaskJson);
        }
        else {
            await taskEdit.editTaskDB(taskId, newTaskJson);
            const form = document.querySelector('form');
            form.querySelector('#task-id').value = "";
        }

        // fermeture du formulaire
        taskEdit.handleCloseModal();

        // affichage de la liste mise à jour avec la nouvelle tâche
        await taskList.init();

    }

};

document.addEventListener('DOMContentLoaded', app.init);