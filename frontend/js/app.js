const app = {

apiConfiguration: {
    endpoint: 'http://127.0.0.1:8000/api', //adresse HTTP de l'API REST
    // on pourrait avoir besoin d'autres valeurs de config, du coup, on crée un objet qui les contiendra toutes
},

    init: async function() {

        // on va chercher la liste des tâches actuellement enregistrées en BDD
       await taskList.init();

    },

};
document.addEventListener('DOMContentLoaded', app.init);