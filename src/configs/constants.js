export const LINE_STATUS = {
  available: { status: 'Available', color: 'success' },
  allocated: { status: 'Allocated', color: 'info' },
  pending: { status: 'Pending', color: 'warning' },
  suspended: { status: 'Suspended', color: 'error' }
}

export const USER_STATUS = {
  active: { status: 'Active', color: 'success' },
  pending: { status: 'Pending', color: 'warning' },
  suspended: { status: 'Suspend', color: 'secondary' },
  blocked: { status: 'Blocked', color: 'error' }
}

export const USER_ROLE = {
  admin: { icon: 'mdi:laptop', color: 'error.main', role: 'Admin', roleColor: 'error' },
  user: { icon: 'mdi:user', color: 'warning.main', role: 'User', roleColor: 'primary' }
}

export const USER_LINE_STATUS = {
  pending: { status: 'Pending', color: 'warning' },
  active: { status: 'Active', color: 'success' },
  suspended: { status: 'Suspended', color: 'error' }
}
