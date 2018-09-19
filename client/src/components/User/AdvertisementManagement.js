import React, { Component } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import request from "../utils/request";
import { Input } from "reactstrap";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import findObjectByKey from "../utils/findObjectByKey";
import checkProperties from "../utils/checkProperties";
import defaultImage from "./image/image_not_available.png";

class AdvertisementManagement extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      areas: [],
      projects: [],
      realEstates: [],
      user: "",
      project: "",
      realEstate: "",
      title: "",
      address: "",
      direction: "North",
      area: { name: "" },
      numberOfBedrooms: "",
      numberOfFloors: "",
      price: "",
      contactInfo: "",
      expiredDate: "",
    };
  }

  componentDidMount() {
    request("http://128.199.166.141:5000/api/advertisements/get-advertisements", {
      method: "GET",
    }).then(response =>
      this.setState({
        data: response,
      }),
    );
    request("http://128.199.166.141:5000/api/projects/get-projects", {
      method: "GET",
    }).then(response =>
      this.setState({
        projects: response,
        project: response[0]._id,
      }),
    );
    request("http://128.199.166.141:5000/api/realEstates/get-real-estates", {
      method: "GET",
    }).then(response =>
      this.setState({
        realEstates: response,
        realEstate: response[0]._id,
      }),
    );
    request("http://128.199.166.141:5000/api/advertisements/areas/get-areas", {
      method: "GET",
    }).then(response =>
      this.setState({
        areas: response,
        area: response[0]._id,
      }),
    );
  }
  renderData = () => {
    return this.state.data.map((item, index) => {
      return (
        <AdvertisementComponent
          item={item}
          index={index}
          onDelete={this.onDelete}
          onEdit={this.onEdit}
        />
      );
    });
  };
  renderSingleDropDown = (items, isWhat) => {
    return items.map((item, index) => {
      var value;
      if (isWhat === "project") {
        value = item.name;
      }
      if (isWhat === "realEstate") {
        value = item.title;
      }
      if (isWhat === "area") {
        value = item.name;
      }
      if (isWhat === "direction") {
        value = item;
      }
      return <option key={index}>{value}</option>;
    });
  };
  onDelete = _id => {
    request("http://128.199.166.141:5000/api/advertisements/delete-ad/" + _id, {
      method: "DELETE",
    }).then(response => {
      const data = this.state.data;
      data.splice(data.findIndex(v => v._id === _id), 1);
      this.setState({
        data: data,
      });
    });
  };
  onEdit = (_id, data) => {
    // console.log(data)
    request("http://128.199.166.141:5000/api/advertisements/edit-ad/" + _id, {
      method: "PUT",
      body: data,
    }).then(response => {
      // console.log(response)
    });
  };
  onAdd = item => {
    // console.log(item)
    if (checkProperties(item)) {
      request("http://128.199.166.141:5000/api/advertisements/create-new-ad", {
        method: "POST",
        body: item,
      }).then(response => {
        // console.log(response)
        request("http://128.199.166.141:5000/api/advertisements/get-advertisements", {
          method: "GET",
        }).then(response =>
          this.setState({
            data: response,
          }),
        );
      });
    } else {
      alert("Please fill out all fields");
    }
  };
  // Change Moduel
  onChangeUser = evt => {
    this.setState({
      user: evt.target.value,
    });
  };
  onChangeProject = evt => {
    this.setState({
      project: findObjectByKey(this.state.projects, "name", evt.target.value)
        ._id,
    });
  };
  onChangeRealEstate = evt => {
    this.setState({
      realEstate: findObjectByKey(
        this.state.realEstates,
        "title",
        evt.target.value,
      )._id,
    });
  };
  onChangeTitle = evt => {
    this.setState({
      title: evt.target.value,
    });
  };
  onChangeArea = evt => {
    this.setState({
      area: findObjectByKey(this.state.areas, "name", evt.target.value)._id,
    });
  };
  onChangeAddress = evt => {
    this.setState({
      address: evt.target.value,
    });
  };
  onChangeDirection = evt => {
    this.setState({
      direction: evt.target.value,
    });
  };
  onChangeNumberOfBedrooms = evt => {
    this.setState({
      numberOfBedrooms: evt.target.value,
    });
  };
  onChangeNumberOfFloors = evt => {
    this.setState({
      numberOfFloors: evt.target.value,
    });
  };
  onChangePrice = evt => {
    this.setState({
      price: evt.target.value,
    });
  };
  onChangeContactInfo = evt => {
    this.setState({
      contactInfo: evt.target.value,
    });
  };
  onChangeExpiredDate = evt => {
    this.setState({
      expiredDate: evt.target.value,
    });
  };
  render() {
    return (
      <div>
        <div className="row mt-15">
          <div className="col-sm-12">
            <div className="table table-responsive">
              <table className="table table-striped table-hover table-sm">
                <thead className="bg-success text-white">
                  <tr>
                    <th>ID</th>
                    <th>User</th>
                    <th>Project</th>
                    <th>Real Estate</th>
                    <th>Title</th>
                    <th>Area</th>
                    <th>Address</th>
                    <th>Direction</th>
                    <th>Number Of Bedrooms</th>
                    <th>Number Of Floors</th>
                    <th>Price</th>
                    <th>Contact Info</th>
                    <th>Images</th>
                    {/* <th>Post Date</th>
                    <th>Expired Date</th> */}
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {this.renderData()}
                  <tr>
                    <td>ID</td>
                    <td>
                      <input
                        value={this.state.user}
                        onChange={this.onChangeUser}
                      />
                    </td>
                    {/* <td><input value={this.state.project} onChange={this.onChangeProject}/></td>
                    <td><input value={this.state.realEstate} onChange={this.onChangeRealEstate}/></td> */}
                    <td>
                      <Input
                        type="select"
                        name="select"
                        id="singleSelect"
                        onChange={this.onChangeProject}
                      >
                        {this.renderSingleDropDown(
                          this.state.projects,
                          "project",
                        )}
                      </Input>
                    </td>
                    <td>
                      <Input
                        type="select"
                        name="select"
                        id="singleSelect"
                        onChange={this.onChangeRealEstate}
                      >
                        {this.renderSingleDropDown(
                          this.state.realEstates,
                          "realEstate",
                        )}
                      </Input>
                    </td>
                    <td>
                      <input
                        value={this.state.title}
                        onChange={this.onChangeTitle}
                      />
                    </td>
                    {/* <td><input value={this.state.area.name} onChange={this.onChangeArea}/></td> */}
                    <td>
                      <Input
                        type="select"
                        name="select"
                        id="singleSelect"
                        onChange={this.onChangeArea}
                      >
                        {this.renderSingleDropDown(this.state.areas, "area")}
                      </Input>
                    </td>
                    <td>
                      <input
                        value={this.state.address}
                        onChange={this.onChangeAddress}
                      />
                    </td>
                    {/* <td><input value={this.state.direction} onChange={this.onChangeDirection}/></td> */}
                    <td>
                      <Input
                        type="select"
                        name="select"
                        id="singleSelect"
                        onChange={this.onChangeDirection}
                      >
                        {this.renderSingleDropDown(
                          ["North", "Western", "East", "South"],
                          "direction",
                        )}
                      </Input>
                    </td>
                    <td>
                      <input
                        value={this.state.numberOfBedrooms}
                        onChange={this.onChangeNumberOfBedrooms}
                      />
                    </td>
                    <td>
                      <input
                        value={this.state.numberOfFloors}
                        onChange={this.onChangeNumberOfFloors}
                      />
                    </td>
                    <td>
                      <input
                        value={this.state.price}
                        onChange={this.onChangePrice}
                      />
                    </td>
                    <td>
                      <input
                        value={this.state.contactInfo}
                        onChange={this.onChangeContactInfo}
                      />
                    </td>
                    <td>
                      <img alt="default" style={{ width: "100px", height: "100px" }} src={defaultImage} />
                    </td>
                    {/* <td>Start Year</td>
                    <td>
                      <input
                        value={this.state.expiredDate}
                        onChange={this.onChangeExpiredDate}
                      />
                    </td> */}
                    <td>
                      <button
                        onClick={() =>
                          this.onAdd({
                            user: this.state.user,
                            project: this.state.project,
                            realEstate: this.state.realEstate,
                            title: this.state.title,
                            area: this.state.area,
                            address: this.state.address,
                            direction: this.state.direction,
                            numberOfBedrooms: this.state.numberOfBedrooms,
                            numberOfFloors: this.state.numberOfFloors,
                            price: this.state.price,
                            contactInfo: this.state.contactInfo,
                          })
                        }
                      >
                        <span className="fa fa-pencil-square-o" /> Add
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class AdvertisementComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      title: props.item.title,
      address: props.item.address,
      direction: props.item.direction,
      area: props.item.area,
      numberOfBedrooms: props.item.numberOfBedrooms,
      numberOfFloors: props.item.numberOfFloors,
      price: props.item.price,
      contactInfo: props.item.contactInfo,
      expiredDate: props.item.expiredDate,
    };
  }
  onEdit = () => {
    this.setState({
      isEdit: true,
    });
  };
  onDone = _id => {
    this.setState({
      isEdit: false,
    });
    const { onEdit } = this.props;
    onEdit(_id, this.state);
  };
  onCancel = props => {
    this.setState({
      isEdit: false,
      title: props.item.title,
      address: props.item.address,
      direction: props.item.direction,
      area: props.item.area,
      numberOfBedrooms: props.item.numberOfBedrooms,
      numberOfFloors: props.item.numberOfFloors,
      price: props.item.price,
      contactInfo: props.item.contactInfo,
      expiredDate: props.item.expiredDate,
    });
  };
  onChangeTitle = evt => {
    this.setState({
      title: evt.target.value,
    });
  };
  onChangeArea = evt => {
    this.setState({
      area: evt.target.value,
    });
  };
  onChangeAddress = evt => {
    this.setState({
      address: evt.target.value,
    });
  };
  onChangeDirection = evt => {
    this.setState({
      direction: evt.target.value,
    });
  };
  onChangeNumberOfBedrooms = evt => {
    this.setState({
      numberOfBedrooms: evt.target.value,
    });
  };
  onChangeNumberOfFloors = evt => {
    this.setState({
      numberOfFloors: evt.target.value,
    });
  };
  onChangePrice = evt => {
    this.setState({
      price: evt.target.value,
    });
  };
  onChangeContactInfo = evt => {
    this.setState({
      contactInfo: evt.target.value,
    });
  };
  onChangeExpiredDate = evt => {
    this.setState({
      expiredDate: evt.target.value,
    });
  };
  onChangeImageUrl = evt => {
    this.setState({
      image: evt.target.value,
    });
  };
  onDelete = _id => {
    const { onDelete } = this.props;
    confirmAlert({
      title: "Warning",
      message: "Do You Really Want To Delete " + this.state.title + "?",
      buttons: [
        {
          label: "Yes",
          onClick: () => onDelete(_id),
        },
        {
          label: "No",
        },
      ],
    });
  };
  render() {
    const { index, item } = this.props;
    return (
      <tr key={index}>
        <td>{item._id}</td>
        <td>{item.user && item.user.email}</td>
        <td>{item.project && item.project.name}</td>
        <td>{item.realEstate && item.realEstate.title}</td>
        <td>
          {!this.state.isEdit ? (
            this.state.title
          ) : (
            <input value={this.state.title} onChange={this.onChangeTitle} />
          )}
        </td>
        <td>
          {!this.state.isEdit ? (
            this.state.area.name
          ) : (
            <input value={this.state.area.name} onChange={this.onChangeArea} />
          )}
        </td>
        <td>
          {!this.state.isEdit ? (
            this.state.address
          ) : (
            <input value={this.state.address} onChange={this.onChangeAddress} />
          )}
        </td>
        <td>
          {!this.state.isEdit ? (
            this.state.direction
          ) : (
            <input
              value={this.state.direction}
              onChange={this.onChangeDirection}
            />
          )}
        </td>
        <td>
          {!this.state.isEdit ? (
            this.state.numberOfBedrooms
          ) : (
            <input
              value={this.state.numberOfBedrooms}
              onChange={this.onChangeNumberOfBedrooms}
            />
          )}
        </td>
        <td>
          {!this.state.isEdit ? (
            this.state.numberOfFloors
          ) : (
            <input
              value={this.state.numberOfFloors}
              onChange={this.onChangeNumberOfFloors}
            />
          )}
        </td>
        <td>
          {!this.state.isEdit ? (
            this.state.price
          ) : (
            <input value={this.state.price} onChange={this.onChangePrice} />
          )}
        </td>
        <td>
          {!this.state.isEdit ? (
            this.state.contactInfo
          ) : (
            <input
              value={this.state.contactInfo}
              onChange={this.onChangeContactInfo}
            />
          )}
        </td>
        <td>
          {
            <img
              style={{ width: "100px", height: "100px" }}
              src={item.image ? item.image : defaultImage}
              alt="default"
            />
          }
        </td>
        {/* <td>Start Year</td>
        <td>
          {!this.state.isEdit ? (
            this.state.expiredDate
          ) : (
            <input
              value={this.state.expiredDate}
              onChange={this.onChangeExpiredDate}
            />
          )}
        </td> */}

        <td>
          {!this.state.isEdit ? (
            <button onClick={() => this.onDelete(item._id)}>
              <span className="fa fa-trash-o" /> Delete
            </button>
          ) : (
            <button onClick={() => this.onCancel(this.props)}>
              <span className="fa fa-trash-o" /> Cancel
            </button>
          )}
          &nbsp;
          {!this.state.isEdit ? (
            <button onClick={this.onEdit}>
              <span className="fa fa-pencil-square-o" /> Edit
            </button>
          ) : (
            <button onClick={() => this.onDone(item._id)}>
              <span className="fa fa-pencil-square-o" /> Done
            </button>
          )}
        </td>
      </tr>
    );
  }
}
export default AdvertisementManagement;
