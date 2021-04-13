import React, {useState} from "react";
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {NavLink} from "react-router-dom";
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from "@material-ui/core/FormControl";
import {Dialog,DialogActions,DialogContent,TextField,DialogContentText,DialogTitle} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import axios from "axios";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import fetchData from "../actions/fetchData";
import {useDispatch} from "react-redux";
import historyflag from "../actions/historyflag";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

function Header(props) {
    const classes = useStyles();
    const dispatch=useDispatch();
    const [open, setOpen] = useState(false);
    const [label,setLabel]=useState("Enter the asset id");
    const [textvalue,setTextValue]=useState("");

    // console.log("Props = ", props.geoflag);

    const handleClickOpen = (e) => {
        let val=e.target.value;
        if(val==="Select one option")
        {
            setOpen(false);
        }
        else {
            setLabel(val);
            setOpen(true);
        }
        };
    const handleClose = async () => {
        const textvalue=document.getElementById("name").value;
        if(textvalue==="" )
        {
            alert("Please enter the data");
        }
        else
        {
            if(label==="Enter the Asset id") {
                if(!isNaN(textvalue)  && textvalue>=0) {
                    const assetIdreq=textvalue;
                    const response=await axios.get("http://localhost:8081/api/asset_id/"+assetIdreq);
                    dispatch(fetchData({payload:response.data}));
                    dispatch(historyflag({payload:true}))
                    setOpen(false);
                }
                else {
                    alert("Asset id should be a positive integer value");
                }

            }

            else if(label==="Enter the Asset type")
            {
                var letters = /^[A-Za-z]+$/;
                let assetTypereq=textvalue;
                if(assetTypereq.match(letters)) {
                    assetTypereq=assetTypereq.toLowerCase();
                    const response = await axios.get("http://localhost:8081/api/asset_type/" + assetTypereq);
                    dispatch(fetchData({payload: response.data}));
                    dispatch(historyflag({payload:true}));
                    setOpen(false);
                }
               else{
                   alert("Please input alphabet characters only");
                }
            }
            else{
                 console.log("here");
            }
        }
        // setOpen(false);
        setTextValue("");
    };

    const handleClose1=()=>{
        setOpen(false);
        setTextValue("");
    }

    const geoFunction=(e)=>{
      const selectedFeature=(e.target.value);
      if(selectedFeature!=="Select one option")
      {

      }

    }


    return (

        <div className={classes.root}>
            <AppBar position="static" style={{backgroundColor: '#318CE7'}}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" style={{
                        fontSize: "150%",
                        margin: "10px",
                        color: 'inherit',
                        textDecoration: 'inherit',
                        fontFamily: 'cursive'
                    }} className={classes.title}>
                        GPS Tracking Portal
                    </Typography>
                    <div style={{marginLeft: "auto"}}>
                        {/*<InputLabel htmlFor="age-native-simple">Filter Options</InputLabel>*/}

                        {props.flag == true &&
                        <Select native inputProps={{
                            id: 'age-native-simple',
                        }} style={{
                            color: "white",
                            fontSize: "large",
                            margin: "10px",
                            textDecoration: 'inherit',
                            fontFamily: 'cursive'
                        }}  onChange={handleClickOpen}>
                            <option style={{color: "black"}} value={"Select one option"}>Select one option</option>
                            <option style={{color: "black"}} value={"Enter the Asset id"}>Asset id</option>
                            <option style={{color: "black"}} value={"Enter the Asset type"}>Asset type</option>
                            <option style={{color: "black"}} value={"Enter the Timestamp"}>Timestamp</option>
                        </Select>
                        }

                        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                            <DialogContent>
                                <DialogContentText>
                                    To view the asset location on the map,Please enter proper field
                                </DialogContentText>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label={label}
                                    type="text"
                                    fullWidth
                                    value={textvalue}
                                    onChange={(e)=>setTextValue(e.target.value)}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose1} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={handleClose} color="primary">
                                    OK
                                </Button>
                            </DialogActions>
                        </Dialog>

                        {
                            props.geoflag===true &&
                                <Select native inputProps={{
                                    id: 'age-native-simple',
                                }} style={{
                                    color: "white",
                                    fontSize: "large",
                                    margin: "10px",
                                    textDecoration: 'inherit',
                                    fontFamily: 'cursive'
                                }}  onChange={geoFunction}>
                                    <option style={{color: "black"}} value={"Select one option"}>Select one option</option>
                                    <option style={{color: "black"}} value={"GeoFence"}>GeoFence</option>
                                    <option style={{color: "black"}} value={"GeoRoute"}>GeoRoute</option>
                                </Select>

                        }

                            <NavLink to={'/home'} style={{
                                fontSize: "large",
                                margin: "10px",
                                color: 'inherit',
                                textDecoration: 'inherit',
                                fontFamily: 'cursive'
                            }}>Home</NavLink>
                        {
                            props.flag==true &&(
                                <NavLink to={'/geofencing'} style={{
                                    fontSize: "large",
                                    margin: "10px",
                                    color: 'inherit',
                                    textDecoration: 'inherit',
                                    fontFamily: 'cursive'
                                }}>GeoFence</NavLink>
                            )
                        }
                        {
                            props.flag==true &&(
                            <NavLink to={'/aboutsystem'} style={{
                                fontSize: "large",
                                margin: "10px",
                                color: 'inherit',
                                textDecoration: 'inherit',
                                fontFamily: 'cursive'
                            }}>About System</NavLink>
                            )
                        }
                        <NavLink to={'/'} style={{fontSize: "large",
                            margin: "10px",
                            textDecoration: 'inherit',
                            fontFamily: 'cursive',
                            color:"white"}}>
                            <ExitToAppIcon/>
                        </NavLink>

                    </div>
                </Toolbar>
            </AppBar>
        </div>

    );
}

export default Header;
