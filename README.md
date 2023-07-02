# react-calendar-lunar

![npm](https://img.shields.io/npm/v/react-calendar-lunar?color=blue)
![npm](https://img.shields.io/npm/dw/react-calendar-lunar)

`react-calendar-lunar` is an npm package built to provide an easy-to-use lunar and solar calendar component for your React applications. This package helps you display events, holidays, and additional information based on the lunar and solar calendar.

## Features

- Display both lunar and solar calendars on the same interface.
- Support for multiple languages and time zones.
- Easy integration into existing React applications.
- Flexible customization of colors, styles, and display of dates.
- Provide events, holidays, and additional information based on the lunar and solar calendar.
- Support date selection and event handling.

## Installation

Using npm:

```
npm install react-calendar-lunar
```

Using Yarn:

```
yarn add react-calendar-lunar
```

## Usage

First, import the package into your project:

```javascript
import Calendar from 'react-calendar-lunar';
```

Then, you can use the `<Calendar />` component in your React application:

```javascript
import React from 'react';
import Calendar from 'react-calendar-lunar';

const App = () => {
  return (
    <div>
      <h1>Lunar and Solar Calendar</h1>
      <Calendar />
    </div>
  );
};

export default App;
```

You can also customize the properties and handle events of the `<Calendar />` component according to your needs.

```javascript
<Calendar
  locale="en"
  timezone="America/New_York"
  onSelectDate={handleSelectDate}
  events={events}
  holidays={holidays}
  customStyles={customStyles}
/>
```

## API

### Props

| Prop          | Type        | Description                                                   |
| ------------- | ----------- | ------------------------------------------------------------- |
| locale        | string      | The language of the calendar (default: `'en'`)                |
| timezone      | string      | The time zone (default: `'UTC'`)                              |
| onSelectDate  | function    | Handler function when a date is selected                      |
| events        | object      | List of events based on the lunar and solar calendar           |
| holidays      | object      | List of holidays based on the lunar and solar calendar         |
| customStyles  | object      | Custom CSS for elements within the calendar (see details below)|

### Events

| Event          | Description                                                  |
| -------------- | ------------------------------------------------------------ |
| onSelectDate   | Fired when a date is selected                                 |

## Customizing the UI

You can customize the UI of `react-calendar-lunar` by passing custom CSS values through the `customStyles` prop. Below are some CSS properties that you can use to customize the UI:

```javascript
const customStyles = {
  calendar: {
    backgroundColor: 'white',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  day: {
    color: 'black',
    fontSize: '14px',
  },
  selectedDay: {
    backgroundColor: 'blue',
    color: 'white',
  },
  event: {
    backgroundColor: 'yellow',
  },
  holiday: {
    fontStyle: 'italic',
  },
};
```

## Contribution

If you encounter any issues, have feature requests, or suggestions for improvements, please create an issue on the [GitHub repository](https://github.com/huyneeee/react-calendar-lunar.git) of this package.

We welcome and appreciate contributions, and we will try