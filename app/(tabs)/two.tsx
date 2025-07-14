import AddTaskForm from '@/components/AddTaskForm';
import { View } from '@/components/Themed';
import { useTasks } from '@/context/TasksContext';
import { StyleSheet } from 'react-native';

export default function AddTaskScreen() {
  const { addTask } = useTasks();

  return (
    <View style={styles.container}>
      <AddTaskForm onSubmit={addTask} />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
