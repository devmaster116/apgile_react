import React from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { Helper, ErrorBoundary, TheContent, TheSidebar, TheAside, TheFooter } from '@evenlogics/whf-ra-components';
import TheHeader from '../components/TheHeader';

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
			<TheSidebar />
			<TheAside />
			<div className="c-wrapper">
				<TheHeader />
				<ErrorBoundary>
					<div className="c-body">
						<TheContent />
					</div>
				</ErrorBoundary>
				<TheFooter />
			</div>
		</div>
	);
};

export default TheLayout;
