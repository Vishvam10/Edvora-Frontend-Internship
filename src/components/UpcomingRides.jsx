import { useEffect, useState } from "react";
import Card from "./Card";

const UpcomingRides = (props) => {
    const currentDate = new Date()
    const [upcomingRides, setUpcomingRides] = useState([])

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

    const listItems = upcomingRides.map((ele) => 
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