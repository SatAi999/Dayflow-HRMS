/**
 * Validates request body/query/params against a custom validator function.
 * @param {Function} validatorFunc Function containing validation rules.
 */
export const validateRequest = (validatorFunc) => {
  return (req, res, next) => {
    const { error, value } = validatorFunc(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed.',
        errorCode: 'VALIDATION_ERROR',
        details: error.details ? error.details.map(d => d.message) : error.message
      });
    }

    // Replace request body with parsed/validated content
    req.body = value || req.body;
    next();
  };
};
