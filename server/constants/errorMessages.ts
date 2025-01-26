export const ERROR_CODES = {
  NOT_FOUND: 'ERR_NOT_FOUND',
  INVALID_ID: 'ERR_INVALID_ID',
  INVALID_REQUEST: 'ERR_INVALID_REQUEST',
  CREATE_ERROR: 'ERR_CREATE',
  RETRIEVE_ERROR: 'ERR_RETRIEVE',
  UPDATE_ERROR: 'ERR_UPDATE',
  DELETE_ERROR: 'ERR_DELETE',
  INTERNAL_SERVER_ERROR: 'ERR_INTERNAL_SERVER',
};

export const ERROR_MESSAGES = {
  NOT_FOUND: 'Requested resource not found',
  INVALID_ID: 'The provided ID is invalid',
  INVALID_REQUEST: 'The request data is not valid',
  CREATE_ERROR: 'Error occurred while creating resource',
  RETRIEVE_ERROR: 'Error occurred while retrieving data',
  UPDATE_ERROR: 'Error occurred while updating resource',
  DELETE_ERROR: 'Error occurred while deleting resource',
  INTERNAL_SERVER_ERROR: 'An unexpected error occurred on the server',
};
