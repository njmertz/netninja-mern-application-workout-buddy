import { createContext, useReducer } from "react";

export const ModalContext = createContext();

export const modalReducer = (state, action) => {
  switch(action.type){
    case 'OPEN_MODAL':
      return {
        openModal: true,
        modalContent: action.payload.modalContent
      }
    case 'CLOSE_MODAL':
      return {
        openModal: false,
        modalContent: null
      }
    default:
      return state
  }
};

export const ModalContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(modalReducer, {
    openModal: false,
    modalContent: null
  });

  return (
    <ModalContext.Provider value={{...state, dispatch}}>
      { children }
    </ModalContext.Provider>
  );
};