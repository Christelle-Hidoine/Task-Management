const taskAdd = {

    init: async function() {
        
        taskAdd.handleDisplayAddForm();
    },

    /**
     * Handler permettant d'afficher le formulaire d'ajout de tâche
     */
    handleDisplayAddForm: async function() {
      
        const button = document.querySelector('form > button');
        button.textContent = "Ajouter";

        taskAdd.addMode();
        
        // sélection du form
        const form = document.querySelector('form');
        // Ecouteur d'événement submit sur le formulaire
        form.addEventListener('submit', taskAdd.handleCreateTask);

        const closeModal = document.querySelector('.modal-dialog-close-button');
        closeModal.addEventListener('click', taskEdit.handleCloseModal);
        
    },

    /**
     * ajoute les class et attribut pour l'affichage de l'ajout/modification des tâches-catégorie
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

        taskAdd.addCategory();

    },

    /**
     * Handler permettant le traitement du formulaire 
     * @param {Event} event 
     */
    handleCreateTask: async function(event) {

        event.preventDefault();
        // on récupère l'élément cliqué
        const newTask = event.currentTarget;
        // on récupère la value de l'input avec FormData
        const dataTask = new FormData(newTask);

        // on crée le nouvel objet à convertir en json
        const newTaskJson = {
            "title": dataTask.get('title'),
            "category_id": dataTask.get('category_id')
        };
    
        taskAdd.addTaskDB(newTaskJson);
    },

    /**
     * ajoute les class et attribut pour afficher la sélection de la catégorie dans le DOM
     */
    addCategory: async function() {
        // condition si la partie category n'est pas dans le form => on l'ajoute
        const labelCategory = document.querySelector('.label-category');
        if (!labelCategory) {

            // création d'une div
            const div = document.createElement('div');
            div.classList.add('tasklist');
            // création de la balise <label> 
            const label = document.createElement('label');
            // sélection du form
            const form = document.querySelector('form > button');
            // insertion div dans le form
            form.before(div);
            // insertion de la balise <label> dans la div
            div.append(label);
            // attribut For
            label.htmlFor ='task-category';
            label.textContent = 'Choisissez une catégorie';
            // class sur label
            label.classList.add('label-category');
            
            // création de la balise <select>
            const select = document.createElement('select');
            // attribut name + id
            select.setAttribute('name', 'category_id');
            select.setAttribute('id', 'task-category');
            // insertion de la balise <select> dans le form
            div.append(select);

            // On récupère la liste des categories au format JSON
            const categories = await taskAdd.getCategories();

            // On boucle sur la liste des categories pour les insérer dans les options
            for (const category of categories) {
                // création de la balise <option>
                const option = document.createElement('option');
                // insertion de la balise <option> dans select
                select.append(option);
                option.value = category.categoryId;
                option.textContent = category.categoryName;
                }
        }
        
    },

    /**
     * Charge la liste des catégories depuis notre projet backend api.php
     */
    getCategories: async function() {

        // récupération des données de notre API dans le backend (cf app.js objet endpoint)
        const response = await fetch(app.apiConfiguration.endpoint + '/categories');

        // conversion de la réponse depuis le format json
        let data = await response.json();

        // propriété tableau vide pour récupérer les categories de notre API (id & name)
        const categoriesList = [];

        for (const categorieFromApi of data) {
            
            // Je crée un objet qui contient les informations nécessaires d'une seule categorie
            const categoryById = {
              categoryId: categorieFromApi.id,
              categoryName: categorieFromApi.name,
            };

        // j'ajoute chaque categorie avec name et id dans mon tableau vide    
        categoriesList.push(categoryById);
        }

        return categoriesList;

    },

    /**
     * Méthode pour ajouter une tâche dans la database
     * @param {string} task 
     */
    addTaskDB: async function(task) {
        debugger;
        const response = await fetch(app.apiConfiguration.endpoint + '/tasks',
         {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task)
        });

        if (response.status === 201) {
            taskList.init();
            const success = document.querySelector('.success');
            success.textContent = "La nouvelle tâche a bien été ajoutée";
            success.removeAttribute('hidden');
            setTimeout(() => {
                success.setAttribute("hidden", true); // Remettre l'attribut hidden après 3 secondes
            }, 3000);
            taskList.defaultMode();
        } else {
            const danger = document.querySelector('.danger');
            danger.removeAttribute('hidden');
        }

    },

}

