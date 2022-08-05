import { onCloseModal, onOpenDateModal, uiSlice } from "../../../src/store/ui/uiSlice"

describe('Pruebas en uiSlice', () => {

    test('Debe retornar el estado por defecto', () => {

        expect(uiSlice.getInitialState()).toEqual({ isDateModalOpen: false })
    });

    test('Debe cambiar el isDateModalOpen correctamente', () => {

        let state = uiSlice.getInitialState();
        state= uiSlice.reducer(state, onOpenDateModal());
        expect(state.isDateModalOpen).toBeTruthy();

        state= uiSlice.reducer(state, onCloseModal());
        expect(state.isDateModalOpen).toBeFalsy();

    })
})