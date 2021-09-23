import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';


const Content = () => {

    useEffect(() => {
        fetch(
          "https://app.highattendance.com/app-contents/jVV3Q?appId=2731&eventId=2570"
        )
          .then((results) => results.json())
          .then((data) => {
          console.log(data.contents)
          })
          .catch((error) => console.log(error.message));
      }, []);
      
    return (
        <div>
            <h1>Content</h1>
        </div>
    );
};


Content.propTypes = {

};


export default Content;
