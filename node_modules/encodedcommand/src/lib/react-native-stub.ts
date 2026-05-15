// react-native 웹 환경용 stub
export const View = ({ children, style, ...props }: any) => children ?? null;
export const Text = ({ children, style, ...props }: any) => children ?? null;
export const Image = ({ source, style, ...props }: any) => null;
export const TouchableOpacity = ({ children, onPress, style, ...props }: any) => children ?? null;
export const ScrollView = ({ children, style, ...props }: any) => children ?? null;
export const Modal = ({ children, visible, ...props }: any) => visible ? children : null;
export const StyleSheet = {
  create: (styles: any) => styles,
  flatten: (style: any) => style,
};
export const Animated = {
  View: ({ children, style, ...props }: any) => children ?? null,
  Image: ({ source, style, ...props }: any) => null,
  Value: class { constructor(v: any) {} },
  timing: () => ({ start: () => {} }),
  spring: () => ({ start: () => {} }),
  sequence: () => ({ start: () => {} }),
};
export const Platform = { OS: 'web', select: (obj: any) => obj.web ?? obj.default };
export const Dimensions = { get: () => ({ width: 375, height: 812 }) };
export const Alert = { alert: (title: string, msg?: string) => alert(`${title}\n${msg ?? ''}`) };
export const Keyboard = { dismiss: () => {} };
export const StatusBar = () => null;
export const FlatList = ({ data, renderItem, ...props }: any) => null;
export const ActivityIndicator = () => null;
export const TextInput = ({ value, onChangeText, ...props }: any) => null;
export const SafeAreaView = ({ children, ...props }: any) => children ?? null;
export const Pressable = ({ children, onPress, ...props }: any) => children ?? null;
export const useColorScheme = () => 'light';
export const useWindowDimensions = () => ({ width: 375, height: 812 });
export const AppRegistry = { registerComponent: () => {} };
export const NativeModules = {};
export const DeviceEventEmitter = { addListener: () => ({ remove: () => {} }) };
export const NativeEventEmitter = class { addListener() { return { remove: () => {} }; } };
export const PermissionsAndroid = { request: async () => 'granted', PERMISSIONS: {}, RESULTS: {} };
export const Linking = { openURL: () => Promise.resolve(), canOpenURL: () => Promise.resolve(true) };
export const Share = { share: () => Promise.resolve() };
export const Vibration = { vibrate: () => {} };
export const BackHandler = { addEventListener: () => ({ remove: () => {} }), exitApp: () => {} };
export const InteractionManager = { runAfterInteractions: (cb: any) => { cb(); return { cancel: () => {} }; } };
export const PanResponder = { create: () => ({ panHandlers: {} }) };
export const Easing = { linear: (t: any) => t, ease: (t: any) => t, inOut: (t: any) => t };

export default {
  View, Text, Image, TouchableOpacity, ScrollView, Modal,
  StyleSheet, Animated, Platform, Dimensions, Alert, Keyboard,
  StatusBar, FlatList, ActivityIndicator, TextInput, SafeAreaView,
  Pressable, useColorScheme, useWindowDimensions, AppRegistry,
  NativeModules, DeviceEventEmitter, NativeEventEmitter,
  PermissionsAndroid, Linking, Share, Vibration, BackHandler,
  InteractionManager, PanResponder, Easing,
};
