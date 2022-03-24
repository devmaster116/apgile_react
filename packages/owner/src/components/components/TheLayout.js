import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import classNames from 'classnames';
import {Helper, ErrorBoundary, TheContent, TheSidebar, TheAside, TheFooter} from '@evenlogics/whf-ra-components';
import TheHeader from '../components/TheHeader';
import {Provider} from 'react-redux';
import store from '../Redux/Store';

const TheLayout = (props) => {
    const darkMode = useSelector((state) => state.darkMode);
    const classes = classNames('c-app c-default-layout', darkMode && 'c-dark-theme');
    const [internalActive, setInternalActive] = useState(' internal-disabled');
    const [promotionActive, setPromotionActive] = useState(' promotion-disabled');

    // React.useEffect(() => {
    // 	Helper.verifyAuth(props);
    // }, [props]);

    React.useEffect(() => {
        Helper.themeActiveMode();

        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if(currentUser?.settings?.internal_active) {
            setInternalActive(" internal-enabled");
        }

        if(currentUser?.settings?.promotions) {
            setPromotionActive(" promotion-enabled");
        }
        // console.log('asldkfj', currentUser.settings.internal_active);
    }, [])

    return (
        <div className={classes + internalActive + promotionActive}>
            {
                JSON.parse(localStorage.getItem('currentUser'))&& <TheSidebar/>
            }

            <TheAside/>
            <Provider store={store}>
                <div className="c-wrapper">
               { JSON.parse(localStorage.getItem('currentUser'))&& <TheHeader/>}

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
