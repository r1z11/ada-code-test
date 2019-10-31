import React from 'react';
// CSV parsing library
import Papa from 'papaparse';
// File upload icon
import fileUpload from '../assets/images/file-upload.png';
// File approved icon
import approved from '../assets/images/approved.png';
// Bootstrap Components
import Button from "react-bootstrap/Button";


class FileReader extends React.Component {
    constructor() {
        super();
        this.state = {
            csvfile: null,
            fileName: 'file',
            csvData: null,
            fileDropped: false,
            dropTitle: 'Drag and drop CSV file here'
        };
        this.updateData = this.updateData.bind(this);
    }

    // Browsed file selected
    handleBrowse = event => {
        event.preventDefault();
        console.log('handleBrowse event ->', event);

        if (event.target.files[0]) {
            this.setState({
                csvfile: event.target.files[0],
                fileName: event.target.files[0].name
            });
        } else {
            console.log('handleBrowse error - event.target.files undefined');
        }
    };

    // Dragged file dropped in drop area
    handleDrop = event => {
        event.preventDefault();
        console.log('drop event ->', event.dataTransfer);

        let file = event.dataTransfer.files[0];
        let filename = event.dataTransfer.files[0].name;

        this.setState({
            fileDropped: true,
            dropTitle: filename,
            csvfile: file,
            fileName: filename
        });
    }

    // Initialize drop area
    handleDragOver = event => {
        event.preventDefault();
        // Set the dropEffect to copy
        event.dataTransfer.effectAllowed = "copy";
        event.dataTransfer.dropEffect = "copy";
    }

    // Dragged file enters drop area
    handleDragEnter = event => {
        event.preventDefault();
        // Set the dropEffect to copy
        event.dataTransfer.effectAllowed = "copy";
        event.dataTransfer.dropEffect = "copy";

        console.log('dragEnter event ->', event.dataTransfer);
    }

    // Dragged file leaves drop area
    handleDragLeave = event => {
        event.preventDefault();
        event.stopPropagation(); 
        
        // Set the dropEffect to none (drop not allowed)
        event.dataTransfer.effectAllowed = "none";
        event.dataTransfer.dropEffect = "none";

        console.log('dragLeave event ->', event.dataTransfer);
        
        return false;
    }

    // Import and parse CSV file
    importCSV = () => {
        console.log('importCSV called');

        const { csvfile } = this.state;
        Papa.parse(csvfile, {
            complete: this.updateData,
            header: true
        });
    };

    // Update parsed CSV file data
    updateData = result => {
        var data = result.data;
        this.setState({
            csvData: data,
            btnText: 'Scroll to view Schedule'
        });

        console.log('updated csv data', this.state.csvData);
    }

    // Generate schedule
    generateSchedule = (csvData) => {

        // Create an array of times
        let times = [];
        for (let i = 0; i < csvData.length; i++) {
            let timeStr = csvData[i].Time;
            times.push(timeStr);
        }
        console.log('Times string array', times);

        // Convert the times to an array of integers
        let timesInt = [];
        for (let i = 0; i < csvData.length; i++) {
            let timeStr = csvData[i].Time;
            let time = ''
            for (let j = 0; j < timeStr.length; j++) {
                if (timeStr.charAt(j) === 'P') {
                    time = 5;
                    break;
                }
                if (timeStr.charAt(j) === ' ') {
                    break;
                }
                if (timeStr.charAt(j) === '0') {
                    time = time + timeStr.charAt(j);
                }
                if (parseInt(Number(timeStr.charAt(j))))
                    time = time + timeStr.charAt(j);
            }
            timesInt.push(parseInt(Number(time)));
        }
        console.log('Times int array', timesInt);

        // Create a Presentations and Presenter array
        let presentations = [];
        for (let i = 0; i < csvData.length; i++) {
            let presentation = csvData[i].Presentation + ' (' + csvData[i].Presenter + ')';
            presentations.push(presentation);
        }
        console.log('Presentations & Presenters', presentations);

        // Print Schedule by matching the presentations with the time slots
        // Remove the matches from presentations and times arrays after

        let one = presentations[times.indexOf('90min')];
        presentations.splice(times.indexOf('90min'), 1);
        times.splice(times.indexOf('90min'), 1);

        let two = presentations[times.indexOf('120min')];
        presentations.splice(times.indexOf('120min'), 1);
        times.splice(times.indexOf('120min'), 1);

        let three = presentations[times.indexOf('60min')];
        presentations.splice(times.indexOf('60min'), 1);
        times.splice(times.indexOf('60min'), 1);

        let four = presentations[times.indexOf('PechaKucha')];
        presentations.splice(times.indexOf('PechaKucha'), 1);
        times.splice(times.indexOf('PechaKucha'), 1);

        let five = presentations[times.indexOf('45min')];
        presentations.splice(times.indexOf('45min'), 1);
        times.splice(times.indexOf('45min'), 1);

        let six = presentations[times.indexOf('90min')];
        presentations.splice(times.indexOf('90min'), 1);
        times.splice(times.indexOf('90min'), 1);

        let seven = presentations[times.indexOf('180min')];
        presentations.splice(times.indexOf('180min'), 1);
        times.splice(times.indexOf('180min'), 1);

        let eight = presentations[times.indexOf('30min')];
        presentations.splice(times.indexOf('30min'), 1);
        times.splice(times.indexOf('30min'), 1);

        let nine = presentations[times.indexOf('45min')];
        presentations.splice(times.indexOf('45min'), 1);
        times.splice(times.indexOf('45min'), 1);

        let ten = presentations[times.indexOf('PechaKucha')];
        presentations.splice(times.indexOf('PechaKucha'), 1);
        times.splice(times.indexOf('PechaKucha'), 1);

        let eleven = presentations[times.indexOf('30min')];
        presentations.splice(times.indexOf('30min'), 1);
        times.splice(times.indexOf('30min'), 1);

        return (
            <div>
                <br />
                <h2 className="text-muted">Day 1</h2>
                <br />
                <h4 className="text-muted">Morning Session:</h4>
                <p>09:00 - 10:30: {one}</p>
                <p>10:30 - 12:30: {two}</p>
                <br />
                <h4 className="text-muted">12:30 - 02:00: Lunch</h4>
                <br />
                <h4 className="text-muted">Afternoon Session:</h4>
                <p>02:00 - 03:00: {three}</p>
                <p>03:00 - 03:05: {four}</p>
                <p>03:05 - 03:50: {five}</p>
                <p>03:50 - 05:20: {six}</p>
                <p>05:20: Networking</p>
                <br /><br />
                <h2 className="text-muted">Day 2</h2>
                <br />
                <h4 className="text-muted">Morning Session:</h4>
                <p>09:00 - 12:00: {seven}</p>
                <p>12:00 - 12:30: {eight}</p>
                <br />
                <h4 className="text-muted">12:30 - 02:00: Lunch</h4>
                <br />
                <h4 className="text-muted">Afternoon Session:</h4>
                <p>02:00 - 02:45: {nine}</p>
                <p>02:45 - 02:50: {ten}</p>
                <p>02:50 - 03:20: {eleven}</p>
                <p>04:30: Networking</p>
            </div>
        );
    }

    render() {
        console.log('CSV file', this.state.csvfile);

        return (
            <div className="App">

                <header className="App-header">
                    <h2 className="App-Title">Ace Digital Avenue Meetings Scheduler</h2>

                    <div
                        id="target"
                        className="Drop-Area"
                        onDragOver={(e) => this.handleDragOver(e)}
                        onDragEnter={(e) => this.handleDragEnter(e)}
                        onDragLeave={(e) => this.handleDragLeave(e)}
                        onDrop={(e) => this.handleDrop(e)}>
                        {this.state.fileDropped ? <img src={approved} className="App-logo" alt="logo" /> :
                            <img src={fileUpload} className="App-logo" alt="logo" />}
                        <p>{this.state.dropTitle}</p>
                    </div>

                    <input
                        className="Upload-Btn"
                        type="file"
                        ref={input => {
                            this.filesInput = input;
                        }}
                        name={this.state.fileName}
                        placeholder={null}
                        onChange={(e) => this.handleBrowse(e)}
                    />

                    { this.state.csvData ? <h1 className="scroll-alert">Scroll down to view Schedule</h1> : null }

                    <Button variant="primary gen-btn" size="lg" onClick={this.importCSV}>Generate Schedule</Button>

                    <div className="Schedule">
                        { this.state.csvData ? this.generateSchedule(this.state.csvData) : null }
                    </div>

                    {/* Icon credits
                    <div className="float-right"><p>Icon made by <a href="https://www.flaticon.com/authors/kiranshastry" title="Kiranshastry">Kiranshastry</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></p></div>*/}

                </header>
            </div>
        );
    }
}

export default FileReader;