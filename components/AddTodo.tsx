import { useState } from 'react'
import { View, TextInput, StyleSheet } from 'react-native'

type AddTodoProps = {
  addTodo: (text: string) => void
}

export default function AddTodo({ addTodo }: AddTodoProps) {
  const [input, setInput] = useState<string>('')

  const handleAddTodo = () => {
    if (!input.trim()) return

    addTodo(input.trim())
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