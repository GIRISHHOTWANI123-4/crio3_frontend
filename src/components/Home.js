import React, {useState} from "react";
import Header from "./Header";
import Grid from "@material-ui/core/Grid";
import {Card, CardContent, makeStyles, Select,Typography,TextField,InputLabel,MenuItem} from '@material-ui/core';
import ReactMapGL,{Marker,Popup} from 'react-map-gl';
import img1 from './j1.jpg';
import markerimage from './marker.png';

// import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const useStyles = makeStyles({
    card: {
        height: "85vh",
        marginTop: "1%"
    },
    div: {
        marginTop: "5%",
    },
    div1:{
        marginTop:"7%"
    }
})

function Home() {
    const classes = useStyles();
    const [asset,setAsset]=useState(false);
    const mapStyles = {
        height: "100vh",
        width: "100%"};

    const defaultCenter = {
        lat: 41.3851, lng: 2.1734
    }
    let locations = [
        {
            name: "Location 1",
            location: {
                lat: 41.3954,
                lng: 2.162
            },
        },
        {
            name: "Location 2",
            location: {
                lat: 41.3917,
                lng: 2.1649
            },
        },
        {
            name: "Location 3",
            location: {
                lat: 41.3773,
                lng: 2.1585
            },
        },
        {
            name: "Location 4",
            location: {
                lat: 41.3797,
                lng: 2.1682
            },
        },
        {
            name: "Location 5",
            location: {
                lat: 41.4055,
                lng: 2.1915
            },
        }
    ];
    const [viewport, setViewport] = useState({
        latitude: 19.0760,
        longitude: 72.8777,
        width: "100vw",
        height: "100vh",
        zoom: 5
    });
    return (
        <div>
            <Header/>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={6} md={6}>
                    <Card raised={true} className={classes.card}>
                        <CardContent>
                            <Grid container >
                                <Grid item xs={12} md={5} className={classes.div}>
                                    <InputLabel id={"assetType"}>Select Asset Type</InputLabel>
                                    <Select native style={{
                                        color: "black",
                                        labelId:"assetType",
                                        fontSize: "large",
                                        margin: "10px",
                                        textDecoration: 'inherit',
                                        fontFamily: 'cursive',
                                        width: "30%"
                                    }}>
                                        <option style={{color: "black"}} value={1}>Type 1</option>
                                        <option style={{color: "black"}} value={2}>Type 2</option>
                                        <option style={{color: "black"}} value={3}>Type 3</option>
                                    </Select>
                                </Grid>
                                <Grid item xs={12} md={3} className={classes.div1}>
                                    <TextField
                                        id="date"
                                        label="Select Start Date"
                                        type="date"
                                        defaultValue="2017-05-24"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={3} className={classes.div1}>
                                    <TextField
                                        id="date"
                                        label="Select End Date"
                                        type="date"
                                        defaultValue="2017-05-24"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={12} style={{marginRight:"5%"}}>
                                     <img src={img1} alt={""} height={400}/>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                    <Card raised={true} className={classes.card}>
                        <CardContent>
                            <ReactMapGL {...viewport} mapboxApiAccessToken={"pk.eyJ1IjoiZ2lyaXNoaG90d2FuaTMwIiwiYSI6ImNrbXJ0N3FsbDBiNjEyd3BtdGN6ZW4zMnAifQ.3jLT73gnieor1b0B10j8Tw"}
                                        onViewportChange={(viewport) => setViewport(viewport)}
                                        mapStyle={"mapbox://styles/mapbox/outdoors-v11"}
                            >
                                <Marker longitude={73.8567} latitude={18.5204}>
                                    <button onClick={(e)=>setAsset(true)}>
                                        <img src={markerimage} alt={""}  height={20} width={20}/>
                                    </button>
                                </Marker>

                                <Marker longitude={74.7480} latitude={19.0948}>
                                    <button>
                                        <img src={markerimage} alt={""}  height={20} width={20}/>
                                    </button>
                                </Marker>

                                <Marker longitude={73.7898} latitude={19.9975}>
                                    <button>
                                        <img src={markerimage} alt={""}  height={20} width={20}/>
                                    </button>
                                </Marker>

                                {asset ? (

                                <Popup longitude={73.8567} latitude={18.5204} onClose={()=>setAsset(false)}>
                                      <div>
                                          <Typography variant={'h5'}>Asset Type 1</Typography>
                                      </div>

                                </Popup>
                                    ):null
                                    }

                            </ReactMapGL>
                            {/*<LoadScript*/}
                            {/*    googleMapsApiKey='AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo'>*/}
                            {/*    <GoogleMap*/}
                            {/*        mapContainerStyle={mapStyles}*/}
                            {/*        zoom={13}*/}
                            {/*        center={defaultCenter}>*/}
                            {/*        {*/}
                            {/*            locations.map(item => {*/}
                            {/*                return (*/}
                            {/*                    <Marker key={item.name} position={item.location}/>*/}
                            {/*                )*/}
                            {/*            })*/}
                            {/*        }*/}
                            {/*    </GoogleMap>*/}
                            {/*</LoadScript>*/}

                            {/*<Map google={this.props.google} zoom={14}>*/}

                            {/*    <Marker*/}
                            {/*            name={'Current location'} />*/}

                            {/*    <InfoWindow >*/}
                            {/*        <div>*/}
                            {/*            <h1>hello</h1>*/}
                            {/*        </div>*/}
                            {/*    </InfoWindow>*/}
                            {/*</Map>*/}
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>
        </div>
    )
}

// export default GoogleApiWrapper({
//     apiKey: "AIzaSyCloawz0BD9Eq-AySI4wc5uLUw_2UxErAQ"
// })(Home)

export default Home;
