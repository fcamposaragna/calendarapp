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

    const toggleDateModal = ()=>{
        (isDateModalOpen)
            ? closeDateModal()
            : openDateModal()
    }

    return {
        //Props
        isDateModalOpen,
        //Métodos
        openDateModal,
        closeDateModal,
        toggleDateModal
    }

}