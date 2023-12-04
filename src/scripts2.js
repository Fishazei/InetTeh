/*
//localStorage - позволяет сохранить данные в браузере на долгое время, что даёт нам возможность сначала использовать
localStorage.setItem() - чтобы установить логин и пароль, а потом удалить эту команду, сделав подобие секретности.
Собственно так здесь я и сделал, вот ХD ну а лип = ["test","1"]
*/
const logi = document.getElementById('log')
const pass = document.getElementById('pass')
const sub = document.getElementById('sub')

function probka () {
  if (logi.value !== '') {
    if (localStorage.getItem(logi.value) == null) alert('Ошибка в логине')
    else {
      if (pass.value === localStorage.getItem(logi.value)) {
        sessionStorage.setItem('token', 'token')
        document.location.href = 'test.html'
        // Здесь реализовать переход на страницу
        // Так же надо придумать каким способом не позволять перейти  на страницу, если авторизация не пройдена
      } else alert('Неверный пароль')
    }
  }
}
sub.addEventListener('click', probka)
window.unload = sessionStorage.removeItem('token')
