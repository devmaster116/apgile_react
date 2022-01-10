import React, { Component } from 'react';
import {DetailView} from '@evenlogics/whf-ra-components';

export default class LocationsDetail extends Component {
	render() {
		return (
			<div>
				<DetailView
					id={this.props.match.params.id}
					entity="phrases"
					data={typeof this.props.location === 'undefined' ? false : this.props.location.aboutProps}
				/>
			</div>
		);
	}
}
