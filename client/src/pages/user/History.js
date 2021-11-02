import React from 'react'
import UserNav from '../../components/nav/UserNav'

const History = () => {
    return (
        <div className="container-fluid mx-auto">
            <div className="grid grid-cols-[300px,1fr]">
                <UserNav />
                <div className="py-10">
                    Content
                </div>
            </div>
        </div>
    )
}

export default History
