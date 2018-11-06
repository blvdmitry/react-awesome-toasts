import React from 'react';

export type Props = {
  text: string;
  attributes?: React.HTMLProps<HTMLDivElement>;
  actionText?: string;
  ariaLabel?: string;
  onActionClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};
