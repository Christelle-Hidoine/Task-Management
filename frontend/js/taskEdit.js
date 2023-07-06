const taskEdit = {
    
    init: async function() {

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

        const currentTask = event.currentTarget.parentNode;
        // récupération de l'id de la tâche
        const taskId = currentTask.dataset.id;
        // récupération du titre
        const taskTitle = currentTask.querySelector('p').textContent;
        // récupération du nom de la catégorie
        const taskCategoryName = currentTask.querySelector('em');
        // récupération de l'id de la catégorie
        const taskCategoryId = taskCategoryName.dataset.id;
        
        // on passe en mode formulaire edit/add
        await taskAdd.addMode();

        const closeModal = document.querySelector('.modal-dialog-close-button');
        closeModal.addEventListener('click', taskEdit.handleCloseModal);

        const button = document.querySelector('form > button');
        button.textContent = "Modifier";

        // On prérempli les champs du formulaire
        const form = document.querySelector('form');
        form.querySelector('#task-title').value = taskTitle;
        form.querySelector('#task-id').value = taskId;
        form.querySelector('select[name="category_id"]').value = taskCategoryId;

        // Ecouteur d'événement submit sur le formulaire
        form.addEventListener('submit', taskEdit.handleUpdateTask);
    },

    /**
     * Handler pour fermer le formulaire
     */
    handleCloseModal: function() {

        const formElement = document.querySelector('.modal-dialog');
        formElement.classList.remove('show');
        taskList.defaultMode();
    },

    /**
     * Méthode pour modifier une tâche dans la DB
     * 
     * @param {number} taskId 
     * @param {Object} task (title and id)
     */
    editTaskDB: async function(taskId = null, task) {

        const response = await fetch(
            app.apiConfiguration.endpoint + '/tasks/' + taskId,
            {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(task)
            }
        );
    
        if (response.ok === false) {
            const danger = document.querySelector('.danger');
            danger.removeAttribute('hidden');
            setTimeout(() => {
                danger.setAttribute("hidden", true); // Remettre l'attribut hidden après 3 secondes
            }, 3000);
        } else {
            const success = document.querySelector('.success');
            success.textContent = "La tâche a bien été modifiée";
            success.removeAttribute('hidden');
            setTimeout(() => {
                success.setAttribute("hidden", true); // Remettre l'attribut hidden après 3 secondes
            }, 3000);
        }
    }

}
