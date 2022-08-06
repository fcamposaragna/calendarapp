import { renderHook, act } from '@testing-library/react';
import { useUiStore } from '../../src/hooks';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { store, uiSlice } from '../../src/store';

const getMockStore = ( initialState )=>{
    return configureStore({
        reducer: {
            ui: uiSlice.reducer
        },
        preloadedState: {
            ui: {...initialState}
        }
    })
}

describe('Pruebas en useUiStore', () => {

    test('Debe retornar los valores por defecto', () => {

        const mockStore = getMockStore({isDateModalOpen: false})
        
        const { result } = renderHook(()=> useUiStore(), {
            wrapper: ({ children })=> <Provider store={ mockStore }>{ children }</Provider> 
        });
        
        expect(result.current).toEqual({
            isDateModalOpen: false,
            openDateModal: expect.any(Function),
            closeDateModal: expect.any(Function),
            toggleDateModal: expect.any(Function)
        })
    })

    test('openDateModal debe de colocar true en el isDateModalOpen', () => {

        const mockStore = getMockStore({isDateModalOpen: false})
        
        const { result } = renderHook(()=> useUiStore(), {
            wrapper: ({ children })=> <Provider store={ mockStore }>{ children }</Provider> 
        });

        const { isDateModalOpen, openDateModal } = result.current;

        act( ()=> {
            openDateModal();
        })
        expect(result.current.isDateModalOpen).toBeTruthy();

    });

    test('closeDateModal debe colocar false en isDateModalOpen', () => {


        const mockStore = getMockStore({isDateModalOpen: true})
        
        const { result } = renderHook(()=> useUiStore(), {
            wrapper: ({ children })=> <Provider store={ mockStore }>{ children }</Provider> 
        });

        act(()=>{
            result.current.closeDateModal();
        });

        expect(result.current.isDateModalOpen).toBeFalsy();
    })
    test('toggleDateModal debe cambiar el esstado respectivamente', () => {


        const mockStore = getMockStore({isDateModalOpen: true})
        
        const { result } = renderHook(()=> useUiStore(), {
            wrapper: ({ children })=> <Provider store={ mockStore }>{ children }</Provider> 
        });

        act(()=>{
            result.current.toggleDateModal();
        });

        expect(result.current.isDateModalOpen).toBeFalsy();
    })
})