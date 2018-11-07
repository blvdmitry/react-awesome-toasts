import React from 'react';

export type Props = {
  text: string;
  actionText?: string;
  ariaLabel?: string;
  onActionClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: 'error';
};
