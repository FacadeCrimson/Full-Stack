import React, { useState } from 'react';
import { IonContent,  IonPage, IonToolbar, IonFooter, IonActionSheet, IonAlert, IonRippleEffect, 
    IonDatetime ,IonItem, IonLabel, IonButton, IonHeader, IonTitle, IonFab, IonFabButton,
    IonList,IonIcon, IonItemDivider, IonInput, IonFabList, IonTextarea} from '@ionic/react';
import { trash, share, caretForwardCircle, heart, close, logoVimeo, logoFacebook, logoInstagram, logoTwitter } from 'ionicons/icons';

const Comp1: React.FC = () => {
    const [showActionSheet, setShowActionSheet] = useState(false);
    const [showAlertA, setShowAlertA] = useState(false);
    const [showAlertB, setShowAlertB] = useState(false);
    const [selectedDate, setSelectedDate] = useState<string>('2012-12-15T13:47:20.789');
    const [text, setText] = useState<string>();
    const [number, setNumber] = useState<number>();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Component</IonTitle>
        </IonToolbar>
      </IonHeader>
        <IonFooter>
            <IonToolbar>
                <IonButton onClick={() => setShowActionSheet(true)} expand="block">
                    Show Action Sheet
                </IonButton>     
            </IonToolbar>      
            <IonButton onClick={() => setShowAlertA(true)} expand="block">Show Alert A</IonButton>
            <IonButton onClick={() => setShowAlertB(true)} expand="block">Show Alert B</IonButton> 
        </IonFooter>
      <IonActionSheet
        isOpen={showActionSheet}
        onDidDismiss={() => setShowActionSheet(false)}
        cssClass='my-custom-class'
        buttons={[{
          text: 'Delete',
          role: 'destructive',
          icon: trash,
          handler: () => {
            console.log('Delete clicked');
          }
        }, {
          text: 'Share',
          icon: share,
          handler: () => {
            console.log('Share clicked');
          }
        }, {
          text: 'Play (open modal)',
          icon: caretForwardCircle,
          handler: () => {
            console.log('Play clicked');
          }
        }, {
          text: 'Favorite',
          icon: heart,
          handler: () => {
            console.log('Favorite clicked');
          }
        }, {
          text: 'Cancel',
          icon: close,
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]}
      >
      </IonActionSheet>
       
      <IonContent scrollEvents={true}
        onIonScrollStart={() => {}}
        onIonScroll={() => {}}
        onIonScrollEnd={() => {}}>

        <IonAlert
          isOpen={showAlertA}
          onDidDismiss={() => setShowAlertA(false)}
          cssClass='my-custom-class'
          header={'Confirm!'}
          message={'Message <strong>text</strong>!!!'}
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
              handler: blah => {
                console.log('Confirm Cancel: blah');
              }
            },
            {
              text: 'Okay',
              handler: () => {
                console.log('Confirm Okay');
              }
            }
          ]}
        />

        <IonAlert
          isOpen={showAlertB}
          onDidDismiss={() => setShowAlertB(false)}
          cssClass='my-custom-class'
          header={'Prompt!'}
          inputs={[
            {
              name: 'name1',
              type: 'text',
              placeholder: 'Placeholder 1'
            },
            {
              name: 'name2',
              type: 'text',
              id: 'name2-id',
              value: 'hello',
              placeholder: 'Placeholder 2'
            },
            {
              name: 'name3',
              value: 'http://ionicframework.com',
              type: 'url',
              placeholder: 'Favorite site ever'
            },
            // input date with min & max
            {
              name: 'name4',
              type: 'date',
              min: '2017-03-01',
              max: '2018-01-12'
            },
            // input date without min nor max
            {
              name: 'name5',
              type: 'date'
            },
            {
              name: 'name6',
              type: 'number',
              min: -5,
              max: 10
            },
            {
              name: 'name7',
              type: 'number'
            },
            {
              name: 'name8',
              type: 'password',
              placeholder: 'Advanced Attributes',
              cssClass: 'specialClass',
              attributes: {
                maxlength: 4,
                inputmode: 'decimal'
              }
            }
          ]}
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
                console.log('Confirm Cancel');
              }
            },
            {
              text: 'Ok',
              handler: () => {
                console.log('Confirm Ok');
              }
            }
          ]}
        />
        
        <IonButton className="ion-activatable ripple-parent">
          A button with a bounded ripple effect
          <IonRippleEffect></IonRippleEffect>
        </IonButton>

        <IonItem slot="fixed" >Fixed Content</IonItem>

        <IonItem>
          <IonLabel>YYYY</IonLabel>
          <IonDatetime pickerOptions={{
            buttons: [
              {
                text: 'Save',
                handler: () => console.log('Clicked Save!')
              }, {
                text: 'Log',
                handler: () => {
                  console.log('Clicked Log. Do not Dismiss.');
                  return false;
                }
              }
            ]
          }}
            placeholder="Custom Options" displayFormat="YYYY" min="1981" max="2002"
            value={selectedDate} onIonChange={e => setSelectedDate(e.detail.value!)}>
          </IonDatetime>
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">MMMM YY</IonLabel>
          <IonDatetime displayFormat="MMMM YY" min="1989-06-04" max="2004-08-23" value={selectedDate} onIonChange={e => setSelectedDate(e.detail.value!)}></IonDatetime>
        </IonItem>

        <IonItem>
          <IonLabel>DDD. MMM DD, YY (custom locale)</IonLabel>
          <IonDatetime
            min="1990-02"
            max="2000"
            dayShortNames={['s\u00f8n','man','tir','ons','tor','fre','l\u00f8r'
            ]}
            displayFormat="DDD. MMM DD, YY"
            monthShortNames="jan, feb, mar, apr, mai, jun, jul, aug, sep, okt, nov, des"
            value={selectedDate} onIonChange={e => setSelectedDate(e.detail.value!)}
          ></IonDatetime>
        </IonItem>

        <IonItem>
          <IonLabel>D MMM YYYY H:mm</IonLabel>
          <IonDatetime displayFormat="D MMM YYYY H:mm" min="1997" max="2010" value={selectedDate} onIonChange={e => setSelectedDate(e.detail.value!)}></IonDatetime>
        </IonItem>

        <IonItem>
          <IonLabel>Leap years, summer months</IonLabel>
          <IonDatetime displayFormat="MM/YYYY" pickerFormat="MMMM YYYY" monthValues="6,7,8" yearValues={[2020, 2016, 2008, 2004, 2000, 1996]} 
          value={selectedDate} onIonChange={e => setSelectedDate(e.detail.value!)}></IonDatetime>
        </IonItem>

          {/*-- fab placed in the center of the content with a list on each side --*/}
          <IonFab vertical="center" horizontal="center" slot="fixed">
            <IonFabButton>
              <IonIcon icon={share} />
            </IonFabButton>
            <IonFabList side="top">
              <IonFabButton><IonIcon icon={logoVimeo} /></IonFabButton>
            </IonFabList>
            <IonFabList side="bottom">
              <IonFabButton><IonIcon icon={logoFacebook} /></IonFabButton>
            </IonFabList>
            <IonFabList side="start">
              <IonFabButton><IonIcon icon={logoInstagram} /></IonFabButton>
            </IonFabList>
            <IonFabList side="end">
              <IonFabButton><IonIcon icon={logoTwitter} /></IonFabButton>
            </IonFabList>
          </IonFab>

          <IonList>
            <IonItemDivider>Number type input</IonItemDivider>
            <IonItem>
              <IonInput type="number" value={number} placeholder="Enter Number" onIonChange={e => setNumber(parseInt(e.detail.value!, 10))}></IonInput>
            </IonItem>

            <IonItemDivider>Textarea that clears the value on edit</IonItemDivider>
            <IonItem>
              <IonLabel>Comment</IonLabel>
              <IonTextarea clearOnEdit={true} value={text} onIonChange={e => setText(e.detail.value!)}></IonTextarea>
            </IonItem>

            <IonItemDivider>Textarea with custom number of rows and cols</IonItemDivider>
            <IonItem>
              <IonLabel>Notes</IonLabel>
              <IonTextarea rows={6} cols={20} placeholder="Enter any notes here..." value={text} onIonChange={e => setText(e.detail.value!)}></IonTextarea>
            </IonItem>
          </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Comp1;