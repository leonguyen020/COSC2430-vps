import React, { Component } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import request from "../utils/request";
// import axios from "axios";
import checkProperties from "../utils/checkProperties";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

class ProjectManagement extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      owner: "",
      name: "",
      category: "",
      totalArea: "0",
      startYear: "",
      endYear: "",
    };
  }
  componentDidMount() {
    request("http://http://localhost:5000/api/projects/get-projects", {
      method: "GET",
    }).then(response =>
      this.setState({
        data: response,
      }),
    );
  }
  renderData = () => {
    return this.state.data.map((item, index) => {
      return (
        <ProjectComponent
          item={item}
          index={index}
          onDelete={this.onDelete}
          onEdit={this.onEdit}
        />
      );
    });
  };
  onDelete = _id => {
    request("http://http://localhost:5000/api/projects/delete-project/" + _id, {
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
    request("http://http://localhost:5000/api/projects/edit-project/" + _id, {
      method: "PUT",
      body: data,
    }).then(response => {
      // console.log(response)
    });
  };
  onAdd = item => {
    // console.log(item)
    if (checkProperties(item)) {
      request("http://http://localhost:5000/api/projects/create-new-project", {
        method: "POST",
        body: item,
      }).then(response => {
        // console.log(response)
        request("http://http://localhost:5000/api/projects/get-projects", {
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
  onChangeOwner = evt => {
    this.setState({
      owner: evt.target.value,
    });
  };
  onChangeName = evt => {
    this.setState({
      name: evt.target.value,
    });
  };
  onChangeCategory = evt => {
    this.setState({
      category: evt.target.value,
    });
  };
  onChangeTotalArea = evt => {
    this.setState({
      totalArea: evt.target.value,
    });
  };
  onChangeStartYear = evt => {
    this.setState({
      category: evt.target.value,
    });
  };
  onChangeEndYear = evt => {
    this.setState({
      totalArea: evt.target.value,
    });
  };

  render() {
    return (
      <div className="row mt-15">
        <div className="col-sm-12">
          <div className="table table-responsive">
            <table className="table table-striped table-hover table-sm">
              <thead className="bg-success text-white">
                <tr>
                  <th>ID</th>
                  <th>Owner</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Total Area</th>
                  {/* <th>Start Year</th>
                  <th>End Year</th> */}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.renderData()}
                <tr>
                  <td>ID</td>
                  <td>
                    <input
                      value={this.state.owner}
                      onChange={this.onChangeOwner}
                    />
                  </td>
                  <td>
                    <input
                      value={this.state.name}
                      onChange={this.onChangeName}
                    />
                  </td>
                  <td>
                    <input
                      value={this.state.category}
                      onChange={this.onChangeCategory}
                    />
                  </td>
                  <td>
                    <input
                      value={this.state.totalArea}
                      onChange={this.onChangeTotalArea}
                    />
                  </td>
                  {/* <td><input value={this.state.startYear} onChange={this.onChangeStartYear}/></td>
                  <td><input value={this.state.endYear} onChange={this.onChangeEndYear}/></td>
                  <td />
                  <td /> */}
                  <td>
                    <button
                      onClick={() =>
                        this.onAdd({
                          owner: this.state.owner,
                          name: this.state.name,
                          category: this.state.category,
                          totalArea: this.state.totalArea,
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
    );
  }
}

class ProjectComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      owner: props.item.owner,
      name: props.item.name,
      category: props.item.category,
      totalArea: props.item.totalArea,
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
  onDelete = _id => {
    const { onDelete } = this.props;
    confirmAlert({
      title: "Warning",
      message: "Do You Really Want To Delete " + this.state.name + "?",
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
  onCancel = props => {
    this.setState({
      isEdit: false,
      owner: props.item.owner,
      name: props.item.name,
      category: props.item.category,
      totalArea: props.item.totalArea,
    });
  };
  onChangeOwner = evt => {
    this.setState({
      owner: evt.target.value,
    });
  };
  onChangeName = evt => {
    this.setState({
      name: evt.target.value,
    });
  };
  onChangeCategory = evt => {
    this.setState({
      category: evt.target.value,
    });
  };
  onChangeTotalArea = evt => {
    this.setState({
      totalArea: evt.target.value,
    });
  };
  render() {
    const { index, item } = this.props;
    return (
      <tr key={index}>
        <td>{item._id}</td>
        <td>
          {!this.state.isEdit ? (
            this.state.owner
          ) : (
            <input value={this.state.owner} onChange={this.onChangeOwner} />
          )}
        </td>
        <td>
          {!this.state.isEdit ? (
            this.state.name
          ) : (
            <input value={this.state.name} onChange={this.onChangeName} />
          )}
        </td>
        <td>
          {!this.state.isEdit ? (
            this.state.category
          ) : (
            <input
              value={this.state.category}
              onChange={this.onChangeCategory}
            />
          )}
        </td>
        <td>
          {!this.state.isEdit ? (
            this.state.totalArea
          ) : (
            <input
              value={this.state.totalArea}
              onChange={this.onChangeTotalArea}
            />
          )}
        </td>
        {/* <td>Start Year</td>
        <td>End Year</td> */}
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
export default ProjectManagement;
