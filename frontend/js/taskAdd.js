const taskAdd = {

    init: async function() {
        // debugger;
        console.log('init taskAdd');
        
        // sélection du bouton ajout
        const add = document.querySelector('.create-task-container > button');
        // écouteur d'événement sur le bouton ajout
        add.addEventListener('click', taskAdd.handleAddTask);
    },

    /**
     * Handler permettant de rajouter une tâche
     */
    handleAddTask: async function() {
      
        taskAdd.addMode();
    },

    /**
     * ajoute les class et attribut pour l'affichage de l'ajout/modification des tâches
     */
    addMode: function() {

        // modification de la class sur header
        const headerElement = document.querySelector('header');
        headerElement.classList.add('muted');

        // modification de l'attribut sur div > button
        const buttonElement = document.querySelector('.create-task-container');
        buttonElement.setAttribute('hidden', true);

        // modification de l'attribut sur ul 
        const ulElement = document.querySelector(".tasklist");
        ulElement.setAttribute('hidden', true);

        // modification de la class sur div .modal-dialog
        const formElement = document.querySelector('.modal-dialog');
        formElement.classList.add('show');

    }
}

