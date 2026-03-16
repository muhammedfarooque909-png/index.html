let menuLinks = document.querySelectorAll(".menu ul li a");

menuLinks.forEach(link=>{
link.addEventListener("click",function(){

menuLinks.forEach(item=>item.classList.remove("active"));

this.classList.add("active");

});
});

function openRegister(el){

document.getElementById("register-popup").style.display="block";

menuLinks.forEach(item=>item.classList.remove("active"));

el.classList.add("active");

}

function goToRegister(){
window.location.href = "login.html";
}