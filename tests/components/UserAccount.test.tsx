import { render, screen } from '@testing-library/react';
import UserAccount from '../../src/components/UserAccount';
import { User } from '../../src/entities';

describe('UserAccount', () => {
  const userInfo: User = {
    id: 1,
    name: 'Mosh',
    isAdmin: false,
  };
  const adminInfo: User = {
    id: 2,
    name: 'Tuan',
    isAdmin: true,
  };

  it('should return username', () => {
    render(<UserAccount user={userInfo} />);
    const userName = screen.getByText(/mosh/i);
    expect(userName).toBeInTheDocument();
    expect(userName).toHaveTextContent(/mosh/i);
  });

  it('should not return Edit button when user is not admin', () => {
    render(<UserAccount user={userInfo} />);
    const editButton = screen.queryByRole('button');
    expect(editButton).not.toBeInTheDocument();
  });

  it('should return Edit button when user is an admin', () => {
    render(<UserAccount user={adminInfo} />);
    const editButton = screen.queryByRole('button');
    expect(editButton).toBeInTheDocument();
  });
});
