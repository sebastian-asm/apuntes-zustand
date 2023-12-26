import { DragEvent, useState } from 'react'
import Swal from 'sweetalert2'

import { useTaskStore } from '../stores'
import { Taskstatus } from '../interfaces'

interface Options {
  status: Taskstatus
}

export const useTasks = ({ status }: Options) => {
  const isDragging = useTaskStore((state) => !!state.draggingTaskId)
  const onTaskDrop = useTaskStore((state) => state.onTaskDrop)
  const addTask = useTaskStore((state) => state.addTask)
  const [onDragOver, setOnDragOver] = useState(false)

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setOnDragOver(true)
  }

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setOnDragOver(false)
  }

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setOnDragOver(false)
    onTaskDrop(status)
  }

  const handleAddTask = async () => {
    const { value, isConfirmed } = await Swal.fire({
      title: 'Agergar nueva tarea',
      input: 'text',
      inputPlaceholder: 'Escriba el nombre de la tarea',
      showCancelButton: true,
      inputValidator: (value) => !value && 'Debe ingresar un nombre para la tarea'
    })
    if (!isConfirmed) return
    addTask(value, status)
  }

  return {
    isDragging,
    onDragOver,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleAddTask
  }
}
