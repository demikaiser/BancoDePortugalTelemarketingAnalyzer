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

export const fetchFilteredRecordsSuccess = (records) => {
  return {
    type: FETCH_FILTERED_RECORDS_SUCCESS,
    payload: records
  }
}

export const fetchFilteredRecordsFailure = (error) => {
  return {
    type: FETCH_FILTERED_RECORDS_FAILURE,
    payload: error
  }
}
