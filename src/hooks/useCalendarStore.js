import { useSelector, useDispatch } from "react-redux"
import { ondAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store"

export const useCalendarStore = ()=>{

    const dispatch= useDispatch()
    const { events, activeEvent } = useSelector(state=>state.calendar)

    const setActiveEvent = (calendarEvent)=>{
        dispatch(onSetActiveEvent(calendarEvent));
    };

    const startSavingEvent = async (calendarEvent)=>{
        //LLEGAR AL BACKEND
        if(calendarEvent._id){
            //update
            dispatch(onUpdateEvent({...calendarEvent}))
        }else{
            //create
            dispatch(ondAddNewEvent({...calendarEvent, _id: new Date().getTime()}))
        }
    };

    const startDeletingEvent = ()=>{
        dispatch(onDeleteEvent())
    }
    return {
        //Props
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        //Métodos
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent
    }
}