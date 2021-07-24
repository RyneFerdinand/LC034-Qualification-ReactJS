import './HeaderStyle.css'
import LOGO from '../../assets/logo.png'
import USER from '../../assets/user.png'
import SEARCH from '../../assets/search.png'


function Header(){
    return(
        <header>
            <img src={LOGO} alt="" className="logo" style={{width:"4rem"}}/>
            <div className="action-nav">
                <a href={`/favorite`}>
                    <img src={USER} alt="" />
                </a>
                <a href={`/`}>
                    <img src={SEARCH} alt="" />
                </a>
            </div>
        </header> 
    )
}

export default Header