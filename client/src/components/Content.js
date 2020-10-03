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

        this.state = {
            listening: false,
            transcript: ""
        }
    }

    onClickRec() {
        this.setState({
            listening: !this.state.listening
        })
    }

    onClickCopy() {
        console.log("copy");
    }

    onClickDel() {
        console.log("del");
    }

    onChangeTranscript(e) {
        this.setState({
            transcript: e.target.value
        })
        console.log(this.state.transcript)
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
                    <textarea className="Note-Content" value={this.state.transcript} onChange={this.onChangeTranscript} />
                </div>
            </div>
        );
    }
}