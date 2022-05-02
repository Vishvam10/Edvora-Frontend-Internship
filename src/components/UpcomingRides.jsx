import { useEffect, useState } from "react";
import Card from "./Card";

const UpcomingRides = (props) => {
    const currentDate = new Date()
    const [upcomingRides, setUpcomingRides] = useState([])
    let filteredResults;


    useEffect(() => {
        if(props.data) {
            calculateFutureRides(props.data);
        }
    }, [props.data])

    const calculateFutureRides = (data) => {
        data.forEach(ele => {
            let st_date = new Date(ele.date)
            if(st_date > currentDate) {
                setUpcomingRides((prev) => [...prev, ele])
            }
        });
    }

    filteredResults = upcomingRides;
    if(props.sFilter && props.sFilter != "State" && filteredResults != []) {
        filteredResults =  upcomingRides.filter((ele) => {
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
            <Card />
        </li>
    );

    return (
        <>
            <h1>UPCOMING RIDES</h1>
            <ul>
                {listItems}
            </ul>
        </>
    )
}
export default UpcomingRides;