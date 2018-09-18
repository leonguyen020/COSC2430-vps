import React, { Component } from "react";
import HomeSlider from "./HomeSlider";
import CardBlock from "./../../components/utils/cardBlock";
import HomePromotion from "./HomePromotion";
import { connect } from "react-redux";
import { getAdvertisementsByPostDate } from "./../../actions/advertisementAction";

class Home extends Component {
  componentDidMount() {
    this.props.dispatch(getAdvertisementsByPostDate());
  }

  render() {
    return (
      <div>
        <HomeSlider />
        <CardBlock
          list={this.props.advertisements.byPostDate}
          title="Latest Additions"
        />
        <HomePromotion />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    advertisements: state.advertisements,
  };
};

export default connect(mapStateToProps)(Home);
