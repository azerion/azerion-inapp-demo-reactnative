import { AppRegistry, Platform } from 'react-native';

import App from './app/App';
import {name as appName} from './app.json';

import { AdsConsent, AdsConsentInfo, AdsConsentStatus } from 'react-native-google-mobile-ads';
import { BluestackSDK, BlueStackPrivacySettings } from '@azerion/bluestack-sdk-react-native';

import logger from './app/Logger.ts';
import config from './bsconfig';

const appId = Platform.OS === 'ios' ? config.IOS_APP_ID : config.ANDROID_APP_ID;

// Initialize Consent and Ads
(async () => {
    const consentInfo: AdsConsentInfo = await AdsConsent.requestInfoUpdate();
    logger.log('consent info', consentInfo);

    // @ts-ignore
    if (consentInfo.privacyOptionsRequirementStatus == AdsConsentStatus.REQUIRED && consentInfo.status !== AdsConsentStatus.OBTAINED) {
        const formResult = await AdsConsent.showForm()
        const { storeAndAccessInformationOnDevice } = await AdsConsent.getUserChoices();
        logger.log('deviceinfo:', storeAndAccessInformationOnDevice)
    }

    BlueStackPrivacySettings.setIsAgeRestrictedUser(false);

    BluestackSDK.initialize(appId, true)
        .then(() => {
            logger.log('Sdk initialized');
        })
        .catch((e: Error) => {
            logger.log('Sdk initialization failed: ' + e.toString());
        });
})();

/**
 * Register the main app
 */
AppRegistry.registerComponent(appName, () => App);
