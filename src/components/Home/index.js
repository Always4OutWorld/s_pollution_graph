import React from 'react';
import { Chip, Grid, Paper, Typography } from '@material-ui/core';
import { CheckCircle, Cancel } from '@material-ui/icons';
import { get } from 'lodash';
import moment from 'moment';
import { Line, Bar } from 'react-chartjs-2';
import SelectField from '../common/SelectField';
import CommonTextField from '../common/TextField';
import Handler from './handler';
import { OUTPUTDATEFORMAT } from '../constant';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import CircularProgress from '@material-ui/core/CircularProgress';
import logo from '../../assets/openaq.png';

const getChartType = (type = '', data, options) => {
  switch (type) {
    case 'bar':
      return <Bar data={data} options={options} />;
    default:
      return <Line data={data} options={options} />;
  }
}

const textComp = (value, label, style="body1") => (
  <Grid container>
    <Grid item xs={12}>
      <Typography variant="body2" className="cityLabel">
        {label}
      </Typography>
    </Grid>
    <Grid item xs={12}>
      <Typography variant={style} className="cityValue">
        {value}
      </Typography>
    </Grid>
  </Grid>
);


const HOMEPAGE = () => {
  const {
    data,
    options,
    selectedCity,
    citieOptions,
    handleChange,
    fromDate,
    toDate,
    isHaveResult,
    selectedGraphType,
    setType,
    chipData
  } = Handler();
  console.log("gra", data);
  return (
      <Grid container className="homecontainer" spacing={4}>
        <Grid item xs={12}>
          <Paper className="w3-margin-top">
            <Grid container spacing={4} className="w3-padding">
              <Grid item lg={2} md={2} sm={2} xs={6}>
                <Typography variant="h2" className="countryStyle" align="center">
                  {get(selectedCity, 'country', '-')}
                </Typography>
              </Grid>
              <Grid item lg={3} md={3} sm={3} xs={6} alignContent="center">
                {textComp(get(selectedCity, 'city', '-'), 'City Name', "h4")}
              </Grid>
              <Grid item lg={3} md={3} sm={3} xs={12}>
              {textComp('', 'Graph Type')}
                {chipData.map(each => {
                  return (
                    <Chip
                      icon={selectedGraphType === each.type ? <CheckCircle /> : <Cancel />}
                      label={each.label}
                      color={selectedGraphType === each.type ? "primary" : "secondary"}
                      clickable
                      onClick={() => setType(each.type)}
                    />
                )}
                )}
              </Grid>
              <Grid item lg={2} md={2} sm={2} xs={6}>
                {textComp(moment(get(selectedCity, 'firstUpdated')).format(OUTPUTDATEFORMAT), 'Created')}
                {textComp(moment(get(selectedCity, 'lastUpdated')).format(OUTPUTDATEFORMAT), 'Updated')}
              </Grid>
              <Grid item lg={2} md={2} sm={2} xs={6}>
                {textComp(moment(fromDate).format(OUTPUTDATEFORMAT), 'Filter from Date')}
                {textComp(moment(toDate).format(OUTPUTDATEFORMAT), 'Filter To Date')}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={8}>
          {!isHaveResult && <div><CircularProgress className="w3-center" /></div>}
          {get(isHaveResult, 'length') === 0 ? (
            <div className="graphPaper">
              <div className="w3-center w3-margin-top">
                <NotInterestedIcon />
              </div>
              <Typography className="w3-center">
                No data available for this City in the Given Time Period
              </Typography>
            </div>
          ) : (
            <Paper className="graphPaper2">
              {getChartType(selectedGraphType, data, options)}
            </Paper>
          )}
        </Grid>
        <Grid item xs={12} sm={4}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              Filters
            </Grid>
            <Grid item xs={12}>
              <SelectField
                options={citieOptions}
                label="Select City"
                name="city"
                value={selectedCity}
                onChange={e => handleChange(e)}
                error={get(citieOptions, 'length') ? '' : 'No Cities Found'}
              />
            </Grid>
            <Grid item xs={12}>
              <CommonTextField
                label="From Date"
                value={fromDate}
                name="fromDate"
                onChange={handleChange}
              />
           </Grid>
            <Grid item xs={12}>
              <CommonTextField
                label="To Date"
                value={toDate}
                name="toDate"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">Open Source</Typography>
              <img src={logo} className="logo" alt="logo" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
  );
}

  export default HOMEPAGE;