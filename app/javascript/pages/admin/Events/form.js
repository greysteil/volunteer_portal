import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import R from 'ramda'
import moment from 'moment-timezone'

import EventForm from 'components/EventForm'

import s from './form.css'

const validate = values => {
  const errors = {}

  if (!values.title) {
    errors.title = 'is required'
  }
  if (!values.description) {
    errors.description = 'is required'
  }
  if (!values.eventType || values.eventType === '-') {
    errors.eventType = 'is required'
  }
  if (!values.organization || values.organization === '-') {
    errors.organization = 'is required'
  }
  if (!values.office || values.office === '-') {
    errors.office = 'is required'
  }
  if (!values.location) {
    errors.location = 'is required'
  }
  if (!values.startsAt) {
    errors.startsAt = 'is required'
  }
  if (!values.endsAt) {
    errors.endsAt = 'is required'
  }
  if (moment(values.endsAt).isBefore(moment(values.startsAt))) {
    errors.endsAt = 'is ending before it started'
  }
  if (!values.capacity || Number(values.capacity) === NaN) {
    errors.capacity = 'is required and must be a number'
  }

  return errors
}

const EventFormPage = ({ eventTypes, offices, organizations, handleSubmit, pristine, submitting, graphQLErrors }) => (
  <EventForm
    eventTypes={eventTypes}
    offices={offices}
    organizations={organizations}
    handleSubmit={handleSubmit}
    disableSubmit={pristine || submitting}
    errors={graphQLErrors}
  />
)

const withReduxForm = reduxForm({
  form: 'event',
  enableReinitialize: true,
  validate,
})

const mapStateToProps = ({ graphQLErrors }, { event }) => {
  const props = { graphQLErrors }

  return R.isNil(event) ? props : R.merge({ initialValues: event }, props)
}

const withActions = connect(mapStateToProps, {})

export default withActions(withReduxForm(EventFormPage))
