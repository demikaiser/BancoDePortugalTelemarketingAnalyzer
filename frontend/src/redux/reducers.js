import { 
  FETCH_FILTERED_RECORDS_REQUEST,
  FETCH_FILTERED_RECORDS_SUCCESS,
  FETCH_FILTERED_RECORDS_FAILURE
} from './types';

const initialState = {
  filteredRecordsLoading: false,
  filteredRecordsError: '',
  filteredRecords: []
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_FILTERED_RECORDS_REQUEST: 
      return {
        ...state, 
        filteredRecordsLoading: true
      };
    case FETCH_FILTERED_RECORDS_SUCCESS: 
      return {
        ...state, 
        filteredRecordsLoading: false,
        filteredRecords: action.payload,
        filteredRecordsError: ''
      };
    case FETCH_FILTERED_RECORDS_FAILURE: 
      return {
        ...state, 
        filteredRecordsLoading: false,
        filteredRecordsError: action.payload
      };
    default: return state;
  }
}

export default reducer;