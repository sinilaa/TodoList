import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text } from 'react-native'
import { Task } from './types/todo'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import TodoList from './components/TodoList'
import AddTodo from './components/AddTodo'

// Use this name to find and save task data on the device
const STORAGE_KEY = 'tasks'

export default function App() {
  // Store all tasks shown in the list
  const [tasks, setTasks] = useState<Task[]>([])
  // Track whether saved tasks have been loaded
  const [loaded, setLoaded] = useState<boolean>(false)

  useEffect(() => {
    // Load saved tasks when the app starts
    const loadTasks = async () => {
      try {
        // Read saved tasks using the storage key
        const savedTasks = await AsyncStorage.getItem(STORAGE_KEY)

        if (savedTasks !== null) {
          // Convert stored text back into task objects
          setTasks(JSON.parse(savedTasks))
        }
      } catch (error) {
        console.error('Error loading tasks:', error)
      } finally {
        // Allow saving only after loading is finished
        setLoaded(true)
      }
    }

    loadTasks()
  }, [])

  useEffect(() => {
    // Wait until loading finishes before saving
    if (!loaded) return

    const saveTasks = async () => {
      try {
        // Save the current tasks on the device
        await AsyncStorage.setItem(
          // This key identifies where the task data is stored
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
    // Create a new task with a unique number from the current time
    const task: Task = {
      id: Date.now(),
      text: text,
      completed: false
    }

    // Keep old tasks and add the new task
    setTasks(previousTasks => [...previousTasks, task])
  }

  const toggleTodo = (id: number) => {
    // Change only the task with the matching id
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