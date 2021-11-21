import React, { Component } from "react";
import CreateOrder from "./components/CreateOrder";
import ViewOrder from "./components/ViewOrder";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderList: [],
      selectedOrder: {},
      createModalOpen: false,
      viewModalOpen: false,
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("/api/orders/")
      .then((res) => this.setState({ orderList: res.data }))
      .catch((err) => console.log(err));
  };

  toggleCreateModal = () => {
    this.setState({ createModalOpen: !this.state.createModalOpen });
  };

  toggleViewModal = () => {
    this.setState({ viewModalOpen: !this.state.viewModalOpen });
  };

  viewOrder = (order) => {
    this.setState({
      selectedOrder: order,
      viewModalOpen: !this.state.viewModalOpen,
    });
  };

  handleSubmit = (order) => {
    this.toggleCreateModal();
    axios.post("/api/orders/", order).then((res) => this.refreshList());
  };

  renderOrders = () => {
    return this.state.orderList.map((order) => (
      <tr
        key={order.id}
        onClick={() => this.viewOrder(order)}
      >
        <td>{order.id}</td>
        <td>{order.category.name}</td>
        <td>
          {order.contact_name} {order.contact_phone}{" "}
        </td>
        <td>{order.agency}</td>
        <td>{order.company}</td>
        <td>{order.deadline}</td>
      </tr>
    ));
  };

  render() {
    return (
      <main className="container">
        <h1 className="text-white text-uppercase text-center my-4">Orders</h1>
        <div className="row">
          <div className="col-md-10 col-sm-10 mx-auto p-0">
            <div>
              <div className="mb-4 float-right">
                <button
                  className="btn btn-primary"
                  onClick={this.toggleCreateModal}
                >
                  Open new order
                </button>
              </div>
              <table className="table table-striped text-center border border-5">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Category</th>
                    <th scope="col">Contact</th>
                    <th scope="col">Agency</th>
                    <th scope="col">Company</th>
                    <th scope="col">Deadline</th>
                  </tr>
                </thead>
                <tbody>{this.renderOrders()}</tbody>
              </table>
            </div>
          </div>
        </div>
        {this.state.createModalOpen && (
          <CreateOrder
            toggle={this.toggleCreateModal}
            onSave={this.handleSubmit}
          />
        )}
        {this.state.viewModalOpen && (
          <ViewOrder
            selectedOrder={this.state.selectedOrder}
            toggle={this.toggleViewModal}
          />
        )}
      </main>
    );
  }
}

export default App;
