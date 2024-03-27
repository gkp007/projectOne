import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { useAuth } from './hooks';
import PrivateRoutes from './routes/private';
import PublicRoutes from './routes/public';
// import { Splash } from './screens/public';

const Routes = () => {
    const { user, getUser } = useAuth();
    const [isEnter, setIsEnter] = React.useState<string | null>();
    const getUserEnter = async () => {
        try {
            const viewedOnboarding = await AsyncStorage.getItem('viewedOnboarding');
            setIsEnter(viewedOnboarding);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getUserEnter();
        (async () => {
            getUser();
        })();
    }, [getUser]);

    const [isLoading, setIsLoading] = React.useState(true);
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);
    if (isLoading) {
        // return <Splash />;
    }
    console.log('user', user)
    return user ? (
        <PrivateRoutes />
    ) : (
        <PublicRoutes initialRouteName={isEnter ? 'Login' : 'Onboarding'} />
    );
};

export default Routes;