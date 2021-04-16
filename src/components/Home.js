import React, {useState, useEffect} from "react";
import Header from "./Header";
import Grid from "@material-ui/core/Grid";
import {Card, CardContent, makeStyles, Select, Typography, TextField, InputLabel} from '@material-ui/core';
import MapGL, {Marker, Popup} from 'react-map-gl';
import img1 from './j1.jpg';
import marker from './marker1.JPG'
import {useDispatch, useSelector} from "react-redux";
import fetchData from "../actions/fetchData";
import historyflag from "../actions/historyflag";
import axios from "axios";
import Button from "@material-ui/core/Button";
import ReactNotification, {store} from 'react-notifications-component';
import * as mapboxgl from "mapbox-gl";
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;
const useStyles = makeStyles({
    card: {
        height: "85vh",
        marginTop: "2%"
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
    let hisflag = useSelector(state => state.historyflagreducer);

    const [viewport, setViewport] = useState({
        latitude: 22.5937,
        longitude: 80.9629,
        width: "100vw",
        height: "100vh",
        zoom: 5
    });

    useEffect(() => {
        //api to fetch all assets will be called over here.
        async function fetchAssetData() {
            const response = await axios.get("https://crio-gps-backend.herokuapp.com/api/asset_id");
            const data = response.data.data;
            const geofenceViolatingAsset = response.data.geofenceResponse;
            const georouteViolatingAsset = response.data.georouteResponse;
            for (let i = 0; i < geofenceViolatingAsset.length; i++) {
                store.addNotification({
                    title: "Warning",
                    message: "Asset Id " + geofenceViolatingAsset[i].asset_id + " current location is outside the defined geofence",
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

            for (let i = 0; i < georouteViolatingAsset.length; i++) {
                store.addNotification({
                    title: "Warning",
                    message: "Asset Id " + georouteViolatingAsset[i].asset_id + " is moving outside the dedicated path",
                    type: "warning",
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
            dispatch(fetchData({payload: data}));
        }

        fetchAssetData();
    }, [])


    async function fetchData1(e) {

        const assetType = e.target.value;
        const startdate = document.getElementById("startdate").value;
        const enddate = document.getElementById("enddate").value;
        if (startdate !== "" && enddate !== "") {
            console.log("Start Date = ", startdate, "End Date = ", enddate);
            //here the api with asset type and start and end date will be displayed.
        } else {
            const response = await axios.get("https://crio-gps-backend.herokuapp.com/api/asset_type/" + assetType);
            dispatch(fetchData({payload: response.data}));
            dispatch(historyflag({payload: true}));
            //here the api with only the asset type will be called.
        }
    }

    async function datevalidation() {
        const startdate = document.getElementById("startdate").value;
        const enddate = document.getElementById("enddate").value;
        if (startdate > enddate) {
            setErrorFlag(true);
        } else {
            //here the api with asset type and start and end date will be displayed.
            setErrorFlag(false);
            const assetType = document.getElementById("id1").value;
            const response = await axios.get("https://crio-gps-backend.herokuapp.com/my-date/" + startdate + "/" + enddate);
            const assetData = response.data;
            const assetLatestData = [];
            assetData.map((props) => {
                const temp = props[0];
                assetLatestData.push(temp);
            })
            dispatch(fetchData({payload: assetLatestData}));
            dispatch(historyflag({payload: false}));
        }
    }

    async function assetfieldvalidation() {
        const assetNumber = document.getElementById("textfield").value;
        if (assetNumber <= 0) {
            setAssetErrorFlag(true);
        } else {
            //here the api with that many total no. of assets will be called.
            const response = await axios.get("https://crio-gps-backend.herokuapp.com/api/asset_id_max_asset/" + assetNumber);
            dispatch(fetchData({payload: response.data}));
            dispatch(historyflag({payload: true}));
            setAssetErrorFlag(false);
        }
    }

    async function fetchPastLocations() {
        const assetId = assetInfo.asset_id;
        const response = await axios.get("https://crio-gps-backend.herokuapp.com/api/history/" + assetId);
        dispatch(fetchData({payload: response.data}));
        dispatch(historyflag({payload: false}));
        setAsset(false);

    }

    return (
        <div>
            <ReactNotification/>
            <Header flag={true}/>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={6} md={6}>
                    <Card raised={true} className={classes.card}>
                        <CardContent>
                            <Grid container>
                                <Grid item xs={12} sm={12} md={12}>
                                    <div>
                                        <TextField label={"Number of assets"} id={"textfield"} defaultValue={"100"}
                                                   style={{width: "18%"}}
                                        />
                                        {asseterrorflag && <Typography variant={"h6"} style={{color: "red"}}>
                                            Number should be greater than 0</Typography>}
                                        <Button onClick={assetfieldvalidation} style={{marginLeft: "3%", width: "20%"}}
                                                color={"primary"}>Submit</Button>
                                    </div>
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
                            <MapGL {...viewport}
                                   mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                                   onViewportChange={(viewport) => setViewport(viewport)}
                                   mapStyle={"mapbox://styles/mapbox/streets-v11"}
                            >
                                {data.length !== 0 && data.map((props) => {
                                    return (
                                        <div key={props.asset_id}>
                                            <Marker longitude={props.longitude} latitude={props.latitude}>
                                                <Button onClick={(e) => {
                                                    setAsset(true)
                                                    setAssetInfo(props);
                                                }}>
                                                    <img src={marker} alt={""} height={20} width={20}/>
                                                </Button>
                                            </Marker>

                                        </div>
                                    )
                                })}
                                {asset && hisflag ? (
                                    <Popup longitude={assetInfo.longitude} latitude={assetInfo.latitude} id={"button"}
                                           value="popup">
                                        <div>
                                            <Typography variant={'h6'}>Asset Id :{assetInfo.asset_id}</Typography>
                                            <Typography variant={'h6'}>Asset Info :{assetInfo.asset_info}</Typography>
                                            <Typography variant={'h6'}>Asset Number
                                                :{assetInfo.asset_unique_number}</Typography>
                                            <Typography variant={'h6'}>Timestamp :{assetInfo.time_stamp}</Typography>

                                            <Button onClick={fetchPastLocations} id={"button"} value={"buttonclicked"}
                                                    color="primary">
                                                View History
                                            </Button>
                                        </div>
                                    </Popup>
                                ) : null
                                }

                            </MapGL>
                    </Card>
                </Grid>

            </Grid>
        </div>
    )
}

export default Home;
