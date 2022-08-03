import { useSelector, useDispatch } from "react-redux"
import Swal from "sweetalert2"
import { calendarApi } from "../apis"
import { convertEventsToDate } from "../helpers"
import { ondAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store"

export const useCalendarStore = ()=>{

    const dispatch= useDispatch()
    const { events, activeEvent } = useSelector(state=>state.calendar)
    const { user } = useSelector(state=>state.auth);

    const setActiveEvent = (calendarEvent)=>{
        dispatch(onSetActiveEvent(calendarEvent));
    };

    const startSavingEvent = async (calendarEvent)=>{
        
        try {
            if(calendarEvent.id){
    
                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent)
                dispatch(onUpdateEvent({...calendarEvent, user}));
                return;
    
            }
            //create
            const { data } = await calendarApi.post('/events', calendarEvent);
    
    
            dispatch(ondAddNewEvent({...calendarEvent, id: data.evento.id, user }));           
        }catch(error){
            console.log(error);
            Swal.fire('Error al guardar', error.response.data?.msg, 'error')
        }
    };

    const startLoadingEvents = async ()=>{

        try{
            const { data } = await calendarApi.get('/events');
            const events = convertEventsToDate(data.events);
            dispatch(onLoadEvents( events ));

        }catch(error){
            console.log('Error cargando eventos');
            console.log(error)
        }
    }

    const startDeletingEvent = async()=>{

        try{
            await calendarApi.delete(`/events/${activeEvent.id}`)
            dispatch(onDeleteEvent())
        }catch(error){
            console.log(error);
            Swal.fire('Error al eliminar el evento', error.response.data.msg, 'error')
        }
    }
    return {
        //Props
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        //Métodos
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        startLoadingEvents,
    }
}