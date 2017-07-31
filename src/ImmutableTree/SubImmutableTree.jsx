import React from "react";
import PropTypes from "prop-types";
import TreeContainer from "../baseComponents/TreeContainer";
import TreeNode from "../baseComponents/TreeNode";
import Immutable from "immutable";
import BaseImmutableTree from "./BaseImmutableTree";

export default class SubImmutableTree extends React.Component {
  eventFunctionFactory(onEventType) {
    return function(e, subNodePath, flag) {
      if (this.props[onEventType] == null) return;
      let nodePath = [this.props.location];
      if (subNodePath.length !== 0)
        nodePath = nodePath.concat("children").concat(subNodePath);
      this.props[onEventType](e, nodePath, flag);
    };
  }

  constructor(props) {
    super(props);
    this.onClick = this.eventFunctionFactory("onClick").bind(this);
    this.onExpand = this.eventFunctionFactory("onExpand").bind(this);
    this.onCheck = this.eventFunctionFactory("onCheck").bind(this);
  }

  render() {
    let { options, data, location, paddingLeft, expanded } = this.props;
    return (
      <BaseImmutableTree
        paddingLeft={paddingLeft}
        data={data}
        expanded={expanded}
        options={options}
        onClick={this.onClick}
        onExpand={this.onExpand}
        onCheck={this.onCheck}
      />
    );
  }
}

SubImmutableTree.propTypes = {
  options: PropTypes.any.isRequired,
  data: PropTypes.any.isRequired,
  location: PropTypes.number.isRequired,
  paddingLeft: PropTypes.string,
  expanded: PropTypes.bool
};

SubImmutableTree.defaultProps = {};