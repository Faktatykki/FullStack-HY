import React from 'react'

const Notification = ({ isError, note }) => {
    if (note === null) {
        return null
    }
    if (isError) {
        return (
            <div className = "error">
                {note}
            </div>
        )
    }

    return (
        <div className = "allGood">
            {note}
        </div>
    )
}

export default Notification