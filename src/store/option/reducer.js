import * as type from "./type";
import Immutable from "immutable";
import { openApp } from "../../utils/command";
let defaultState = {
  allDataList: [], //全部option
};

export const optionData = (state = defaultState, action) => {
  switch (action.type) {
    case type.Init_Option:
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
      openApp(state.currentDataList[index]);
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
