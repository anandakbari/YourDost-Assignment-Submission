const tasksDOM = document.querySelector('.tasks')
const loadingDOM = document.querySelector('.loading-text')
const formDOM = document.querySelector('.task-form')
const taskInputDOM = document.querySelector('.task-input')
const dueDateInputDOM = document.querySelector('.due-date-input')
const prioritySelectDOM = document.querySelector('.priority-select')
const repeatCheckboxDOM = document.querySelector('.repeat-checkbox')
const formAlertDOM = document.querySelector('.form-alert')

const showTasks = async () => {
  loadingDOM.style.visibility = 'visible'
  try {
    const {
      data: { todos },
    } = await axios.get('/todos')
    if (todos.length < 1) {
      tasksDOM.innerHTML = '<h5 class="empty-list">No tasks in your list</h5>'
      loadingDOM.style.visibility = 'hidden'
      return
    }
    const allTasks = todos
      .map((todo) => {
        const { completed, id: todoID, name, dueDate, priority, isRepeating } = todo
        const priorityFlag = priority === 1 ? '🚩' : priority === 2 ? '🟠' : priority === 3 ? '🟡' : '🟢'
        const repeatIcon = isRepeating ? '🔄' : ''
        const dueDateFormatted = new Date(dueDate).toLocaleDateString()
        return `<div class="single-task ${completed && 'task-completed'}" data-priority="${priority}">
<div class="task-content">
  <div class="task-checkbox-container">
    <input type="checkbox" class="task-checkbox" data-id="${todoID}" ${completed ? 'checked' : ''}>
  </div>
  <div class="task-info">
    <h5 class="task-name">${name}</h5>
    <div class="task-details">
      <span class="priority">${priorityFlag} Priority ${priority}</span>
      <span class="due-date">📅 Due: ${dueDateFormatted}</span>
      ${repeatIcon && `<span class="repeat">${repeatIcon} Daily</span>`}
    </div>
  </div>
</div>
<div class="task-links">
  <a href="task.html?id=${todoID}" class="edit-link">
    <i class="fas fa-edit"></i>
  </a>
  <button type="button" class="delete-btn" data-id="${todoID}">
    <i class="fas fa-trash"></i>
  </button>
</div>
</div>`
      })
      .join('')
    tasksDOM.innerHTML = allTasks
  } catch (error) {
    tasksDOM.innerHTML =
      '<h5 class="empty-list">There was an error, please try later....</h5>'
  }
  loadingDOM.style.visibility = 'hidden'
}

showTasks()

// delete task /todos/:id

tasksDOM.addEventListener('click', async (e) => {
  const el = e.target
  
  // Handle delete button
  if (el.parentElement.classList.contains('delete-btn')) {
    loadingDOM.style.visibility = 'visible'
    const id = el.parentElement.dataset.id
    try {
      await axios.delete(`/todos/${id}`)
      showTasks()
    } catch (error) {
      console.log(error)
    }
    loadingDOM.style.visibility = 'hidden'
  }
  
  // Handle checkbox toggle
  if (el.classList.contains('task-checkbox')) {
    const id = el.dataset.id
    const completed = el.checked
    
    try {
      await axios.put(`/todos/${id}`, { completed })
      showTasks()
    } catch (error) {
      console.log(error)
      el.checked = !completed // revert checkbox on error
    }
  }
})

// set today as default date
const today = new Date().toISOString().split('T')[0]
dueDateInputDOM.value = today

// Ensure date picker and priority dropdown open on click
dueDateInputDOM.addEventListener('click', function() {
  this.showPicker && this.showPicker()
})

prioritySelectDOM.addEventListener('click', function() {
  this.focus()
})

// form
formDOM.addEventListener('submit', async (e) => {
  e.preventDefault()
  const name = taskInputDOM.value
  const dueDate = dueDateInputDOM.value
  const priority = parseInt(prioritySelectDOM.value)
  const isRepeating = repeatCheckboxDOM.checked

  try {
    await axios.post('/todos', { name, dueDate, priority, isRepeating })
    showTasks()
    taskInputDOM.value = ''
    dueDateInputDOM.value = today
    prioritySelectDOM.value = '4'
    repeatCheckboxDOM.checked = false
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = `success, task added`
    formAlertDOM.classList.add('text-success')
  } catch (error) {
    formAlertDOM.style.display = 'block'
    formAlertDOM.innerHTML = `error, please try again`
  }
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success')
  }, 3000)
})
