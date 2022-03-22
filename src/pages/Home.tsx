import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const newTask: Task = {
      id: new Date().getTime(),
      done: false,
      title: newTaskTitle,
    };
    setTasks((oldState) => [...oldState, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map((task) => ({ ...task }));
    const taskFound = updatedTasks.find((task) => task.id === id);

    if (!taskFound) return;
    taskFound.done = !taskFound.done;

    console.log({ tasks });
    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    const filteredList = tasks.filter((item) => item.id !== id);

    setTasks(filteredList);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList tasks={tasks} toggleTaskDone={handleToggleTaskDone} removeTask={handleRemoveTask} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
});
