export interface Task {
  id: string
  title: string
  status: Taskstatus
}

export type Taskstatus = 'open' | 'in-progress' | 'done'
