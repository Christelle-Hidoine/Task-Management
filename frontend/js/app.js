const app = {

apiConfiguration: {
    endpoint: 'http://127.0.0.1:8000/api', //adresse HTTP de l'API REST
    // on pourrait avoir besoin d'autres valeurs de config, du coup, on crée un objet qui les condiandra toutes
},

    init: async function() {

        // debugger;
        // on va chercher la liste des tâches actuellement enregistrées en BDD
        console.log('démarrage');
        taskList.init();
        taskDelete.init();
        taskAdd.init();
        
    },

};
document.addEventListener('DOMContentLoaded', app.init);