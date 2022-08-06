import { render, screen } from "@testing-library/react"
import { FabDelete } from "../../../src/calendar/components/FabDelete"
import { useCalendarStore } from "../../../src/hooks/useCalendarStore"

jest.mock("../../../src/hooks/useCalendarStore")

describe('Pruebas en <FabDelete />', () => {

    test('Debe mostrar el componente correctamente', () => {

        useCalendarStore.mockReturnValue({
            hasEventSelected: false
        })
        render(<FabDelete />);

        const btn = screen.getByLabelText('btn-delete');
        expect(btn.classList).toContain('btn')
        expect(btn.classList).toContain('btn-danger')
        expect(btn.classList).toContain('fab-danger')
    })
    test('Debe mostrar el boton si hay un elemento activo', () => {

        useCalendarStore.mockReturnValue({
            hasEventSelected: true
        })
        render(<FabDelete />);

        const btn = screen.getByLabelText('btn-delete');
        expect(btn.style.display).toBe('')
    })
})