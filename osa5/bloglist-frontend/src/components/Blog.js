import React, { useState } from 'react'

import PropTypes from 'prop-types'


const Blog = ({ handleRemoveSubmit, handleLikeSubmit, blog, user }) => {

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const [visible, setVisible] = useState(false)

    const handleVisible = () => {
        setVisible(!visible)
    }

    const handleLike = () => {
        const updatedBlog = { ...blog, likes: blog.likes + 1 }
        handleLikeSubmit(blog.id, updatedBlog)
    }

    const handleRemove = () => {
        handleRemoveSubmit(blog.id)
    }

    return (
        visible ?

            <div style = {blogStyle}>
                <p>
                    {blog.title} {blog.author} <button id = 'visibleButton' onClick = {handleVisible}>hide</button><br/>
                    {blog.url} <br/>
      likes {blog.likes} <button id = 'likeButton' onClick = {handleLike}>like</button> <br/>
                    {blog.user.name} <br/>


                    {(user.username === blog.user.name || user.name === blog.user.name) ?
                        <button id = 'removeButton' onClick = {handleRemove}>remove</button>
                        :
                        <br></br>
                    }
                </p>
            </div>

            :

            <div style = {blogStyle}>
                {blog.title} {blog.author} <button onClick = {handleVisible}>view</button>
            </div>
    )
}

Blog.propTypes = {
    handleRemoveSubmit: PropTypes.func.isRequired,
    handleLikeSubmit: PropTypes.func.isRequired,
    blog: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
}

export default Blog