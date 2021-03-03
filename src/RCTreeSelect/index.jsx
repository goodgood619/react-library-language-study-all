import TreeSelect from "rc-tree-select";
import React, { useState } from "react";
import "rc-tree-select/assets/index.css";
import "./style.css";

const treeData = [
    // value를 반드시 함께사용해야 event에서 변화값을 정확하게 감지함
    {key : "0",title : "전체",value:"0", children : [
        {key : "12",title : 'children1',value : "12"},
        {key : "24",title : 'children2',value : "24"},
        {key : "13",title : 'children3',value : "13"},
    ]},
];

const RCTreeSelect = () => {
  const [value, setValue] = useState("");

  const onChange = (value,title) => {
    setValue(value);
  };
  return (
    <TreeSelect
      style={{ width: "50%" }}
      transitionName="rc-tree-select-dropdown-slide-up"
      choiceTransitionName="rc-tree-select-selection__choice-zoom"
      dropdownStyle={{
        maxHeight: 400,
        width: "auto",
        overflow: "auto",
        fontSize: "14px",
      }}
      treeData={treeData}
      treeLine={true}
      treeIcon={false}
      placeholder={<i />}
      searchPlaceholder=" 검색..."
      showSearch={true}
      // Search를 보여주는기능
      treeDefaultExpandAll={true}
      treeNodeFilterProp="title"
      filterTreeNode={(input, child) =>
        String(child.props.title).includes(input)
      }
      value={value}
    // 현재 value값
      onChange={onChange}
      // change Event
    ></TreeSelect>
  );
};

RCTreeSelect.defaultProps = {
  treeData: [],
};
export default RCTreeSelect;
