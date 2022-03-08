import Search from './Search'

const Header = () => {
    return(
        <header className="header-wrapper">
            <div className='logo-text-wrapper'>
                <h1>Rosetta</h1>
                <h2>Beta</h2>
            </div>
            
            <Search/>
            <div className='btn-wrapper'>
                <button className='btn-signup'>
                    Sign In
                </button>
                <button className='btn-login'>
                    Sign up    
                </button>
            </div>
        </header>
    )
}

export default Header