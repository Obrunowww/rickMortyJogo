const input = document.querySelector(".inputDoLogin");
const button = document.querySelector(".buttonDoLogin");
const form = document.querySelector(".formDeLogin")


const inputValido = ({ target }) => {
    if( target.value.length >2){
        button.removeAttribute("disabled")
    }else{
        button.setAttribute("disabled", "")
    }
};



const guardarInformação = (event) => {
    event.preventDefault();
    console.log('logando....');
    localStorage.setItem("jogador", input.value)
    window.location = "pages/game.html"
}

input.addEventListener("input", inputValido);
form.addEventListener('submit', guardarInformação)
// button.addEventListener("click", começarJogo);