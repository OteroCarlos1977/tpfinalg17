document.addEventListener('DOMContentLoaded', () => {

    const info = document.getElementById('infoIcon');
    const seccInfo = document.getElementById('seccInfo');
    const cerrar = document.getElementById('botonCerrarInfo');

    info.addEventListener('click', () => {
        seccInfo.style.display = 'flex';
    });
    
    cerrar.addEventListener('click', () => {
        seccInfo.style.display = 'none';
    });
            
        
});
