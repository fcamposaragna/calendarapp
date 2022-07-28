import { useSelector, useDispatch } from "react-redux"
import { onOpenDateModal, onCloseModal } from "../store";

export const useUiStore = ()=>{

    const dispatch = useDispatch();
    const { isDateModalOpen} = useSelector(state=>state.ui);

    const openDateModal = ()=>{
        dispatch( onOpenDateModal() );
    };

    const closeDateModal = ()=>{
        dispatch(onCloseModal())
    }

    return {
        //Props
        isDateModalOpen,
        //Métodos
        openDateModal,
        closeDateModal
    }

}