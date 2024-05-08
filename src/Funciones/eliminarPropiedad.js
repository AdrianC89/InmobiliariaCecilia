document.addEventListener('DOMContentLoaded', function() {
    const btnEliminar = document.querySelectorAll('.btnEliminar');

    btnEliminar.forEach(button => {
        button.addEventListener('click', async () => {
            const id = button.dataset.id;
            showLoader();
            try {
                const data = await fetch(`/propiedades/form/${id}`, {
                    method: 'delete'
                });

                const resp = await data.json();
                
                if(resp.estado){
                    hideLoader();
                    window.location.href = '/propiedades/form';
                }
            } catch (error) {
                console.log(error);
                hideLoader();
            }
        });
    });
});