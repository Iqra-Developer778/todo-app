import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, Pressable, FlatList, Alert } from 'react-native'
import { supabase } from '../lib/supabase'
import { router } from 'expo-router'

const Home = () => {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkUser()
    fetchTodos()
  }, [])

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      router.replace('/login')
    }
  }

  const fetchTodos = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      Alert.alert('Error', error.message)
    } else {
      setTodos(data)
    }
    setLoading(false)
  }

  const addTodo = async () => {
    if (newTodo.trim() === '') return

    const { data: { user } } = await supabase.auth.getUser()

    const { error } = await supabase
      .from('todos')
      .insert([{ title: newTodo, user_id: user.id }])

    if (error) {
      Alert.alert('Error', error.message)
    } else {
      setNewTodo('')
      fetchTodos()
    }
  }

  const toggleComplete = async (id, currentStatus) => {
    const { error } = await supabase
      .from('todos')
      .update({ is_complete: !currentStatus })
      .eq('id', id)

    if (!error) fetchTodos()
  }

  const deleteTodo = async (id) => {
    const { error } = await supabase.from('todos').delete().eq('id', id)
    if (!error) fetchTodos()
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.replace('/login')
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Todos</Text>
        <Pressable onPress={handleLogout}>
          <Text style={styles.logout}>Logout</Text>
        </Pressable>
      </View>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Add new todo"
          value={newTodo}
          onChangeText={setNewTodo}
        />
        <Pressable style={styles.addButton} onPress={addTodo}>
          <Text style={styles.addButtonText}>Add</Text>
        </Pressable>
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        refreshing={loading}
        onRefresh={fetchTodos}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Pressable
              style={{ flex: 1 }}
              onPress={() => toggleComplete(item.id, item.is_complete)}
            >
              <Text
                style={[
                  styles.todoText,
                  item.is_complete && styles.completedText,
                ]}
              >
                {item.title}
              </Text>
            </Pressable>
            <Pressable onPress={() => deleteTodo(item.id)}>
              <Text style={styles.deleteText}>Delete</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: { fontSize: 24, fontWeight: 'bold' },
  logout: { color: 'red' },
  inputRow: { flexDirection: 'row', marginBottom: 20 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: 'purple',
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 8,
  },
  addButtonText: { color: '#fff', fontWeight: 'bold' },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  todoText: { fontSize: 16 },
  completedText: { textDecorationLine: 'line-through', color: 'gray' },
  deleteText: { color: 'red' },
})

