import Image from 'next/image'
import React from 'react'

const Header = () => {
    return (
        <div className='bg-black-alpha-90 flex justify-content-center py-6'>
            <Image src="/logos/logo.png" 
                width={200}
                height={300}
                alt="Picture of the author"
            />
        </div>
    )
}

export default Header