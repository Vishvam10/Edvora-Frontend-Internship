
const Card = (props) => {
    let st_paths = `[${props.data.station_path.toString()}]`
    let map_url = props.data.map_url;
    return (
        <div className="station_card">
            <img src={map_url} alt="Sample Map" className="station_image" />
            <div className="station_info">
                <p>Ride Id : <span className="station_info_highlight">{props.data.id}</span></p>
                <p>Origin Station : <span className="station_info_highlight">{props.data.origin_station_code}</span></p>
                <p>station_path : <span className="station_info_highlight">{st_paths}</span></p>
                <p>Date : <span className="station_info_highlight">{props.data.date}</span></p>
                <p>Distance : <span className="station_info_highlight">{props.data.distance}</span></p>
            </div>
            <div className="station_city_and_state">
                <span className="city_state_wrapper">{props.data.city}</span>
                <span className="city_state_wrapper">{props.data.state}</span>
            </div>
        </div>
    )
}

export default Card