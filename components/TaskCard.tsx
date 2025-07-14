import { Task } from '@/lib/api'
import { Image, StyleSheet, Text } from 'react-native'
import { Card } from './Themed'

interface Props {
    task: Task
}

export default function TaskCard({ task }: Props) {
  return (
    <Card style={styles.container}>
        {/* Header */}
        <Card style={styles.header}>
            <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/906/906334.png' }} style={styles.taskImage} />
            <Text style={styles.titulo}>{ task.titulo }</Text>
        </Card>

        {/* Content */}
        <Card style={styles.content}>
            <Text style={styles.contentText}>{ task.descripcion }</Text>
        </Card>

        {/* Date */}
        <Card style={styles.date}>
            <Text style={styles.dateText}>{task.fecha_vencimiento}</Text>
        </Card>

    </Card>
  )
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
    date: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
     dateText: {
        fontSize: 16,
        color: 'green'
    },


})