import { CalendarLunar } from './index'
import type { StoryObj } from '@storybook/react';

const meta = {
  title: 'Example/CalendarLunar',
  component: CalendarLunar,
  tags: ['autodocs'],
  argTypes: {
  },
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    value: new Date(),
    customStyle: {
    }
  },
};