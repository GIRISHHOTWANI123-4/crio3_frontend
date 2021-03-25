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

function Header() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
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
                        <Select native inputProps={{
                            id: 'age-native-simple',
                        }} style={{
                            color: "white",
                            fontSize: "large",
                            margin: "10px",
                            textDecoration: 'inherit',
                            fontFamily: 'cursive'
                        }} onChange={handleClickOpen}>
                            <option style={{color: "black"}} value={1}>Asset id</option>
                            <option style={{color: "black"}} value={2}>Asset type</option>
                            <option style={{color: "black"}} value={3}>Timestamp</option>
                        </Select>
                        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                            <DialogContent>
                                <DialogContentText>
                                    To view the asset location on the map,Please enter proper field
                                </DialogContentText>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Enter the asset type"
                                    type="text"
                                    fullWidth
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={handleClose} color="primary">
                                    OK
                                </Button>
                            </DialogActions>
                        </Dialog>

                        <NavLink to={'/'} style={{
                            fontSize: "large",
                            margin: "10px",
                            color: 'inherit',
                            textDecoration: 'inherit',
                            fontFamily: 'cursive'
                        }}>Home</NavLink>
                        <NavLink to={'/aboutsystem'} style={{
                            fontSize: "large",
                            margin: "10px",
                            color: 'inherit',
                            textDecoration: 'inherit',
                            fontFamily: 'cursive'
                        }}>About System</NavLink>


                    </div>
                </Toolbar>
            </AppBar>
        </div>

    );
}

export default Header;
