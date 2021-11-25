import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
    const notification = useSelector(state => state.notifications)

    return (
        <div>
            {notification}
        </div>
    )
    
}

export default Notification