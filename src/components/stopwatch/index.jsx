import React, { Component } from 'react';
// import './StopWatch.css'; // Import your CSS file

export default class StopWatch extends Component {
    state = {
        hour: 0,
        minute: 0,
        sekund: 0,
        timerHour: 0,
        timerMinute: 0,
        timerSecond: 0,
        timerSetHour: 0,
        timerSetMinute: 0,
        timerSetSecond: 0,
        stopwatchDisabled: false,
        timerDisabled: false,
        stopwatchInterval: "",
        timerInterval: "",
        intervals: []
    };

    // Stopwatch functions
    startStopwatch = () => {
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
            stopwatchDisabled: true,
            stopwatchInterval: a,
        });
    };

    stopStopwatch = () => {
        clearInterval(this.state.stopwatchInterval);
        this.setState({
            stopwatchDisabled: false
        });
    };

    clearStopwatch = () => {
        clearInterval(this.state.stopwatchInterval);
        this.setState({
            hour: 0,
            minute: 0,
            sekund: 0,
        });
    };

    saveStopwatchIntervals = () => {
        const { hour, minute, sekund, intervals } = this.state;
        intervals.push(`${hour}:${minute}:${sekund}`);
        this.setState({
            intervals: intervals
        });
    };

    deleteInterval = (index) => {
        const { intervals } = this.state;
        this.setState({
            intervals: intervals.filter((_, i) => i !== index)
        });
    };

    // Timer functions
    handleSetTimer = () => {
        clearInterval(this.state.timerInterval); // Clear any existing timer
        this.setState({
            timerHour: this.state.timerSetHour,
            timerMinute: this.state.timerSetMinute,
            timerSecond: this.state.timerSetSecond,
        });
    };

    startTimer = () => {
        let b = setInterval(() => {
            const { timerHour, timerMinute, timerSecond } = this.state;
            if (timerSecond === 0) {
                if (timerMinute === 0) {
                    if (timerHour === 0) {
                        clearInterval(this.state.timerInterval);
                        this.setState({ timerDisabled: false });
                        return;
                    } else {
                        this.setState({
                            timerSecond: 59,
                            timerMinute: 59,
                            timerHour: timerHour - 1
                        });
                    }
                } else {
                    this.setState({
                        timerSecond: 59,
                        timerMinute: timerMinute - 1
                    });
                }
            } else {
                this.setState({
                    timerSecond: timerSecond - 1
                });
            }
        }, 1000);

        this.setState({
            timerDisabled: true,
            timerInterval: b,
        });
    };

    stopTimer = () => {
        clearInterval(this.state.timerInterval);
        this.setState({
            timerDisabled: false
        });
    };

    clearTimer = () => {
        clearInterval(this.state.timerInterval);
        this.setState({
            timerHour: 0,
            timerMinute: 0,
            timerSecond: 0,
            timerSetHour: 0,
            timerSetMinute: 0,
            timerSetSecond: 0,
        });
    };

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: parseInt(value, 10) || 0 });
    };

    render() {
        const { hour, minute, sekund, stopwatchDisabled, intervals, timerHour, timerMinute, timerSecond, timerDisabled, timerSetHour, timerSetMinute, timerSetSecond } = this.state;
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
                            <div className="interval" key={index}>
                                <span>{item}</span>
                                <button className="btn btn-delete" onClick={() => this.deleteInterval(index)}>X</button>
                            </div>
                        ))}
                    </div>
                    <div className="stopwatch-footer">
                        <button className='btn btn-start' disabled={stopwatchDisabled} onClick={this.startStopwatch}>Start</button>
                        <button className='btn btn-stop' onClick={this.stopStopwatch}>Stop</button>
                        <button className='btn btn-clear' onClick={this.clearStopwatch}>Clear</button>
                        <button className='btn btn-save' onClick={this.saveStopwatchIntervals}>Interval</button>
                    </div>
                </div>

                <div className="stopwatch-card timer">
                    <div className="stopwatch-header">
                        <h2>Timer</h2>
                    </div>
                    <div className="stopwatch-body">
                        <h2>{timerHour < 10 ? `0${timerHour}` : timerHour}:
                            {timerMinute < 10 ? `0${timerMinute}` : timerMinute}:
                            {timerSecond < 10 ? `0${timerSecond}` : timerSecond}
                        </h2>
                        <div className="timer-set">
                            <input
                                type="number"
                                name="timerSetHour"
                                value={timerSetHour}
                                onChange={this.handleChange}
                                placeholder="Hours"
                                min="0"
                            />
                            <input
                                type="number"
                                name="timerSetMinute"
                                value={timerSetMinute}
                                onChange={this.handleChange}
                                placeholder="Minutes"
                                min="0"
                            />
                            <input
                                type="number"
                                name="timerSetSecond"
                                value={timerSetSecond}
                                onChange={this.handleChange}
                                placeholder="Seconds"
                                min="0"
                            />
                            <button className="btn btn-set" onClick={this.handleSetTimer}>Set Timer</button>
                        </div>
                    </div>
                    <div className="stopwatch-footer">
                        <button className='btn btn-start' disabled={timerDisabled} onClick={this.startTimer}>Start</button>
                        <button className='btn btn-stop' onClick={this.stopTimer}>Stop</button>
                        <button className='btn btn-clear' onClick={this.clearTimer}>Clear</button>
                    </div>
                </div>
            </div>
        );
    }
}
