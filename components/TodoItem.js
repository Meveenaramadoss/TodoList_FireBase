import { useState } from 'react';
import { Text, View, Button, TextInput, Alert, Pressable } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import styles from '../style/style.js';
import { ref, update, remove } from 'firebase/database';
import { db, TODOS_REF } from '../firebase/Config.js';


export const TodoItem = ({ todoItem: { todoItem: title, done }, id }) => {

    const [doneState, setDone] = useState(done);

    const onCheck = () => {
        setDone(!doneState);
        const updateTodoItem = {
            todoItem: title,
            done: !doneState
            
        };

        const updates = {}
        updates[TODOS_REF + id] = updateTodoItem;
        return update(ref(db), updates);
    };

    const onRemove = () => {
        const removes ={};
        removes[TODOS_REF + id] = null;
        return update(ref(db), removes);
    }
    return (
        <View style={styles.todoItem}>
            <Pressable onPress={onCheck}>
                {doneState
                    ? <MaterialIcons name={"check-box"} size={32} color="black" />
                    : <MaterialIcons name={"check-box-outline-blank"} size={34} color="black" />
                }
            </Pressable>
            <Text onPress={onCheck}
                style={
                    [styles.todoText,
                     { backgroundColor: doneState ? 'lightgreen' : 'lightblue' }]}>
                {title}
            </Text>
            <Pressable>
                <Entypo name={'trash'} size={32} onPress={onRemove}/>
            </Pressable>
        </View>
    )
}


