import {render, screen} from "@testing-library/react";
import { Square } from "./Square";
import React from "react";

describe('Square Component', () => {
    test('Should exists', () => {
        // Given + When
        render(<Square value={"x"} onSquareClick={() => ''}/>);

        // Then
        expect(screen.getByRole('button', { name: "x"})).toBeInTheDocument();
    });
})