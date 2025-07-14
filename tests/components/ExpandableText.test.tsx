import { render, screen } from '@testing-library/react';
import ExpandableText from '../../src/components/ExpandableText';
import userEvent from '@testing-library/user-event';

describe('Expandable text', () => {
  const limit = 255;
  const longText = 't'.repeat(limit + 1);
  const truncatedText = longText.substring(0, limit);

  it('should render full short text', () => {
    const text = 'short text';
    render(<ExpandableText text={text} />);

    const article = screen.getByRole('article');
    expect(article).toBeInTheDocument();
    expect(article).toHaveTextContent(text);
  });

  it('should render truncated text and button when text is longer than 255 characters', () => {
    const longText = 't'.repeat(256);
    render(<ExpandableText text={longText} />);

    const article = screen.getByRole('article');
    expect(article).toHaveTextContent(`${truncatedText}...`);

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent(/more/i);
  });

  it('should render text again when user click show more or show less', async () => {
    render(<ExpandableText text={longText} />);

    const showMoreButton = screen.getByRole('button', { name: /more/i });
    const user = userEvent.setup();
    await user.click(showMoreButton);

    const article = screen.getByRole('article');
    expect(article).toBeInTheDocument();
    expect(article).toHaveTextContent(longText);

    const showLessButton = screen.getByRole('button', { name: /less/i });
    await user.click(showLessButton);
    const articleLess = screen.getByRole('article');
    expect(articleLess).toHaveTextContent(`${truncatedText}...`);
  });
});
