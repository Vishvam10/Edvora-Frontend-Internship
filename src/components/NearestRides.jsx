import { useEffect, useState } from "react";
import Card from "./Card";

const NearestRides = (props) => {
    const [nearestRides, setNearestRides] = useState([])

    let visited = []
    let filteredResults;

    useEffect(() => {
        if(props.data) {
            calculateNearestRides(props.data);
        }
    }, [props.data])

    const calculateNearestRides = (data) => {
        data.forEach((ele,id) => {
            let st_paths = ele.station_path.sort();
            let flag = true
            for(let p of st_paths) {
                if(p > props.cur_id && flag && !visited.includes(p)) {
                    ele["distance"] = Math.abs(props.cur_id - p)
                    visited.push(p)
                    flag = false
                    setNearestRides((prev) => [...prev, ele])
                }
            }
        });
    }

    nearestRides.sort(function(a,b) {
        if(a.distance < b.distance) {
            return -1;
        }
        if(a.distance > b.distance) {
            return 1;
        }
        return 0;
    })    

    filteredResults = nearestRides;
    if(props.sFilter && props.sFilter != "State" && filteredResults != []) {
        filteredResults =  nearestRides.filter((ele) => {
            return ele.state == props.sFilter
        })
    }
    if(props.cFilter && props.cFilter != "City" && filteredResults != []) {
        filteredResults =  filteredResults.filter((ele) => {
            return ele.city == props.cFilter
        })
        
    }
    const listItems = filteredResults.map((ele) => 
        <li>
            <Card data={ele}/>
        </li>
    );
    // console.log(nearestRides);

    return (
        <>
            <ul>
                {listItems}
            </ul>
        </>
    )
}
export default NearestRides;