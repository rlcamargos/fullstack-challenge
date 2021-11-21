import React, { Component } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOrder: this.props.selectedOrder,
    };
  }

  render() {
    const { toggle } = this.props;

    return (
      <Modal isOpen toggle={toggle} size="xl">
        <ModalHeader toggle={toggle}>Order Details</ModalHeader>
        <ModalBody>
          <div className="d-flex flex-row">
            <div className="p-2 flex-fill">
              <div className="d-flex flex-row">
                <div className="p-2 flex-fill">
                  <label>Contact Name</label>
                  <h2>{this.state.selectedOrder.contact_name}</h2>
                </div>
                <div className="p-2 flex-fill">
                  <label>Contact Phone</label>
                  <h2>{this.state.selectedOrder.contact_phone}</h2>
                </div>
              </div>
              <div className="p-2">
                <label>Order Description</label>
                <h4>{this.state.selectedOrder.description}</h4>
              </div>
              <div className="p-2">
                <label>Category</label>
                <h2>{this.state.selectedOrder.category.name}</h2>
              </div>
            </div>
            <div className="p-2 flex-fill">
              <div className="p-2">
                <label>Real State Agency</label>
                <h2>{this.state.selectedOrder.agency}</h2>
              </div>
              <div className="p-2">
                <label>Company</label>
                <h2>{this.state.selectedOrder.company}</h2>
              </div>
              <div className="p-2">
                <label>Deadline</label>
                <h2>{this.state.selectedOrder.deadline}</h2>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    );
  }
}
