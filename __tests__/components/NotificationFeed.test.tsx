import React from 'react';
import { render } from '@testing-library/react-native';
import NotificationFeed from '../../app/components/NotificationFeed/NotificationFeed';
import { getNotificationIcon } from '../../app/services/IconService';

const notifications = [
  { id: 1, type: 'booking', message: 'New booking made for Room 101', status: 'Confirmed', timeAgo: '1m' },
  { id: 2, type: 'payment', message: 'Payment received for Order #1234', status: 'Completed', timeAgo: '1d' },
  { id: 3, type: 'message', message: 'You have a new message from John Doe', status: '', timeAgo: '3m' },
];

test('renders all notifications correctly', () => {
  const { getByText } = render(<NotificationFeed />);

  notifications.forEach((item) => {
    const message = getByText(item.message);
    expect(message).toBeTruthy();

    if (item.status) {
      const status = getByText(item.status);
      expect(status).toBeTruthy();
    }

    const timeAgo = getByText(item.timeAgo);
    expect(timeAgo).toBeTruthy();
  });
});

test('renders correct icons', () => {
  const { getByText } = render(<NotificationFeed />);

  notifications.forEach((item) => {
    const icon = getByText(getNotificationIcon(item.type));
    expect(icon).toBeTruthy();
  });
});

test('limits message text to 2 lines', () => {
  const { getByText } = render(<NotificationFeed />);

  notifications.forEach((item) => {
    const message = getByText(item.message);
    expect(message.props.numberOfLines).toBe(2);
  });
});
