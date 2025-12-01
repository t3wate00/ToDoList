import { Text, TouchableOpacity, StyleSheet, View, Button } from "react-native";
import { Task } from "../hooks/useTodos";

type Props = {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function TaskItem({ task, onToggle, onDelete }: Props) {
  return (
    <View style={styles.row}>
      <TouchableOpacity onPress={() => onToggle(task.id)} style={{ flex: 1 }}>
        <Text style={[styles.text, task.completed && styles.completed]}>
          {task.title}
        </Text>
      </TouchableOpacity>

      <Button title="X" onPress={() => onDelete(task.id)} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  text: { fontSize: 18 },
  completed: { textDecorationLine: "line-through", color: "#888" },
});
