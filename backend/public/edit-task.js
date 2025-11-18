const taskIDDOM = document.querySelector('.task-edit-id')
const taskNameDOM = document.querySelector('.task-edit-name')
const taskDueDateDOM = document.querySelector('.task-edit-due-date')
const taskPriorityDOM = document.querySelector('.task-edit-priority')
const taskRepeatDOM = document.querySelector('.task-edit-repeat')
const taskCompletedDOM = document.querySelector('.task-edit-completed')
const editFormDOM = document.querySelector('.single-task-form')
const editBtnDOM = document.querySelector('.task-edit-btn')
const formAlertDOM = document.querySelector('.form-alert')
const params = window.location.search
const id = new URLSearchParams(params).get('id')
let tempName

const showTask = async () => {
  try {
    const {
      data: { todo },
    } = await axios.get(`/todos/${id}`)
    const { id: todoID, completed, name, dueDate, priority, isRepeating } = todo

    taskIDDOM.textContent = todoID
    taskNameDOM.value = name
    taskDueDateDOM.value = dueDate
    taskPriorityDOM.value = priority
    taskRepeatDOM.checked = isRepeating
    taskCompletedDOM.checked = completed
    tempName = name
  } catch (error) {
    console.log(error)
  }
}

showTask()

editFormDOM.addEventListener('submit', async (e) => {
  editBtnDOM.textContent = 'Loading...'
  e.preventDefault()
  try {
    const taskName = taskNameDOM.value
    const taskDueDate = taskDueDateDOM.value
    const taskPriority = parseInt(taskPriorityDOM.value)
    const taskRepeat = taskRepeatDOM.checked
    const taskCompleted = taskCompletedDOM.checked

    const {
      data: { todo },
    } = await axios.put(`/todos/${id}`, {
      name: taskName,
      dueDate: taskDueDate,
      priority: taskPriority,
      isRepeating: taskRepeat,
      completed: taskCompleted,
    })

    const { id: todoID, completed, name, dueDate, priority, isRepeating } = todo

    taskIDDOM.textContent = todoID
    taskNameDOM.value = name
    taskDueDateDOM.value = dueDate
    taskPriorityDOM.value = priority
    taskRepeatDOM.checked = isRepeating
    taskCompletedDOM.checked = completed
    tempName = name
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = `success, edited task`
    formAlertDOM.classList.add('text-success')
  } catch (error) {
    console.error(error)
    taskNameDOM.value = tempName
    formAlertDOM.style.display = 'block'
    formAlertDOM.innerHTML = `error, please try again`
  }
  editBtnDOM.textContent = 'Edit'
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success')
  }, 3000)
})
