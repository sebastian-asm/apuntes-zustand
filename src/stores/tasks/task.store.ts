import { StateCreator, create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { v4 } from 'uuid'

import { Task, Taskstatus } from '../../interfaces'

interface TaskState {
  tasks: Record<string, Task> // { [key: string]: Task }
  draggingTaskId?: string
  getTasksStatus: (status: Taskstatus) => Task[]
  setDraggingTaskId: (taskId: string) => void
  removeDraggingTaskId: () => void
  changeTaskStatus: (taskId: string, status: Taskstatus) => void
  onTaskDrop: (status: Taskstatus) => void
  addTask: (title: string, status: Taskstatus) => void
}

const storeApi: StateCreator<
  TaskState,
  [['zustand/immer', never], ['zustand/persist', unknown]]
> = (set, get) => ({
  tasks: {
    '1': { id: '1', title: 'task 1', status: 'open' },
    '2': { id: '2', title: 'task 2', status: 'in-progress' },
    '3': { id: '3', title: 'task 3', status: 'open' },
    '4': { id: '4', title: 'task 4', status: 'open' }
  },
  getTasksStatus: (status: Taskstatus) => {
    const { tasks } = get()
    return Object.values(tasks).filter((task) => task.status === status)
  },
  setDraggingTaskId: (taskId: string) => set({ draggingTaskId: taskId }),
  removeDraggingTaskId: () => set({ draggingTaskId: undefined }),
  changeTaskStatus: (taskId: string, status: Taskstatus) => {
    set((state) => {
      state.tasks[taskId] = {
        ...state.tasks[taskId],
        status
      }
    })
  },
  onTaskDrop: (status: Taskstatus) => {
    const { draggingTaskId } = get()
    if (!draggingTaskId) return
    get().changeTaskStatus(draggingTaskId, status)
    get().removeDraggingTaskId()
  },
  addTask: (title: string, status: Taskstatus) => {
    const newTaks = { id: v4(), title, status }
    // utilizando el middleware immer
    set((state) => {
      state.tasks[newTaks.id] = newTaks
    })

    // forma nativa
    // set((state) => ({
    //   tasks: {
    //     ...state.tasks,
    //     [newTaks.id]: newTaks
    //   }
    // }))
  }
})

export const useTaskStore = create<TaskState>()(
  devtools(immer(persist(storeApi, { name: 'task-store' })))
)
