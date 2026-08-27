const { body, validationResult } = require('express-validator');
const ErrorResponse = require('../utils/errorResponse');

exports.handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg);
    return next(new ErrorResponse(errorMessages.join(', '), 400));
  }
  next();
};

exports.registerValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('confirmPassword')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    })
];

exports.loginValidation = [
  body('email')
  .isEmail()
  .normalizeEmail()
  .withMessage('Please provide a valid email'),
  body('password')
  .isLength({min:6})
  .withMessage('Password must be atleast 6 characters long')
]

exports.googleAuthValidation = [
  body('credential')
    .notEmpty()
    .withMessage('Google credential is required')
];

exports.aiChatValidation = [
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ max: 2000 })
    .withMessage('Message must be less than 2000 characters'),

  body('history')
    .optional()
    .isArray({ max: 20 })
    .withMessage('History must be an array of at most 20 messages'),

  body('history.*.role')
    .optional()
    .isIn(['user', 'assistant'])
    .withMessage('History entries must have role "user" or "assistant"'),

  body('history.*.content')
    .optional()
    .isString()
    .isLength({ max: 2000 })
    .withMessage('History entry content must be a string under 2000 characters'),
];

exports.teacherProfileValidation = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 100 })
    .withMessage('Name must be less than 100 characters'),
  
  body('address.street')
    .notEmpty()
    .withMessage('Street address is required'),
  
  body('address.city')
    .notEmpty()
    .withMessage('City is required'),
  
  body('address.state')
    .notEmpty()
    .withMessage('State is required'),
  


  body('contact.email')
    .isEmail()
    .withMessage('Please provide a valid contact email'),

  body('contact.phone')
    .optional({ checkFalsy: true })
    .matches(/^\+?[\d\s\-\(\)]{10,}$/)
    .withMessage('Please provide a valid phone number'),

  body('avatarPublicId')
    .notEmpty()
    .withMessage('Profile picture is required'),

  body('qualifications')
    .isArray({ min: 1 })
    .withMessage('At least one qualification is required'),
  
  body('qualifications.*.degree')
    .notEmpty()
    .withMessage('Degree is required for all qualifications'),
  
  body('qualifications.*.institution')
    .notEmpty()
    .withMessage('Institution is required for all qualifications'),
  
  body('qualifications.*.year')
    .isInt()
    .withMessage('Year must be a valid year'),
  
  body('preferredSubjects')
    .isArray({ min: 1 })
    .withMessage('At least one preferred subject is required'),

  body('cvPublicId')
    .notEmpty()
    .withMessage('CV/Resume is required'),

  body('bio')
    .optional({ checkFalsy: true })
    .isLength({ min: 20, max: 1000 })
    .withMessage('Bio must be between 20 and 1000 characters'),
  
  body('experience')
    .isInt({ min: 0, max: 50 })
    .withMessage('Experience must be between 0 and 50 years'),
  
  body('hourlyRate')
    .isFloat({ min: 0, max: 10000 })
    .withMessage('Hourly rate must be between 0 and ₨10,000'),
  
  body('teachingMode')
    .isIn(['Online', 'In-person', 'Both'])
    .withMessage('Teaching mode must be Online, In-person, or Both'),
  
  body('availability')
    .isArray({ min: 1 })
    .withMessage('At least one availability day is required'),
  
  body('availability.*')
    .isIn(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'])
    .withMessage('Invalid day')
];