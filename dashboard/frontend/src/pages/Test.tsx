import React, {useState,useEffect} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonFab, IonFabButton, IonModal, IonInput,
	IonItem, IonIcon, IonLabel, IonButton } from '@ionic/react';
import { trash, add} from 'ionicons/icons';

export interface Todo {
    id: number;
    text: string;
}

const Test: React.FC = () => {
    const [text, setText] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [todos, setTodos] = useState<Todo[]>([]);
    useEffect(() => {
        async function doFetch() {
          const result = await fetch(`${process.env.REACT_APP_BACKEND}/test`);
          const data = await result.json();
          setTodos(data);
        }
        doFetch();
      }, []);

    const addTodo = () => {
    const nextId = todos.reduce((id, todo) => Math.max(id, todo.id!), 0) + 1;
    const todo: Todo = {
        id: nextId,
        text
    };
    setTodos([...todos, todo]);
    setShowModal(false);
    setText('');
    };

return (
    <IonPage>
    <IonHeader>
        <IonToolbar>
        <IonTitle>Ionic React Todos</IonTitle>
        </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">
        {todos.length === 0 ? (
        <div>No todos, add some!</div>
        ) : (
            <IonList>
                {todos.map((todo, i) => (
                    <IonItem key={i}>
                    <IonLabel>
                        <h2>{todo.text}</h2>
                    </IonLabel>
                    <IonIcon data-icon="trash" icon={trash} color="danger" slot="end" />
                    </IonItem>
                ))}
            </IonList>
        )}
    <IonFab vertical="bottom" horizontal="end">
    <IonFabButton title="Add Todo" onClick={() => setShowModal(true)}>
        <IonIcon data-icon="add" icon={add} />
    </IonFabButton>
    </IonFab>
    <IonModal
    onDidDismiss={() => setShowModal(false)}
    isOpen={showModal}
    >
    <IonToolbar>
        <IonTitle>Add Todo</IonTitle>
    </IonToolbar>
        <IonContent>
            <IonList>
                <IonItem>
                <IonLabel position="stacked">Todo</IonLabel>
                <IonInput id="todo" title="Todo Text" value={text} onIonChange={e => setText(e.detail.value!)} />
                </IonItem>
            </IonList>
            <IonButton expand="block" onClick={addTodo}>
                Save
            </IonButton>
        </IonContent>
    </IonModal>
    </IonContent>
    </IonPage>
);
};

export default Test;
