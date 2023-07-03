import { SelectCalendarLunar } from './index'
import type { StoryObj } from '@storybook/react';

const meta = {
  title: 'Example/SelectCalendarLunar',
  component: SelectCalendarLunar,
  tags: ['autodocs'],
  argTypes: {
  },
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    value: new Date('7/5/2023'),
    handleSelect: (date)=>{
      console.log('date', date)
    }
  },
};