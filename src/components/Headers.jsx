const Header = (props) => {
    let img_url = ""
    if(props.data) {
        img_url = props.data.img_url
    }
    return (
        <nav>
            <div className="navigation">
                <h2 style={{margin: "0rem 0rem 0rem 1.8rem"}}>Edvora</h2>
                <div className="user_info">
                    <h3>Name</h3>
                    <img src={img_url} alt="User Photo" className="user_profile_photo" />
                </div>
            </div>
        </nav>
    )
}

export default Header;