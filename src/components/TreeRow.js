/*
* React component that recursively renders folder/file rows
*/

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Icon from './Icon';

const TreeRow = props => {
  const {
    name,
    type,
    isExpanded,
    children,
    isSelected,
    onRowClick,
    private: isPrivate,
    index,
    isOpen,
    keyPath = [],
    renderTreeRow,
  } = props;

  const renderSubTreeRow = (rowData, j) => renderTreeRow({ ...rowData, keyPath }, j);

  const renderChildren = children && children.length ? (
    <div className={classnames('subTree', { isExpanded: isExpanded || isOpen })}>
      {children.map(renderSubTreeRow)}
    </div>
  ) : null;

  const expandedIcon = type === 'folder' ? (isExpanded ? 'expanded' : 'minimized') : null;

  const fileIcon = type === 'folder' ? (isPrivate ? 'privateFolder' : 'folder') : 'file';

  const renderEntity = type && name ? (
    <div
      className={classnames('treeRow', { isSelected })}
      style={{ paddingLeft: `${(keyPath.length - 1) * 2}em`}}
      onClick={() => onRowClick(keyPath, props)}
    >
      <div className="iconCol">
        <Icon iconName={expandedIcon}/>
      </div>
      <div className="iconCol">
        <Icon iconName={fileIcon}/>
      </div>
      <div className="nameCol">
        {name}
      </div>
    </div>
  ) : null;

  return (
    <div>
      {renderEntity}
      {renderChildren}
    </div>
  )
};

TreeRow.propTypes = {
  onRowClick: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  name: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.array,
  isExpanded: PropTypes.bool,
  isSelected: PropTypes.bool,
  private: PropTypes.bool,
  index: PropTypes.number,
  keyPath: PropTypes.array,
  renderTreeRow: PropTypes.func.isRequired
};

module.exports = TreeRow;
