import React from "react";
import CardBlockProperties from "./../utils/cardBlockProperties";

const LoadMoreCards = props => {
  return (
    <div>
      <div>
        <CardBlockProperties grid={props.grid} list={props.advertisements} />
      </div>

      {/* {props.size > 0 && props.size >= props.limit ? (
        <div className="load_more_container">
          <span onClick={() => props.loadMore()}>Load More</span>
        </div>
      ) : null} */}

      <div className="load_more_container">
        <span onClick={() => props.loadMore()}>Load More</span>
      </div>
    </div>
  );
};

export default LoadMoreCards;
