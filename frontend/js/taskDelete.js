const taskDelete = {

    init: async function() {
        // debugger;
        console.log('init taskDelete');
        const deleteBtns = document.querySelectorAll('div.delete');
        // écouteur d'événement sur le bouton delete
        for (const deleteBtn of deleteBtns) {
        deleteBtn.addEventListener('click', taskDelete.handleDeleteTask);
        }
    },

    /**
     * Handler pour supprimer un élément du DOM à la survenue d'un événement (click sur delete)
     * 
     * @param {Event} event 
     */
    handleDeleteTask: function(event) {
        // on récupère le bouton <div delete> à l'origine de l'event et on remonte à son parent <li>
        currentTask = event.currentTarget.parentNode;

        // on récupère le dataset (data-id) correspondant à ce bouton
        currentId = currentTask.dataset.id;

        // on supprime la tâche <li> dans le DOM 
        currentTask.remove();

        // on supprime la tâche dans l'API selon l'id récupéré
        fetch(app.apiConfiguration.endpoint + '/tasks/' + currentId, {method: "DELETE",});
    },
    

};
