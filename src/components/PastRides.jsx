import { useEffect, useState } from "react";
import Card from "./Card";

const PastRides = (props) => {
    const currentDate = new Date()
    const [pastRides, setPastRides] = useState([])
    let filteredResults;

    useEffect(() => {
        if(props.data) {
            calculatePastRides(props.data);
        }
    }, [props.data])

    const calculatePastRides = (data) => {
        data.forEach(ele => {
            let st_date = new Date(ele.date)
            if(st_date < currentDate) {
                setPastRides((prev) => [...prev, ele])
            }
        });
    }
    
    filteredResults = pastRides;
    if(props.sFilter && props.sFilter != "State" && filteredResults != []) {
        filteredResults =  pastRides.filter((ele) => {
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
            <Card data={ele} />
        </li>
    );

    return (
        <>
            <ul>
                {listItems}
            </ul>
        </>
    )
}
export default PastRides;