import React, {useEffect, useState} from 'react';
import './Board.css';
import { Square } from "../square/Square";
import {SquareValue, SquareValueEnum} from "../../types/SquareValue";

export const Board = () => {
    const [isNext, setIsNext] = useState(false);
    const [winner, setWinner] = useState<SquareValue>(null);
    const [squares, setSquares] = useState<SquareValue[]>(Array(9).fill(null));
    const [histories, setHistories] = useState<SquareValue[][]>([]);

    useEffect(() => {
        const designatedWinner = calculateWinner(squares)
        if(designatedWinner) {
            setWinner(designatedWinner);
        }

    }, [squares])


    const _addToHistory = (squares: SquareValue[]) => {
        const historyCopy = histories.slice();
        historyCopy.push(squares);
        setHistories(historyCopy);
    }

    const handleClick = (i: number): void => {
        if(winner || squares[i]) {
            return;
        }

        const squareCopy = squares.slice();
        if(isNext) {
            squareCopy[i] = SquareValueEnum.O;
        } else {
            squareCopy[i] = SquareValueEnum.X;
        }
        setSquares(squareCopy)
        setIsNext(!isNext);

        _addToHistory(squareCopy);
    };

    function calculateWinner(squares: SquareValue[]): SquareValue {
        // All winning combination
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }

    const boardStatus = () => {
        if(winner) {
            return <div data-testid="winner">Winner is : { winner }</div>
        }
        else {
            return <div data-testid="nextPlayer"> Next player is : { isNext ? 'o' : 'x' }</div>
        }
    }

    const undoMove = (history: SquareValue[]) => {
        setSquares(history);
        setIsNext(false);
    }

    const displayHistoryMove = () => {
        return histories.map((history, index) =>
            <button key={'history-' + index} onClick={() => undoMove(history)}># Move n°{index + 1}</button>)
    }

    return (
        <div className="board">
                <div className="board-status">{boardStatus()}</div>
                <div className="board-rows">
                    <div className="board-row">
                        <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
                        <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
                        <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
                    </div>
                    <div className="board-row">
                        <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
                        <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
                        <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
                    </div>
                    <div className="board-row">
                        <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
                        <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
                        <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
                    </div>
                </div>
                <div className="board-history">
                    <span> History </span>
                    {displayHistoryMove()}
                </div>
        </div>
    )
}