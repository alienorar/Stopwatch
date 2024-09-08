import React, { Component } from 'react';
// import './StopWatch.css'; // Import your CSS file

export default class StopWatch extends Component {
    state = {
        hour: 0,
        minute: 0,
        sekund: 0,
        disabled: false,
        interval: "",
        intervals: []
    };

    startInterval = () => {
        let a = setInterval(() => {
            const { sekund, minute, hour } = this.state;
            if (sekund === 59) {
                if (minute === 59) {
                    this.setState({
                        sekund: 0,
                        minute: 0,
                        hour: hour + 1
                    });
                } else {
                    this.setState({
                        minute: minute + 1,
                        sekund: 0,
                    });
                }
            } else {
                this.setState({
                    sekund: sekund + 1
                });
            }
        }, 10);

        this.setState({
            disabled: true,
            interval: a,
        });
    };

    stopInterval = () => {
        clearInterval(this.state.interval);
        this.setState({
            disabled: false
        });
    };

    clearIntervals = () => {
        clearInterval(this.state.interval);
        this.setState({
            hour: 0,
            minute: 0,
            sekund: 0,
        });
    };

    savetIntervals = () => {
        const { hour, minute, sekund, intervals } = this.state;
        intervals.push(`${hour}:${minute}:${sekund}`);
        this.setState({
            intervals: intervals
        });
    };

    render() {
        const { hour, minute, sekund, disabled, intervals } = this.state;
        return (
            <div className="stopwatch-container">
                <div className="stopwatch-card">
                    <div className="stopwatch-header">
                        <h2>StopWatch</h2>
                    </div>
                    <div className="stopwatch-body">
                        <h2>{hour < 10 ? `0${hour}` : hour}:
                            {minute < 10 ? `0${minute}` : minute}:
                            {sekund < 10 ? `0${sekund}` : sekund}
                        </h2>
                    </div>
                    <div className="intervals">
                        {intervals.map((item, index) => (
                            <div className="interval" key={index}>{item}</div>
                        ))}
                    </div>
                    <div className="stopwatch-footer">
                        <button className='btn btn-start' disabled={disabled} onClick={this.startInterval}>Start</button>
                        <button className='btn btn-stop' onClick={this.stopInterval}>Stop</button>
                        <button className='btn btn-clear' onClick={this.clearIntervals}>Clear</button>
                        <button className='btn btn-save' onClick={this.savetIntervals}>Interval</button>
                    </div>
                </div>
            </div>
        );
    }
}
