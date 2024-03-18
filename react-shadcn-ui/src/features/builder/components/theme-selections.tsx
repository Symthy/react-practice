import { SelectBox } from '@/components/ui/molecules/select-box';

const THEMES = new Map<string, string>([
  ['theme1', 'Theme 1'],
  ['theme2', 'Theme 2'],
  ['theme3', 'Theme 3'],
]);

export const ThemeSelections = () => {
  return <SelectBox selections={THEMES} />;
};
