import React, { useEffect, useState } from "react";
import { View, TextInput, StyleSheet, Text, KeyboardAvoidingView, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TaskList from "./components/TaskList";

export type Task = {
  id: string;
  title: string;
  completed: boolean;
};

export default function App() {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  // Load tasks on startup
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const json = await AsyncStorage.getItem("tasks");
    if (json) {
      setTasks(JSON.parse(json));
    }
  };

  const saveTasks = async (updated: Task[]) => {
    setTasks(updated);
    await AsyncStorage.setItem("tasks", JSON.stringify(updated));
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    const newItem: Task = {
      id: Date.now().toString(),
      title: newTask,
      completed: false,
    };
    const updated = [newItem, ...tasks];
    saveTasks(updated);
    setNewTask("");
  };

  const toggleTask = (id: string) => {
    const updated = tasks.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    saveTasks(updated);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={styles.title}>Todo list</Text>

      <TextInput
        placeholder="Enter task"
        value={newTask}
        onChangeText={setNewTask}
        onSubmitEditing={addTask}
        returnKeyType="done"
        style={styles.input}
      />

      <TaskList tasks={tasks} onToggle={toggleTask} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "purple",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
});
