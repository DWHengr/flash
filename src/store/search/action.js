import * as type from "./type";
export const setContentStore = (content) => {
  return {
    type: type.Set_Content,
    content: content,
  };
};
export const setCurrentIndexStore = (index) => {
  return {
    type: type.Set_Current_Index,
    index: index,
  };
};
export const setCurrentListLenghtStore = (length) => {
  return {
    type: type.Set_Current_List_Lenght,
    length: length,
  };
};

export const SetTrigger = (trigger) => {
  return {
    type: type.Set_Trigger,
    trigger: trigger,
  };
};
