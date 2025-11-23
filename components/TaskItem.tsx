import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Task } from "../App";

type Props = {
  task: Task;
  onToggle: (id: string) => void;
};

export default function TaskItem({ task, onToggle }: Props) {
  return (
    <TouchableOpacity onPress={() => onToggle(task.id)}>
      <Text
        style={[
          styles.text,
          task.completed && styles.completed
        ]}
      >
        {task.title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    paddingVertical: 10,
  },
  completed: {
    textDecorationLine: "line-through",
    color: "#888",
  },
});
