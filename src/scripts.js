const counter = document.getElementById('counter');
const incremBtn = document.querySelector('.btn-inc');
const decremBtn = document.querySelector('.btn-dec');

let count = document.getElementById("counter").textContent;
//Суммирование
function increment(){
  count = Number(count) + 1;
  counter.textContent = count;
}
//Вычитание
function decrement(){
  if (count == 0) { count = 0; }
  else {
    count = Number(count) - 1;
    counter.textContent = count;
  }
}
//Вывод текста в Алёрте
function logoAlert(){
  alert("Не надо сюда тыкать");
}
//Переключение класса О15, который отвечает за подсветку области при наведении на неё
function toggleClass(abc){
  document.getElementById(abc).classList.toggle("O15");
}

incremBtn.addEventListener('click', increment);
decremBtn.addEventListener('click', decrement);
document.getElementById('bHW3').addEventListener('click', logoAlert);
document.getElementById('HW3').addEventListener('click', logoAlert);
document.getElementById('HW1').addEventListener('click', () => toggleClass('t1'));
document.getElementById('HW2').addEventListener('click', () => toggleClass('t2'));
document.getElementById('HW3').addEventListener('click', () => toggleClass('t3'));

//Заменить getElementById на querySelector
//Почитать про обёртку и ссылочную функцию
//
