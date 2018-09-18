import React, { Component } from "react";
import PageTop from "./../utils/pageTop";

import AdvertisementInfo from "./AdvertisementInfo";
import AdvertisementImage from "./AdvertisementImage";

import { connect } from "react-redux";
import {
  getAdvertisementById,
  clearGetAdvertisementById,
} from "./../../actions/advertisementAction";

class AdvertisementIndex extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.dispatch(getAdvertisementById(id)).then(response => {
      if (!this.props.advertisements.advertisementDetail) {
        this.props.history.push("/");
      }
    });
  }

  componentWillUnmount() {
    this.props.dispatch(clearGetAdvertisementById());
  }

  render() {
    return (
      <div>
        <PageTop title="Advertisement Detail" />
        <div className="container">
          {this.props.advertisements.advertisementDetail ? (
            <div className="product_detail_wrapper">
              <div className="left">
                <div style={{ width: "500px" }}>
                  <AdvertisementImage
                    detail={this.props.advertisements.advertisementDetail}
                  />
                </div>
              </div>
              <div className="right">
                <AdvertisementInfo
                  detail={this.props.advertisements.advertisementDetail}
                />
              </div>
            </div>
          ) : (
            "Loading"
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    advertisements: state.advertisements,
  };
};

export default connect(mapStateToProps)(AdvertisementIndex);
