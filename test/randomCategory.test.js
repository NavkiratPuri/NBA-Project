import { render, screen } from '@testing-library/react';
import RandomCategory from './RandomCategory';

describe('comparePlayers', () => {
  it('correctly compares players and displays the result', () => {
    const player1 = {
      Player: 'Player 1',
      PTS: 20,
    };
    const player2 = {
      Player: 'Player 2',
      PTS: 15,
    };
    const selectedCategory = { value: 'PTS', label: 'Points Per Game (PPG)' };

    render(
      <RandomCategory
        onGameEnd={() => {}}
        players={[player1, player2]}
        selectedCategory={selectedCategory}
      />
    );

    // Check that the correct comparison result is displayed
    expect(screen.getByText(/Player 1 has a higher Points Per Game \(PPG\)\./i)).toBeInTheDocument();
  });

  it('displays a message when stats are equal', () => {
    const player1 = {
      Player: 'Player 1',
      PTS: 20,
    };
    const player2 = {
      Player: 'Player 2',
      PTS: 20,
    };
    const selectedCategory = { value: 'PTS', label: 'Points Per Game (PPG)' };

    render(
      <RandomCategory
        onGameEnd={() => {}}
        players={[player1, player2]}
        selectedCategory={selectedCategory}
      />
    );

    // Check that the correct message for equal stats is displayed
    expect(screen.getByText(/Stats are equal\./i)).toBeInTheDocument();
  });

  it('displays a message when no category is selected', () => {
    const player1 = {
      Player: 'Player 1',
      PTS: 20,
    };
    const player2 = {
      Player: 'Player 2',
      PTS: 15,
    };
    const selectedCategory = null;

    render(
      <RandomCategory
        onGameEnd={() => {}}
        players={[player1, player2]}
        selectedCategory={selectedCategory}
      />
    );

    // Check that the correct message for no category selected is displayed
    expect(screen.getByText(/Please select a category\./i)).toBeInTheDocument();
  });
});
