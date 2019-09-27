import React from "react";
import { Modal, ModalDialog, ModalHeader, ModalTitle, ModalBody, ModalFooter, Button } from 'react-bootstrap';

class Popup extends React.Component {

    //No ES2015 a função getInitialState é subsituída pelo construtor
    constructor(props, context) {
        super(props, context);
        //inicializa o status
        this.state = {
            visible: false,
            titulo: "Informação",
            mensagem: [""],
            bsClass: "modal-message-info"
        }
    }


    handleAlertShow(msg, tipo, cb) {
        this.setState({ visible: true });
        if(!Array.isArray(msg)){
            msg = [msg];
        }
        this.setState({ mensagem: msg });
        this.setState({ callback: cb });
        if (tipo && tipo.toLowerCase() === "error") {
            this.setState({ titulo: "Erro", bsClass: "modal-message-error" });
        } else {
            this.setState({ titulo: "Informação", bsClass: "modal-message-info" });
        }
    }

    handleAlertDismiss() {
        if (this.state.callback != null) {
            this.state.callback();
        }
        this.setState({ visible: false });
    }

    render() {
        if (this.state.visible) {
            return (<Modal show={this.state.visible} onHide={this.handleAlertDismiss.bind(this)}>
                <Modal.Header bsClass={this.state.bsClass}>
                    <Modal.Title>{this.state.titulo}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        this.state.mensagem.map(function (m, i) {
                            return <p key={`pKeyMessage${i}`}>{m}</p>;
                        })
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="success" onClick={this.handleAlertDismiss.bind(this)}>Fechar</Button>
                </Modal.Footer>
            </Modal>);
        } else {
            return <div></div>;
        }
    }
}

export default Popup;