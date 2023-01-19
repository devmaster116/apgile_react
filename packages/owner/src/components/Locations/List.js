import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Button } from 'reactstrap';
import RemoteTable from '@evenlogics/whf-remote-table';
import { Modal } from 'react-bootstrap';
import { connect } from "react-redux";
import api from "@evenlogics/whf-api";
import App from "./SortOrderItem/App";
import List from "./SortOrderItem/data";

const LocationsList = (props) => {
	const [query, setQuery] = useState(false);
	const [allOrderItems, setAllOrderItems] = useState([])
	const [allVirtualButtons, setAllVirtualButtons] = useState([])
	const [selectedItems, setSelectedItems] = useState([])
	const [minDate, setMinDate] = useState('');
	const [valueOff, setValueOff] = useState(0);
	const [locationId, setLocationId] = useState(null);
	const [show, setShow] = useState(false);
	const [sortActionFor,setSortActionFor]=useState('')
	const [reloadItems,setReloadItems]=useState(false)

	/* eslint-disable */


	useEffect(() => {

		api.request("get", `/${props.branchId}/order-items?limit=1000`)
			.then(({ data }) => {
				setAllOrderItems(data)
			})
			.catch((error) => console.log(error));

		if (valueOff === 0) {
			setValueOff(1)
		} else {
			setQuery((prev) => !prev)
		}

		api.request("get", `/${props.branchId}/virtual-buttons?limit=1000`)
			.then(({ data }) => {
				console.log('vb',data)
				setAllVirtualButtons(data)
			})
			.catch((error) => console.log(error));

		
	}, [props.branchId,reloadItems]);




	/* eslint-enable */

	const changeStatus = (data) => {
		let payload = {
			status: !data?.status,
		}
		api.request("put", `/${props?.branchId}/location/status/${data?.id}`, payload)
			.then((data) => {
				setQuery(!query)
			})
			.catch((error) => console.log(error));
	}
	const handleClose = () => {
		setShow(false)
		List.clearList() 
		setSelectedItems([])
	};

	const handleSendSortedList = () => {
		const payload = {
			sorted_items: List.getList(),
		}
		console.log("payload :- ", payload, "locationId :- ", locationId)
		let url=`/${props?.branchId}/order-items-sorted`
		if(sortActionFor==='virtualButtons'){
			url=`/${props?.branchId}/vbtn-sorted`
		}
		api.request("post", url, payload)
			.then((data) => {
				handleClose()
				setQuery(!query)
				List.clearList()
				setReloadItems(!reloadItems)
			})
			.catch((error) => {
				console.log(error);
			});
	}
	

	const handleShow = (data, field) => {
		console.log(field)
		setSortActionFor(field)
		setLocationId(data?.id)
		let itemsForSorting = []
		if (field === 'orderItems') {
			allOrderItems.forEach((item) => {
				if (data?.order_items.includes(item.id)) {
					itemsForSorting.push(item)
				}
			})
		}
		if (field === 'virtualButtons') {
			allVirtualButtons.forEach((btn, i) => {
				if (data?.virtualbtn_ids.includes(btn.id)) {
					itemsForSorting.push(btn)
				}
			})
		}
		setSelectedItems(itemsForSorting)
		setShow(true)
	} 

	const filters = {
		start_date: {
			type: "date",
			label: "Select From",
			col: 4,
			getValue: (data) => {
				setTimeout(() => {
					setMinDate(data?.value)
				}, 0)
			}
		},
		end_date: {
			type: "date",
			label: "Select To",
			col: 4,
			placeholderText: minDate ? "" : "Please select the start date",
			disabled: minDate ? false : true,
			minDate: minDate,
		}
	};

	const columns = [
		{
			hidden: true,
			dataField: "id",
			text: "ID",
			align: "center",
			sort: true,
		},
		{
			dataField: "created_at",
			text: "Created At",
			align: "center",
			sort: true,
		},
		{
			dataField: 'name',
			text: 'Name',
			align: 'center',
			sort: true
		},
		{
			dataField: 'description',
			text: 'Description',
			align: 'center',
			sort: true
		},

		{
			isDummyField: true,
			text: "Start Time",
			align: "center",
			sort: true,
			formatter: (cell, row) => {
				if (row?.start_list) {
					return (
						<span className="badge badge-dark">
							{row?.start_list}
						</span>
					)
				}
			},
		},
		{
			isDummyField: true,
			text: "End Time",
			align: "center",
			sort: true,
			formatter: (cell, row) => {
				if (row?.end_list) {
					return (
						<span className="badge badge-dark">
							{row?.end_list}
						</span>
					)
				}
			},
		},

		{
			dataField: 'weekdays_name',
			text: 'Days',
			align: 'center',
			sort: true
		},
		{
			isDummyField: true,
			align: "center",
			text: "Status",
			sort: true,
			formatter: (cell, row) => {
				return (
					<Button color={row?.status ? "success" : "danger"} onClick={() => changeStatus(row)}>
						{row?.status === 0 ? "Inactive" : "Active"}
					</Button>
				);
			},
		},
		{
			isDummyField: true,
			align: "center",
			text: "Sort Virtual Buttons",
			sort: true,
			formatter: (cell, row) => {
				return (
					<Button color={'info'} size='sm' onClick={(e) => {
						handleShow(row,'virtualButtons')
					}}>Sort Virtual Buttons</Button>
				);
			},
		},



	];
	if (props.extendedFields) {
		props.extendedFields.forEach(field => columns.push(field))
	}
	const defaultSorted = [
		{
			dataField: 'id',
			order: 'desc'
		}
	];

	console.log({selectedItems})

	return (
		<>
			{selectedItems.length > 0 && <Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>Sort the items</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{<App allOrderItems={selectedItems} />}
				</Modal.Body>
				<Modal.Footer>
					<Button color="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button color="primary" onClick={handleSendSortedList}>Apply</Button>
				</Modal.Footer>
			</Modal>
			}
			<div className="animated">
				<Card>
					<CardHeader>
						<strong>All Locations</strong>
					</CardHeader>
					<CardBody>
						<RemoteTable
							entity={`${props?.branchId}/locations`}
							customEntity={`locations`}
							columns={columns}
							sort={defaultSorted}
							hideDetail={true}
							filters={filters}
							showAAdvancedFilters={true}
							addRoute="/locations/add"
							{...props.remoteTableFields}
							Query={query}
							customButton={{
								name: "Sort Order Items",
								color: "warning",
								classes: "text-white",
								callback: (data) => handleShow(data,'orderItems'),
							}}
						/>
					</CardBody>
				</Card>
			</div>
		</>

	);

}

const mapStateToProps = state => {
	return {
		branchId: state.selectedBranchId,
		companyName: state.companyName,
		companyId: state.companyId,
		userRole: state.userRole
	}
}

export default connect(mapStateToProps, null)(LocationsList);

