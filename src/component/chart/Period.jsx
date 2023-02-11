import React from 'react';

class Period extends React.Component {

    changeSelectColor = (period) => {
        if (period === this.props.selectedPeriod) return {"background": "rgba(43, 3, 43, 0.562)"};
        return null;
    }

    render() { 
        const { onClick, periods } = this.props;
        return <div>
                    <ul className="period">
                        {periods.map(period => 
                        <li className="phase" 
                            onClick = {() => onClick(period)} 
                            style = {this.changeSelectColor(period)}
                        >
                            {period}
                        </li>
                        )}
                    </ul>
               </div>;
    }
}
 
export default Period;