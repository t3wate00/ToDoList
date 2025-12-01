import { useState } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { useTodos } from "./hooks/useTodos";
import TaskList from "./components/TaskList";

export default function App() {
  const { tasks, addTask, toggleTask, removeTask } = useTodos();
  const [newTask, setNewTask] = useState("");

  const handleSubmit = () => {
    addTask(newTask);
    setNewTask("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo with useReducer</Text>

      <TextInput
        placeholder="Add task..."
        style={styles.input}
        value={newTask}
        onChangeText={setNewTask}
        onSubmitEditing={handleSubmit}
      />

      <TaskList tasks={tasks} onToggle={toggleTask} onDelete={removeTask} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60, paddingHorizontal: 20 },
  title: { fontSize: 28, textAlign: "center", marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, borderRadius: 6, marginBottom: 20 },
});
