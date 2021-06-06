import { useEffect, useState } from 'react';
import { get } from 'lodash';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCitiesList, getMeasurement } from '../../redux/action';
import { SAVEDATEFORMAT } from '../constant';


const getData = (data = []) => {
    const processedData = get(data, 'length') && data.map(each => {
        return each.value;
    });
    return processedData;
}

const getLabel = (label = []) => {
    const processedlabel = get(label, 'length') && label.map(each => {
        return moment(get(each,'date.local')).format('MM-YYYY');
    });
    return processedlabel;
}

const getGraphDataCreator = (value, set) => {
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  const data = {
    labels: getLabel(value),
    datasets: [
      {
        label: 'Pollution index in  µg-3',
        data: getData(value),
        fill: false,
        backgroundColor: '#1a66ff',
        borderColor: '#4dc3ff',
      },
    ],
  };

  set({
      options,
      data
  })
}

const chipData = [
    {
        label: 'Line',
        type: 'line'
    },
    {
        label: 'Bar',
        type: 'bar'
    }
];




const Handler = () => {
    const dispatch = useDispatch();
    const cities = useSelector(state => get(state, 'citie.data'));
    const graphdata = useSelector(state => get(state, 'graph.data'));
    const [selectedValues, setValues] = useState({
        fromDate: moment().subtract(5, 'year').format(SAVEDATEFORMAT),
        toDate: moment().format(SAVEDATEFORMAT)
    });
    const [citieOptions, setCityOptions] = useState([]);
    const [selectedGraphType, setType] = useState('line');
    const [graphValue, setGraph] = useState({
        options: {},
        data: null
    });

    useEffect(() => {
        dispatch(getAllCitiesList());
        dispatch(getMeasurement());
    }, []);

    useEffect(() => {
        let data = null;
        if (get(cities, 'length')) {
            data = cities.map(city => {
            return { label: get(city, 'city'), value: city }
            });
            setValues(prevState => ({
                ...prevState,
                city: data[0].value,
            }));
        }
        if (get(cities, 'length') === 0) {
            setCityOptions([]);
        }
        setCityOptions(data);
    }, [cities]);

    useEffect(() => {
        const options = {};
        if (get(selectedValues, 'city')) {
            options.city = get(selectedValues, 'city.city')
        }
        if (get(selectedValues, 'fromDate')) {
            options.date_from = get(selectedValues, 'fromDate')
        }
        if (get(selectedValues, 'toDate')) {
            options.date_to = get(selectedValues, 'toDate')
        }
        dispatch(getMeasurement(options));
    }, [selectedValues]);

    useEffect(() => {
        getGraphDataCreator(graphdata, setGraph)
    }, [graphdata]);


    const handleChange = e => {
        const { name, value } = e.target;
        setValues(prevState => ({
            ...prevState,
            [name]: value,
        }));
    }

    return {
        isHaveResult: get(graphValue, 'data'),
        data: get(graphValue, 'data'),
        options: get(graphValue, 'data'),
        selectedCity: get(selectedValues, 'city'),
        citieOptions,
        handleChange,
        fromDate: get(selectedValues, 'fromDate'),
        toDate: get(selectedValues, 'toDate'),
        selectedGraphType,
        setType,
        chipData
    }
}

export default Handler;