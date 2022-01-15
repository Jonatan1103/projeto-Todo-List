const formAddTodo = document.querySelector('.form-add-todo')
const inputSearchTodo = document.querySelector('.form-search input')
const todosContainer = document.querySelector('.todos-container')


const filterTodos = (todos, inputValue, matechedTodos) => todos
  .filter( todo => {
    const matechedTodo = todo.textContent.toLocaleLowerCase()
      .includes(inputValue
      .toLocaleLowerCase())
    return matechedTodos ? matechedTodo : !matechedTodo
})

const changeClasses = (todos, addClass, removeClass) => {
  todos.forEach( todo => {
    todo.classList.remove(removeClass)
    todo.classList.add(addClass)
  })
}

const hideLists = (todos, inputValue) => {
  const todoHide = filterTodos(todos, inputValue, false)
  changeClasses(todoHide, 'hidden', 'd-flex')
}

const showLists = (todos, inputValue) => {
  const todoShow = filterTodos(todos, inputValue, true)
  changeClasses(todoShow, 'd-flex', 'hidden')
}


const createTodoLists = (event, inputValue) => {
  if ( inputValue.length) {
    todosContainer.innerHTML += `
    <li class="list-group-item d-flex justify-content-between align-items-center" data-list="${inputValue}">
    <span>${inputValue}</span>
    <i class="far fa-trash-alt" data-delete="${inputValue}"></i>
    </li>
    `
    event.target.reset()
  }
}

const addTodo = event => {
  event.preventDefault()
  const inputValue = event.target.add.value.trim()

  createTodoLists(event, inputValue)
}

const removeTodo = event => {
  const clickedElement = event.target
  const dataAttribute = clickedElement.dataset.delete
  const elementOfTodo = document.querySelector(`[data-list="${dataAttribute}"]`)

  if (dataAttribute) {
    elementOfTodo.remove()
  }
}

const searchTodoInList = event => {
  const inputValue = event.target.value.trim()
  const todos = Array.from(todosContainer.children)
  
  hideLists(todos, inputValue)
  showLists(todos, inputValue)
  
}

formAddTodo.addEventListener('submit', addTodo)
todosContainer.addEventListener('click', removeTodo)
inputSearchTodo.addEventListener('input', searchTodoInList)