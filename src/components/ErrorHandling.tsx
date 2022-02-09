// Import the default dependencies, and the ui components that is to be used.
import React from 'react';
import { Text, View, Button } from 'react-native';
import ErrorBoundary from "react-native-error-boundary";

// Define the props that is to be used in the component.
type Props = {
    children?:
      | React.ReactChild
      | React.ReactChild[];
}


export default class ErrorHandler extends React.Component<Props> {
    render() {

        // Create a custom fallback UI, which will be shown when an error occurs.
        const CustomFallback = (props: { error: Error, resetError: Function }) => {
            return (
                <View>
                    <Text>
                        An error occured!
                    </Text>
                    <Text>
                        {props.error.toString()}
                    </Text>
                    <Button onPress={() => props.resetError} title={'Try again'} />
                </View>
            )
        }

        // Log the error to a logging service.
        const ErrorHandling = (error: Error, stackTrace: string) => {
            /* Log the error to a logging service */
        }

        // Return the custom component, and render their children too.
        return (
            <ErrorBoundary onError={ErrorHandling} FallbackComponent={CustomFallback}>
                {this.props.children}
            </ErrorBoundary>
        )
    }
}