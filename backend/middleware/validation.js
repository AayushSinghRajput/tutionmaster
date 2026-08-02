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
  
  body('address.zipCode')
    .notEmpty()
    .withMessage('ZIP code is required')
    .isInt({ min: 10000, max: 99999 })
    .withMessage('ZIP code must be a valid 5-digit number'),
  
  body('contact.email')
    .isEmail()
    .withMessage('Please provide a valid contact email'),
  
  body('contact.phone')
    .matches(/^\+?[\d\s\-\(\)]{10,}$/)
    .withMessage('Please provide a valid phone number'),
  
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
  
  body('bio')
    .notEmpty()
    .withMessage('Bio is required')
    .isLength({ min: 50, max: 1000 })
    .withMessage('Bio must be between 50 and 1000 characters'),
  
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
  
  body('availability.*.day')
    .isIn(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'])
    .withMessage('Invalid day'),
  
  body('availability.*.timeSlots')
    .isArray({ min: 1 })
    .withMessage('At least one time slot is required per day'),
  
  body('availability.*.timeSlots.*.startTime')
    .matches(/^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM|am|pm)$/)
    .withMessage('Start time must be in HH:MM AM/PM format'),
  
  body('availability.*.timeSlots.*.endTime')
    .matches(/^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM|am|pm)$/)
    .withMessage('End time must be in HH:MM AM/PM format')
];