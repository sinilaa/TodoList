import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text } from 'react-native'
import { Task } from './types/todo'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import TodoList from './components/TodoList'
import AddTodo from './components/AddTodo'

const STORAGE_KEY = 'tasks'

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loaded, setLoaded] = useState<boolean>(false)

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const savedTasks = await AsyncStorage.getItem(STORAGE_KEY)

        if (savedTasks !== null) {
          setTasks(JSON.parse(savedTasks))
        }
      } catch (error) {
        console.error('Error loading tasks:', error)
      } finally {
        setLoaded(true)
      }
    }

    loadTasks()
  }, [])

  useEffect(() => {
    if (!loaded) return

    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(tasks)
        )
      } catch (error) {
        console.error('Error saving tasks:', error)
      }
    }

    saveTasks()
  }, [tasks, loaded])

  const addTodo = (text: string) => {
    const task: Task = {
      id: Date.now(),
      text: text,
      completed: false
    }

    setTasks(previousTasks => [...previousTasks, task])
  }

  const toggleTodo = (id: number) => {
    setTasks(previousTasks =>
      previousTasks.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    )
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Todo List</Text>

        {loaded && <AddTodo addTodo={addTodo} />}

        <FlatList<Task>
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TodoList
              item={item}
              toggleTodo={toggleTodo}
            />
          )}
        />

        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  }
})