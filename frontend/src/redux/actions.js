import { 
  FETCH_FILTERED_RECORDS_REQUEST,
  FETCH_FILTERED_RECORDS_SUCCESS,
  FETCH_FILTERED_RECORDS_FAILURE
} from './types';

export const fetchFilteredRecordsRequest = () => {
  return {
    type: FETCH_FILTERED_RECORDS_REQUEST
  }
}

export const fetchFilteredRecordsSuccess = (data) => {
  return {
    type: FETCH_FILTERED_RECORDS_SUCCESS,
    payload: data
  }
}

export const fetchFilteredRecordsFailure = (error) => {
  return {
    type: FETCH_FILTERED_RECORDS_FAILURE,
    payload: error
  }
}
