import { SpacerDirection, SpacerSize } from '@/components/atoms/spacer/types';
import { spacing } from '@/theme';

export const getSpacerStyles = (
  size: SpacerSize,
  direction: SpacerDirection,
) => {
  const spacingValue = typeof size === 'number' ? size : spacing[size];

  // Return appropriate style based on direction
  if (direction === 'vertical') {
    return { height: spacingValue };
  } else {
    return { width: spacingValue };
  }
};
