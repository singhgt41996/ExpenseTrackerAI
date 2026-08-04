export type SpacerSize =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | 'xxl'
  | 'xxxl'
  | number;

export type SpacerDirection = 'vertical' | 'horizontal';

export interface SpacerProps {
  size?: SpacerSize;
  direction?: SpacerDirection;
}
