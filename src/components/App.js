import React, { Component } from 'react';

// Import the static 'data.json' data
import treeData from '../data/treeData';

// Import the app styles
import '../app.scss';

// Import the app components
import TreeRow from './TreeRow';
import Icon from './Icon';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      treeData: treeData,
      selectedEntity: null
    };
  }

  onRowClick = (keyPath, payload) => {
    // Helper function that recursively clears any selected nodes
    const clearSelected = treeData => {
      const clearedTreeData = Object.assign({}, treeData);
      const clearChildren = entity => {
        if (entity.children && entity.children.length) {
          entity.children.forEach((child, index) => {
            entity.children[index] = clearChildren(entity.children[index]);
          });
        }

        return Object.assign(entity, { isSelected: false });
      }
      return clearChildren(clearedTreeData);
    }

    // Helper function that recursively updates a node's child at an index
    const updateChildren = (entity, index = 0) => {
      if (entity.children && entity.children[keyPath[index]]) {
        entity.children[keyPath[index]] = updateChildren(entity.children[keyPath[index]], index + 1);
      }

      const updatedPayload = index + 1 > keyPath.length ?
        { isSelected: !entity.isSelected, ...(payload.type === 'folder' ? { isExpanded: !entity.isExpanded } : {})} : {};

      return Object.assign(entity, updatedPayload);
    }

    // Clear any selected values
    let updatedTreeData = clearSelected(this.state.treeData);

    updatedTreeData = updateChildren(updatedTreeData);

    // Log selected entity
    console.log(`Selected ${payload.type}:`, payload.name);

    this.setState({ treeData: updatedTreeData, selectedEntity: payload });
  }

  render = () => {
    const { treeData } = this.state;

    const renderTreeRow = (rowData, i) => {
      const updatedKeyPath = rowData.keyPath.slice(0);
      updatedKeyPath.push(i);

      return (
        <TreeRow
        {...rowData}
        index={i}
        key={i}
        onRowClick={this.onRowClick}
        keyPath={updatedKeyPath}
        renderTreeRow={renderTreeRow}
        />
      );
    };

    return (
      <div className="modalContainer">
        <div className="modalHeader">
          <div className="nameCol">
            Tree Control
          </div>
          <div className="iconCol">
            <Icon iconName="close"/>
          </div>
        </div>
        <div className="modalSubheader">
          Label
        </div>
        <div className="treeList">
          <TreeRow
          {...treeData}
          onRowClick={this.onRowClick}
          isOpen
          renderTreeRow={renderTreeRow}
          keyPath={[]}
          />
        </div>
        <div className="modalFooter">
          <div className="linkCol">
            Link
          </div>
          <div className="buttonCol">
            <button>Done</button>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = App;
