const taskManager = {

    // propriété tableau vide pour récupérer les tâches de notre API (id & title)
    taskslist: [],

    init: function() {
        // debugger;
        console.log('chargement init');
        
        // Méthode appelée pour ajouter des écouteurs d'événement
        taskManager.addEvents();
    },
    /**
     * Charge la liste des taches depuis notre projet backend api.php
     */
    getTasks: async function() {

        debugger;
        // récupération des données de notre API dans le backend
        const response = await fetch('http://127.0.0.1:8000/api/tasks');

        // conversion de la réponse depuis le format json
        const data = await response.json();
        console.log(data);

        for (const taskFromAPI of data) {
            
            // Je crée un objet qui contient les informations nécessaires d'une seule tache
            const taskById = {
              id: taskFromAPI.id,
              title: taskFromAPI.title
            };

        // j'ajoute chaque tache avec title et id dans mon tableau vide    
        taskManager.taskslist.push(taskById);
        }

        console.log(taskManager.taskslist);

        return taskManager.taskslist;
    },

    /**
     * Méthode pour ajouter des écouteurs d'événement
     */
    addEvents: function () {
        // sélection du bouton edit
        const edit = document.querySelector('.edit');
        // écouteur d'événement sur le bouton edit
        edit.addEventListener('click', taskManager.handleEditTask);

        // sélection du bouton ajout
        const add = document.querySelector('.create-task-container > button');
        // écouteur d'événement sur le bouton ajout
        add.addEventListener('click', taskManager.handleAddTask);

    },

    /**
    * Handler permettant d'afficher la liste des tâches lors du chargement de la page
    */
    handleLoadTasks: async function(event) {

        // On empêche la page de se recharger
        event.preventDefault();

        // on reset les class et attribut
        taskManager.defaultMode();

        // On vide la liste des tâches sur la page
        document.querySelector(".tasklist").textContent = "";
    
        // On récupère la liste des tâches au format JSON
        const tasks = await taskManager.getTasks();

        console.log(tasks);
    
        // On boucle sur la liste des tâches pouyr les insérer dans la page
        for (const task of tasks) {
        taskManager.insertTaskInDom(task);
        }

        // console.log('appel de la méthode handleLoadTasks');
    },

    /**
   * Insérer une tâche dans la page.
   *
   * @param {Object} task
   */
   insertTaskInDom: function(task) {
    // On créé un <li>
    const liElement = document.createElement("li");

    // On ajoute un attribut data-id = id de la tâche
    liElement.setAttribute('data-id', task.id);

    // On sélectionne la balise <ul> pour ajouter la <li>
    const ulElement = document.querySelector(".tasklist");
    // On ajoute la <li> dans la <ul>
    ulElement.append(liElement);

    // on crée la balise <p>
    const titleElement = document.createElement('p');

    // on rajoute le contenu dans la balise <p>
    titleElement.textContent = task.title;

    // On insère la balise <p> dans la balise <li>
    liElement.append(titleElement);

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
   * Handler permettant de modifier une tâche
   */
  handleEditTask: function() {

    taskManager.addMode();
  },

  /**
   * Handler permettant de rajouter une tâche
   */
  handleAddTask: function() {
    
    taskManager.addMode();
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

// au chargement de la page => appel de la méthode init et handleLoadTasks
document.addEventListener('DOMContentLoaded', taskManager.init);
document.addEventListener('DOMContentLoaded', taskManager.handleLoadTasks);