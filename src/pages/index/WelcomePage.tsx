import React from 'react'

interface WelcomeProps {
user:any
}

export const WelcomePage: React.FC<WelcomeProps> = ({}) => {
return (
    <div className="w-full h-screen overflow-y-hidden ">

        <div className="w-full h-full overflow-y-scroll scroll-bar">

            <div className="w-full h-screen text-4xl font-bold bg-purple-900 flex-row-center">
                HELLO
            </div>
            <div className="w-full h-screen text-4xl font-bold bg-rose-900 flex-row-center
      ">
                WORLD
            </div>

        </div>

    </div>
);
}
