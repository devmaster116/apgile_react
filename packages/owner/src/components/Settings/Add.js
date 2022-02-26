import React  from 'react';
import {Card, CardBody, CardHeader} from 'reactstrap';
import {FormGenerator} from '@evenlogics/whf-form-generator';
import {connect} from "react-redux";


const Add = (props) => {

        const id = props.branchId;

        const fields = {
          wait_time: {
            type: "number",
            label: "Wait Time",
            required: true,
            name: "wait_time",
            col: 3,
          },
          escalation_hop: {
            type: "number",
            label: "Escalation Hop",
            // required: true,
            name: "escalation_hop",
            col: 3,
          },
          cycle: {
            type: "number",
            label: "Cycle",
            required: true,
            name: "cycle",
            col: 3,
          },
          throttle_wait: {
            type: "number",
            label: "Throttle Wait",
            required: true,
            name: "throttle_wait",
            col: 3,
          },
          // timezone:{
          //   type: 'advanceSelect',
          //   label: "Time Zone",
          //   target: 'https://maps.googleapis.com/maps/api/timezone/json?location=39.6034810%2C-119.6822510&timestamp=1331161200&key=AIzaSyAqJxkc1a0TqV8ED9ThtsvwJcQoRTlIzhY&libraries=places&v=weekly',
          //   // async: true,
          //   name: 'timezone',
          //   // multi:true,
          //   required: true,
          //   col: 4
          // },

          "Site Content": {
            isDummyField: true,
            type: "h4",
            col: 12,
          },

          page_title:{
            type: "text",
            label: "Title",
            // required: true,
            col: 4,
          },

          page_subtitle:{
            type: "text",
            label: "Sub Title",
            // required: true,
            col: 4,
          },

          timezone: {
            type: "advanceSelect",
            label: "Timezone",
            name: "timezone",
            // target: 'timezones',
            required: true,
            options: [{"value":"Pacific/Midway","label":"(GMT-11:00) Midway Island"},{"value":"US/Samoa","label":"(GMT-11:00) Samoa"},{"value":"US/Hawaii","label":"(GMT-10:00) Hawaii"},{"value":"US/Alaska","label":"(GMT-09:00) Alaska"},{"value":"US/Pacific","label":"(GMT-08:00) Pacific Time (US & Canada)"},{"value":"America/Tijuana","label":"(GMT-08:00) Tijuana"},{"value":"US/Arizona","label":"(GMT-07:00) Arizona"},{"value":"US/Mountain","label":"(GMT-07:00) Mountain Time (US & Canada)"},{"value":"America/Chihuahua","label":"(GMT-07:00) Chihuahua"},{"value":"America/Mazatlan","label":"(GMT-07:00) Mazatlan"},{"value":"America/Mexico_City","label":"(GMT-06:00) Mexico City"},{"value":"America/Monterrey","label":"(GMT-06:00) Monterrey"},{"value":"Canada/Saskatchewan","label":"(GMT-06:00) Saskatchewan"},{"value":"US/Central","label":"(GMT-06:00) Central Time (US & Canada)"},{"value":"US/Eastern","label":"(GMT-05:00) Eastern Time (US & Canada)"},{"value":"US/East-Indiana","label":"(GMT-05:00) Indiana (East)"},{"value":"America/Bogota","label":"(GMT-05:00) Bogota"},{"value":"America/Lima","label":"(GMT-05:00) Lima"},{"value":"America/Caracas","label":"(GMT-04:30) Caracas"},{"value":"Canada/Atlantic","label":"(GMT-04:00) Atlantic Time (Canada)"},{"value":"America/La_Paz","label":"(GMT-04:00) La Paz"},{"value":"America/Santiago","label":"(GMT-04:00) Santiago"},{"value":"Canada/Newfoundland","label":"(GMT-03:30) Newfoundland"},{"value":"America/Buenos_Aires","label":"(GMT-03:00) Buenos Aires"},{"value":"Greenland","label":"(GMT-03:00) Greenland"},{"value":"Atlantic/Stanley","label":"(GMT-02:00) Stanley"},{"value":"Atlantic/Azores","label":"(GMT-01:00) Azores"},{"value":"Atlantic/Cape_Verde","label":"(GMT-01:00) Cape Verde Is."},{"value":"Africa/Casablanca","label":"(GMT) Casablanca"},{"value":"Europe/Dublin","label":"(GMT) Dublin"},{"value":"Europe/Lisbon","label":"(GMT) Lisbon"},{"value":"Europe/London","label":"(GMT) London"},{"value":"Africa/Monrovia","label":"(GMT) Monrovia"},{"value":"Europe/Amsterdam","label":"(GMT+01:00) Amsterdam"},{"value":"Europe/Belgrade","label":"(GMT+01:00) Belgrade"},{"value":"Europe/Berlin","label":"(GMT+01:00) Berlin"},{"value":"Europe/Bratislava","label":"(GMT+01:00) Bratislava"},{"value":"Europe/Brussels","label":"(GMT+01:00) Brussels"},{"value":"Europe/Budapest","label":"(GMT+01:00) Budapest"},{"value":"Europe/Copenhagen","label":"(GMT+01:00) Copenhagen"},{"value":"Europe/Ljubljana","label":"(GMT+01:00) Ljubljana"},{"value":"Europe/Madrid","label":"(GMT+01:00) Madrid"},{"value":"Europe/Paris","label":"(GMT+01:00) Paris"},{"value":"Europe/Prague","label":"(GMT+01:00) Prague"},{"value":"Europe/Rome","label":"(GMT+01:00) Rome"},{"value":"Europe/Sarajevo","label":"(GMT+01:00) Sarajevo"},{"value":"Europe/Skopje","label":"(GMT+01:00) Skopje"},{"value":"Europe/Stockholm","label":"(GMT+01:00) Stockholm"},{"value":"Europe/Vienna","label":"(GMT+01:00) Vienna"},{"value":"Europe/Warsaw","label":"(GMT+01:00) Warsaw"},{"value":"Europe/Zagreb","label":"(GMT+01:00) Zagreb"},{"value":"Europe/Athens","label":"(GMT+02:00) Athens"},{"value":"Europe/Bucharest","label":"(GMT+02:00) Bucharest"},{"value":"Africa/Cairo","label":"(GMT+02:00) Cairo"},{"value":"Africa/Harare","label":"(GMT+02:00) Harare"},{"value":"Europe/Helsinki","label":"(GMT+02:00) Helsinki"},{"value":"Europe/Istanbul","label":"(GMT+02:00) Istanbul"},{"value":"Asia/Jerusalem","label":"(GMT+02:00) Jerusalem"},{"value":"Europe/Kiev","label":"(GMT+02:00) Kyiv"},{"value":"Europe/Minsk","label":"(GMT+02:00) Minsk"},{"value":"Europe/Riga","label":"(GMT+02:00) Riga"},{"value":"Europe/Sofia","label":"(GMT+02:00) Sofia"},{"value":"Europe/Tallinn","label":"(GMT+02:00) Tallinn"},{"value":"Europe/Vilnius","label":"(GMT+02:00) Vilnius"},{"value":"Asia/Baghdad","label":"(GMT+03:00) Baghdad"},{"value":"Asia/Kuwait","label":"(GMT+03:00) Kuwait"},{"value":"Africa/Nairobi","label":"(GMT+03:00) Nairobi"},{"value":"Asia/Riyadh","label":"(GMT+03:00) Riyadh"},
              {"value":"Europe/Moscow","label":"(GMT+03:00) Moscow"},{"value":"Asia/Tehran","label":"(GMT+03:30) Tehran"},{"value":"Asia/Baku","label":"(GMT+04:00) Baku"},{"value":"Europe/Volgograd","label":"(GMT+04:00) Volgograd"},{"value":"Asia/Muscat","label":"(GMT+04:00) Muscat"},{"value":"Asia/Tbilisi","label":"(GMT+04:00) Tbilisi"},{"value":"Asia/Yerevan","label":"(GMT+04:00) Yerevan"},{"value":"Asia/Kabul","label":"(GMT+04:30) Kabul"},{"value":"Asia/Karachi","label":"(GMT+05:00) Karachi"},{"value":"Asia/Tashkent","label":"(GMT+05:00) Tashkent"},{"value":"Asia/Kolkata","label":"(GMT+05:30) Kolkata"},{"value":"Asia/Kathmandu","label":"(GMT+05:45) Kathmandu"},{"value":"Asia/Yekaterinburg","label":"(GMT+06:00) Ekaterinburg"},{"value":"Asia/Almaty","label":"(GMT+06:00) Almaty"},{"value":"Asia/Dhaka","label":"(GMT+06:00) Dhaka"},{"value":"Asia/Novosibirsk","label":"(GMT+07:00) Novosibirsk"},{"value":"Asia/Bangkok","label":"(GMT+07:00) Bangkok"},{"value":"Asia/Jakarta","label":"(GMT+07:00) Jakarta"},{"value":"Asia/Krasnoyarsk","label":"(GMT+08:00) Krasnoyarsk"},{"value":"Asia/Chongqing","label":"(GMT+08:00) Chongqing"},{"value":"Asia/Hong_Kong","label":"(GMT+08:00) Hong Kong"},{"value":"Asia/Kuala_Lumpur","label":"(GMT+08:00) Kuala Lumpur"},{"value":"Australia/Perth","label":"(GMT+08:00) Perth"},{"value":"Asia/Singapore","label":"(GMT+08:00) Singapore"},{"value":"Asia/Taipei","label":"(GMT+08:00) Taipei"},{"value":"Asia/Ulaanbaatar","label":"(GMT+08:00) Ulaan Bataar"},{"value":"Asia/Urumqi","label":"(GMT+08:00) Urumqi"},{"value":"Asia/Irkutsk","label":"(GMT+09:00) Irkutsk"},{"value":"Asia/Seoul","label":"(GMT+09:00) Seoul"},{"value":"Asia/Tokyo","label":"(GMT+09:00) Tokyo"},{"value":"Australia/Adelaide","label":"(GMT+09:30) Adelaide"},{"value":"Australia/Darwin","label":"(GMT+09:30) Darwin"},{"value":"Asia/Yakutsk","label":"(GMT+10:00) Yakutsk"},{"value":"Australia/Brisbane","label":"(GMT+10:00) Brisbane"},{"value":"Australia/Canberra","label":"(GMT+10:00) Canberra"},{"value":"Pacific/Guam","label":"(GMT+10:00) Guam"},{"value":"Australia/Hobart","label":"(GMT+10:00) Hobart"},{"value":"Australia/Melbourne","label":"(GMT+10:00) Melbourne"},{"value":"Pacific/Port_Moresby","label":"(GMT+10:00) Port Moresby"},{"value":"Australia/Sydney","label":"(GMT+10:00) Sydney"},{"value":"Asia/Vladivostok","label":"(GMT+11:00) Vladivostok"},{"value":"Asia/Magadan","label":"(GMT+12:00) Magadan"},{"value":"Pacific/Auckland","label":"(GMT+12:00) Auckland"},{"value":"Pacific/Fiji","label":"(GMT+12:00) Fiji"}],
            // key:'target',
            // optionValue: 'id',
            // optionLabel: 'name',
            col: 4,
            // async:true
          },

          "Social Media Links": {
            isDummyField: true,
            type: "h4",
            col: 12,
          },
          facebook:{
            type: "text",
            label: "Facebook",
            // required: true,
            name: "facebook",
            col: 6,
          },
          instagram:{
            type: "text",
            label: "Instagram",
            // required: true,
            name: "instagram",
            col: 6,
          },
          linkedin : {
            type: "text",
            label: "Linkedin",
            // required: true,
            name: "linkedin",
            col: 6,
          },
          youtube : {
            type: "text",
            label: "Youtube",
            // required: true,
            name: "youtube",
            col: 6,
          },
          reddit: {
            type: "text",
            label: "Reddit",
            // required: true,
            name: "reddit",
            col: 6,
          },
          pinterest : {
            type: "text",
            label: "Pinterest",
            // required: true,
            name: "pinterest",
            col: 6,
          },
          twitter: {
            type: "text",
            label: "Twitter",
            // required: true,
            name: "twitter",
            col: 6,
          }

        };

        return (
            <Card className="animated fadeIn xl-12 lg-12 md-12 sm-12 xs-12">
                <CardHeader>
                   Branch Settings
                </CardHeader>
                <CardBody>
                    <FormGenerator
                        targetEntity={`${props.branchId}/setting`}
                        // getValues={this.handleValue}
                        fields={fields}
                        targetId={id}
                        name="setting"
                        // repeater={true}
                        // initialValues={props.location.aboutProps}
                        extraVals={{branch_id: props.branchId}}
                        redirect="setting/add"
                        // debug={true}
                        // handleSameValueFields={['title', 'slug']}
                    />
                </CardBody>
            </Card>
        );

}

const mapStateToProps = state => {
	return {
		branchId : state.selectedBranchId,
	  }
  }


export default connect(mapStateToProps,null)(Add);
