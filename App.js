import { useState } from 'react';
import { Text, View, Button, TextInput, Alert, ScrollView } from 'react-native';
import styles from './style/style.js';
import { child, push, ref, set, remove, update, onValue } from 'firebase/database';
import { db, TODOS_REF } from './firebase/Config.js';
import { TodoItem } from './components/TodoItem.js';
import { useEffect } from 'react';


export default function App() {
  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState({});

  const addNewTodo = () => {
    if (newTodo.trim() !== "") {
      const newTodoItem = {
        done: false,
        todoItem: newTodo
      };
      const newTodoItemKey = push(child(ref(db), TODOS_REF)).key;
      const updates = {};
      updates[TODOS_REF + newTodoItemKey] = newTodoItem;
      setNewTodo('');
      return update(ref(db), updates);
    }
  }

  const removeTodos = () => {
    remove(ref(db), TODOS_REF);
  }

  const createTwoButtonAlert = () =>
    Alert.alert('TodoList', 'Remove all Todo Items?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => removeTodos() },
    ]);

  useEffect(() => {
    const todoItemsRef = ref(db, TODOS_REF);
    onValue(todoItemsRef, (snapshot) => {
      const data = snapshot.val() ? snapshot.val() : {};
      const todoItems = { ...data };
      setTodos(data);
    });
  }, []);

  let todosKeys = Object.keys(todos);

  return (
    <View style={styles.container}
      contentContainerStyle={styles.contentContainerStyle}>
        <Text style={styles.header}>TodoList ({todosKeys.length})</Text>
      <View
        style={styles.newItem}>
        <TextInput
          placeholder='Add new Todo'
          value={newTodo}
          style={styles.textInput}
          onChangeText={setNewTodo}></TextInput>
      </View>
      <View style={styles.buttonStyle}>
        <Button
          title='Add new Todo Item'
          onPress={() => addNewTodo()}></Button>
      </View>
      <View style={styles.buttonStyle}>
        <Button
          title='Remove Todo Item'
          onPress={() => createTwoButtonAlert()}></Button>
      </View>
      <ScrollView>
        {todosKeys.length > 0 ? (
          todosKeys.map((key) => (
            <TodoItem
              key={key}
              todoItem={todos[key]}
              id={key}
            />))
        ) : (
          <Text style={styles.infoText}>There are no Items</Text>
        )}

        <View style={styles.buttonStyle}>
          <Button
            title='Remove all todos'
            onPress={() => createTwoButtonAlert()}>
          </Button>
        </View>
      </ScrollView>
   

    </View>
  );
}