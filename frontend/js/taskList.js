const taskList = {

    init: async function() {
     await taskList.displayTasks();
    },

    /**
     * Charge la liste des taches depuis notre projet backend api.php
     */
    getTasks: async function() {

        // debugger;
        // récupération des données de notre API dans le backend (cf app.js objet endpoint)
        const response = await fetch(app.apiConfiguration.endpoint + '/tasks');

        // conversion de la réponse depuis le format json
        let data = await response.json();

        // propriété tableau vide pour récupérer les tâches de notre API (id & title)
        const taskslist = [];

        for (const taskFromAPI of data) {
            
            // Je crée un objet qui contient les informations nécessaires d'une seule tache
            const taskById = {
              id: taskFromAPI.id,
              title: taskFromAPI.title,
              categoryId: taskFromAPI.category?.id, // le ? permet de ne pas afficher la catégorie id si inexistante
              categoryName: taskFromAPI.category?.name, // le ? permet de ne pas afficher la catégorie name si inexistante (null dans la BDD)
            };

            // j'ajoute chaque tache avec title et id dans mon tableau vide    
            taskslist.push(taskById);
        }

        return taskslist;
    },

    /**
    * Méthode pour afficher la liste des tâches lors du chargement de la page
    */
    displayTasks: async function() {

        // on reset les class et attribut
        taskList.defaultMode();

        // On vide la liste des tâches sur la page
        document.querySelector(".tasklist").textContent = "";
    
        // On récupère la liste des tâches au format JSON
        const tasks = await taskList.getTasks();
   
        // On boucle sur la liste des tâches pouyr les insérer dans la page
        for (const task of tasks) {
        taskList.insertTaskInDom(task);
        }

        // on appelle la méthode taskDelete.init() à la création de la div delete
        await taskDelete.init();

        // on appelle la méthode taskEdit.init() à la création de la div edit
        await taskEdit.init();
    },

      /**
     * Insérer une tâche dans la page.
     *
     * @param {Object} task
     */
    insertTaskInDom: function(task) {
        // On créé un <li>
        const liElement = document.createElement("li");

        // On ajoute un data-set data-id = id de la tâche
        // liElement.setAttribute('data-id', task.id);
        liElement.dataset.id = task.id;

        // On sélectionne la balise <ul> pour ajouter la <li>
        const ulElement = document.querySelector(".tasklist");
        // On ajoute la <li> dans la <ul>
        ulElement.append(liElement);

        // on crée la balise <p> pour la tâche
        const titleElement = document.createElement('p');
        // on rajoute le contenu dans la balise <p> 
        titleElement.textContent = task.title 
        // On insère la balise <p> dans la balise <li>
        liElement.append(titleElement);

        // on crée une balise <em> avec la catégorie
        const emElement = document.createElement('em');
        // on rajoute le dataset id sur la catégorie
        emElement.dataset.id = task.categoryId;
        // on rajoute le contenu à la balise <em>
        emElement.textContent = task.categoryName;
        // on place la balise <p> dans la <li>
        liElement.append(emElement);

        // On crée un élément <div> pour le delete + ajout class delete + placement dans balise <li>
        const divDeleteElement = document.createElement('div');
        divDeleteElement.classList.add('delete');
        liElement.append(divDeleteElement);
        

        // On crée un élément <div> pour le édit + ajout class edit + placement dans balise <li>
        const divEditElement = document.createElement('div');
        divEditElement.classList.add('edit');
        liElement.append(divEditElement);
        

    },

     /**
     * reset les class et attribut pour l'affichage de la list des tâches
     */
    defaultMode: function() {

        // modification de la class sur header
        const headerElement = document.querySelector('header');
        headerElement.classList.remove('muted');

        // modification de l'attribut sur div > button
        const buttonElement = document.querySelector('.create-task-container');
        buttonElement.removeAttribute('hidden');

        // modification de l'attribut sur ul 
        const ulElement = document.querySelector(".tasklist");
        ulElement.removeAttribute('hidden');

        // modification de la class sur div .modal-dialog
        const formElement = document.querySelector('.modal-dialog');
        formElement.classList.remove('show');
        
    },

    
}

