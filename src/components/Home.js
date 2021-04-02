import React, {useState} from "react";
import Header from "./Header";
import Grid from "@material-ui/core/Grid";
import {Card, CardContent, makeStyles, Select, Typography, TextField, InputLabel, MenuItem} from '@material-ui/core';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import img1 from './j1.jpg';
import markerimage from './marker.png';


const useStyles = makeStyles({
    card: {
        height: "85vh",
        marginTop: "1%"
    },
    div: {
        marginTop: "5%",
    },
    div1: {
        marginTop: "7%"
    }
})

function Home() {
    const classes = useStyles();
    const [asset, setAsset] = useState(false);
    const [errorflag, setErrorFlag] = useState(false);

    const mapStyles = {
        height: "100vh",
        width: "100%"
    };

    let locations = [
        {

            latitude: 18.5204,
            longitude: 73.8567

        },
        {


            latitude: 19.0948,
            longitude: 74.7480

        },
        {


            latitude: 19.9975,
            longitude: 73.7898

        }
    ];

    function fetchData(e) {
        // console.log("Particular option selected",e.target.value);
        const assetType = e.target.value;
        const startdate = document.getElementById("startdate").value;
        const enddate = document.getElementById("enddate").value;
        if (startdate !== "" && enddate !== "") {
            console.log("Start Date = ", startdate, "End Date = ", enddate);
        }
    }

    function datevalidation() {
        const startdate = document.getElementById("startdate").value;
        const enddate = document.getElementById("enddate").value;
        if (startdate > enddate) {
            setErrorFlag(true);
        } else {
            setErrorFlag(false);
            const assetType = document.getElementById("id1").value;
            // console.log("assettype = ",assetType);
        }
    }

    const [viewport, setViewport] = useState({
        latitude: 22.5937,
        longitude: 80.9629,
        width: "70vw",
        height: "100vh",
        zoom: 5
    });
    return (
        <div>
            <Header flag={true}/>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={6} md={6}>
                    <Card raised={true} className={classes.card}>
                        <CardContent>
                            <Grid container>
                                <Grid item xs={12} sm={12} md={12}>
                                    <TextField label={"Number of assets"} defaultValue={"100"} style={{width: "18%"}}/>
                                </Grid>

                                <Grid item xs={12} md={5} className={classes.div}>
                                    <InputLabel id={"assetType"}>Select Asset Type</InputLabel>
                                    <Select native style={{
                                        color: "black",
                                        labelId: "assetType",
                                        fontSize: "large",
                                        margin: "10px",
                                        textDecoration: 'inherit',
                                        fontFamily: 'cursive',
                                        width: "30%",

                                    }} onChange={fetchData} id={"id1"}>
                                        <option style={{color: "black"}} value={1}>Type 1</option>
                                        <option style={{color: "black"}} value={2}>Type 2</option>
                                        <option style={{color: "black"}} value={3}>Type 3</option>
                                    </Select>
                                </Grid>
                                <Grid item xs={12} md={3} className={classes.div1}>
                                    <TextField
                                        id="startdate"
                                        label="Select Start Date"
                                        type="date"
                                        defaultValue=""
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={3} className={classes.div1}>
                                    <TextField
                                        id="enddate"
                                        label="Select End Date"
                                        type="date"
                                        defaultValue=""
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={datevalidation}
                                    />
                                    {errorflag &&
                                    <Typography variant={"h6"} style={{color: "red"}}>End date should be greater than
                                        Start date</Typography>}
                                </Grid>
                                <Grid item xs={12} md={12} style={{marginRight: "5%"}}>
                                    <img src={img1} alt={""} height={400}/>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                    <Card raised={true} className={classes.card}>
                        <CardContent>
                            <ReactMapGL {...viewport}
                                        mapboxApiAccessToken={"pk.eyJ1IjoiZ2lyaXNoaG90d2FuaTMwIiwiYSI6ImNrbXJ0N3FsbDBiNjEyd3BtdGN6ZW4zMnAifQ.3jLT73gnieor1b0B10j8Tw"}
                                        onViewportChange={(viewport) => setViewport(viewport)}
                                        mapStyle={"mapbox://styles/mapbox/outdoors-v11"}
                            >
                                {locations.map((props) => {
                                    return (
                                        <Marker longitude={props.longitude} latitude={props.latitude}>
                                            <button onClick={(e) => setAsset(true)}>
                                                <img src={markerimage} alt={""} height={20} width={20}/>
                                            </button>
                                        </Marker>
                                    )
                                })}

                                {asset ? (

                                    <Popup longitude={73.8567} latitude={18.5204} onClose={() => setAsset(false)}>
                                        <div>
                                            <Typography variant={'h5'}>Asset Type 1</Typography>
                                        </div>

                                    </Popup>
                                ) : null
                                }

                            </ReactMapGL>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>
        </div>
    )
}

export default Home;
