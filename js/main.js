function loadComponent(id, fileName) {
    const element = document.getElementById(id);
    if (!element) return;

    // Detectamos si el archivo actual está dentro de la carpeta "pages"
    // Esto funciona tanto en Windows (\) como en servidores (/)
    const isSubPage = window.location.pathname.includes('/pages/') || window.location.pathname.includes('\\pages\\');
    const pathPrefix = isSubPage ? '../' : '';
    
    fetch(`${pathPrefix}templates/${fileName}`)
        .then(response => {
            if (!response.ok) throw new Error(`No se encontró: templates/${fileName}`);
            return response.text();
        })
        .then(data => {
            element.innerHTML = data;
            // Opcional: Si quieres que el menú resalte la página activa tras cargar
            highlightActiveLink(); 
        })
        .catch(error => console.error("Error cargando componentes:", error));
}

document.addEventListener("DOMContentLoaded", () => {
    loadComponent('top-bar-placeholder', 'top-bar.html');
    loadComponent('header-placeholder', 'header.html');
    loadComponent('footer-placeholder', 'footer.html');
});

/* Función para resaltar el enlace activo en el menú de navegación */
function highlightActiveLink() {
    const links = document.querySelectorAll('nav a');
    const currentPath = window.location.pathname.split('/').pop();
    links.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}   
