import React, {useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import useGetData from '../hooks/useGetData'
import {getPosts,getPostsSuccess,getPostsFailure} from '../actions/postsActions'

const DashboardPage = ({dispatch, loading, posts, hasErrors}:any) => {
    const url='https://jsonplaceholder.typicode.com/posts'
    const data = useGetData(url,[getPosts,getPostsSuccess,getPostsFailure],dispatch)

  return <section>
            <h1>Dashboard</h1>
            <p>This is the dashboard.</p>
            <Link to="/posts" className="button">
                View Posts
            </Link>
        </section>
}

export const Post = ({post}:any) => (
    <article className="post-excerpt">
      <h2>{post.title}</h2>
      <p>{post.body.substring(0, 100)}</p>
    </article>
  )

// Map Redux state to React component props
const mapStateToProps = (state:any) => ({
    loading: state.posts.loading,
    posts: state.posts.posts,
    hasErrors: state.posts.hasErrors,
  })
  // Connect Redux to React

export default connect(mapStateToProps)(DashboardPage)