import React, { Component } from 'react';

const webkitSpeechRecognition = window.webkitSpeechRecognition
const SpeechRecognition = window.SpeechRecognition
const Speech = SpeechRecognition || webkitSpeechRecognition
const recognition = new Speech()

recognition.continous = true
recognition.interimResults = true
recognition.lang = 'en-US'

export default class Heading extends Component {
    constructor(props) {
        super();

        this.onClickRec = this.onClickRec.bind(this);
        this.onClickCopy = this.onClickCopy.bind(this);
        this.onClickDel = this.onClickDel.bind(this);
        this.onChangeTranscript = this.onChangeTranscript.bind(this);
        this.handleListen = this.handleListen.bind(this);

        this.state = {
            listening: false,
            showMessage: false,
            transcript: ""
        }
    }

    onClickRec() {
        // starts or stops recording

        this.setState({
            listening: !this.state.listening
        }, this.handleListen)
    }

    onClickCopy(e) {
        // copies text to clipboard

        this.textArea.select();
        document.execCommand("copy")
    }

    onClickDel() {
        // deletes text field
        this.setState({
            transcript: ""
        })
    }

    onChangeTranscript(e) {
        // handles change state of textarea
        this.setState({
            transcript: e.target.value
        })
        console.log(this.state.transcript)
    }

    handleListen() {
        // handles event listener
        if (this.state.listening) {
            recognition.start()
            recognition.addEventListener('end', recognition.start)
            console.log("start")
        } else {
            recognition.stop()
            console.log("end")
        }

        let finalTranscript = "";
        recognition.onresult = event => {
            const transcript = Array.from(event.results)
                .map(result => result[0])
                .map(result => result.transcript)
                .join("")

            if (event.results[0].isFinal) {
                finalTranscript += transcript + " "
            }
            console.log(finalTranscript)
        }
    }

    render() {
        return (
            <div>
                <div className="Heading">
                    <p>NOTEBOOK</p>
                    <div className="Button-Div">
                        <div className="Button" onClick={this.onClickRec}>rec</div>
                        <div className="Button" onClick={this.onClickCopy}>copy</div>
                        <div className="Button" onClick={this.onClickDel}>del</div>
                    </div>
                </div>
                <div>
                    <textarea
                        ref={(textarea) => this.textArea = textarea}
                        className="Note-Content"
                        value={this.state.transcript}
                        onChange={this.onChangeTranscript}
                        id="transcription" />
                </div>
            </div>
        );
    }
}