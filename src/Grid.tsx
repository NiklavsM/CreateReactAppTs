import React, {useEffect, useState} from 'react';
import {AgGridColumn, AgGridReact} from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import HighchartsReact from "highcharts-react-official";
import Highcharts from 'highcharts';

export const Grid = () => {

    const [rowData, setRowData] = useState([]);

    useEffect(() => {
        fetch("https://datausa.io/api/data?drilldowns=Nation&measures=Population")
            .then(res => res.json())
            .then((result) => {
                    console.log(result.data)
                    setRowData(result.data);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    console.log("Eoor", error)
                })
    }, []);

    // const rowData = [
    //     {make: "Toyota", model: "Celica", price: 35000},
    //     {make: "Ford", model: "Mondeo", price: 32000},
    //     {make: "Porsche", model: "Boxter", price: 72000}
    // ];

    const currencyFormatter = (currency: number, sign: string) => {
        const sansDec = currency.toFixed(0);
        const formatted = sansDec.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return sign + `${formatted}`;
    }

    const options = {
        title: {
            text: 'My chart'
        },
        series: [{
            data: [1, 2, 3]
        }]
    }

    return (
        <>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        <div className="ag-theme-alpine" style={{height: '100vh', width: '100vw'}}>
            <AgGridReact
                rowData={rowData}>
                <AgGridColumn field="Nation" sortable filter/>
                <AgGridColumn field="Population" sortable filter
                              valueFormatter={(params) => currencyFormatter(params.data.Population, '$')}/>
                <AgGridColumn field="Year" sortable filter/>
            </AgGridReact>
        </div>
        </>
    );
};