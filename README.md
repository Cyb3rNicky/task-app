# 📱 Task App - Expo + Supabase

Una aplicación de gestión de tareas desarrollada con **React Native (Expo Router)** y **Supabase** como backend (auth + base de datos). Permite a los usuarios registrarse, iniciar sesión, crear tareas y consultarlas.
---

## 🚀 Tecnologías

- [Expo Router](https://expo.dev/router)
- [React Native](https://reactnative.dev/)
- [Supabase](https://supabase.com/) (Auth + Postgres)
- [TypeScript]
- [AsyncStorage] para persistencia de sesión

---

## 📦 Requisitos

- Node.js ≥ 18
- Expo CLI `npm install -g expo-cli`
- Cuenta en [Supabase](https://supabase.com/)
- Editor como VSCode

---

## 🛠️ Instalación

bash
# Clona el repositorio
git clone https://github.com/tu-usuario/task-app.git
cd task-app

# Instala las dependencias
npm install

# ⚙️ Configuración

- Crea un proyecto en Supabase.
- Copia tu SUPABASE_URL y SUPABASE_ANON_KEY.

**Crea el archivo .env:**

- VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
- VITE_SUPABASE_ANON_KEY=tu_clave_anonima

# 🗄️ Configuración de Supabase

1. Crea la tabla tareas:

CREATE TABLE tareas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  titulo text NOT NULL,
  descripcion text,
  fecha_vencimiento date,
  terminada boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone DEFAULT now()
);

2. Habilita RLS (Row Level Security):

ALTER TABLE tareas ENABLE ROW LEVEL SECURITY;

3. Agrega las siguientes políticas:

-- Solo ver tareas propias
CREATE POLICY "Solo ver tareas propias"
ON tareas FOR SELECT
USING (auth.uid() = user_id);

-- Solo insertar si es el usuario autenticado
CREATE POLICY "Insertar tarea propia"
ON tareas FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Solo actualizar si es el usuario autenticado
CREATE POLICY "Actualizar tarea propia"
ON tareas FOR UPDATE
USING (auth.uid() = user_id);

-- Solo eliminar si es el usuario autenticado
CREATE POLICY "Eliminar tarea propia"
ON tareas FOR DELETE
USING (auth.uid() = user_id);



# ▶️ Correr la App

npm run android



# 🧪 Funcionalidades principales

✅ Registro e inicio de sesión con Supabase Auth

📝 Crear tareas

🔒 Acceso seguro con RLS (tareas por usuario)