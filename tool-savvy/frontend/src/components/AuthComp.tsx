import React from 'react'
import {connect} from 'react-redux'
import { IonLabel, IonItem, IonButton, IonAvatar } from '@ionic/react';
import useAuth from '../hooks/useAuth'

function Auth({dispatch, isAuthenticated, isLoading, user}:any){
    const { loginWithRedirect,logout } = useAuth()
    function handleClick(){
        if(isAuthenticated){
            logout()
        }
        else{
            loginWithRedirect()
        }
    }
    return  <IonItem>
                  {user?<>
                            <IonAvatar><img src={user.picture} alt="avatar"></img></IonAvatar>
                            &nbsp;&nbsp;&nbsp;
                            <IonLabel>{user.name}</IonLabel>
                            &nbsp;&nbsp;&nbsp;
                            <IonLabel>{user.updated_at}</IonLabel>
                        </>
                  :<IonLabel>Please Log In to Continue</IonLabel>}
                <IonButton slot="end" onClick={handleClick}>{isLoading?"Loading...":isAuthenticated?"Log out":"Log in"}</IonButton>

            </IonItem>
}

const mapStateToProps = (state:any) => ({
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.auth.isLoading,
    user: state.auth.user,
  })

export const AuthComp  = connect(mapStateToProps)(Auth)