import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/fontawesome-free-solid";

export default class Footer extends Component {
  render() {
    return (
      <div>
        <footer className="bck_b_dark">
          <div className="container">
            <div className="logo">Real Estate</div>
            <div className="wrapper">
              <div className="left">
                <h2>Contact Information</h2>
                <div className="business_nfo">
                  <div className="tag">
                    <FontAwesomeIcon icon={Icons.faCompass} className="icon" />
                    <div className="nfo">
                      <div>Address</div>
                      <div>Earth</div>
                    </div>
                  </div>
                  <div className="tag">
                    <FontAwesomeIcon icon={Icons.faPhone} className="icon" />
                    <div className="nfo">
                      <div>Phone</div>
                      <div>0123456789</div>
                    </div>
                  </div>
                  <div className="tag">
                    <FontAwesomeIcon icon={Icons.faClock} className="icon" />
                    <div className="nfo">
                      <div>Working Hours</div>
                      <div>Mon - Fri / 8:00 - 17:00</div>
                    </div>
                  </div>
                  <div className="tag">
                    <FontAwesomeIcon icon={Icons.faEnvelope} className="icon" />
                    <div className="nfo">
                      <div>Email</div>
                      <div>example@example.com</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="right">
                <h2>Be the first to know</h2>
                <p>Lorem ipsum dolor sit amet.</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
