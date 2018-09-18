import React, { Component } from "react";
import MyButton from "./button";

class Card extends Component {
  renderCardImage(images) {
    if (images.length > 0) {
      return images[0].url;
    } else {
      return "/images/image_not_available.png";
    }
  }

  render() {
    const props = this.props;
    return (
      <div className={`card_item_wrapper ${props.grid}`}>
        <div
          className="image"
          style={{
            background: `url(${this.renderCardImage(props.images)}) no-repeat`,
          }}
        />

        <div className="action_container">
          <div className="tags">
            <div className="brand">{props.project && props.project.name}</div>
            <div className="name">{props.title}</div>
            <div className="price">${props.price}</div>
          </div>

          {props.grid ? (
            <div className="description">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. In
                nesciunt aspernatur commodi inventore, cupiditate omnis minus
                consectetur architecto! Maxime, consequuntur?
              </p>
            </div>
          ) : null}

          <div className="actions">
            <div className="button_wrapp">
              <MyButton
                type="default"
                altClass="card_link"
                title="View"
                linkTo={`/advertisement-detail/${props._id}`}
                addStyle={{
                  margin: "10px 0 0 0",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
