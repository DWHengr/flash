import * as type from "./type";
export const initOptionData = (optionList) => {
  return {
    type: type.Init_Option,
    allDataList: optionList,
    content: "",
  };
};

export const getOptionbyContent = (content) => {
  return {
    type: type.Get_Option_by_Content,
    content: content,
  };
};

export const setCurrentOptionIndex = (index) => {
  return {
    type: type.Set_Current_Option_index,
    optionIndex: index,
  };
};

export const openAppByIndex = (index) => {
  return {
    type: type.Open_App_By_Index,
    index: index,
  };
};

export const addOption = (optionInfo) => {
  return {
    type: type.Add_Option,
    optionInfo: optionInfo,
  };
};

export const deleteOption = (optionIndex) => {
  return {
    type: type.Delete_Option,
    optionIndex: optionIndex,
  };
};

export const editOption = (optionIndex, optionInfo) => {
  return {
    type: type.Edit_Option,
    optionIndex: optionIndex,
    optionInfo: optionInfo,
  };
};
