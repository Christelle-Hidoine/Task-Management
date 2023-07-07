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
     * Charge la liste des tags
     */
    getTags: async function() {
        // récupération des données
        const response = await fetch(app.apiConfiguration.endpoint + '/tags');

        let data = await response.json();

        const tagsList = [];

        for (const tag of data) {
            const tagById = {
                tagId: tag.id,
                tagLabel: tag.label,
            };

        tagsList.push(tagById);
        }

        return tagsList;
    },

    /**
     * Ajoute les class et attribut pour afficher la sélection de tag dans le formulaire
     */
    addTags: async function() {
        // condition si la partie tag n'est pas dans le form on l'ajoute
        const tagField = document.querySelector('fieldset');
        if (!tagField) {

            // création de la balise <fieldset>
            const fieldset = document.createElement('fieldset');
            // création de la balise <legend>
            const legend = document.createElement('legend');
            legend.textContent = "Choisissez un tag";
            legend.classList.add("label-category");
            // insertion legend dans fieldset
            fieldset.append(legend);
            
            // sélection du form
            const form = document.querySelector('form > button');
            // insertion fieldset dans le form
            form.before(fieldset);
            
            // On récupère la liste des tags au format JSON
            const tags = await taskEdit.getTags();

            for (const tag of tags) {
                // création d'une div dans le fieldset
                const div = document.createElement('div');
                fieldset.append(div);
                // création de la balise <input> dans la div
                const input = document.createElement('input');
                input.setAttribute('id', tag.tagLabel);
                input.setAttribute('type', 'checkbox');
                input.setAttribute('name', 'tags');
                input.value = tag.tagId;
                div.append(input);
                // création de la balise <label> dans la div
                const label = document.createElement('label');
                label.htmlFor = tag.tagLabel
                label.textContent = tag.tagLabel;
                div.append(label);
            }
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

        // récupération de l'id du tag
        const taskTags = currentTask.querySelectorAll('span');
        tagNameList = [];
        taskTags.forEach(function(tag) {
            const taskName = tag.textContent;
            tagNameList.push(taskName);
        });
        
        // on passe en mode formulaire edit/add
        await taskAdd.addMode();

        await taskEdit.addTags();

        const closeModal = document.querySelector('.modal-dialog-close-button');
        closeModal.addEventListener('click', taskEdit.handleCloseModal);

        const button = document.querySelector('form > button');
        button.textContent = "Modifier";

        // On prérempli les champs du formulaire
        const form = document.querySelector('form');
        form.querySelector('#task-title').value = taskTitle;
        form.querySelector('#task-id').value = taskId;
        form.querySelector('select[name="category_id"]').value = taskCategoryId;

        tagNameList.forEach(function(tag) {
            const inputTag = document.getElementById(tag);
            if (inputTag) {
                inputTag.setAttribute('checked', true);
            }
        })

    },

    /**
     * Handler pour fermer le formulaire
     */
    handleCloseModal: function() {

        const formElement = document.querySelector('.modal-dialog');
        formElement.classList.remove('show');
        taskList.defaultMode();
        const form = document.querySelector('form');
        form.reset();
        const inputChecked = document.querySelectorAll('[checked]');
        inputChecked.forEach(function(input){
            input.removeAttribute('checked');
        })
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
