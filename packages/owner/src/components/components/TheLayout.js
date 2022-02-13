import React from 'react';
import {useSelector} from 'react-redux';
import classNames from 'classnames';
import {Helper, ErrorBoundary, TheContent, TheSidebar, TheAside, TheFooter} from '@evenlogics/whf-ra-components';
import TheHeader from '../components/TheHeader';
import {Provider} from 'react-redux';
import store from '../Redux/Store';

const TheLayout = (props) => {
    const darkMode = useSelector((state) => state.darkMode);
    const classes = classNames('c-app c-default-layout', darkMode && 'c-dark-theme');

    // React.useEffect(() => {
    // 	Helper.verifyAuth(props);
    // }, [props]);

    React.useEffect(() => {
        Helper.themeActiveMode();
    }, [])

    return (
        <div className={classes}>
            <TheSidebar/>
            <TheAside/>
            <Provider store={store}>
                <div className="c-wrapper">
                    <TheHeader/>
                    <ErrorBoundary>
                        <div className="c-body">
                            <TheContent/>
                        </div>
                    </ErrorBoundary>
                    <TheFooter/>
                </div>
            </Provider>
        </div>
    );
};

export default TheLayout;
