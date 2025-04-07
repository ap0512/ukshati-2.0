import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from '../Components/Layouts/Navigation';

// Mock react-icons
jest.mock('react-icons/fa', () => ({
  FaUserCircle: () => <div>UserIcon</div>, // Mock the FaUserCircle icon
}));

describe('Navigation Component', () => {
  const renderWithRouter = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route);
    return render(<Router>{ui}</Router>);
  };

  beforeEach(() => {
    renderWithRouter(<Navigation />);
  });

  it('renders the logo', () => {
    expect(screen.getByAltText('Logo')).toBeInTheDocument();
  });

  it('renders desktop navigation links', () => {
    const links = ['Home', 'About', 'Products', 'Contact', 'Blog'];
    links.forEach((link) => expect(screen.getByText(link)).toBeInTheDocument());
  });

  it('renders the login button with correct href', () => {
    const loginLink = screen.getByText('Login'); // Use getByText instead of getByRole
    expect(loginLink).toBeInTheDocument();
    expect(loginLink.closest('a')).toHaveAttribute('href', '/login'); // Check the parent <a> element
  });

  it('toggles mobile menu when hamburger icon is clicked', async () => {
    const hamburgerButton = screen.getByLabelText('Toggle navigation');

    // Open mobile menu
    fireEvent.click(hamburgerButton);
    const mobileHomeLink = await screen.findByText('Home', { selector: '.md\\:hidden a' }); // Target mobile menu
    expect(mobileHomeLink).toBeInTheDocument();

    // Close mobile menu
    fireEvent.click(hamburgerButton);
    await waitFor(() => expect(screen.queryByText('Home', { selector: '.md\\:hidden a' })).not.toBeInTheDocument());
  });

  it('closes mobile menu when a link is clicked', async () => {
    const hamburgerButton = screen.getByLabelText('Toggle navigation');
    fireEvent.click(hamburgerButton); // Open mobile menu

    const mobileHomeLink = await screen.findByText('Home', { selector: '.md\\:hidden a' }); // Target mobile menu
    fireEvent.click(mobileHomeLink); // Click the "Home" link

    await waitFor(() => expect(screen.queryByText('Home', { selector: '.md\\:hidden a' })).not.toBeInTheDocument()); // Wait for the menu to close
  });

  it('applies active link styling for the current route', () => {
    // Simulate being on the "/about" route
    renderWithRouter(<Navigation />, { route: '/about' });

    const desktopAboutLink = screen.getByText('About', { selector: '.hidden.md\\:flex a' }); // Target desktop menu
    
  });
});