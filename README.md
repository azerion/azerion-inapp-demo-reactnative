# BlueStack React Native Demo

A demo React Native app showcasing the [`@azerion/bluestack-sdk-react-native`](https://www.npmjs.com/package/@azerion/bluestack-sdk-react-native) SDK on iOS and Android.

The app exercises the SDK's banner, interstitial, rewarded and MREC ad formats against the public test App ID `3167505` and bundle id `com.azerion.ads.testapp`.

## Prerequisites

-   **React Native 0.80** (see the [RN environment setup guide](https://reactnative.dev/docs/set-up-your-environment))
-   **Node.js 20** or higher
-   **Android**: API level 21+, JDK 17+, Android Build Tools 35.0.0
-   **iOS** (macOS only): iOS 13+, Xcode 14+, CocoaPods

## Running the demo

```bash
npm install
```

### Android

```bash
npm run start
```

### iOS

```bash
cd ios && pod install && cd ..
npm run start
```

## Test placements

The demo is wired to App ID `3167505`. The following placements are available:

| Format        | Placement                |
| ------------- | ------------------------ |
| Banner        | `/3167505/banner`        |
| Interstitial  | `/3167505/interstitial`  |
| MREC          | `/3167505/mrec`          |
| Native        | `/3167505/native`        |
| Rewarded      | `/3167505/rewarded`      |
| Overlay       | `/3167505/overlay`       |
| App Open      | `/3167505/appOpen`       |

Placement IDs are derived from the App ID in [`bsconfig.js`](./bsconfig.js); change that file to point the demo at a different App ID.

## Developing against a local SDK build

To run the demo against an in-progress local checkout of the SDK instead of the published npm package:

1. Point the dependency at the local path:

    ```json
    "dependencies": {
        "@azerion/bluestack-sdk-react-native": "/path/to/bluestack-sdk-react-native"
    }
    ```

2. Reinstall:

    ```bash
    npm install
    ```

3. If Metro doesn't pick up changes, add the SDK path to `metro.config.js`:

    ```js
    const packagePath = '/path/to/bluestack-sdk-react-native';

    module.exports = {
        resolver: { nodeModulesPaths: [packagePath] },
        watchFolders: [packagePath],
    };
    ```

## License

Apache 2.0 — see [LICENSE](./LICENSE).
