var menu1=document.querySelector('#menu1');
var menu2=document.querySelector('#menu2')
var navbar=document.querySelector('.navbar');
menu1.addEventListener('click',function(){
    menu2.classList.remove('hide');
    menu1.classList.add('hide');
    // navbar.styles.add("flexdirection:column");
})
menu2.addEventListener('click',function(){
    menu1.classList.remove('hide');
    menu2.classList.add('hide');
})