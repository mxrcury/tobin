import axios from 'axios'

const instance = axios.create({
    baseURL:'https://63031e7c9eb72a839d793a73.mockapi.io/api/v1/'
})

export const tasksAPI = {
    getTasks(){
        return instance.get(`tasks`).then(response => response.data)
    },
    addTask (createTask) {
        return instance.post(
          `tasks`,
          createTask
        )
    },
    deleteTask (taskId){
       return instance.delete(
        `tasks/${taskId}`
      )
    },
    toggleTaskCompleting(taskId,isDone){
      return instance.put(
        `tasks/${taskId}`,
        {isDone}
      )
    },
    editTask(taskId,taskTitle,isDone){
        return instance.put(
          `tasks/${taskId}`,
          { taskTitle: `${taskTitle}`, isDone }
        );
    }
}