import React, { useState, useEffect, useRef } from 'react'

import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])

    const [errorMessage, setErrorMessage] = useState(null)
    const [isError, setIsError] = useState(true)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    const blogFormRef = useRef()


    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username,
                password,
            })

            blogService.setToken(user.token)

            window.localStorage.setItem(
                'loggedUser', JSON.stringify(user)
            )

            setUser(user)
            setUsername('')
            setPassword('')

            setIsError(false)
            setErrorMessage('Logged in successfully')
        } catch (expection) {
            setErrorMessage('Wrong credentials')
        }

        setTimeout(() => {
            setErrorMessage(null)
            setIsError(true)
        }, 5000)
    }

    const handleLogout = () => {
        window.localStorage.removeItem('loggedUser')
        setUser(null)

        setIsError(false)
        setErrorMessage(`${user.username} logged out! See you around!`)

        setTimeout(() => {
            setErrorMessage(null)
            setIsError(true)
        }, 5000)
    }

    const handleBlogSubmit = async (blog) => {
        try {
            if (!blog.title || !blog.author || !blog.url) {
                setErrorMessage('Fill in all the fields, please!')
                setTimeout(() => {
                    setErrorMessage(null)
                    setIsError(true)
                }, 5000)
            } else {
                blogFormRef.current.toggleVisibility()

                await blogService.create(blog)
                const updatedBlogs = await blogService.getAll()
                setBlogs(updatedBlogs)

                setIsError(false)
                setErrorMessage('a new blog added')
            }
        } catch (execption) {
            setErrorMessage('Adding the blog failed successfully')
        }

        setTimeout(() => {
            setErrorMessage(null)
            setIsError(true)
        }, 5000)
    }

    const handleLikeSubmit = async (blogId, updatedBlog) => {
        try {
            if (!updatedBlog.user || !updatedBlog.likes || !updatedBlog.author || !updatedBlog.title || !updatedBlog.url) {
                setErrorMessage('Something went wrong')
                setTimeout(() => {
                    setErrorMessage(null)
                    setIsError(true)
                }, 5000)
            } else {
                await blogService.update(blogId, updatedBlog)
                const updatedBlogs = await blogService.getAll()
                setBlogs(updatedBlogs)

                setIsError(false)
                setErrorMessage(`Liked ${updatedBlog.title} by ${updatedBlog.author}`)
            }
        } catch (exception) {
            setErrorMessage('Liking went wrong somehow')
            console.log(exception.message)
        }

        setTimeout(() => {
            setErrorMessage(null)
            setIsError(true)
        }, 5000)
    }

    const handleRemoveSubmit = async (blogId) => {
        try {
            if (window.confirm('Remove blog?')) {
                blogService.remove(blogId)

                setBlogs(blogs.filter(b => b.id !== blogId))

                setIsError(false)
                setErrorMessage('Blog removed!')
            }
        } catch (exception) {
            setErrorMessage('Removing failed successfully')
        }

        setTimeout(() => {
            setErrorMessage(null)
            setIsError(true)
        }, 5000)
    }

    const handleUsernameChange = async (event) => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = async (event) => {
        setPassword(event.target.value)
    }

    return (
        <div>
            <h2>blogs</h2>

            <Notification isError = {isError} errorMessage = {errorMessage} />

            {user === null ?
                <div>
                    <LoginForm
                        handleLogin = {handleLogin}
                        username = {username}
                        handleUsernameChange = {handleUsernameChange}
                        password = {password}
                        handlePasswordChange = {handlePasswordChange}
                    />
                </div>
                :
                <div>
                    <p>{user.name} logged in<Logout handleLogout = {handleLogout}/></p>

                    <Togglable id = 'togglable' showButtonLabel = "create new blog" hideButtonLabel = "cancel" ref = {blogFormRef}>
                        <BlogForm
                            handleBlogSubmit = {handleBlogSubmit}
                            user = {user}
                        />
                    </Togglable>

                    <BlogList blogs = {blogs}
                        handleLikeSubmit = {handleLikeSubmit}
                        handleRemoveSubmit = {handleRemoveSubmit}
                        user = {user}/>
                </div>
            }
        </div>
    )
}

export default App