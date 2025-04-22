import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GroupBookingForm from '@/components/form/GroupBookingForm';
import { server } from '@/mocks/server';
import { http } from 'msw';
import { expect } from '@jest/globals';


describe('GroupBookingForm', () => {
  it('should submit the form successfully', async () => {
    render(<GroupBookingForm />);

    userEvent.type(screen.getByLabelText(/First name/i), 'John');
    userEvent.type(screen.getByLabelText(/Last name/i), 'Doe');
    userEvent.type(screen.getByLabelText(/Email address/i), 'john.doe@example.com');
    userEvent.type(screen.getByLabelText(/Phone number/i), '1234567890');

    userEvent.click(screen.getByLabelText(/Business/i));
    userEvent.click(screen.getByLabelText(/Leisure/i));
    userEvent.selectOptions(screen.getByLabelText(/Reason for visit/i), 'Wedding');

    userEvent.click(screen.getByLabelText(/Increase Single Occupancy/i));
    userEvent.click(screen.getByLabelText(/Increase Double Occupancy/i));

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    const successMessage = await screen.findByText(/Group booking form submitted successfully/i);
    expect(successMessage).toString();
  });

  it('should show an error message if required fields are missing', async () => {
    render(<GroupBookingForm />);

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    const errorMessage = await screen.findByText(/All required fields must be filled/i);
    expect(errorMessage).toString();
  });

  it('should handle server errors gracefully', async () => {
    server.use(
      http.post('/api/submit-group-booking', (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ message: 'Internal Server Error' }));
      })
    );

    render(<GroupBookingForm />);

    userEvent.type(screen.getByLabelText(/First name/i), 'John');
    userEvent.type(screen.getByLabelText(/Last name/i), 'Doe');
    userEvent.type(screen.getByLabelText(/Email address/i), 'john.doe@example.com');
    userEvent.type(screen.getByLabelText(/Phone number/i), '1234567890');

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    const errorMessage = await screen.findByText(/Internal Server Error/i);
    expect(errorMessage).toBeInTheDocument();
  });
});