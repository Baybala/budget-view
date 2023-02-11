import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import moment from "moment";

class ChartView extends React.Component {

    //depending on the type (income or expence) set dataKey for the chart and change color 
    otherData = () => {
        const { inExVerification } = this.props;
        const dataKey = inExVerification === "incomes" ? "incomeAmount" : "expenceAmount";
        const color = inExVerification === "incomes" ? "#58de21" : "#ce2121"
        return { dataKey, color};
    }

    render() { 

        const { data } = this.props;

        return (<div>
                    <ResponsiveContainer width="100%" height={400} >
                        <AreaChart data={data}>
                        <defs>
                            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={this.otherData().color} stopOpacity={0.4} />
                            <stop offset="50%" stopColor={this.otherData().color} stopOpacity={0.05} />
                            </linearGradient>
                        </defs>
                        <Area dataKey = {this.otherData().dataKey} stroke = "#2451B7" fill="url(#color)"/>
                        <XAxis dataKey = "date" axisLine = {false} tickFormatter ={(str) => {
                          return moment(str).format("DD.MMM YYYY")
                        }}/>
                        <YAxis dataKey = {this.otherData().dataKey}  axisLine = {false} tickCount={8} tickFormatter = {number => `$${number.toFixed(2)}`}/>
                        <Tooltip offset={40} cursor={{ stroke: 'orange', strokeWidth: 1, opacity: 0.5 }} content = {<CustomTooltip />}/>
                        <CartesianGrid opacity={0.1} vertical = {false} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
        );
    }
}

// Modifying the tooltip
function CustomTooltip ({ active, payload, label }) {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`Data is ${label}`}</p>
          <p className="desc">{`Amount is ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  }
  
 
export default ChartView;