import React, { Component } from "react";
import ImageLightbox from "./../utils/imageLightbox";

class AdvertisementImage extends Component {
  state = {
    lightbox: false,
    imagePosition: 0,
    lightboxImages: [],
  };

  componentDidMount() {
    if (this.props.detail.images.length > 0) {
      let lightboxImages = [];

      this.props.detail.images.forEach(item => {
        lightboxImages.push(item.url);
      });

      this.setState({
        lightboxImages,
      });
    }
  }

  handleLightbox = position => {
    if (this.state.lightboxImages.length > 0) {
      this.setState({
        lightbox: true,
        imagePosition: position,
      });
    }
  };

  handleLightboxClose = () => {
    this.setState({
      lightbox: false,
    });
  };

  showThumbs = () =>
    this.state.lightboxImages.map(
      (item, i) =>
        i > 0 ? (
          <div
            key={i}
            onClick={() => this.handleLightbox(i)}
            className="thumb"
            style={{ background: `url(${item}) no-repeat` }}
          />
        ) : null,
    );

  renderCardImage = images => {
    if (images.length > 0) {
      return images[0].url;
    } else {
      return "/images/image_not_available.png";
    }
  };

  render() {
    const detail = this.props.detail;
    return (
      <div className="product_image_container">
        <div className="main_pic">
          <div
            style={{
              background: `url(${this.renderCardImage(
                detail.images,
              )}) no-repeat`,
            }}
            onClick={() => this.handleLightbox(0)}
          />
        </div>
        <div className="main_thumbs">{this.showThumbs(detail)}</div>
        {this.state.lightbox ? (
          <ImageLightbox
            id={detail.id}
            images={this.state.lightboxImages}
            open={this.state.open}
            pos={this.state.imagePosition}
            onclose={() => this.handleLightboxClose()}
          />
        ) : null}
      </div>
    );
  }
}

export default AdvertisementImage;
