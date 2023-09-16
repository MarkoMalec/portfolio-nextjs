import React from 'react'
import SmallLogo from '~/assets/SmallLogo'
import Image from 'next/image'

const Header = () => {
  return (
    <header>
        <div className="container">
            <div className="site-logo">
                <SmallLogo />
            </div>
            <nav>

            </nav>
        </div>
    </header>
  )
}

export default Header