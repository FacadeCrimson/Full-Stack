import React from 'react';
import { camera, trash, close } from 'ionicons/icons';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonFab, IonFabButton, IonIcon, IonGrid, IonRow,
  IonCol, IonImg, IonActionSheet } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { usePhotoGallery } from '../hooks/usePhotoGallery';
import './Tab3.css';

const Tab3: React.FC = () => {
  const { photos,takePhoto } = usePhotoGallery();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Photo Gallery</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      <IonGrid>
        <IonRow>
          <IonCol size-sm="12">
            <div>
              1 of 3
            </div>
          </IonCol>
          <IonCol size="auto">
            <div>
            Variable width content
            </div>
          </IonCol>
          <IonCol size-sm="12">
            <div>
              3 of 3
            </div>
          </IonCol>
        </IonRow>
      </IonGrid>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 3</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Tab 3 page" />
          	<IonGrid>
				<IonRow>
				{photos.map((photo, index) => (
					<IonCol size="6" key={index}>
					<IonImg src={photo.base64 ?? photo.webviewPath} />
					</IonCol>
				))}
				</IonRow>
      		</IonGrid>
        <IonFab vertical="bottom" horizontal="center" slot="fixed">
			<IonFabButton onClick={() => takePhoto()}>
				<IonIcon icon={camera}></IonIcon>
			</IonFabButton>
        </IonFab>

      </IonContent>
    </IonPage>
  );
};

export default Tab3;
