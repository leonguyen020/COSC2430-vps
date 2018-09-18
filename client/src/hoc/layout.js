import React, { Component } from "react";
import Header from "../components/HeaderFooter/Header/headerIndex";
import Footer from "./../components/HeaderFooter/Footer/footerIndex";

export default class Layout extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="page_container">{this.props.children}</div>
        <Footer />
      </div>
    );
  }
}
