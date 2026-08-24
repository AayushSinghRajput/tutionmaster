import { render, screen } from '@testing-library/react';
import VideoTutorialSection from './VideoTutorialSection';

describe('VideoTutorialSection', () => {
  test('renders heading and YouTube iframe with correct props', () => {
    render(<VideoTutorialSection />);

    // Check heading
    const heading = screen.getByRole('heading', {
      name: /Watch How to Create Your Teacher Profile/i,
    });
    expect(heading).toBeInTheDocument();

    // Check iframe
    const iframe = screen.getByTitle('How to Create Your Teacher Profile');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', 'https://www.youtube.com/embed/oSeMIfUGT3s');
    expect(iframe).toHaveAttribute('width', '100%');
    expect(iframe).toHaveAttribute('height', '100%');
    expect(iframe).toHaveAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
  });
});
