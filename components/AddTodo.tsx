import { useState } from 'react'
import { View, TextInput, StyleSheet } from 'react-native'

type AddTodoProps = {
  addTodo: (text: string) => void
}

export default function AddTodo({ addTodo }: AddTodoProps) {
  // Store the text typed in the input
  const [input, setInput] = useState<string>('')

  const handleAddTodo = () => {
    // Do not add an empty task
    if (!input.trim()) return

    // Send the cleaned text to the app
    addTodo(input.trim())
    // Clear the input after adding
    setInput('')
  }

  return (
    <View>
      <TextInput
        style={styles.input}
        value={input}
        placeholder="Add a new task"
        onChangeText={setInput}
        onSubmitEditing={handleAddTodo}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    padding: 12,
    margin: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    fontSize: 16,
  },
})