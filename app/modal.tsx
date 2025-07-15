import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, Pressable } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { View, TextInput, Button } from "@/components/Themed";
import { useTasks } from "@/context/TasksContext";

export default function ModalScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { tasks, updateTask } = useTasks();

  const task = tasks.find((t) => t.id === id);

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (task) {
      setTitulo(task.titulo ?? "");
      setDescripcion(task.descripcion ?? "");
      setFecha(new Date(task.fecha_vencimiento ?? new Date()));
    }
  }, [task]);

  const formattedFecha = fecha.toISOString().split("T")[0];

  const handleSubmit = async () => {
    if (!task) return;

    await updateTask(task.id, {
      titulo,
      descripcion,
      fecha_vencimiento: formattedFecha,
    });

    router.back();
  };

  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  if (!task) {
    return (
      <View style={styles.center}>
        <Text style={styles.notFound}>Tarea no encontrada</Text>
        <Pressable onPress={() => router.back()} style={styles.closeButton}>
          <Text style={styles.closeText}>Cerrar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Título</Text>
      <TextInput value={titulo} onChangeText={setTitulo} />

      <Text>Descripción</Text>
      <TextInput value={descripcion} onChangeText={setDescripcion} />

      <Text>Fecha de vencimiento</Text>
      <Pressable onPress={openDatePicker} style={styles.dateButton}>
        <Text>{formattedFecha}</Text>
      </Pressable>

      {showDatePicker && (
        <DateTimePicker
          value={fecha}
          mode="date"
          display="default"
          minimumDate={new Date()}
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setFecha(selectedDate);
          }}
        />
      )}

      <Button title="Guardar cambios" onPress={handleSubmit} />

      <Pressable onPress={() => router.back()} style={styles.closeButton}>
        <Text style={styles.closeText}>Cancelar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 12,
    backgroundColor: "white",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  notFound: {
    fontSize: 16,
    color: "gray",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  dateButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 4,
    backgroundColor: "#f5f5f5",
  },
  closeButton: {
    marginTop: 20,
    alignSelf: "center",
  },
  closeText: {
    color: "blue",
    fontSize: 16,
  },
});
