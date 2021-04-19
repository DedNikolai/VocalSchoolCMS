import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Typography,
    colors,
    useTheme
} from '@material-ui/core';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import PhoneIcon from '@material-ui/icons/Phone';
import TabletIcon from '@material-ui/icons/Tablet';
import disciplineValue from '../../../constants/disciplineValue';

const colorsValues = [
    colors.indigo[500],
    colors.red[600],
    colors.orange[600],
    colors.teal[600],
    colors.green[600],
    colors.lime[600],
    colors.yellow[600],
];

const TrafficByDevice = (props) => {
    const theme = useTheme();
    const {abonements} = props;
    const labels = [];
    const values= [];
    const abonementsValues = []
    Object.keys(disciplineValue).forEach((dis, index) => {
        labels.push(disciplineValue[dis]);
        const quantity = abonements.filter(abonement => abonement.discipline === dis).length;
        const val = Math.round(quantity*100 / abonements.length);
        values.push(val);
        const obj = {
            title: disciplineValue[dis],
            value: val,
            color: colorsValues[index]
        }
        abonementsValues.push(obj);

    });

    const data = {
        datasets: [
            {
                data: values,
                backgroundColor: [
                    colors.indigo[500],
                    colors.red[600],
                    colors.orange[600],
                    colors.teal[600],
                    colors.green[600],
                    colors.lime[600],
                    colors.yellow[600],
                ],
                borderWidth: 8,
                borderColor: colors.common.white,
                hoverBorderColor: colors.common.white
            }
        ],
        labels: labels
    };

    const options = {
        animation: false,
        cutoutPercentage: 80,
        layout: { padding: 0 },
        legend: {
            display: false
        },
        maintainAspectRatio: false,
        responsive: true,
        tooltips: {
            backgroundColor: theme.palette.background.paper,
            bodyFontColor: theme.palette.text.secondary,
            borderColor: theme.palette.divider,
            borderWidth: 1,
            enabled: true,
            footerFontColor: theme.palette.text.secondary,
            intersect: false,
            mode: 'index',
            titleFontColor: theme.palette.text.primary
        }
    };

    const devices = [
        {
            title: 'Desktop',
            value: 63,
            icon: LaptopMacIcon,
            color: colors.indigo[500]
        },
        {
            title: 'Tablet',
            value: 15,
            icon: TabletIcon,
            color: colors.red[600]
        },
        {
            title: 'Mobile',
            value: 23,
            icon: PhoneIcon,
            color: colors.orange[600]
        }
    ];

    return (
        <Card {...props}>
            <CardHeader title="Абонементи по дисциплінах" />
            <Divider />
            <CardContent>
                <Box
                    sx={{
                        height: 300,
                        position: 'relative'
                    }}
                >
                    <Doughnut
                        data={data}
                        options={options}
                    />
                </Box>
                <Box className='box-taffic-container'
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        pt: 2
                    }}
                >
                    {abonementsValues.map(({
                                      color,
                                      title,
                                      value
                                  }) => (
                        <Box
                            key={title}
                            sx={{
                                p: 1,
                                textAlign: 'center'
                            }}
                        >
                            <Typography
                                color="textPrimary"
                                variant="body1"
                            >
                                {title}
                            </Typography>
                            <Typography
                                style={{ color }}
                                variant="h2"
                            >
                                {value}
                                %
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </CardContent>
        </Card>
    );
};

export default TrafficByDevice;