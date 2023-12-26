import { JiraTasks } from '../../components'
import { useTaskStore } from '../../stores'

export const JiraPage = () => {
  const pendingTasks = useTaskStore((state) => state.getTasksStatus('open'))
  const inProgressTasks = useTaskStore((state) => state.getTasksStatus('in-progress'))
  const doneTasks = useTaskStore((state) => state.getTasksStatus('done'))

  return (
    <>
      <h1>Tareas</h1>
      <p>Manejo de estado con objectos de Zustand</p>
      <hr />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <JiraTasks tasks={pendingTasks} title="Pendientes" status="open" />
        <JiraTasks tasks={inProgressTasks} title="Avanzando" status="in-progress" />
        <JiraTasks tasks={doneTasks} title="Terminadas" status="done" />
      </div>
    </>
  )
}
