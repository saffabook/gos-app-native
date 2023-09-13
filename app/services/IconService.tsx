export function getNotificationIcon(type:string) {
    let icon = '📢';
    if (type === 'booking') {
      icon = '📅';
    } else if (type === 'payment') {
      icon = '💰';
    } else if (type === 'message') {
      icon = '📬';
    }
    return icon;
  }
  