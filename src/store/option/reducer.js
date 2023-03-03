import * as type from "./type";
import Immutable from "immutable";
import { openApp } from "../../utils/command";
let defaultState = {
  optionIndex: 0, //当前选中的index
  content: "", //input内容
  currentDataList: [], //当前根据content筛选出的option
  allDataList: [], //全部option
  searchKey: "",
  searchValue: "",
};

export const optionData = (state = defaultState, action) => {
  switch (action.type) {
    case type.Init_Option:
      return { ...state, ...action };
    case type.Get_Option_by_Content:
      let content = action.content;
      const kv = content?.split(":");
      let searchKeyData = kv[0] ? kv[0] : "";
      let searchValueDate = kv[1] ? kv.slice(1, kv.length).join(":") : "";
      let currentOption = state.allDataList.filter(
        (item) => kv?.length == 1 || item.option_type?.indexOf(kv[0]) != -1
      );
      currentOption = currentOption.filter(
        (item) =>
          (kv?.length == 2 && !kv[1]) ||
          item.name?.indexOf(kv[1] ? kv[1] : kv[0]) != -1
      );
      return {
        ...state,
        ...action,
        ...{
          allDataList: state.allDataList,
          currentDataList: currentOption,
          searchKey: searchKeyData,
          searchValue: searchValueDate,
        },
      };
    case type.Set_Current_Option_index:
      return { ...state, ...action };
    case type.Add_Option:
      let imuDataList = Immutable.List(state.allDataList);
      imuDataList = imuDataList.unshift(action.optionInfo);
      return {
        ...state,
        ...{ allDataList: imuDataList.toJS() },
      };
    case type.Open_App_By_Index:
      const index = action.index;
      if (state.currentDataList?.length > 0) {
        openApp(state.currentDataList[index]);
      }
    case type.Delete_Option:
      let DeleteDataList = Immutable.List(state.allDataList);
      DeleteDataList = DeleteDataList.delete(action.optionIndex);
      return {
        ...state,
        ...{ allDataList: DeleteDataList.toJS() },
      };
    case type.Edit_Option:
      let EditDataList = Immutable.List(state.allDataList);
      EditDataList = EditDataList.set(action.optionIndex, action.optionInfo);
      return {
        ...state,
        ...{ allDataList: EditDataList.toJS() },
      };
    default:
      return state;
  }
};
