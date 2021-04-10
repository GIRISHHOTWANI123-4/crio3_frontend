import React ,{useEffect,useState} from "react";
import Header from "./Header";
import ReactMapboxGl from "react-mapbox-gl";
import DrawControl from "react-mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import {Marker,Feature,Layer} from "react-mapbox-gl";
import markerimage from "./marker.png";
import axios from "axios";
import ReactNotification ,{store} from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

const Map = ReactMapboxGl({
    accessToken:
        "pk.eyJ1IjoiZ2lyaXNoaG90d2FuaTMwIiwiYSI6ImNrbXJ0N3FsbDBiNjEyd3BtdGN6ZW4zMnAifQ.3jLT73gnieor1b0B10j8Tw"

});


function Geofence() {
    const [locations,setLocatons]=useState([]);
    // const [assetId,setAssetId]=useState(0);
    useEffect(()=>{
       async function fetchData() {
           const response = await axios.get("http://localhost:8081/api/asset_id");
           setLocatons(response.data);
           // console.log("Response = ",response.data);
        }

        fetchData();
    },[])

    const onDrawCreate =  async ({features}) => {
        const type=features[0].geometry.type;
        if(type==="LineString")
        {

            const data = features[0].geometry.coordinates;
            const assetId = prompt("Enter the asset id for the drawn geofence");
            const reqBody={
                name:data,
                assetId:assetId
            }
            const response=await axios.post("http://localhost:8081/api/georoute",reqBody)
            if(!response.data)
            {
                store.addNotification({
                    title: "Warning",
                    message: "Asset is moving out of the expected route",
                    type: "danger",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 8000,
                        onScreen: true,
                        pauseOnHover: true,
                        showIcon: true,
                    }
                });
            }
        }
       else {

            const data = features[0].geometry.coordinates[0];
            const arr = [];
            data.map((props) => {
                const obj1 = {
                    longitude: props[0],
                    latitude: props[1]
                }
                arr.push(obj1);
            })
            const assetId = prompt("Enter the asset id for the drawn geofence");
            const reqBody = {
                name: data,
                assetId: assetId
            }
            const response = await axios.post("http://localhost:8081/api/geofence", reqBody);
            if (!response.data) {
                store.addNotification({
                    title: "Warning",
                    message: "Asset's current location is outside the geofence",
                    type: "danger",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 8000,
                        onScreen: true,
                        pauseOnHover: true,
                        showIcon: true,
                    }
                });
            }

            console.log("Post Request Response= ", response.data);
        }
       };

    const onDrawUpdate = ({ features }) => {
        console.log(features);
    };
    return(
       <div>
           {/*{console.log("aid = ",assetId)}*/}
           <ReactNotification/>
        <Header flag={false} geoflag={true}/>
           <Map
               style="mapbox://styles/mapbox/streets-v9" // eslint-disable-line
               center={[73.8567,18.5204]}
               zoom={[7]}
               containerStyle={{
                   height: "90vh",
                   width: "100vw"
               }}

           >

               {/*<Layer type={"symbol"} layout={{ "icon-image": "harbor-15" }} >*/}
               {/*    <Feature coordinates={[73.8567,18.5204]}/>*/}
               {/*</Layer>*/}

               {/*<Layer type={"symbol"} layout={{ "icon-image": "harbor-15" }} >*/}
               {/*    <Feature coordinates={[74.7480,19.0948]}/>*/}
               {/*</Layer>*/}

               {/*<Marker coordinates={[74.7480,19.0948]} >*/}
               {/*<img src={markerimage} height={20} width={20}/>*/}
               {/*</Marker>*/}


               {locations.map((props)=> {
                   return (
                       <div key={props.longitude}>
                           <Marker
                               coordinates={[props.longitude, props.latitude]}
                               anchor="bottom">
                               <img src={markerimage} height={20} width={20}
                               />
                            </Marker>

                       </div>
                   )

               })}

               <DrawControl position={"top-right"} onDrawCreate={onDrawCreate} onDrawUpdate={onDrawUpdate} />

           </Map>

        </div>
    )

}

export default Geofence;
