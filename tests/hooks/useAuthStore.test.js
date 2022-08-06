import { renderHook, act } from "@testing-library/react"
import { useAuthStore } from "../../src/hooks/useAuthStore"
import { authSlice } from "../../src/store"
import { initialState, notAuthenticatedState } from "../fixtures/authStates"
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { testUserCredentials } from "../fixtures/testUser";
import { calendarApi } from "../../src/apis";

const getMockStore = ( initialState )=>{
    return configureStore({
        reducer: {
            auth: authSlice.reducer
        },
        preloadedState: {
            auth: {...initialState}
        }
    })
}


describe('Pruebas en useAuthStore', () => {

    test('Debe regresar los valores por defecto', () => {

        const mockStore = getMockStore({...initialState});
        const { result } = renderHook( ()=> useAuthStore(),{
            wrapper: ({ children })=> <Provider store={mockStore}>{children}</Provider>
        });

        expect(result.current).toEqual({
            status: 'checking',
            user: {},
            errorMessage: undefined,
            startLogin: expect.any(Function),
            startRegister: expect.any(Function),
            checkAuthToken: expect.any(Function),
            startLogout: expect.any(Function)
        })
    })
    
    test('startLogin debe realizar el login correctamente', async () => {

        localStorage.clear();
        const mockStore = getMockStore({...notAuthenticatedState});
        const { result } = renderHook( ()=> useAuthStore(),{
            wrapper: ({ children })=> <Provider store={mockStore}>{children}</Provider>
        });

        await act(async ()=>{
            await result.current.startLogin(testUserCredentials)
        })
        const { status, user} = result.current;
        expect({ status, user}).toEqual({
            status:'authenticated',
            user: { name: 'Test User', uid :"62eae890e129747b0bf126ed"}
        })
    })
    test('startLogin debe fallar en la autenticación', async () => {

        localStorage.clear();
        const mockStore = getMockStore({...notAuthenticatedState});
        const { result } = renderHook( ()=> useAuthStore(),{
            wrapper: ({ children })=> <Provider store={mockStore}>{children}</Provider>
        });

        await act(async ()=>{
            await result.current.startLogin({email: 'algo@google.com', password: 123456})
        })

        const { status, user, errorMessage } = result.current;
        expect({errorMessage, user, status}).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: 'Credenciales incorrectas'
        })
    })

    test('startRegister debe crear un usuario', async () => {

        localStorage.clear();
        const mockStore = getMockStore({...notAuthenticatedState});
        const { result } = renderHook( ()=> useAuthStore(),{
            wrapper: ({ children })=> <Provider store={mockStore}>{children}</Provider>
        });

        const spy = jest.spyOn( calendarApi, 'post' ).mockReturnValue({
            data: {
                ok: true,
                uid: 'algun-id',
                name: 'Test User',
                token: 'Algun-token'
            }
        })
        await act(async ()=>{
            await result.current.startRegister({email: 'algo@google.com', password: 123456, name:'Test User 2'})
        })

        const { errorMessage, status, user }= result.current;
        expect({ errorMessage, status, user }).toEqual(
            {
                errorMessage: undefined,
                status: 'authenticated',
                user: { name: 'Test User', uid: 'algun-id' }
            }
        )

        spy.mockRestore();

    })
})