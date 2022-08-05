import { authSlice, onLogin, onLogout } from "../../../src/store/auth/authSlice"
import { authenticatedState, initialState } from "../../fixtures/authStates"
import { testUserCredentials } from "../../fixtures/testUser"

describe('Pruebas en authSlice', () => {

    test('Debe retornar el estado inicial', () => {

        expect(authSlice.getInitialState()).toEqual(initialState)
    })

    test('Debe realizar un login', () => {

        const state = authSlice.reducer( initialState, onLogin(testUserCredentials) );
        expect(state).toEqual({
            status: 'authenticated',
            user: testUserCredentials,
            errorMessage: undefined
        })
    })
    test('Debe realizar el loguot', () => {

        const state = authSlice.reducer(authenticatedState, onLogout());
        expect(state).toEqual({
            status:'not-authenticated',
            user: {},
            errorMessage: undefined
        })
    })
})