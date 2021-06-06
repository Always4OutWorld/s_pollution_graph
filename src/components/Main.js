import React from 'react';
import {
AppBar, Avatar, Grid, Tooltip
} from '@material-ui/core';
import {
    Fireplace
} from '@material-ui/icons';
import {Toolbar, Typography} from '@material-ui/core';

const Main = ({ eachRoute, props }) => {
    return (
        <div>
            <Grid container>
                <Grid item xs={12}>
                    <AppBar>
                        <Toolbar>
                            <Avatar variant="square" style={{
                                color: 'black',
                                background: 'white'
                            }} ><Fireplace /></Avatar>
                            <Typography variant="h6" style={{ width: '200px' }} className="w3-padding">
                                Pollution Graph
                            </Typography>
                            <Grid container justify="flex-end">
                                <Grid item xs={4}>
                                    <Tooltip title={process.env.REACT_APP_PRONAME} placement="left">
                                        <Avatar className="w3-right" src={process.env.REACT_APP_PROPHOTO} />
                                    </Tooltip>
                                </Grid>
                            </Grid>
                        </Toolbar>
                    </AppBar>
                </Grid>
                <Grid item xs={12} style={{
                    marginTop: "64px",
                    maxHeight: "90vh",
                    minHeight: "90vh",
                }}>
                    <eachRoute.component.default props={props} />
                </Grid>
            </Grid>
        </div>
    );
}

export default Main;