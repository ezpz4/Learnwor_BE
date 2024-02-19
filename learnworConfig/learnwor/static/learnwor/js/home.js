const session = sessionStorage.getItem("loggedIn");


document.getElementById("inputLink").addEventListener('keydown', async (event) => {
    if(event.key == 'Enter'){
        /*
        document.getElementById("loading-screen").style.display = "flex";
        document.getElementById("navbar").style.display = "none";
        document.getElementById("main").style.display = "none";
        */
        
        showLoadingScreen();
    }
})

function showLoadingScreen() {
    document.getElementById("loading-screen").style.display = "flex";
    document.getElementById("loading-screen").style.position = "fixed";
    document.getElementById("loading-screen").style.flexDirection = "column";
}