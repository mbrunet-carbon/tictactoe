import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { Board } from './components/board/Board';

jest.mock('./components/board/Board')

test('Should exists', () => {
  // Given + When
  render(<App />);

  // Then
  expect(Board).toHaveBeenCalled()
});
