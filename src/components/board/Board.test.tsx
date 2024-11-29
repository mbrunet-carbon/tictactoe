import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import { Board } from './Board';
import {SquareValueEnum} from "../../types/SquareValue";


describe('Board Component', () => {

    test('Should exists', () => {
        // Given + When
        render(<Board />);

        // Then
        expect(screen.getAllByRole('button')).toHaveLength(9);
    });

    test('Should update the board', () => {
        // Given
        render(<Board/>);
        expect(screen.getAllByRole('button')[0].textContent).toBe('')
        expect(screen.getAllByRole('button')[1].textContent).toBe('')

        // When
        fireEvent.click(screen.getAllByRole('button')[0]);
        fireEvent.click(screen.getAllByRole('button')[1]);
        fireEvent.click(screen.getAllByRole('button')[2]);
        fireEvent.click(screen.getAllByRole('button')[3]);
        fireEvent.click(screen.getAllByRole('button')[4]);
        fireEvent.click(screen.getAllByRole('button')[5]);
        fireEvent.click(screen.getAllByRole('button')[7]);
        fireEvent.click(screen.getAllByRole('button')[8]);
        fireEvent.click(screen.getAllByRole('button')[6]);

        // Then
        expect(screen.getAllByRole('button')[0].textContent).toBe(SquareValueEnum.X);
        expect(screen.getAllByRole('button')[1].textContent).toBe(SquareValueEnum.O);
        expect(screen.getAllByRole('button')[2].textContent).toBe(SquareValueEnum.X);
        expect(screen.getAllByRole('button')[3].textContent).toBe(SquareValueEnum.O);
        expect(screen.getAllByRole('button')[4].textContent).toBe(SquareValueEnum.X);
        expect(screen.getAllByRole('button')[5].textContent).toBe(SquareValueEnum.O);
        expect(screen.getAllByRole('button')[6].textContent).toBe(SquareValueEnum.X);
        expect(screen.getAllByRole('button')[7].textContent).toBe(SquareValueEnum.X);
        expect(screen.getAllByRole('button')[8].textContent).toBe(SquareValueEnum.O);
    })

    describe('Should not update the board', () => {
        test('When click two times on same case', () => {
            // Given
            render(<Board/>);
            fireEvent.click(screen.getAllByRole('button')[0]);
            expect(screen.getAllByRole('button')[0].textContent).toBe(SquareValueEnum.X)

            // When
            fireEvent.click(screen.getAllByRole('button')[0]);

            // Then
            expect(screen.getAllByRole('button')[0].textContent).toBe(SquareValueEnum.X)
        })

        test('When there is a winner', () => {
            // Given
            render(<Board/>);
            fireEvent.click(screen.getAllByRole('button')[0]);
            fireEvent.click(screen.getAllByRole('button')[4]);
            fireEvent.click(screen.getAllByRole('button')[1]);
            fireEvent.click(screen.getAllByRole('button')[8]);
            fireEvent.click(screen.getAllByRole('button')[2]);

            // When
            fireEvent.click(screen.getAllByRole('button')[3]);

            // Then
            expect(screen.getAllByRole('button')[3].textContent).toBe('')
        })
    })

    test('Should get winner', () => {
        // Given
        render(<Board/>);

        // When
        fireEvent.click(screen.getAllByRole('button')[0]);
        fireEvent.click(screen.getAllByRole('button')[4]);
        fireEvent.click(screen.getAllByRole('button')[1]);
        fireEvent.click(screen.getAllByRole('button')[8]);
        fireEvent.click(screen.getAllByRole('button')[2]);

        // Then
        expect(screen.getByTestId('winner').textContent).toBe('Winner is : x');
    })

    describe('History', () => {
        test('Should display history move', () => {
            // Given
            render(<Board/>);

            // When
            fireEvent.click(screen.getAllByRole('button')[0]);

            // Then
            expect(screen.getByRole('button', {name: '# Move n°1'})).toBeInTheDocument();
        })

        test('Should undo move', () => {
            // Given
            render(<Board/>);
            fireEvent.click(screen.getAllByRole('button')[0]);
            fireEvent.click(screen.getAllByRole('button')[1]);
            expect(screen.getAllByRole('button')[1].textContent).toBe(SquareValueEnum.O)

            // When
            fireEvent.click(screen.getByRole('button', {name: '# Move n°1'}));

            // Then
            expect(screen.getAllByRole('button')[1].textContent).toBe('')
        })
    });
})
