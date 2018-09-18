import React, { Component } from "react";
import PageTop from "./../utils/pageTop";

import {
  // areas,
  directions,
  numberOfBedrooms,
  numberOfFloors,
  price,
} from "./../utils/Form/filterCriteria";

import { connect } from "react-redux";
import {
  getAdvertisementsToProperties,
  getAreas,
  getDirections,
} from "./../../actions/advertisementAction";

import CollapseCheckbox from "./../utils/collapseCheckbox";
import CollapseRadio from "./../utils/collapseRadio";
import LoadMoreCards from "./loadMoreCards";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faBars from "@fortawesome/fontawesome-free-solid/faBars";
import faTh from "@fortawesome/fontawesome-free-solid/faTh";

class PropertiesIndex extends Component {
  state = {
    grid: "",
    limit: 6,
    skip: 0,
    filters: {
      area: [],
      direction: [],
      numberOfBedrooms: [],
      numberOfFloors: [],
      price: [],
    },
  };

  componentDidMount() {
    // console.log(getAreas())
    this.props.dispatch(getAreas());
    this.props.dispatch(getDirections());

    this.props.dispatch(
      getAdvertisementsToProperties(
        this.state.skip,
        this.state.limit,
        this.state.filters,
      ),
    );
  }

  handlePrice = value => {
    const data = price;
    let array = [];
    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }
    return array;
  };
  handleDirection = value => {
    let array = [];
    const data = ["", "North", "East", "South", "West"];
    for (let item in value) {
      // console.log(item)
      array.push(data[value[item]]);
    }

    return array;
  };
  handleFilters = (filters, category) => {
    const newFilters = { ...this.state.filters };
    newFilters[category] = filters;

    if (category === "price") {
      let priceValues = this.handlePrice(filters);
      newFilters[category] = priceValues;
    }
    if (category === "direction") {
      let directionValues = this.handleDirection(filters);
      newFilters[category] = directionValues;
    }
    this.showFilteredResults(newFilters);

    this.setState({
      filters: newFilters,
    });
  };

  showFilteredResults = filters => {
    this.props
      .dispatch(getAdvertisementsToProperties(0, this.state.limit, filters))
      .then(() => {
        this.setState({
          skip: 0,
        });
      });
  };

  handleGrid = () => {
    this.setState({
      grid: !this.state.grid ? "grid_bars" : "",
    });
  };

  loadMoreCards = () => {
    let skip = this.state.skip + this.state.limit;
    this.props
      .dispatch(
        getAdvertisementsToProperties(
          skip,
          this.state.limit,
          this.state.filters,
          this.props.advertisements.toProperties,
        ),
      )
      .then(() => {
        this.setState({
          skip,
        });
      });
  };

  searchItems = e => {
    // let originData = this.props.advertisements.toProperties.filter(function(
    //   item,
    // ) {
    //   return (
    //     item.title.toLowerCase().search(e.target.value.toLowerCase()) !== -1
    //   );
    //   console.log(item.title.toLowerCase());
    //   console.log(e.target.value.toLowerCase());
    //   console.log(item.title.toLowerCase().search(e.target.value.toLowerCase()))
    // });
    // this.setState({ currentDisplay: originData, currentPageNum: 1, });
  };

  filterBySearch = array => {};

  render() {
    console.log(this.state.filters);
    const advertisements = this.props.advertisements;

    let searchSize = 0;

    return (
      <div>
        <PageTop title="Browse Advertisements" />
        <div className="container">
          <div className="shop_wrapper">
            <div className="left">
              <div className="quick-shop-wrapper">
                <button>
                  {searchSize} item(s) &nbsp;
                  <span className="input-group-addon">
                    <i className="fa fa-search" />
                  </span>
                </button>
                <div className="quick-shop-content">
                  <form>
                    <div className="from-group">
                      <div className="input-group">
                        <input
                          className="form-control"
                          placeholder="search"
                          name="quick-shop"
                          ref="search_str"
                          onChange={e =>
                            this.handleFilters(e.target.value, "title")
                          }
                          type="text"
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <CollapseCheckbox
                initState={true}
                title="Areas"
                list={advertisements.areas}
                handleFilters={filters => this.handleFilters(filters, "area")}
              />
              <CollapseCheckbox
                initState={false}
                title="Directions"
                list={directions}
                handleFilters={filters =>
                  this.handleFilters(filters, "direction")
                }
              />
              <CollapseCheckbox
                initState={false}
                title="Number Of Bedrooms"
                list={numberOfBedrooms}
                handleFilters={filters =>
                  this.handleFilters(filters, "numberOfBedrooms")
                }
              />
              <CollapseCheckbox
                initState={false}
                title="Number Of Floors"
                list={numberOfFloors}
                handleFilters={filters =>
                  this.handleFilters(filters, "numberOfFloors")
                }
              />
              <CollapseRadio
                initState={true}
                title="Price"
                list={price}
                handleFilters={filters => this.handleFilters(filters, "price")}
              />
            </div>
            <div className="right">
              <div className="shop_options">
                <div className="shop_grids clear">
                  <div
                    className={`grid_btn ${this.state.grid ? "" : "active"}`}
                    onClick={() => this.handleGrid()}
                  >
                    <FontAwesomeIcon icon={faTh} />
                  </div>
                  <div
                    className={`grid_btn ${!this.state.grid ? "" : "active"}`}
                    onClick={() => this.handleGrid()}
                  >
                    <FontAwesomeIcon icon={faBars} />
                  </div>
                </div>
              </div>
              <div>
                <LoadMoreCards
                  grid={this.state.grid}
                  limit={this.state.limit}
                  size={advertisements.toPropertiesSize}
                  advertisements={advertisements.toProperties}
                  loadMore={() => this.loadMoreCards()}
                />
              </div>
            </div>
          </div>
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

export default connect(mapStateToProps)(PropertiesIndex);
