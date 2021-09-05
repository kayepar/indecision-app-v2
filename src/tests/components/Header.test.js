import { render, screen } from '@testing-library/react';
import Header from '../../components/Header';

describe('Tests for Header component', () => {
    test('Should correctly show the app title', () => {
        render(<Header />);
        const headingElement = screen.getByRole('heading', { name: 'Indecision' });

        expect(headingElement).toBeVisible();
    });

    test('Should correctly show the app sub-title', () => {
        render(<Header />);
        const headingElement = screen.getByRole('heading', { name: 'Let the computer decide for you' });

        expect(headingElement).toBeVisible();
    });
});
