export const GET_POSTS = 'GET_POSTS'
export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS'
export const GET_POSTS_FAILURE = 'GET_POSTS_FAILURE'

// Create Redux action creators that return an action
export const getPosts = () => ({
    type: GET_POSTS,
})
  
export const getPostsSuccess = (posts:any) => ({
    type: GET_POSTS_SUCCESS,
    payload: posts,
})
  
export const getPostsFailure = () => ({
    type: GET_POSTS_FAILURE,
})