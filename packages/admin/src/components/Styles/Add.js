import React, { useState, useEffect } from "react";
import { Formik, ErrorMessage } from "formik";
import * as yup from "yup";
import { Col, Row, Form, Button, Spinner, Alert } from "react-bootstrap";
import Api from "@evenlogics/whf-api";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import "./branchStyle.css";

const Add = (props) => {
  const [companies, setCompanies] = useState([]);
  const [editForm, setEditForm] = useState([]);
  const { id } = props.match.params;
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      Api.request("get", "/styles/" + id).then((response) => {
        console.log("styles", response.data);
        setEditForm(response.data);
        setTimeout(() => {
          setLoader(false);
        }, 3000);
      });
    } else {
      setLoader(false);
    }

    Api.request("get", "/companies?limit=1000000").then((response) => {  
      setCompanies(response.data.map((type) => (
        { value: type.id, label: type.name }
      )));
    });
  }, [ id]);

  const handleInputChange = (e, setFieldValue) => {
    if (e.target) {
      setFieldValue(e.target.name, e.target.value);
    }
  };
  const handleSelectChange = (e, setFieldValue, name) => {
    console.log(e);
    setFieldValue(name, e.value);
  };

  const validationSchema = () => {
    return yup.object().shape({
      company_id: yup.string().required("Select  Company").nullable(),
      name: yup.string().required("Select Name!"),
      font_color: yup.string().required("Font Color is required!"),
      logo: id? "": yup.string().required("Logo is required!").nullable(),
    });
  };

  const initialValues = {
    company_id: editForm.company_id ? editForm.company_id : null,
    name: editForm.name ? editForm.name : "",
    font_color: editForm.font_color ? editForm.font_color : "",
    bg_color: editForm.bg_color ? editForm.bg_color : "",
    logo: null,
    bg_image: null,
  };

  const onSubmit = (values) => {
    console.log(values);
    setSubmitting(true);
    let formData = new FormData();

    if (id && values.logo === null) {
      delete values.logo;
    }
    if ((id && values.bg_image === null) || (values.bg_image === null) ) {
      delete values.bg_image;
    }
    Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);     
    });
    if (id) {
      formData.append("_method", "PATCH");
    }

    setTimeout(() => {
      let url = "/styles";
      let method = "post";
      if (id) {
        url = "/styles/" + id;  
      }
      Api.request(method, url, formData)
        .then((response) => {
          console.log("res", response);
          if (response?.data?.id) {
            setSubmitting(false);
            toast.success("Successfully Added");
            props.history.push("/owner/styles");
          }
        })
        .catch((err) => {
          console.log("err", err.response?.data?.errors);
          setSubmitting(false);
          if (err.response?.data?.errors) {
            setError(Object.values(err.response?.data?.errors));
            window.scrollTo(0, 0);
          }
        });
    }, 1000);
  };

  return (
    <div className="card globalCard">
      {loader ? (
        <div className=" text-center h-25 card-body">
          <Spinner animation="grow" />
        </div>
      ) : (
        <div className="card-body ">
          {error.length > 0 ? (
            <Alert variant={"danger"}>
              <ul>
                {error.map((error) => (
                  <li>{error}</li>
                ))}
              </ul>
            </Alert>
          ) : (
            ""
          )}

          <Formik
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={onSubmit}
            enableReinitialize={true}
          >
            {({
              values,
              setFieldValue,
              handleSubmit,
              errors,
              touched
            }) => (
              <form onSubmit={handleSubmit}>
                <Row className="mb-3">

                  <Form.Group as={Col} lg="12" className="mb-4">
                    <h4>Add Company Style</h4>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    lg="6"
                    xxl="4"
                    controlId="company_id"
                    className="form-group"
                  >
                    <Form.Label>Select Company *</Form.Label>

                    <Select
                      options={companies}
                      defaultValue={companies.filter(
                        (cat) => cat.value === values.company_id
                      )}
                      name="company_id"
                      onChange={(e) =>
                        handleSelectChange(e, setFieldValue, "company_id")
                      }
                    ></Select>

                    <div
                      style={{
                        color: "red",
                      }}
                    >
                      <ErrorMessage name="company_id" />
                    </div>
                  </Form.Group>
                  {/*******Vendor *******/}
                  <Form.Group as={Col} lg="12" className="mb-4 mt-2">
                    <h4>Style Details</h4>
                  </Form.Group>

                  {/*******Restaurant Details *******/}

                  <Form.Group
                    as={Col}
                    lg="6"
                    xxl="4"
                    controlId="name"
                    className="form-group"
                  >
                    <Form.Label>Enter Style Name *</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Style Name"
                      name="name"
                      value={values.name}
                      onChange={(e) => {
                        handleInputChange(e, setFieldValue);
                      }}
                    />
                    <div
                      style={{
                        color: "red",
                      }}
                    >
                      <ErrorMessage name="name" />
                    </div>
                  </Form.Group>

                  <Form.Group
                    as={Col}
                    lg="3"
                    xxl="4"
                    controlId="font_color"
                    className="form-group"
                  >
                    <Form.Label>Font Color *</Form.Label>
                    <Form.Control
                      type="color"
                      placeholder="Pick Color"
                      name="font_color"
                      value={values.font_color}
                      onChange={(e) => {
                        handleInputChange(e, setFieldValue);
                      }}
                    />
                    <div
                      style={{
                        color: "red",
                      }}
                    >
                      <ErrorMessage name="font_color" />
                    </div>
                  </Form.Group>

                  <Form.Group
                    as={Col}
                    lg="3"
                    xxl="4"
                    controlId="bg_color"
                    className="form-group"
                  >
                    <Form.Label>Background Color </Form.Label>
                    <Form.Control
                      type="color"
                      placeholder="Pick Background Color"
                      name="bg_color"
                      value={values.bg_color}
                      onChange={(e) => {
                        handleInputChange(e, setFieldValue);
                      }}
                    />
                    <div
                      style={{
                        color: "red",
                      }}
                    >
                      <ErrorMessage name="bg_color" />
                    </div>
                  </Form.Group>

                  {/******* Media *******/}

                  <Form.Group as={Col} lg="12" className="my-4">
                    <h4>Media</h4>
                  </Form.Group>

                  <Form.Group
                    as={Col}
                    lg="6"
                    xxl="4"
                    controlId="logo"
                    className="form-group"
                  >
                    <Form.Label>Logo *</Form.Label>
                    <Form.Control
                      type="file"
                      placeholder="Select Coupon image"
                      name="logo"
                      onChange={(e) => {
                        setFieldValue("logo", e.currentTarget.files[0]);
                      }}
                    />
                    <div
                      style={{
                        color: "red",
                      }}
                    >
                      <ErrorMessage name="logo" />
                    </div>

                    {id ? (
                      <div className="imageBox mt-2">
                        <img
                          src={editForm?.logo?.url}
                          alt="logo"
                          className=" img-thumbnail "
                        />
                      </div>
                    ) : (
                      ""
                    )}
                  </Form.Group>

                  <Form.Group
                    as={Col}
                    lg="6"
                    xxl="4"
                    controlId="bg_image"
                    className="form-group"
                  >
                    <Form.Label>Background Image </Form.Label>
                    <Form.Control
                      type="file"
                      placeholder="Select Coupon image"
                      name="bg_image"
                      onChange={(e) => {
                        setFieldValue("bg_image", e.currentTarget.files[0]);
                      }}
                    />
                    <div
                      style={{
                        color: "red",
                      }}
                    >
                      <ErrorMessage name="bg_image" />
                    </div>

                    {id ? (
                      <div className="imageBox mt-2">
                        <img
                          src={editForm?.bg_image?.url}
                          alt="Shop Banner"
                          className=" img-thumbnail "
                        />
                      </div>
                    ) : (
                      ""
                    )}
                  </Form.Group>

                  <Form.Group as={Col} lg="12" className="form-group">
                    <Button
                      variant="primary"
                      type="submit"
                      disabled={submitting}
                    >
                      {submitting ? (
                        <>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                          &nbsp; Submiting...
                        </>
                      ) : (
                        "Submit"
                      )}
                    </Button>
                  </Form.Group>
                </Row>

                {true && (
                  <div className={'row'}>
                    <div className={'col-12'}>
                      <code>
                        <pre>Values: {JSON.stringify(values, null, 2)}</pre>
                      </code>
                    </div>
                    <div className={'col-12'}>
                      <pre>Errors: {JSON.stringify(errors, null, 2)}</pre>
                    </div>
                    <div className={'col-12'}>
                      <pre>Touched: {JSON.stringify(touched, null, 2)}</pre>
                    </div>
                  </div>
                )}
              </form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
};

export default Add;
