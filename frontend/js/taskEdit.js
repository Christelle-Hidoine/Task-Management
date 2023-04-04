const taskEdit = {
    
    init: async function() {
        // debugger;
        console.log('init taskEdit');
        // sélection du bouton edit
        const edits = document.querySelectorAll('div.edit');
        // écouteur d'événement sur le bouton edit
        for (const edit of edits) {
        edit.addEventListener('click', taskEdit.handleEditTask);
        }
    },


    /**
     * Handler permettant de modifier une tâche
     */
    handleEditTask: async function() {
        // debugger;
        taskAdd.addMode();
    },

}
