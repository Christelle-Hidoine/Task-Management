const taskAdd = {

    init: async function() {
        // debugger;
        console.log('init taskAdd');
        
        // sélection du bouton Nouvelle Tâche
        const add = document.querySelector('.create-task-container > button');
        // écouteur d'événement sur le Nouvelle Tâche
        add.addEventListener('click', taskAdd.handleDisplayAddForm);
    },

    /**
     * Handler permettant d'afficher le formulaire d'ajout de tâche
     */
    handleDisplayAddForm: async function() {
      
        taskAdd.addMode();

        const form = document.querySelector('form');
        form.addEventListener('submit', taskAdd.handleCreateTask);
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

    },

    /**
     * handler permettant le traitement du formulaire et la récupération des données + envoi dans DB
     * @param {Event} event 
     */
    handleCreateTask: async function(event) {

        event.preventDefault();
        console.log(event);
        // on récupère l'élément cliqué
        const newTask = event.currentTarget;
        // on récupère la value de l'input avec FormData
        const data = new FormData(newTask);
        console.log(data.get('title'));

        // on crée le nouvel objet à convertir en json
        const newTaskJson = {
            "title": data.get('title')
        };

        const response = await fetch(app.apiConfiguration.endpoint + '/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTaskJson)
        });

        if (response.status === 201) {
            const success = document.querySelector('.success');
            success.removeAttribute('hidden');
            setTimeout(() => {
                const success = document.querySelector('.success');
                success.setAttribute("hidden", true); // Remettre l'attribut hidden après 3 secondes
            }, 3000);
            taskList.init();
        }
        else {
            const danger = document.querySelector('.danger');
            danger.removeAttribute('hidden');
        }
    },

    /**
     * ajoute les class et attribut pour afficher la sélection de la catégorie dans le DOM
     */
    addCategory: async function() {
        // création de l'input/select pour la catégorie
        const input = document.createElement('label');

    },

    handleAddCategory: async function(event) {
        event.preventDefault();
        console.log(event);

        const newCategory = event.currentTarget;
        
    }
}

