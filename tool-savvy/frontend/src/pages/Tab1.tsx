import React from 'react';
import {connect} from 'react-redux'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
	IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent,
	IonItem, IonIcon, IonLabel, IonButton, IonGrid, IonRow, IonCol
	} from '@ionic/react';
import { pin, wifi} from 'ionicons/icons';
import {getPosts,getPostsSuccess,getPostsFailure} from '../actions/postsActions'
import useGetData from '../hooks/useGetData'
import './Tab1.css';

const Tab1View: React.FC = ({dispatch, loading, posts, error}:any) => {
    const url='https://jsonplaceholder.typicode.com/todos/1'
    useGetData(url,[getPosts,getPostsSuccess,getPostsFailure],dispatch)

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
          
        <IonCard>
            <IonCardHeader>
				<IonCardSubtitle>Card Subtitle</IonCardSubtitle>
				<IonCardTitle>About</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
				<div>There is a famous saying that goes: "Don't be obsessed with tools." and another one: "I suppose it is tempting, if the only tool you have is a hammer, to treat everything as if it were a nail."
					<p>This app aims to help you become savvy about tools, and in turn, be a master of tools.</p>
					<p>After all, it's what we accomplish with tools that matters.</p>
				</div>
            </IonCardContent>
        </IonCard>

		<IonGrid>
        <IonRow>
			<IonCol size="12"  sizeMd="3" offsetMd="1">
          <IonCard>
            <IonItem>
            <IonIcon icon={pin} slot="start" />
            <IonButton fill="outline" slot="end">View</IonButton>
            </IonItem>
            <IonCardContent>
            {loading?"Loading...":posts.title}
            </IonCardContent>
          </IonCard>
			</IonCol>
      <IonCol size="12"  sizeMd="3" offsetMd="1">
          <IonCard>
            <IonItem>
            <IonIcon icon={pin} slot="start" />
            <IonButton fill="outline" slot="end">View</IonButton>
            </IonItem>
            <IonCardContent>
            This is content, without any paragraph or header tags,
            within an ion-cardContent element.
            </IonCardContent>
          </IonCard>
      </IonCol>
          	<IonCol size="12"  sizeMd="3" offsetMd="1">
		  		<IonCard>
					<IonItem>
					<IonIcon icon={pin} slot="start" />
					<IonButton fill="outline" slot="end">View</IonButton>
					</IonItem>
					<IonCardContent>
					This is content, without any paragraph or header tags,
					within an ion-cardContent element.
					</IonCardContent>
				</IonCard>
          	</IonCol>
        </IonRow>
      </IonGrid>

      <IonCard>
        <IonItem href="/about" className="ion-activated">
          <IonIcon icon={wifi} slot="start" />
          <IonLabel>About</IonLabel>
        </IonItem>
      </IonCard>
	  <IonCard>
        <IonItem href="/comp1" className="ion-activated">
          <IonIcon icon={wifi} slot="start" />
          <IonLabel>Components</IonLabel>
        </IonItem>
      </IonCard>

      <IonCard>
        <IonItem href="/user/1" className="ion-activated">
          <IonIcon icon={wifi} slot="start" />
          <IonLabel>User1</IonLabel>
        </IonItem>
      </IonCard>
      <IonCard>
        <IonItem href="/user/2" className="ion-activated">
          <IonIcon icon={wifi} slot="start" />
          <IonLabel>User2</IonLabel>
        </IonItem>
      </IonCard>
      <IonCard>
        <IonItem href="/temp" className="ion-activated">
          <IonIcon icon={wifi} slot="start" />
          <IonLabel>Temp</IonLabel>
        </IonItem>
      </IonCard>
      <IonCard>
        <IonItem href="/test" className="ion-activated">
          <IonIcon icon={wifi} slot="start" />
          <IonLabel>Test</IonLabel>
        </IonItem>
      </IonCard>
      </IonContent>

    </IonPage>
  );
};

// Map Redux state to React component props
const mapStateToProps = (state:any) => ({
  loading: state.posts.loading,
  posts: state.posts.posts,
  hasErrors: state.posts.hasErrors,
})

export const Tab1  = connect(mapStateToProps)(Tab1View)