const taskEdit = {
    
    init: async function() {
        // debugger;
        console.log('init taskEdit');
        // sélection du bouton edit
        const edits = document.querySelectorAll('div.edit');
        // écouteur d'événement sur le bouton edit
        for (const edit of edits) {
        edit.addEventListener('click', taskEdit.handleDisplayEditForm);
        }
    },


    /**
     * Handler permettant d'afficher le formulaire de modification de tâche
     */
    handleDisplayEditForm: async function(event) {

        // debugger;        
        const currentTask = event.currentTarget.parentNode;
        // récupération de l'id de la tâche
        const taskId = currentTask.dataset.id;
        // récupération du titre
        const taskTitle = currentTask.querySelector('p').textContent;
        // récupération de la catégorie
        const categoryName = currentTask.querySelector('em');
        // récupération de l'id catégorie
        const categoryId = categoryName.dataset.id;

        // On prérempli les champs du formulaire
        const form = document.querySelector('form');
        form.querySelector('#task-title').value = taskTitle;
        form.querySelector('#task-id').value = taskId;
        
        // on passe en mode formulaire edit/add
        taskAdd.addMode();

        // Ecouteur d'événement submit sur le formulaire
        form.addEventListener('submit', taskEdit.handleUpdateTask);
    },

    /**
     * Handler permettant de traiter le formulaire
     * @param {Event} event 
     */
    handleUpdateTask: async function (event) {
        event.preventDefault();
    
        const updateTask = event.currentTarget; 
        const updateData = new FormData(updateTask); 
        const taskId = updateData.get('id');
        
        // on crée le nouvel objet à convertir en json
        const updateTaskJson = {
            "title": updateData.get('title'),
            "category_id": updateData.get('category')
        };
    
        const response = await fetch(
            app.apiConfiguration.endpoint + '/tasks/' + taskId,
            {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updateTaskJson)
            }
        );
    
        if (response.status === 200) {
            taskList.init();
            const success = document.querySelector('.success');
            success.removeAttribute('hidden');
            setTimeout(() => {
                success.setAttribute("hidden", true); // Remettre l'attribut hidden après 3 secondes
            }, 3000);
        } else {
            const danger = document.querySelector('.danger');
            danger.removeAttribute('hidden');
        }
    }

}
