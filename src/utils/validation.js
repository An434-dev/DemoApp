/**
 * Input validation utilities
 */

/**
 * Validate email format
 * @param {string} email
 * @returns {Object} { isValid: boolean, error: string }
 */
export const validateEmail = email => {
  if (!email || email.trim() === '') {
    return { isValid: false, error: 'Email is required' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }

  return { isValid: true, error: '' };
};

/**
 * Validate password
 * @param {string} password
 * @param {Object} options - Validation options
 * @returns {Object} { isValid: boolean, error: string }
 */
export const validatePassword = (password, options = {}) => {
  const {
    minLength = 6,
    requireUppercase = false,
    requireLowercase = false,
    requireNumber = false,
    requireSpecialChar = false,
  } = options;

  if (!password || password.trim() === '') {
    return { isValid: false, error: 'Password is required' };
  }

  if (password.length < minLength) {
    return {
      isValid: false,
      error: `Password must be at least ${minLength} characters`,
    };
  }

  if (requireUppercase && !/[A-Z]/.test(password)) {
    return {
      isValid: false,
      error: 'Password must contain at least one uppercase letter',
    };
  }

  if (requireLowercase && !/[a-z]/.test(password)) {
    return {
      isValid: false,
      error: 'Password must contain at least one lowercase letter',
    };
  }

  if (requireNumber && !/[0-9]/.test(password)) {
    return {
      isValid: false,
      error: 'Password must contain at least one number',
    };
  }

  if (requireSpecialChar && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return {
      isValid: false,
      error: 'Password must contain at least one special character',
    };
  }

  return { isValid: true, error: '' };
};

/**
 * Validate phone number
 * @param {string} phone
 * @returns {Object} { isValid: boolean, error: string }
 */
export const validatePhone = phone => {
  if (!phone || phone.trim() === '') {
    return { isValid: false, error: 'Phone number is required' };
  }

  const phoneRegex =
    /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
  if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
    return { isValid: false, error: 'Please enter a valid phone number' };
  }

  return { isValid: true, error: '' };
};

/**
 * Validate name (first/last/full name)
 * @param {string} name
 * @param {number} minLength
 * @returns {Object} { isValid: boolean, error: string }
 */
export const validateName = (name, minLength = 2) => {
  if (!name || name.trim() === '') {
    return { isValid: false, error: 'Name is required' };
  }

  if (name.trim().length < minLength) {
    return {
      isValid: false,
      error: `Name must be at least ${minLength} characters`,
    };
  }

  if (!/^[a-zA-Z\s'-]+$/.test(name)) {
    return {
      isValid: false,
      error: 'Name can only contain letters, spaces, hyphens, and apostrophes',
    };
  }

  return { isValid: true, error: '' };
};

/**
 * Validate required field
 * @param {string} value
 * @param {string} fieldName
 * @returns {Object} { isValid: boolean, error: string }
 */
export const validateRequired = (value, fieldName = 'This field') => {
  if (!value || value.toString().trim() === '') {
    return { isValid: false, error: `${fieldName} is required` };
  }

  return { isValid: true, error: '' };
};

/**
 * Validate number within range
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @param {string} fieldName
 * @returns {Object} { isValid: boolean, error: string }
 */
export const validateNumberRange = (value, min, max, fieldName = 'Value') => {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: `${fieldName} is required` };
  }

  const numValue = Number(value);

  if (isNaN(numValue)) {
    return { isValid: false, error: `${fieldName} must be a number` };
  }

  if (min !== undefined && numValue < min) {
    return { isValid: false, error: `${fieldName} must be at least ${min}` };
  }

  if (max !== undefined && numValue > max) {
    return { isValid: false, error: `${fieldName} must be at most ${max}` };
  }

  return { isValid: true, error: '' };
};

/**
 * Validate URL
 * @param {string} url
 * @returns {Object} { isValid: boolean, error: string }
 */
export const validateUrl = url => {
  if (!url || url.trim() === '') {
    return { isValid: false, error: 'URL is required' };
  }

  try {
    new URL(url);
    return { isValid: true, error: '' };
  } catch (e) {
    return { isValid: false, error: 'Please enter a valid URL' };
  }
};

/**
 * Validate date
 * @param {string|Date} date
 * @param {Object} options
 * @returns {Object} { isValid: boolean, error: string }
 */
export const validateDate = (date, options = {}) => {
  const { min, max, allowPast = true, allowFuture = true } = options;

  if (!date) {
    return { isValid: false, error: 'Date is required' };
  }

  const dateObj = new Date(date);

  if (isNaN(dateObj.getTime())) {
    return { isValid: false, error: 'Please enter a valid date' };
  }

  const now = new Date();

  if (!allowPast && dateObj < now) {
    return { isValid: false, error: 'Date cannot be in the past' };
  }

  if (!allowFuture && dateObj > now) {
    return { isValid: false, error: 'Date cannot be in the future' };
  }

  if (min && dateObj < new Date(min)) {
    return { isValid: false, error: `Date must be after ${min}` };
  }

  if (max && dateObj > new Date(max)) {
    return { isValid: false, error: `Date must be before ${max}` };
  }

  return { isValid: true, error: '' };
};

/**
 * Sanitize input to prevent XSS
 * @param {string} input
 * @returns {string}
 */
export const sanitizeInput = input => {
  if (typeof input !== 'string') return input;

  return input
    .replace(/[<>]/g, '') // Remove < and >
    .trim();
};

/**
 * Validate form with multiple fields
 * @param {Object} formData - Object with field values
 * @param {Object} validationRules - Object with validation functions
 * @returns {Object} { isValid: boolean, errors: Object }
 */
export const validateForm = (formData, validationRules) => {
  const errors = {};
  let isValid = true;

  Object.keys(validationRules).forEach(fieldName => {
    const validationFn = validationRules[fieldName];
    const fieldValue = formData[fieldName];
    const result = validationFn(fieldValue);

    if (!result.isValid) {
      errors[fieldName] = result.error;
      isValid = false;
    }
  });

  return { isValid, errors };
};
