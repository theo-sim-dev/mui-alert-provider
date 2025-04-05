# MUI Alert Provider

A lightweight and customizable wrapper for integrating [MUI Alert](https://mui.com/material-ui/react-alert/?srsltid=AfmBOorG16fDWlZUFpNDld6CbDRdpPOA8eTPa9eEriOYl9CywGZFowmu) into your react application, enabling you to build a floating stack of alerts within minutes.

This library utilizes [Context API](https://react.dev/reference/react/hooks#context-hooks) and [React Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks) for simplified management of floating alert stacks.

## Demo

[![Edit mui-alert-provider demo](https://codesandbox.io/static/img/play-codesandbox.svg)](
https://codesandbox.io/p/sandbox/mui-alert-provider-demo-kj6mjz)

## Features

- Floating stacks of MUI Alerts that integrate seamlessly with any web UI.
- Utilizes the [Context API](https://react.dev/reference/react/hooks#context-hooks) and [React Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks) to enable quick integration with any React application.
- Fully customizable to match your application's design.
- Built with accessibility in mind, fully meeting MUI's accessibility requirements to ensure an inclusive experience for all users.

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
| `limit`           | `number`   | No       | `4`       | Maximum number of alerts to display at a time.                             |
| `duration`        | `number`   | No       | `300`     | The time (in milliseconds) that the alert's animation lasts, including its appearance and disappearance transitions.    |
| `defaultSeverity` | `string`   | No       | `"error"` | Default severity level for alerts. For more information, see [Severity](https://mui.com/material-ui/react-alert/?srsltid=AfmBOoomXuefwF-JxIyQhjW4KL5jMm74WOxa0mhIfbry_zlMxKkeWcJG#severity) in MUI Alert                                        |
| `muiAlertProps`   | `object`   | No       | `{}`      | Props to be passed directly to the underlying [MUI Alert](https://mui.com/material-ui/api/alert/) component.       |
| `muiStackProps`   | `object`   | No       | `{}`      | Props to be passed directly to the underlying [MUI Stack](https://mui.com/material-ui/api/stack/?srsltid=AfmBOoo9EDLoz-uJHnsPGlFBYMrs7xKsXUtydbBX5fwk5u_LXyIEc0Ad) component      |

### `useAlert`

Hook to access alert functions.

#### Methods

| Method                          | Description                                                                                     |
|---------------------------------|-------------------------------------------------------------------------------------------------|
| `addAlert({ message, severity })` | Adds a new alert to the stack. `severity` defaults to `defaultSeverity` provided to `AlertProvider`, which defaults to `error`. |

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).