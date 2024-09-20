import { LogicExceptionList } from './types/logic-exceptions.enum';

type LogicExceptionBody = {
  httpStatusCode: number;
  message: string;
};

type LogicExceptionType = {
  [key in LogicExceptionList]: LogicExceptionBody;
};

export const Exceptions: LogicExceptionType = {
  [LogicExceptionList.RATE_LIMIT_DENIED]: {
    httpStatusCode: 429,
    message: 'Too many requests',
  },
  [LogicExceptionList.BLACK_LIST_NOT_FOUND]: {
    httpStatusCode: 404,
    message: 'Black list not found',
  },
  [LogicExceptionList.USER_ALREADY_IN_BLACK_LIST]: {
    httpStatusCode: 400,
    message: 'User already in black list',
  },
  [LogicExceptionList.ORDER_STATUS_INCORRECT]: {
    httpStatusCode: 400,
    message: 'Order status incorrect',
  },
  [LogicExceptionList.INSUFFICIENT_FUNDS]: {
    httpStatusCode: 400,
    message: 'Insufficient funds',
  },
  [LogicExceptionList.PRICE_NOT_FOUND]: {
    httpStatusCode: 404,
    message: 'Price not found',
  },
  [LogicExceptionList.REPLY_ALREADY_EXIST]: {
    httpStatusCode: 400,
    message: 'Reply already exist',
  },
  [LogicExceptionList.CHAT_CLOSED]: {
    httpStatusCode: 403,
    message: 'This chat is closed',
  },
  [LogicExceptionList.CHAT_CANNOT_START]: {
    httpStatusCode: 403,
    message: 'Chat is not available for this update',
  },
  [LogicExceptionList.CHAT_ALREADY_EXISTS]: {
    httpStatusCode: 400,
    message: 'Chat already exists',
  },
  [LogicExceptionList.CHAT_NOT_FOUND]: {
    httpStatusCode: 400,
    message: 'Chat not found',
  },
  [LogicExceptionList.REPLY_NOT_FOUND]: {
    httpStatusCode: 404,
    message: 'Reply not found',
  },
  [LogicExceptionList.EMPLOYEE_ITEM_NOT_FOUND]: {
    httpStatusCode: 400,
    message: "Employee item doesn't attach",
  },
  [LogicExceptionList.EMPLOYEE_ALREADY_ATTACH]: {
    httpStatusCode: 400,
    message: 'Employee already attach',
  },
  [LogicExceptionList.REVIEW_NOT_FOUND]: {
    httpStatusCode: 404,
    message: 'Review type not found',
  },
  [LogicExceptionList.WORK_TYPE_NOT_FOUND]: {
    httpStatusCode: 404,
    message: 'Work type not found',
  },
  [LogicExceptionList.WORK_TYPE_ALREADY_EXIST]: {
    httpStatusCode: 400,
    message: 'Work type already exist',
  },
  [LogicExceptionList.ITEM_NOT_FOUND]: {
    httpStatusCode: 404,
    message: 'Item not found',
  },
  [LogicExceptionList.ITEM_ALREADY_EXIST]: {
    httpStatusCode: 400,
    message: 'Item already exist',
  },
  [LogicExceptionList.ORDER_NOT_FOUND]: {
    httpStatusCode: 404,
    message: 'Order not found',
  },
  [LogicExceptionList.FILE_TOO_LARGE]: {
    httpStatusCode: 400,
    message: 'File size too large',
  },
  [LogicExceptionList.FILE_UNSUPPORTED_TYPE]: {
    httpStatusCode: 400,
    message: 'File type unsupported',
  },
  [LogicExceptionList.USER_NOT_FOUND]: {
    httpStatusCode: 404,
    message: 'User not found',
  },
  [LogicExceptionList.ACCESS_DENIED]: {
    httpStatusCode: 403,
    message: 'Access denied',
  },
  [LogicExceptionList.UNAUTHORIZED]: {
    httpStatusCode: 401,
    message: 'Unauthorized',
  },
  [LogicExceptionList.BALANCE_NOT_FOUND]: {
    httpStatusCode: 404,
    message: 'Balance not found',
  },
  [LogicExceptionList.COMMENT_ALREADY_EXISTS]: {
    httpStatusCode: 400,
    message: 'Comment already exist',
  },
};
