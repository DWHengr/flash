import * as type from "./type";
let defaultState = {
  currentIndex: 0,
  content: "",
  currentListLenght: 0,
  searchKey: "",
  searchValue: "",
  trigger: false,
  kv: "",
};

export const searchData = (state = defaultState, action) => {
  switch (action.type) {
    case type.Set_Content:
      let content = action.content;
      const kv = content?.split(":");
      let searchKeyData = kv[0] ? kv[0] : "";
      let searchValueDate = kv[1] ? kv.slice(1, kv.length).join(":") : "";
      return {
        ...state,
        ...action,
        ...{
          kv: kv,
          content: content,
          searchKey: searchKeyData,
          searchValue: searchValueDate,
        },
      };
    case type.Set_Current_Index:
      return { ...state, ...action, currentIndex: action.index };
    case type.Set_Current_List_Lenght:
      return { ...state, ...action, currentListLenght: action.length };
    case type.Set_Trigger:
      return { ...state, ...action, trigger: action.trigger };
    default:
      return state;
  }
};
