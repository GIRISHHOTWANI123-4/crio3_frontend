import React, {useState, useEffect} from "react";
import Header from "./Header";
import Grid from "@material-ui/core/Grid";
import {Card, CardContent, makeStyles, Select, Typography, TextField, InputLabel, MenuItem} from '@material-ui/core';
import MapGL, {Marker, Popup,Source,Layer} from 'react-map-gl';
import {Editor, EditingMode, DrawLineStringMode, DrawPolygonMode} from "react-map-gl-draw";
import img1 from './j1.jpg';
import markerimage from './marker.png';
import {useDispatch, useSelector} from "react-redux";
import fetchData from "../actions/fetchData";
import historyflag from "../actions/historyflag";
import axios from "axios";
import Button from "@material-ui/core/Button";
import {DrawCircleFromCenterMode} from "@nebula.gl/edit-modes";


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
    const MODES = [
        { id: "drawPolyline", text: "Draw Polyline", handler: DrawLineStringMode },
        { id: "drawPolygon", text: "Draw Polygon", handler: DrawPolygonMode },
        { id: "editing", text: "Edit Feature", handler: EditingMode }
    ];
    let switchMode;
    switchMode = evt => {
        const modeId =
            evt.target.value === state.modeId ? null : evt.target.value;
        const mode = MODES.find(m => m.id === modeId);
        const modeHandler = mode ? new mode.handler() : null;
        setState({
            modeId:modeId,
            modeHandler:modeHandler
        })
        // this.setState({ modeId, modeHandler });
    };
    const geojson = {
        type: 'FeatureCollection',
        features: [
            {type: 'Feature', geometry: {type: 'Point', coordinates: [78, 20]}}
        ]
    };

    const layerStyle = {
        id: 'point',
        type: 'circle',
        paint: {
            'circle-radius': 10,
            'circle-color': '#007cbf'
        }
    };

    const [state,setState]=useState({
        modeId:null,
        modeHandler:null
    });
    const obj = {};
    const classes = useStyles();
    const dispatch = useDispatch();
    const [asset, setAsset] = useState(false);
    const [errorflag, setErrorFlag] = useState(false);
    const [asseterrorflag, setAssetErrorFlag] = useState(false);
    const [assetInfo, setAssetInfo] = useState(obj);
    let data = useSelector(state => state.fetchDatareducer);
    let hisflag = useSelector(state => state.historyflagreducer);
    const [features,setFeatures]=useState([])

    // const [state,setState]=useState({
    //     viewport:
    // })

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
            setErrorFlag(false);
            const assetType = document.getElementById("id1").value;
            const startvalue=startdate.toString();
            const response=await axios.get("http://localhost:8081/my-date/"+startdate+"/"+enddate);
            const assetData=response.data;
            const assetLatestData=[];
            assetData.map((props)=>{
              const temp=props[0];
              assetLatestData.push(temp);
            })
            console.log(assetLatestData);
            dispatch(fetchData({payload:assetLatestData}));
            dispatch(historyflag({payload:false}));
            // console.log("Startdate 0 = ", startvalue[0],startvalue[1],startvalue[2],startvalue[3]);

            //here the api with asset type and start and end date will be displayed.
        }
    }

    async function assetfieldvalidation() {
        const assetNumber = document.getElementById("textfield").value;
        if (assetNumber < 0) {
            setAssetErrorFlag(true);
        } else {
            //here the api with that many total no. of assets will be called.
            const response = await axios.get("http://localhost:8081/api/asset_id_max_asset/" + assetNumber);
            dispatch(fetchData({payload: response.data}));
            dispatch(historyflag({payload: true}));
            setAssetErrorFlag(false);
        }
    }

    async function fetchPastLocations() {
        const val = document.getElementById("button").value;
        const assetId = assetInfo.asset_id;
        const response = await axios.get("http://localhost:8081/api/history/" + assetId);
        dispatch(fetchData({payload: response.data}));
        dispatch(historyflag({payload: false}));
        setAsset(false);

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
                                    <div>
                                    <TextField label={"Number of assets"} id={"textfield"} defaultValue={"100"}
                                               style={{width: "18%"}}
                                    />
                                    {asseterrorflag && <Typography variant={"h6"} style={{color: "red"}}>
                                        Number should be greater than 0</Typography>}
                                    <Button onClick={assetfieldvalidation} style={{marginLeft:"3%",width:"20%"}}color={"primary"}>Submit</Button>
                                    </div>
                                </Grid>
                                {/*<Grid xs={12} sm={6} md={4}>*/}
                                {/*</Grid>*/}

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
                            <MapGL {...viewport}
                                        mapboxApiAccessToken={"pk.eyJ1IjoiZ2lyaXNoaG90d2FuaTMwIiwiYSI6ImNrbXJ0N3FsbDBiNjEyd3BtdGN6ZW4zMnAifQ.3jLT73gnieor1b0B10j8Tw"}
                                        onViewportChange={(viewport) => setViewport(viewport)}
                                        mapStyle={"mapbox://styles/mapbox/streets-v11"}
                            >
                                {data.length !== 0 && data.map((props) => {
                                    return (
                                      <div>
                                        <Marker longitude={props.longitude} latitude={props.latitude}>
                                            <button onClick={(e) => {
                                                setAsset(true)
                                                setAssetInfo(props);
                                            }}>
                                                <img src={markerimage} alt={""} height={20} width={20}/>
                                            </button>
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

                                {/*<Source id="my-data" type="geojson" data={geojson}>*/}
                                {/*    <Layer {...layerStyle} />*/}
                                {/*</Source>*/}


                                {/*<Draw*/}
                                {/*    onDrawCreate={({ features }) => setFeatures({ features })}*/}
                                {/*    onDrawUpdate={({ features }) => setFeatures({ features })}*/}
                                {/*/>*/}
                            </MapGL>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>
        </div>
    )
}

export default Home;
