import { Task } from '@/lib/api';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card } from './Themed';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface Props {
  task: Task;
  onDelete: () => void;
  onEdit?: () => void;
}

export default function TaskCard({ task, onDelete, onEdit }: Props) {

    const router = useRouter();

    const handleEdit = () => {
        router.push(`/modal?id=${task.id}`);
    };
    
  return (
    <Card style={styles.container}>
      <Card style={styles.header}>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/906/906334.png' }}
          style={styles.taskImage}
        />
        <Text style={styles.titulo}>{task.titulo}</Text>
      </Card>

      <Card style={styles.content}>
        <Text style={styles.contentText}>{task.descripcion}</Text>
      </Card>

      <Card style={styles.footer}>
        <Text style={styles.footerText}>{task.fecha_vencimiento}</Text>
        
        <View style={styles.actions}>
           
          <TouchableOpacity onPress={handleEdit}>
            <FontAwesome name="pencil-square-o" size={24} color="blue" style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity onPress={onDelete}>
            <FontAwesome name="trash-o" size={24} color="red" />
          </TouchableOpacity>
          
        </View>
      </Card>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
    paddingHorizontal: 16,
  },
  taskImage: {
    height: 32,
    width: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  titulo: {
    fontWeight: 'bold',
  },
  content: {
    padding: 16,
  },
  contentText: {
    fontSize: 16,
  },
  footer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: 'green',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  icon: {
    marginRight: 12,
  },
});
