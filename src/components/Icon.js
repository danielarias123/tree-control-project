/*
* React component that renders icons
*/

import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ iconName }) => iconName ?
  <div className={`icon ${iconName}`} style={{ backgroundImage: "url('./icon-sprite.png')" }} /> : null;

Icon.propTypes = {
  iconName: PropTypes.string
};

module.exports = Icon;
