import { StyleSheet, Text, Pressable } from 'react-native'
import { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Button, TextInput, View } from './Themed';

interface NuevaTarea {
  titulo: string;
  descripcion: string;
  fecha_vencimiento: string; // formato 'YYYY-MM-DD'
}

interface Props {
  onSubmit: (task: NuevaTarea) => void;
}

export default function AddTaskForm({ onSubmit }: Props) {
  
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const formattedFecha = fecha.toISOString().split('T')[0]; // Formato 'YYYY-MM-DD'

  const handleSubmit = () => {
    onSubmit({
      titulo,
      descripcion,
      fecha_vencimiento: formattedFecha,
    });

    setTitulo('');
    setDescripcion('');
    setFecha(new Date());
  };

  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  return (
    <View style={styles.container}>
      <Text>Título</Text>
      <TextInput
        value={titulo}
        onChangeText={setTitulo}
      />

      <Text>Descripción</Text>
      <TextInput
        value={descripcion}
        onChangeText={setDescripcion}
      />

      <Text>Fecha de vencimiento</Text>
      <Pressable onPress={openDatePicker} style={styles.dateButton}>
        <Text>{formattedFecha}</Text>
      </Pressable>

      {showDatePicker && (
        <DateTimePicker
          value={fecha}
          mode="date"
          display='default'
          minimumDate={new Date()}
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setFecha(selectedDate);
          }}
        />
      )}

      <Button title="Agregar Tarea" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 16,
    gap: 8,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    borderRadius: 4,
  },
  dateButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 4,
    backgroundColor: '#f5f5f5',
  },
});
