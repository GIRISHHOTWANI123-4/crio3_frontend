import React, {useState, useEffect} from "react";
import Header from "./Header";
import Grid from "@material-ui/core/Grid";
import {Card, CardContent, makeStyles, Select, Typography, TextField, InputLabel, MenuItem} from '@material-ui/core';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import img1 from './j1.jpg';
import markerimage from './marker.png';
import {useDispatch, useSelector} from "react-redux";
import fetchData from "../actions/fetchData";
import axios from "axios";
import Button from "@material-ui/core/Button";


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
    const obj = {};
    const classes = useStyles();
    const dispatch = useDispatch();
    const [asset, setAsset] = useState(false);
    const [errorflag, setErrorFlag] = useState(false);
    const [asseterrorflag, setAssetErrorFlag] = useState(false);
    const [assetInfo, setAssetInfo] = useState(obj);
    let data = useSelector(state => state.fetchDatareducer);

    useEffect(() => {
        //api to fetch all assets will be called over here.
        async function fetchAssetData() {
            const response = await axios.get("http://localhost:8081/api/asset_id");
            dispatch(fetchData({payload: response.data}));
        }

        fetchAssetData();

    }, [])

    const mapStyles = {
        height: "100vh",
        width: "100%"
    };


    async function fetchData1(e) {
        const assetType = e.target.value;
        const startdate = document.getElementById("startdate").value;
        const enddate = document.getElementById("enddate").value;
        if (startdate !== "" && enddate !== "") {
            console.log("Start Date = ", startdate, "End Date = ", enddate);
            //here the api with asset type and start and end date will be displayed.
        } else {
            const response = await axios.get("http://localhost:8081/api/asset_type/" + assetType);
            dispatch(fetchData({payload: response.data}));
            //here the api with only the asset type will be called.
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
            console.log("Asset type = ", assetType);
            //here the api with asset type and start and end date will be displayed.
        }
    }

    function assetfieldvalidation(e) {
        const assetNumber = e.target.value;
        if (assetNumber < 0) {
            setAssetErrorFlag(true);
        } else {
            //here the api with that many total no. of assets will be called.
            setAssetErrorFlag(false);
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
                                    <TextField label={"Number of assets"} defaultValue={"100"} style={{width: "18%"}}
                                               onChange={assetfieldvalidation}/>
                                    {asseterrorflag && <Typography variant={"h6"} style={{color: "red"}}>
                                        Number should be greater than 0</Typography>}
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

                                    }} onChange={fetchData1} id={"id1"}>
                                        <option style={{color: "black"}} value={"all"}>All</option>
                                        <option style={{color: "black"}} value={"truck"}>Truck</option>
                                        <option style={{color: "black"}} value={"driver"}>Driver</option>
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
                                {data.length !== 0 && data.map((props) => {
                                    return (

                                        <Marker longitude={props.longitude} latitude={props.latitude}>
                                            <button onClick={(e) => {
                                                setAsset(true)
                                                setAssetInfo(props);
                                            }}>
                                                <img src={markerimage} alt={""} height={20} width={20}/>
                                            </button>
                                        </Marker>
                                    )
                                })}
                                {console.log("AssetAdditionalInfo = ", assetInfo)}
                                {asset ? (
                                    <Popup longitude={assetInfo.longitude} latitude={assetInfo.latitude}
                                           onClose={() => setAsset(false)}>
                                        <div>
                                            <Typography variant={'h6'}>Asset Id :{assetInfo.asset_id}</Typography>
                                            <Typography variant={'h6'}>Asset Info :{assetInfo.asset_info}</Typography>
                                            <Typography variant={'h6'}>Asset Number
                                                :{assetInfo.asset_unique_number}</Typography>
                                            <Typography variant={'h6'}>Timestamp :{assetInfo.time_stamp}</Typography>
                                            <Button href="#text-buttons" color="primary">
                                              View History
                                            </Button>
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
