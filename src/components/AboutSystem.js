import React from "react";
import Header from "./Header";
import {Card, CardContent, Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core";
import {SocialIcon} from "react-social-icons";

const useStyles = makeStyles({
    details: {
        "font-family": "cursive"
    },
    contridetails: {
        "font-family": "cursive",
        "font-weight": "bold"
    }
})

function AboutSystem() {
    const classes = useStyles();
    return (
        <div>
            <Header flag={false}/>
            <Grid container spacing={2} style={{marginTop: "2px"}}>
                <Grid item xs={12} sm={6} md={8}>
                    <Card style={{height: "85vh"}}>
                        <CardContent>
                            <Typography className={classes.details} variant={"h6"}>
                                1.The JumboTail GPS Asset Portal displays the current location of the asset
                                on the map for tracking purpose.
                            </Typography>
                            <Typography className={classes.details} variant={"h6"}>
                                2.The user will be redirected to the sign up page on clicking the application url.
                            </Typography>
                            <Typography className={classes.details} variant={"h6"}>
                                3.On successful login the user will be shown the maximum 100 latest assets whose
                                location
                                has been changed recently with the help of marker on the map.
                            </Typography>
                            <Typography className={classes.details} variant={"h6"}>
                                4.The location shown on the map will be the latest location of all the assets with the
                                functionality to get more insights about the asset by clicking on the asset marker.
                            </Typography>
                            <Typography className={classes.details} variant={"h6"}>
                                5.The Pop-Up also gives additional feature to view the past asset locations from start
                                to the current position.
                            </Typography>
                            <Typography className={classes.details} variant={"h6"}>
                                6.The application provides filter option to search the asset location by asset id and
                                asset type.
                            </Typography>
                            <Typography className={classes.details} variant={"h6"}>
                                7.The registered asset types for our application our truck and driver(salesman).
                            </Typography>
                            <Typography className={classes.details} variant={"h6"}>
                                8.There is GeoFence functionality added for users to define the particular area for
                                asset's movement.Violating that fence will lead to a trigger by the application.
                            </Typography>
                            <Typography className={classes.details} variant={"h6"}>
                                9.Similarly the users can allocated a dedicated route for the asset and small
                                deviation from that path will trigger a warning notification.
                            </Typography>
                            <Typography className={classes.details} variant={"h6"}>
                                10.The application consists of the Home page,About System page,Geofence page.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Card style={{height: "85vh"}}>
                        <CardContent>
                            <Typography className={classes.contridetails} variant={"h4"}>Contributors</Typography>
                            <div>
                            <Typography className={classes.details} variant={"h6"}>1.Girish Hotwani</Typography>
                            <SocialIcon url={"https://www.linkedin.com/in/girishhotwani30/"}/>
                            </div>

                            <div>
                                <Typography className={classes.details} variant={"h6"}>2.Param Mirani</Typography>
                                 <SocialIcon url={""}/>
                            </div>
                            <Typography className={classes.contridetails} variant={"h4"}>Code base</Typography>
                            <SocialIcon url={"https://github.com/GIRISHHOTWANI123-4/crio3_frontend"}/>

                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}

export default AboutSystem;
