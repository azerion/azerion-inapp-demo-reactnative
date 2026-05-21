import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { View, ScrollView, Text, Animated, StyleSheet, Dimensions, Button, TouchableOpacity, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Logger from '../Logger';

const { width } = Dimensions.get('window');
// const [paddingTop, setPaddingTop] = useState<number>(0);


interface LogViewerProps {
    safeArea: number | undefined;
}

const LogViewer = forwardRef((props: LogViewerProps, ref) => {
    const insets = useSafeAreaInsets();
    // const paddingTop
    // const { label, ...otherProps } = props;
    // console.log("props.safeArea:" + props.safeArea);
    // setPaddingTop(props.safeArea!);

    const slideAnim = useRef(new Animated.Value(width)).current;
    const [logs, setLogs] = useState<any>([]);

    const openPanel = () => {
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const closePanel = () => {
        Animated.timing(slideAnim, {
            toValue: width,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const clearPanel = () => {
        setLogs([]);
    };

    useImperativeHandle(ref, () => ({
        openPanel,
        closePanel,
    }));

    const prefixStyle: string[] = [
        'background: #278CEB',
        'background:#006db6',
        'color: #fff; ' + 'background: #001c4a;',
        'background: #006db6',
        'background: #278CEB',
        '',
    ];

    useEffect(() => {
        const originalConsoleLog = console.log;

        console.log = (...args) => {
            // Filter out prefix elements
            const filteredArray = args.filter(item => !prefixStyle.includes(item));
            if (filteredArray[0] == ' %c %c %c Bluestack Demo %c %c %c ') {
                filteredArray[0] = '[Bluestack Demo]';
            } else if (filteredArray[0] == ' %c %c %c Bluestack SDK %c %c %c ') {
                filteredArray[0] = '[Bluestack SDK]';
            }

            const logMessage = filteredArray.join(' ');
            setLogs((prevLogs: any) => [...prevLogs, logMessage]);
            originalConsoleLog(...args);
        };

        // Get the logs from Logger
        // const subscription = Logger.addListener('log', (...data) => {
        //     setLogs((prevLogs: any) => [...prevLogs, data.join(' ')]);
        // });

        // return () => {
        //     subscription.remove();
        // };

    }, []);

    return (
        <Animated.View style={[
            styles.animatedPanel,
            { marginTop: insets.top, marginBottom: insets.bottom },
            { transform: [{ translateX: slideAnim }] }
        ]}>
            <TouchableOpacity style={styles.closeButton} onPress={() => closePanel()}>
                <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.clearButton} onPress={() => clearPanel()}>
                <Text style={styles.clearButtonText}>⎚</Text>
            </TouchableOpacity>
            <Text style={styles.panelText}>Logs</Text>

            <View style={styles.scrollView}>
                <ScrollView>
                    <Text
                        style={styles.logText}
                        selectable={true}
                    >
                        {logs.map((log: string, index: number) => (
                            index + 1 + " : " + log + "\n\n"
                        ))}
                    </Text>
                </ScrollView>
            </View>

        </Animated.View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
    },
    animatedPanel: {
        position: 'absolute',
        width: width * 0.8,
        height: '100%',
        backgroundColor: '#333',
        padding: 10,
        justifyContent: 'flex-end',
        alignItems: 'center',
        alignSelf: 'flex-end',
    },
    panelText: {
        fontSize: 18,
        marginBottom: 20,
        color: '#fff',
    },
    logText: {
        fontSize: 12,
        marginBottom: 5,
        color: '#000',
    },
    scrollView: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'baseline',
        padding: 10,
        backgroundColor: '#fff',
    },
    closeButton: {
        position: 'absolute',
        top: 0,
        left: 10,
        zIndex: 1001,
    },
    closeButtonText: {
        fontSize: 40,
        color: '#fff',
    },
    clearButton: {
        position: 'absolute',
        top: 0,
        right: 10,
        zIndex: 1001,
    },
    clearButtonText: {
        // top: 5,
        fontSize: 40,
        color: '#fff',
    },
});

export default LogViewer;