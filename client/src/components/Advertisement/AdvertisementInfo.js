import React from "react";
import MyButton from "./../utils/button";
import moment from "moment";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faTruck from "@fortawesome/fontawesome-free-solid/faTruck";
import faCheck from "@fortawesome/fontawesome-free-solid/faCheck";
import faTimes from "@fortawesome/fontawesome-free-solid/faTimes";

const AdvertisementInfo = props => {
  // const showAdvertisementTags = detail => (
  //   <div className="product_tags">
  //     <div className="tag">
  //       <div className="tag_text">Test</div>
  //     </div>
  //   </div>
  // );
  const showAdvertisementActions = detail => (
    <div className="product_actions">
      <div className="price">$ {detail.price}</div>
    </div>
  );
  const showAdvertisementSpecifications = detail => (
    <div className="product_specifications">
      <h2>Specifications: </h2>
      <div>
        <div className="item">
          <strong>Real Estate: </strong> {detail.realEstate.title}
        </div>
        <div className="item">
          <strong>Area: </strong> {detail.area.name}
        </div>
        <div className="item">
          <strong>Address: </strong> {detail.address}
        </div>
        <div className="item">
          <strong>Direction: </strong> {detail.direction}
        </div>
        <div className="item">
          <strong>Number Of Bedrooms: </strong> {detail.numberOfBedrooms}
        </div>
        <div className="item">
          <strong>Number Of Floors: </strong> {detail.numberOfFloors}
        </div>
        <div className="item">
          <strong>Contact Info: </strong> {detail.contactInfo}
        </div>
        <div className="item">
          <strong>Post Date: </strong>
          {moment(detail.postDate).format("MM-DD-YYYY")}
        </div>
        {detail.expiredDate ? (
          <div className="item">
            <strong>Post Date: </strong>
            {moment(detail.expiredDate).format("MM-DD-YYYY")}
          </div>
        ) : null}
      </div>
    </div>
  );
  const detail = props.detail;
  return (
    <div>
      <h1>
        {detail.project && detail.project.name} {detail.title}
      </h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum eaque
        voluptatem ipsum molestiae repudiandae dignissimos alias, quos at unde
        minima.
      </p>
      {/* {showAdvertisementTags(detail)} */}
      {showAdvertisementActions(detail)}
      {showAdvertisementSpecifications(detail)}
    </div>
  );
};

export default AdvertisementInfo;
