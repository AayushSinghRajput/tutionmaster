import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';
import { supportService } from '../../services/supportService';
import { trackMetaEvent } from '../../analytics/metaPixel';

jest.mock('../../services/supportService', () => ({
  supportService: {
    createTicket: jest.fn(),
  },
}));

jest.mock('../../analytics/metaPixel', () => ({
  trackMetaEvent: jest.fn(),
}));

const fillContactForm = async (user, subjectValue) => {
  await user.type(screen.getByLabelText(/first name/i), 'Aarav');
  await user.type(screen.getByLabelText(/last name/i), 'Thapa');
  await user.type(screen.getByLabelText(/email address/i), 'aarav@example.com');
  await user.type(screen.getByLabelText(/phone/i), '+9779800000000');
  await user.selectOptions(screen.getByLabelText(/subject/i), subjectValue);
  await user.type(
    screen.getByLabelText(/message/i),
    'Looking for a Class 10 Mathematics home tutor in Lalitpur.'
  );
};

describe('ContactForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('submits tuition enquiry to support tickets API and fires Meta Lead event', async () => {
    const user = userEvent.setup();
    supportService.createTicket.mockResolvedValue({
      data: {
        success: true,
        data: { ticketId: 'TM-4321' },
      },
    });

    render(<ContactForm />);
    await fillContactForm(user, 'tutoring');
    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(supportService.createTicket).toHaveBeenCalledWith({
        name: 'Aarav Thapa',
        contactEmail: 'aarav@example.com',
        contactPhone: '+9779800000000',
        category: 'General',
        subject: 'Tutoring Services (Tuition Enquiry)',
        message: 'Looking for a Class 10 Mathematics home tutor in Lalitpur.',
      });
    });

    expect(trackMetaEvent).toHaveBeenCalledTimes(1);
    expect(trackMetaEvent).toHaveBeenCalledWith('Lead', {
      content_name: 'Tutoring Services (Tuition Enquiry)',
      content_category: 'tuition_enquiry',
    });

    expect(await screen.findByRole('status')).toHaveTextContent('TM-4321');
    expect(screen.getByLabelText(/first name/i)).toHaveValue('');
  });

  test('submits general/technical inquiry and fires Meta Contact event', async () => {
    const user = userEvent.setup();
    supportService.createTicket.mockResolvedValue({
      data: {
        success: true,
        data: { ticketId: 'TM-8765' },
      },
    });

    render(<ContactForm />);
    await fillContactForm(user, 'technical');
    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(supportService.createTicket).toHaveBeenCalledWith({
        name: 'Aarav Thapa',
        contactEmail: 'aarav@example.com',
        contactPhone: '+9779800000000',
        category: 'Technical Support',
        subject: 'Technical Support',
        message: 'Looking for a Class 10 Mathematics home tutor in Lalitpur.',
      });
    });

    expect(trackMetaEvent).toHaveBeenCalledTimes(1);
    expect(trackMetaEvent).toHaveBeenCalledWith('Contact', {
      content_name: 'Technical Support',
      content_category: 'technical',
    });
  });

  test('shows error alert and skips Meta Pixel event when API request fails', async () => {
    const user = userEvent.setup();
    supportService.createTicket.mockRejectedValue({
      response: {
        data: { message: 'Unable to submit ticket right now' },
      },
    });

    render(<ContactForm />);
    await fillContactForm(user, 'tutoring');
    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Unable to submit ticket right now'
    );
    expect(trackMetaEvent).not.toHaveBeenCalled();
    expect(screen.getByLabelText(/first name/i)).toHaveValue('Aarav');
  });
});
