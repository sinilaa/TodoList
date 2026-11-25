import { View, StyleSheet } from "react-native"
import { Task } from "../types/todo"
import TodoItem from "./TodoItem"

interface TodoListProps {
  item: Task
  toggleTodo: (id: number) => void
}

export default function TodoList({item, toggleTodo}: TodoListProps) {
  return (
    <View style={styles.todoItem}>
      {/* Show one task and give it toggle access */}
      <TodoItem todo={item} toggleTodo={toggleTodo} />
    </View>
  )
}

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 4,
    margin: 4,
    alignItems: 'center'
  },
  todoText: {
    flex: 1,
    color: '#000'
  },
});
