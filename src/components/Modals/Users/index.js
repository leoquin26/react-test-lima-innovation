import React, { Component } from "react";
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Moment from 'react-moment';
class Index extends Component {
    state = {
        showModal: false
    }
    closeModal(){
        this.props.onCloseModalUser(false);
    }
    render() {
        const showModal = this.props.showModal;
        return (
            <>
                <Modal
                    show={showModal}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Body>
                        <div className="card-group">
                            <div className="card">
                                <img className="card-img-top" alt={this.props.userData.picture} src={this.props.userData.picture}/>
                                    <div className="card-body">
                                        <span>
                                           user id: {this.props.userData.id}
                                        </span>
                                        <h5 className="card-title">{this.props.userData.title}. {this.props.userData.firstName} {this.props.userData.lastName}</h5>
                                        <div className="text-truncate"><b>gender: </b>{this.props.userData.gender}</div>
                                        <div className="text-truncate"><b>Date Of Birth: </b><Moment format="MMM Do YYYY">
                                            {this.props.userData.dateOfBirth}
                                        </Moment></div>
                                        <div className="text-truncate"><b>Email: </b>{this.props.userData.email}</div>
                                        <div className="text-truncate"><b>Phone: </b>{this.props.userData.phone}</div>
                                        <div className="text-truncate"><b>Address: </b>{this.props.userLocation.country} , {this.props.userLocation.state} , {this.props.userLocation.city} <br/>
                                            {this.props.userLocation.street}
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <small className="text-muted">
                                            <div className="text-truncate">
                                                <b>registered: </b>
                                                <Moment format="YYYY/MM/DD hh:mm:ss">
                                                    {this.props.userData.registerDate}
                                                </Moment>
                                            </div>
                                        </small>
                                    </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeModal.bind(this)}>
                            Cerrar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}
export default Index;
