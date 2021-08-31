import React from 'react'

import Blog from './Blog'

import PropTypes from 'prop-types'


const BlogList = ({ blogs, handleLikeSubmit, handleRemoveSubmit, user }) => {

    blogs.sort((a, b) => a.likes > b.likes ? -1 : 1)

    return (
        <div>
            {blogs.map(blog =>
                <Blog key = {blog.id} blog = {blog}
                    handleLikeSubmit = {handleLikeSubmit}
                    handleRemoveSubmit = {handleRemoveSubmit}
                    user = {user}/>
            )}
        </div>
    )
}

BlogList.propTypes = {
    blogs: PropTypes.array.isRequired,
    handleLikeSubmit: PropTypes.func.isRequired,
    handleRemoveSubmit: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}

export default BlogList