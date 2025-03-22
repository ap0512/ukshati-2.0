import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from '../Components/Layouts/Layout';

// Mock the Navigation and Footer components
jest.mock('../Components/Layouts/Navigation', () => () => <div>Navigation</div>);
jest.mock('../Components/Layouts/Footer', () => () => <div>Footer</div>);

describe('Layout Component', () => {
  const renderWithRouter = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route);
    return render(ui, { wrapper: Router });
  };

  it('renders without crashing', () => {
    renderWithRouter(<Layout />);
    expect(screen.getByText('Navigation')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  it('sets the correct page title for the home route', async () => {
    renderWithRouter(<Layout />, { route: '/' });
    await waitFor(() => expect(document.title).toBe('Home - Ukshati'));
  });

  it('sets the correct page title for the about route', async () => {
    renderWithRouter(<Layout />, { route: '/about' });
    await waitFor(() => expect(document.title).toBe('About Us'));
  });

  it('sets the correct page title for the product route', async () => {
    renderWithRouter(<Layout />, { route: '/product' });
    await waitFor(() => expect(document.title).toBe('Our Products'));
  });

  it('sets the correct page title for the contact route', async () => {
    renderWithRouter(<Layout />, { route: '/contact' });
    await waitFor(() => expect(document.title).toBe('Contact Us'));
  });

  it('sets the correct page title for the blog route', async () => {
    renderWithRouter(<Layout />, { route: '/blog' });
    await waitFor(() => expect(document.title).toBe('Our Blog'));
  });

  it('sets a default title for unknown routes', async () => {
    renderWithRouter(<Layout />, { route: '/unknown' });
    await waitFor(() => expect(document.title).toBe('Ukshati'));
  });

  it('renders the main content with the correct class and style', () => {
    renderWithRouter(<Layout />);
    const mainElement = screen.getByRole('main');
    expect(mainElement).toHaveClass('bg-gray-100');
    expect(mainElement).toHaveStyle('min-height: 80vh');
  });
});