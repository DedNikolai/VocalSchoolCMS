import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    useTheme,
    colors
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const Sales = (props) => {
    const theme = useTheme();
    const {teachers = [], lessons = []} = props;
    const labels = teachers.map(teacher => teacher.firstName + ' ' + teacher.lastName);
    const lessonsData = teachers.map(teacher => {
        const teacherLessons = lessons.filter(lesson => lesson.teacher.id === teacher.id);
        return teacherLessons.length;
    });
    const data = {
        datasets: [
            {
                backgroundColor: colors.indigo[500],
                data: lessonsData,
                label: 'Уроків'
            },
            // {
            //     backgroundColor: colors.grey[200],
            //     data: [11, 20, 12, 29, 30, 25, 13],
            //     label: 'Last year'
            // }
        ],
        labels: labels
    };

    const options = {
        animation: false,
        cornerRadius: 20,
        layout: { padding: 0 },
        legend: { display: false },
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            xAxes: [
                {
                    barThickness: 12,
                    maxBarThickness: 10,
                    barPercentage: 0.5,
                    categoryPercentage: 0.5,
                    ticks: {
                        fontColor: theme.palette.text.secondary
                    },
                    gridLines: {
                        display: false,
                        drawBorder: false
                    }
                }
            ],
            yAxes: [
                {
                    ticks: {
                        fontColor: theme.palette.text.secondary,
                        beginAtZero: true,
                        min: 0
                    },
                    gridLines: {
                        borderDash: [2],
                        borderDashOffset: [2],
                        color: theme.palette.divider,
                        drawBorder: false,
                        zeroLineBorderDash: [2],
                        zeroLineBorderDashOffset: [2],
                        zeroLineColor: theme.palette.divider
                    }
                }
            ]
        },
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

    return (
        <Card {...props}>
            <CardHeader
                // action={(
                //     {/*<Button*/}
                //         {/*endIcon={<ArrowDropDownIcon />}*/}
                //         {/*size="small"*/}
                //         {/*variant="text"*/}
                //     {/*>*/}
                //         {/*Last 7 days*/}
                //     {/*</Button>*/}
                // )}
                title="Уроки по вчетелям"
            />
            <Divider />
            <CardContent>
                <Box
                    sx={{
                        height: 400,
                        position: 'relative'
                    }}
                >
                    <Bar
                        data={data}
                        options={options}
                    />
                </Box>
            </CardContent>
            <Divider />
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    p: 2
                }}
            >
                {/*<Button*/}
                    {/*color="primary"*/}
                    {/*endIcon={<ArrowRightIcon />}*/}
                    {/*size="small"*/}
                    {/*variant="text"*/}
                {/*>*/}
                    {/*Overview*/}
                {/*</Button>*/}
            </Box>
        </Card>
    );
};

export default Sales;