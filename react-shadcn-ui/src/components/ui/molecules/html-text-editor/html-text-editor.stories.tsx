import { Meta, StoryObj } from '@storybook/react';
import { HtmlTextEditor } from './html-text-editor';

const meta = {
  title: 'HtmlTextEditor',
  component: HtmlTextEditor,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  //args: { onClick: fn() },
} satisfies Meta<typeof HtmlTextEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'HtmlTextEditor',
  },
};
