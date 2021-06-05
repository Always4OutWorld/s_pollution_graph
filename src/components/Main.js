import React from 'react';
import {
AppBar, Avatar, Grid
} from '@material-ui/core';
import {
    LocalPostOffice
} from '@material-ui/icons';
import {Toolbar, Typography} from '@material-ui/core';

const Main = ({ eachRoute, props }) => {
    return (
        <div>
            <Grid container>
                <Grid item xs={12}>
                    <AppBar>
                        <Toolbar>
                            <Avatar><LocalPostOffice /></Avatar>
                            <Typography variant="h6" className="w3-padding">
                                City Pollution Graph
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </Grid>
                <Grid item xs={12} style={{
                    marginTop: "64px"
                }}>
                    <eachRoute.component.default props={props} />
                </Grid>
            </Grid>
        </div>
    );
}

export default Main;