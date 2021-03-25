import React, {useState} from "react";
import Header from "./Header";
import Grid from "@material-ui/core/Grid";
import {Card, CardContent, makeStyles, Select,Typography,TextField,InputLabel,MenuItem} from '@material-ui/core';


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
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                    <Card raised={true} className={classes.card}>
                        <CardContent>
                            Map
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>
        </div>
    )
}

export default Home;
