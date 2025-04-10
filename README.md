# MUI Alert Provider
[![npm](https://img.shields.io/npm/v/mui-alert-provider)](https://www.npmjs.com/package/mui-alert-provider)
[![license](https://img.shields.io/badge/license-MIT-blue)](https://www.npmjs.com/package/mui-alert-provider)
[![typescript](https://img.shields.io/badge/typescript-blue?logo=typescript&logoColor=f5f5f5)](https://www.npmjs.com/package/mui-alert-provider)
[![react](https://img.shields.io/badge/react-blue?logo=react)](https://www.npmjs.com/package/mui-alert-provider)

Make your alerts float! A lightweight provider for Material-UI’s Alert that fits seamlessly into any web UI.

Build a stack of [MUI Alert](https://mui.com/material-ui/react-alert/?srsltid=AfmBOorG16fDWlZUFpNDld6CbDRdpPOA8eTPa9eEriOYl9CywGZFowmu) in just minutes🚀

## Demo

[![Edit mui-alert-provider demo](https://codesandbox.io/static/img/play-codesandbox.svg)](
https://codesandbox.io/p/sandbox/mui-alert-provider-demo-kj6mjz)

### Desktop View
![Desktop View](./public/desktop.gif)

### Mobile View
![Mobile View](./public/mobile.gif)

## Features

- **Floating Stacks of MUI Alerts**  
  Display beautifully-styled, floating stacks of MUI Alerts that integrate seamlessly into any web UI. Fully customizable to match your design system.

- **Easy Integration with Context API & React Hooks**  
  Built on the [Context API](https://react.dev/reference/react/hooks#context-hooks) and [React Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks) for fast setup. Easily trigger alerts from anywhere in your React component tree.

- **Lightweight & Performant**  
  Designed to be super lightweight with minimal impact on your bundle size and blazing-fast performance.

- **Accessible by Design**  
  Follows MUI’s accessibility standards to deliver an inclusive and user-friendly experience for all users.


## Installation

```bash
npm install mui-alert-provider
```

or

```bash
yarn add mui-alert-provider
```

## Usage
Wrap your application with the `AlertProvider`.  
If you're using the `ThemeProvider` from MUI, ensure that the `AlertProvider` is a child of it.

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { AlertProvider } from 'mui-alert-provider';

const App = () => (
	<AlertProvider>
		{/* Your application components */}
	</AlertProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

Trigger alerts from any part of your application using the `useAlert` hook. 
This hook provides access to the `addAlert` method, allowing you to add a new alert to the stack.

```jsx
import { useAlert } from 'mui-alert-provider';

const MyComponent = () => {
	const {addAlert} = useAlert();

	const handleClick = () => {
		addAlert({
			message: "Please enter your name to continue",
			severity: "error",
		})
	};

	return <button onClick={handleClick}>Show Alert</button>;
};
```

## API

### `AlertProvider`

Wraps your application and provides alert context. 

#### Props

| Prop Name         | Type       | Required | Default   | Description                                                                 |
|-------------------|------------|----------|-----------|-----------------------------------------------------------------------------|
| `children`        | `node`     | Yes      | N/A       | React nodes to render inside the provider.                                 |
| `limit`           | `number`   | No       | `4`       | The maximum number of alerts that can be displayed simultaneously.                             |
| `mobileLimit`     | `number`   | No       | `1`       | The maximum number of alerts that can be displayed simultaneously on screens smaller than `mobileBreakpoint`.                       |
| `position`        | `AlertPosition`   | No       | `"top-right"` | Specifies where the alerts will appear on the screen. Options include `"top-right"`, `"top-left"`, `"bottom-left"`, or `"bottom-right"`. |
| `width`           | `string`   | No       | `"20%"`       | The width of the alert container. Accepts any valid CSS width value. On screens smaller than `mobileBreakpoint`, it automatically adjusts to 100% for optimal mobile responsiveness.	|
| `minWidth`        | `string`   | No       | `"280px"`     | Sets the minimum width of the alert container. Accepts any valid CSS width value. On screens smaller than `mobileBreakpoint`, it automatically adjusts to 100% for optimal mobile responsiveness. |
| `containerSx`     | `SxProps`   | No       | `{}`          | A custom MUI `sx` object to style the container that holds the stack of alerts.	|
| `duration`        | `number`   | No       | `300`     | The time (in milliseconds) that the alert's animation lasts, including its appearance and disappearance transitions.    |
| `muiAlertProps`   | `AlertProps`   | No       | `{}`       | Props to be passed directly to the underlying [MUI Alert](https://mui.com/material-ui/api/alert/) component. |
| `muiStackProps`   | `StackProps`   | No       | `{}`       | Props to be passed directly to the underlying [MUI Stack](https://mui.com/material-ui/api/stack/) component. |
| `mobileBreakpoint` | `number`   | No       | `600`     | The breakpoint width in pixels to consider a device as mobile. Alerts will adjust their behavior accordingly. 600px by default. |

### `useAlert`

Hook to access alert functions.

#### Methods

| Method                          | Description                                                                                     |
|---------------------------------|-------------------------------------------------------------------------------------------------|
| `addAlert({ message, severity })` | Adds a new alert to the stack. `severity` defaults to `"success"` as defined by MUI. |

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
