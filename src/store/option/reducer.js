import * as type from "./type";
import { invoke } from "@tauri-apps/api/tauri";
import Immutable from "immutable";
let defaultState = {
  optionIndex: 0, //当前选中的index
  content: "", //input内容
  currentDataList: [], //当前根据content筛选出的option
  allDataList: [], //全部option
};

export const optionData = (state = defaultState, action) => {
  switch (action.type) {
    case type.Init_Option:
      return { ...state, ...action };
    case type.Get_Option_by_Content:
      let content = action.content;
      const kv = content?.split(/:|：/);
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
        ...{ allDataList: state.allDataList, currentDataList: currentOption },
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
      invoke("open_app", {
        optionType: state.currentDataList[index].option_type,
        openIn: state.currentDataList[index].open_in,
        path: state.currentDataList[index].path,
      }).then((res) => {});
    case type.Delete_Option:
      let DeleteDataList = Immutable.List(state.allDataList);
      DeleteDataList = DeleteDataList.delete(action.optionIndex);
      return {
        ...state,
        ...{ allDataList: DeleteDataList.toJS() },
      };
    case type.Edit_Option:
      console.log(action.optionIndex, action.optionInfo)
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
