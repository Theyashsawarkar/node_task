import httpsStatus from 'http-status';

export default {
  ok: (res, options = { message: 'data found' }) => {
    const opts = { statusCode: httpsStatus.status.OK, ...options };
    return res.status(httpsStatus.status.OK).send(opts);
  },

  created: (res, options = { message: 'data inserted' }) => {
    const opts = { statusCode: httpsStatus.status.CREATED, ...options };
    return res.status(httpsStatus.status.CREATED).send(opts);
  },

  badRequest: (res, options = { error: 'bad request' }) => {
    const opts = { statusCode: httpsStatus.status.BAD_REQUEST, ...options };
    return res.status(httpsStatus.status.BAD_REQUEST).send(opts);
  },

  noData: (res, options = { error: 'no data found' }) => {
    const opts = { statusCode: httpsStatus.status.NOT_FOUND, ...options };
    return res.status(httpsStatus.status.NOT_FOUND).send(opts);
  },

  noContent: (res, options = { error: 'no content' }) => {
    const opts = { statusCode: httpsStatus.status.NO_CONTENT, ...options };
    return res.status(httpsStatus.status.NO_CONTENT).send(opts);
  },

  unauthorized: (res, options = { error: 'Unauthorized' }) => {
    const opts = { statusCode: httpsStatus.status.UNAUTHORIZED, ...options };
    return res.status(httpsStatus.status.UNAUTHORIZED).send(opts);
  },

  unprocessableEntity: (res, options = { error: 'Unprocessable Entity' }) => {
    const opts = {
      statusCode: httpsStatus.status.UNPROCESSABLE_ENTITY,
      ...options,
    };
    return res.status(httpsStatus.status.UNPROCESSABLE_ENTITY).send(opts);
  },

  forbidden: (res, options = { error: 'Forbidden Entity' }) => {
    const opts = { statusCode: httpsStatus.status.FORBIDDEN, ...options };
    return res.status(httpsStatus.status.FORBIDDEN).send(opts);
  },
};
