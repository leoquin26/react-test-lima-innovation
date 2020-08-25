import React, { Component } from "react";
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Comments.css";
class Index extends Component {
    state = {
        showModal: false
    }
    closeModal(){
        this.props.onCloseModalComments(false);
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
                                <div className="card-body">
                                    <div className="comment-section">
                                        { this.props.commentsData.map(comment =>  <div className="single-comment">
                                            <img alt={comment.owner.picture} src={comment.owner.picture}/>
                                            <div className="single-container">
                                                <span>{comment.owner.firstName} {comment.owner.lastName}</span>
                                                <span>{comment.message}</span>
                                            </div>
                                        </div>)}

                                    </div>
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
