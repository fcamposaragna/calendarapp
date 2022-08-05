
export const events = [
    {
        id: '1',
        title: 'Cumpleaños',
        notes: 'Comprar torta',
        start: new Date('2022-10-21 13:00:00'),
        end: (new Date('2022-10-21 15:00:00'))
    },
    {
        id: '2',
        title: 'Cumpleaños de Ramon',
        notes: 'Alguna nota',
        start: new Date('2022-11-10 13:00:00'),
        end: (new Date('2022-11-10 15:00:00'))
    }
]

export const initialState = {
    isLoadingEvents: true,
    events: [],
    activeEvent: null
}
export const calendarWhithEventsState = {
    isLoadingEvents: false,
    events: [...events],
    activeEvent: null
}
export const calendarWhithActiveEventState = {
    isLoadingEvents: false,
    events: [...events],
    activeEvent: {...events[0]}
}

