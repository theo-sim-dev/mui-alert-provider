# MUI Alert Provider

A lightweight and customizable wrapper for integrating MUI Alerts into your application, enabling you to build a floating stack of alerts within minutes.

## Features

- Floating stacks of MUI Alerts that seamlessly integrate with any web UI.
- Effortless integration with React components.
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
| `duration`        | `number`   | No       | `300`     | Duration (in milliseconds) for which an alert's animation is displayed.    |
| `defaultSeverity` | `string`   | No       | `"error"` | Default severity level for alerts.                                         |
| `muiAlertProps`   | `object`   | No       | `{}`      | Props to be passed directly to the underlying MUI `Alert` component.       |
| `muiStackProps`   | `object`   | No       | `{}`      | Props to be passed directly to the underlying MUI `Stack` component.       |

### `useAlert`

Hook to access alert functions.

#### Methods

| Method                          | Description                                                                                     |
|---------------------------------|-------------------------------------------------------------------------------------------------|
| `addAlert({ message, severity })` | Adds a new alert to the queue. `severity` defaults to `defaultSeverity` provided to `AlertProvider`, which defaults to `error`. |

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).