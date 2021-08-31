import React from 'react'

const Notification = ({ isError ,errorMessage }) => {
    if (errorMessage === null) {
        return null
    }

    return (
        <div>

            {isError ?
                <div className="error">
                    {errorMessage}
                </div>

                :

                <div className = "success">
                    {errorMessage}
                </div>
            }

        </div>
    )
}

export default Notification