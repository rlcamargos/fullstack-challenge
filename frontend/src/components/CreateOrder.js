import axios from "axios";
import React, { Component } from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import InputMask from "react-input-mask";

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.dropdownToggle = this.dropdownToggle.bind(this);
    this.state = {
      order: {},
      categoriesList: [],
      categoryDropdownOpen: false,
      dropDownValue: "-",
    };
  }

  componentDidMount() {
    this.refreshCategoriesList();
  }

  handleChange = (e) => {
    let { name, value } = e.target;
    const order = { ...this.state.order, [name]: value };
    this.setState({ order });
  };

  handleChangeCategory = (e) => {
    const order = {
      ...this.state.order,
      category: this.state.categoriesList.find(
        (category) => category.name === e.currentTarget.textContent
      ),
    };

    this.setState({ order });
    this.setState({ dropDownValue: e.currentTarget.textContent });
  };

  refreshCategoriesList = () => {
    axios
      .get("/api/categories/")
      .then((res) => this.setState({ categoriesList: res.data }))
      .catch((err) => console.log(err));
  };

  dropdownToggle() {
    this.setState((prevState) => ({
      categoryDropdownOpen: !prevState.categoryDropdownOpen,
    }));
  }

  renderCategories = () => {
    return this.state.categoriesList.map((category) => (
      <DropdownItem key={category.id} onClick={this.handleChangeCategory}>
        {category.name}
      </DropdownItem>
    ));
  };

  render() {
    const { toggle, onSave } = this.props;

    return (
      <Modal isOpen toggle={toggle}>
        <ModalHeader toggle={toggle}>New Order</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>Contact Name</Label>
              <Input
                required={true}
                type="text"
                id="order-contact-name"
                name="contact_name"
                value={this.state.order.contact_name}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Contact Phone</Label>
              <Input
                type="tel"
                mask="(99) 99999-9999"
                maskChar=" "
                tag={InputMask}
                id="order-contact-phone"
                name="contact_phone"
                value={this.state.order.contact_phone}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Order Description</Label>
              <Input
                type="text"
                id="order-description"
                name="description"
                value={this.state.order.description}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Real State Agency</Label>
              <Input
                type="text"
                id="order-agency"
                name="agency"
                value={this.state.order.agency}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Company</Label>
              <Input
                type="text"
                id="order-company"
                name="company"
                value={this.state.order.company}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Select the order category</Label>
              <Dropdown
                isOpen={this.state.categoryDropdownOpen}
                toggle={this.dropdownToggle}
                onChange={this.handleChange}
              >
                <DropdownToggle caret>
                  {this.state.dropDownValue}
                </DropdownToggle>
                <DropdownMenu>{this.renderCategories()}</DropdownMenu>
              </Dropdown>
            </FormGroup>
            <FormGroup>
              <Label>Deadline</Label>
              <Input
                type="date"
                id="order-deadline"
                name="deadline"
                value={this.state.order.deadline}
                onChange={this.handleChange}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => onSave(this.state.order)}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
