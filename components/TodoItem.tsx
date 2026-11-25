import { Text, StyleSheet, TouchableOpacity } from "react-native"
import { Task } from "../types/todo"

type TodoItemProps = {
  todo: Task
  toggleTodo: (id: number) => void
}

const TodoItem = ({ todo, toggleTodo }: TodoItemProps) => {
  return (
    <TouchableOpacity
      style={{ flex: 1 }}
      onPress={() => toggleTodo(todo.id)}
      accessibilityRole="button"
      accessibilityLabel={
        todo.completed
          ? `Mark ${todo.text} as incomplete`
          : `Mark ${todo.text} as completed`
      }
    >
      <Text style={[
        styles.todoText,
        // Add a line through text when the task is complete
        todo.completed && styles.completedText
      ]}>
        {todo.text}
      </Text>
    </TouchableOpacity>
  )
}

export default TodoItem

const styles = StyleSheet.create({
  todoText: {
    fontSize: 18,
    color: '#000',
  },
  completedText: {
    textDecorationLine: 'line-through',
  },
})
