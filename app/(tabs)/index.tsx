import { FlatList, Alert } from 'react-native';
import { useTasks } from "@/context/TasksContext";
import TaskCard from "@/components/TaskCard";
import { View } from "@/components/Themed";
import { StyleSheet } from "react-native";

export default function TaskListScreen() {
  const { tasks, deleteTask } = useTasks();

  const handleDeleteTask = (taskId: string) => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de que deseas eliminar esta tarea?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            await deleteTask(taskId);
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskCard task={item} onDelete={() => handleDeleteTask(item.id)} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
