import { FlatList } from 'react-native';
import { useTasks } from '@/context/TasksContext';
import TaskCard from '@/components/TaskCard';
import { View } from '@/components/Themed';
import { StyleSheet } from 'react-native';

export default function TaskListScreen() {
  const { tasks } = useTasks();

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <TaskCard task={item} />}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
