// JS для скролла
const options = {
  root: document.querySelector('.content'),
  rootMargin: '0px',
  threshold: 0.9
}
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      fetchData()
      observer.unobserve(target)
    }
  })
}, options)

// Начальная позиция куда добавлять
let target = document.querySelector('.cont1')
// Добавляем его в обсервер, который следит, за тем наблюдаем ли мы этот элемент в root
observer.observe(target)

let Page = 0
let length = 50
let u = 0
let classNm = ''
let targetNm = ''

// Получение данных и тп.
function fetchData () {
  Page++
  // Дурацкая защита, но зато рабочая
  if (u + 1 > length) {
    return
  }
  while ((u + 1) / 10 < Page) {
    u++
  }

  fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then((data) => {
      // Инфа о номере и отслеживаемом элементе
      console.log('U=' + u)
      console.log('observed: ' + target.classList)
      length = data.length

      if (data[u].id / 10 === Page) {
        for (let i = u + 1 - 10; i < u + 1; i++) {
          if (i === u) {
            appendDataToPageL(data[i])
            break
          } else createEl('post ', data[i])
        }
      }
    })
}
// Финальное добавление на страницу
function appendDataToPageL (data) {
  classNm = 'post cont' + (Page + 1)
  targetNm = '.cont' + (Page + 1)

  createEl(classNm, data)

  // Обновление элемента после которого надо добавлять элементы
  target = document.querySelector(targetNm)
  observer.observe(target)
  console.log('create observed: ' + target.classList)
}
// Добавление элемента с заданными параметрами
function createEl (classNm, data) {
  const container = document.querySelector('.cont')

  const divelm = document.createElement('div')
  const h1elm = document.createElement('h1')
  const h2elm = document.createElement('h2')
  const pelm = document.createElement('p')

  divelm.appendChild(h1elm)
  divelm.appendChild(h2elm)
  divelm.appendChild(pelm)

  h1elm.textContent = 'UserID: ' + data.id
  h2elm.textContent = data.title
  pelm.textContent = data.body

  divelm.className = classNm
  h1elm.className = 'shrift1'
  h2elm.className = 'shrift1'
  pelm.className = 'shrift1'
  container.appendChild(divelm)
}
