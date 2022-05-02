import { useEffect, useState } from 'react';

import {
  BrowserRouter as Router,
  Routes ,
  Route,
  Link,
  NavLink
} from "react-router-dom";

import './App.css';
import filterLogo from './assets/filter.png'

import Header from './components/Headers';

import NearestRides from "./components/NearestRides"
import UpcomingRides from "./components/UpcomingRides"
import PastRides from "./components/PastRides"

import Filters from "./components/Filters";

function App() {
  const rides_api_url = "https://assessment.api.vweb.app/rides"
  const user_api_url = "https://assessment.api.vweb.app/user"
  const [userData, setUserData] = useState();
  const [stationData, setStationData] = useState();
  const [stateFilter, setStateFilter] = useState();
  const [cityFilter, setCityFilter] = useState();
  const [showFilters, setShowFilters] = useState(false);
  let nearest_rides_props, header_props;

  useEffect(() => {
    fetch(user_api_url)
    .then(res => res.json())
    .then(data => setUserData(data))
    .catch(err => console.log(err))

    fetch(rides_api_url)
    .then(res => res.json())
    .then(data => {
      data.forEach(ele => {
        ele["state"] = ele["state"].toLowerCase()
        ele["city"] = ele["city"].toLowerCase()
      });
      setStationData(data)
    })
    .catch(err => console.log(err))
  },[]);

  if(userData) {
    nearest_rides_props = {
      cur_id: userData.station_code,
      data: stationData,
    }
    header_props = {
      name: userData.name,
      img_url: userData.url
    }
  }
  
  const onHandleStateFilter = (data) => {
    setStateFilter(data)
  }
  const onHandleCityFilter = (data) => {
    setCityFilter(data)
  }
  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }
  
  return (
    <div className="App background">
      <Header data={header_props} />
      <div>
        <Router>
          <div style={{margin: "2rem 0rem 0rem 2rem"}}>
            <div className="menu">
              <ul className="rides_menu">
                  <li>
                      <NavLink to="/nearest-rides" style={{color: "white"}}>Nearest Rides</NavLink>
                  </li>
                  <li>
                      <NavLink to="/upcoming-rides" style={{color: "white"}}>Upcoming Rides</NavLink>
                  </li>
                  <li>
                      <NavLink to="/past-rides" style={{color: "white"}}>Past Rides</NavLink>
                  </li>
              </ul>
              <div>
                <img src={filterLogo} alt="filterLogo" style={{margin: "0rem 1.6rem 0rem 0rem"}}></img>
                <span style={{color: "white", fontSize: "1.6rem"}} onClick={toggleFilters}>Filters</span>
              </div>
            </div>
              <div className='filters_menu'>
                {showFilters ? <Filters data={stationData} onHandleStateFilter={onHandleStateFilter} onHandleCityFilter={onHandleCityFilter} /> : ""}
              </div>
              <Routes >
                  <Route path="/" element={<NearestRides {...nearest_rides_props} sFilter={stateFilter} cFilter={cityFilter} />}></Route>
                  <Route path="/nearest-rides" element={<NearestRides {...nearest_rides_props} sFilter={stateFilter} cFilter={cityFilter} />}></Route>
              </Routes>
              <Routes >
                  <Route path="/upcoming-rides" element={<UpcomingRides data={stationData} sFilter={stateFilter} cFilter={cityFilter}/>}></Route>
              </Routes>
              <Routes >
                  <Route path="/past-rides" element={<PastRides data={stationData} sFilter={stateFilter} cFilter={cityFilter} />}></Route>
              </Routes>
          </div>
        </Router>
      </div>
      
    </div>
  );
}

export default App;
