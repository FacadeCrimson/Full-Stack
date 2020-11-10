import React from 'react'
import {connect} from 'react-redux'
import useGetData from '../hooks/useGetData'
import {getPosts,getPostsSuccess,getPostsFailure} from '../actions/postsActions'
import { IonList, IonLabel, IonItem } from '@ionic/react';
import InfiniteScroll from "./InfiniteScroll"

function Posts({dispatch, loading, posts, hasErrors}:any){
    const url='https://jsonplaceholder.typicode.com/posts'
    useGetData(url,[getPosts,getPostsSuccess,getPostsFailure],dispatch)

    return  <IonList>
              <IonItem>
                <IonLabel>
                  <h1>Posts</h1>
                  <p>These are all the posts.</p>
                </IonLabel>
              </IonItem>
              {loading? <IonItem>Loading posts...</IonItem>
              : (hasErrors? <IonItem>Unable to display posts.</IonItem>
              // :posts.map((post:any) => <Post key={post.id} post={post} />))}
              :<InfiniteScroll items={posts} container={Post}></InfiniteScroll>)}
            </IonList>
}

function Post(props:any){
    return  <IonItem>
              <IonLabel>
                <h2>{props.title}</h2>
                <p>{props.body.substring(0, 100)}</p>
              </IonLabel>
            </IonItem> 
}

// Map Redux state to React component props
const mapStateToProps = (state:any) => ({
    loading: state.posts.loading,
    posts: state.posts.posts,
    hasErrors: state.posts.hasErrors,
  })
  // Connect Redux to React

export const PostsComp  = connect(mapStateToProps)(Posts)