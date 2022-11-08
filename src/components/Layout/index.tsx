import React from 'react'
import Footer from './footer'
import Header from './header'

function Layout({ children  }) {

    return (
        <div className="w-full h-full border">
            <Header />
            {children}
            <Footer />
        </div>
    )
}

export default Layout