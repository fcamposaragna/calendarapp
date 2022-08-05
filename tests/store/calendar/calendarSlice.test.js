import { calendarSlice, ondAddNewEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar, onSetActiveEvent, onUpdateEvent } from "../../../src/store/calendar/calendarSlice"
import { calendarWhithActiveEventState, events, initialState } from "../../fixtures/calendarStates";

describe('Pruebas en calendarSlice', () => {

    test('Debe retornar el estado por defecto', () => {

        const state = calendarSlice.getInitialState();
        expect(state).toEqual(initialState);
    })
    test('onSetActiveEvent debe activar el evento', () => {

        const state = calendarSlice.reducer( calendarWhithActiveEventState, onSetActiveEvent(events[0]));
        expect(state.activeEvent).toEqual(events[0])

    })
    test('onAddNewEvent debe agregar un evento', () => {

        const newEvent = {
            id: '3',
            title: 'Cumpleaños',
            notes: 'Comprar torta',
            start: new Date('2022-10-21 13:00:00'),
            end: (new Date('2022-10-21 15:00:00'))
        }

        const state = calendarSlice.reducer( calendarWhithActiveEventState, ondAddNewEvent(newEvent));
        expect(state.events).toEqual([...events, newEvent]);
    })
    test('onUpdateEvent debe actualizar un evento', () => {

        const newEvent = {
            id: '1',
            title: 'Cumpleaños actualizado',
            notes: 'Comprar sanguchitos',
            start: new Date('2022-10-21 13:00:00'),
            end: (new Date('2022-10-21 15:00:00'))
        }

        const state = calendarSlice.reducer( calendarWhithActiveEventState, onUpdateEvent(newEvent));
        expect(state.events).toContain(newEvent);
    })

    test('onDeleteEvent debe borrar el evento activo', () => {
        //calendarWhithActiveEventState
        const state = calendarSlice.reducer(calendarWhithActiveEventState, onDeleteEvent());
        expect(state.events).not.toContain(events[0])

    })
    test('onLoadEvents debe establecer los eventos', () => {
        const state = calendarSlice.reducer(initialState, onLoadEvents(events))
        expect(state.isLoadingEvents).toBeFalsy();
    })
    test('onLogoutCalendar debe limpiar el estado', () => {

        const state = calendarSlice.reducer(calendarWhithActiveEventState, onLogoutCalendar());
        expect(state).toEqual(initialState)

    })
})