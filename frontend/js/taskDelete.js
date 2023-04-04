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

    handleDeleteTask: function(event) {
        currentTask = event.currentTarget.parentNode;
        currentTask.remove();
    },

};
