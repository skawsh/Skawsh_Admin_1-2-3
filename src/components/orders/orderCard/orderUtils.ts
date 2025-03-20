
export function determinePickupTime(orderId: string, defaultTime: string | null | undefined): string | null | undefined {
  switch (orderId) {
    case 'ORD-0011':
    case 'ORD-R001':
      return "06:40 on 17/03/2025";
    case 'ORD-0012':
    case 'ORD-R002':
      return "12:40 on 17/03/2025";
    case 'ORD-RT005':
      return "09:15 on " + formatCurrentDate();
    case 'ORD-RTC004':
      return "10:30 on " + formatCurrentDate();
    default:
      return defaultTime;
  }
}

export function determineDropTime(orderId: string, defaultTime: string | null | undefined): string | null | undefined {
  switch (orderId) {
    case 'ORD-R001':
      return "07:40 on 17/03/2025";
    case 'ORD-R002':
      return "01:20 on 17/03/2025";
    default:
      return defaultTime;
  }
}

export function determinePickedUpStatus(orderId: string, defaultStatus: boolean | undefined): boolean {
  switch (orderId) {
    case 'ORD-0011':
    case 'ORD-R001':
    case 'ORD-0012':
    case 'ORD-R002':
    case 'ORD-RT005':
    case 'ORD-RTC004':
      return true;
    default:
      return defaultStatus || false;
  }
}

export function determineDroppedStatus(orderId: string, defaultStatus: boolean | undefined): boolean {
  switch (orderId) {
    case 'ORD-R001':
    case 'ORD-R002':
      return true;
    default:
      return defaultStatus || false;
  }
}

// Helper function to format current date as DD/MM/YYYY
function formatCurrentDate(): string {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  return `${day}/${month}/${year}`;
}

